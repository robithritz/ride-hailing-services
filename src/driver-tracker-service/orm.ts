import { Sequelize, Model, DataTypes, Promise } from 'sequelize';

const db = new Sequelize({
    database: 'ride_hailing_db',
    username: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    dialect: 'postgres',
    logging: false
})

export class TrackEvent extends Model { }

TrackEvent.init(
    {
        rider_id: DataTypes.INTEGER,
        north: DataTypes.FLOAT,
        east: DataTypes.FLOAT,
        south: DataTypes.FLOAT,
        west: DataTypes.FLOAT
    },
    { modelName: 'track_event', sequelize: db }
);

export function syncDB(): Promise<Sequelize> {
    return db.sync();
}