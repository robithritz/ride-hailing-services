import { startServer } from './driver-tracker/server';
import { syncDB } from './driver-tracker/orm';
import { connectToBus } from './driver-tracker/bus';
import { positionProjector } from './driver-tracker/position';


async function initApp() {
    await syncDB();
    await connectToBus();
    positionProjector();
    startServer();
}

initApp();

