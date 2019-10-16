import { DriverPerformance } from "./orm";
import { bus } from "./bus";
import { Request, Response } from "express";

// update driver position lat lng

interface Movement {
    rider_id: number,
    north: number,
    east: number,
    south: number,
    west: number
}

export async function getPoint(req: Request, res: Response) {
    const rider_id = req.params.rider_id;
    if (!rider_id) {
        res.sendStatus(400);
        return;
    }

    const point = await
        DriverPerformance.findOne({
            where: {
                rider_id: rider_id
            },
            attributes: ['point']
        })

    if (!point) {
        res.statusCode = 400;
        res.json({
            status: false, message: `No \`rider_id\` of ${rider_id} was found `
        });
        return;
    }

    res.json({ status: true, message: "Rider was found", data: point });

}

async function performanceUpdater(movement: Movement) {
    const moveData: Movement = movement;

    const [current_status, created] = await
        DriverPerformance.findOrCreate({
            defaults: {
                total_distance: 0,
                point: 0
            },
            where: {
                rider_id: moveData.rider_id
            }
        })

    let new_distance = parseInt(moveData.east.toString()) + parseInt(moveData.north.toString()) + parseInt(moveData.south.toString()) + parseInt(moveData.west.toString());

    let total_distance = parseFloat(current_status.get('total_distance') as string);
    total_distance += new_distance;
    let point = Math.floor(total_distance / 1000);
    try {
        await current_status.update({
            total_distance: total_distance,
            point: point
        })
    } catch (err) {
        console.error(err);
    }
}

export function performanceProjector() {
    bus.subscribe('rider.moved', (data) => {
        console.log("BUS: RIDER MOVED");
        performanceUpdater(data)
    })
}
