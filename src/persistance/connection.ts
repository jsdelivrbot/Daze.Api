import mongoose from 'mongoose';
import chalk from 'chalk';
import config from '../common/configuration';

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;
const log = console.log;

const connectionString = `mongodb://${config.host}:${config.port}/${config.name}`;

mongoose.Promise = global.Promise; // used by default
mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
    log(connected("Mongoose default connection is open to ", connectionString));
});

mongoose.connection.on('error', (err) => {
    log(error("Mongoose default connection has occured " + err + " error"));
});

mongoose.connection.on('disconnected', () => {
    log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', function () {
    mongoose.connection.close(() => {
        log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0);
    });
});

export {
    mongoose
};
