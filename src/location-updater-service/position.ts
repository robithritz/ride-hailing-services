import { DriverPosisiton } from "./orm";
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

export async function getLastPosition(req: Request, res: Response) {
    const rider_id = req.params.rider_id;
    if (!rider_id) {
        res.sendStatus(400);
        return;
    }

    const lastPosition = await
        DriverPosisiton.findOne({
            where: {
                rider_id: rider_id
            },
            attributes: ['rider_id', 'latitude', 'longitude', 'updatedAt']
        })

    if (!lastPosition) {
        res.statusCode = 400;
        res.json({
            status: false, message: `No \`rider_id\` of ${rider_id} was found `
        });
        return;
    }

    res.json({ status: true, message: "Rider was found", data: lastPosition });

}

async function positionUpdater(movement: Movement) {
    const moveData: Movement = movement;

    const [position, created] = await
        DriverPosisiton.findOrCreate({
            defaults: {
                latitude: 0,
                longitude: 0
            },
            where: {
                rider_id: moveData.rider_id
            }
        })

    let lat = parseFloat(position.get('latitude') as string);
    let lng = parseFloat(position.get('longitude') as string);
    lat = lat + parseFloat(moveData.north.toString()) - parseFloat(moveData.south.toString());
    lng = lng + parseFloat(moveData.east.toString()) - parseFloat(moveData.west.toString());
    try {
        await position.update({
            latitude: lat,
            longitude: lng,
        })
    } catch (err) {
        console.error(err);
    }
}

export function positionProjector() {
    bus.subscribe('rider.moved', (data) => {
        console.log("BUS: RIDER MOVED");
        positionUpdater(data);
    })
}
