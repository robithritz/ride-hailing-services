import { startServer } from './server';
import { syncDB } from './orm';
import { connectToBus } from './bus';


async function initApp() {
    await syncDB();
    await connectToBus();
    startServer();
}

initApp();

