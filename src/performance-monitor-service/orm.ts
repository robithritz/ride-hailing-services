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

export class DriverPerformance extends Model { }

DriverPerformance.init(
    {
        rider_id: DataTypes.INTEGER,
        total_distance: DataTypes.FLOAT,
        point: DataTypes.INTEGER,
    },
    { modelName: 'driver_performance', sequelize: db }
)

export function syncDB(): Promise<Sequelize> {
    return db.sync();
}