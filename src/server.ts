import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    const port = app.get("port");
    const env = app.get("env");
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        port,
        env
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;



