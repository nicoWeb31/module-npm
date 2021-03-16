import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellRouter } from "./routes/cellRoute";

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
        const packagePath = require.resolve("local-client/build/index");
        app.use(express.static(path.dirname(packagePath)));
    }

    app.use(createCellRouter(filemame,dir))

    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
