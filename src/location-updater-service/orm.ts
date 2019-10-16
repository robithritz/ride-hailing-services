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

export class DriverPosisiton extends Model { }

DriverPosisiton.init(
    {
        rider_id: DataTypes.INTEGER,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
    },
    { modelName: 'driver_position', sequelize: db }
)

export function syncDB(): Promise<Sequelize> {
    return db.sync();
}