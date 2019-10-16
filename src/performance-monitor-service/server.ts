import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'net';
import { getPoint } from './score';

const PORT = process.env['RH_PM_PORT'];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/point/:rider_id', getPoint);

const server = createServer(app);

export function startServer(): Server {
    return server.listen(PORT, () => {
        console.log("Server listen on ", PORT);
    })
}