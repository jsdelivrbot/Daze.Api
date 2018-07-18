import mongoose from 'mongoose';
import chalk from 'chalk';
import config from '../common/configuration';

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

const connectionString = `mongodb://${config.host}:${config.port}/${config.name}`;

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
    console.log(connected("Mongoose default connection is open to ", connectionString));
});

mongoose.connection.on('error', (err) => {
    console.log(error("Mongoose default connection has occured " + err + " error"));
});

mongoose.connection.on('disconnected', () => {
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', function () {
    mongoose.connection.close(() => {
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0);
    });
});

export default mongoose;
