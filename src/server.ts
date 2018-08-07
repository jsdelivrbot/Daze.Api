import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

// Start Express server.

const port = app.get('port');
const env = app.get('env');
const hostname = app.get('hostname');

const server = app.listen(port, hostname, () => {
    const message = 'App is running at http://localhost:%d in %s mode';
    console.log(message, port, env);
    console.log('  Press CTRL-C to stop\n');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection', { reason: reason, promise: promise });
});

export default server;



