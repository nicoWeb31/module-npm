import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

export const serverCommand = new Command()
  .command("serve [fileName]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action((filename = "notebook.js", options: { port: string }) => {
    //   console.log(path.join(process.cwd(), path.basename(filename)));
    const dir = path.join(process.cwd(),path.dirname(filename));
    //   console.log(path.basename(filename));
    serve(parseInt(options.port), path.basename(filename), dir);
  });
