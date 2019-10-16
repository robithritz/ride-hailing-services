import { startServer } from './server';
import { syncDB } from './orm';
import { connectToBus } from './bus';
import { performanceProjector } from './score';


async function initApp() {
    await syncDB();
    await connectToBus();
    performanceProjector();
    startServer();
}

initApp();

