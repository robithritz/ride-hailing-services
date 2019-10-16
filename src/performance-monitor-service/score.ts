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
    let point = Math.floor(total_distance / 20000);
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
