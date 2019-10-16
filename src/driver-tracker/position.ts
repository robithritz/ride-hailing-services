import { DriverPosisiton } from "./orm";
import { bus } from "./bus";

// update driver position lat lng

interface Movement {
    rider_id: number,
    north: number,
    east: number,
    south: number,
    west: number
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
        positionUpdater(data);
    })
}
