import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serverCommand = new Command()
  .command("serve [fileName]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      //   console.log(path.join(process.cwd(), path.basename(filename)));
      const dir = path.join(process.cwd(), path.dirname(filename));
      //   console.log(path.basename(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigate to https://localhost:${options.port}`
      );
    } catch (error) {
      if (error.code === "EADDRINUSE") {
        return console.error("Port is in Use.try running differnt port.");
      }
      console.error("heres the problem", error.message);
      process.exit(1);
    }
  });
