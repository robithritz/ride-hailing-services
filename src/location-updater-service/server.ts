import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'net';
import { getLastPosition } from './position';

const PORT = process.env['RH_LU_PORT'];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/position/:rider_id', getLastPosition);

const server = createServer(app);

export function startServer(): Server {
    return server.listen(PORT, () => {
        console.log("Server listen on ", PORT);
    })
}