import { startServer } from './driver-tracker/server';
import { syncDB } from './driver-tracker/orm';


async function initApp() {
    await syncDB();
    startServer();
}

initApp();

