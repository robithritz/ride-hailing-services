import { connect, Client } from 'nats';

export let bus: Client;

export function connectToBus(): Promise<any> {
    bus = connect({ json: true })
    return new Promise((resolve, reject) => {
        bus.once('connect', () => {
            console.log("BUS connected!");
            resolve();
        })
        bus.on('error', (err) => {
            reject(err);
        })
    })
}