import { startServer } from './server';
import { syncDB } from './orm';
import { connectToBus } from './bus';
import { positionProjector } from './position';


async function initApp() {
    await syncDB();
    await connectToBus();
    positionProjector();
    startServer();
}

initApp();

