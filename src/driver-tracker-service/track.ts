import { Request, Response } from 'express';
import { TrackEvent } from './orm';
import { bus } from './bus';

export async function track(req: Request, res: Response) {
    const { rider_id, north, east, south, west } = req.body;
    if (!rider_id || !north || !east || !south || !west) {
        res.status(400).send();
        return;
    }

    // save tracking movement
    const track = new TrackEvent({
        rider_id,
        north,
        east,
        south,
        west
    });
    try {
        await track.save();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: err.message
        });
    }

    bus.publish("rider.moved", {
        rider_id,
        north,
        east,
        south,
        west
    })

    res.json({ status: true, message: "Record Inserted Successfuly" });
}