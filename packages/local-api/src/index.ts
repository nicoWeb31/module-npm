import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cellRoute";

export const serve = (
    port: number,
    filemame: string,
    dir: string,
    useProxy: boolean
) => {
    // console.log(`serving travic on port ${port}`);
    // console.log(`saving/fetching cell from  ${filemame}`);
    // console.log(`fine is in directory ${dir}`);

    const app = express();

    app.use(createCellsRouter(filemame, dir));
    if (useProxy) {
        app.use(
            createProxyMiddleware({
                target: "http://localhost:3000",
                ws: true,
                logLevel: "silent",
            })
        );
    } else {
        // production mode
        //absolute path to index.html
        const packagePath = require.resolve("@jbook-nr/local-client/build/index.html");
        app.use(express.static(path.dirname(packagePath)));
    }

    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
