import { Request, Response } from 'express';
import { TrackEvent } from './orm';

export async function track(req: Request, res: Response) {
    const { rider_id, north, east, south, west } = req.body;
    if (!rider_id || !north || !east || !south || !west) {
        res.status(400).send();
        return;
    }
    const track = new TrackEvent({
        rider_id,
        north,
        east,
        south,
        west
    });
    try {
        await track.save();
        res.json({ status: true, message: "Record Inserted Successfuly" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
    // res.json({ status: true });
}