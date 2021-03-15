"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverCommand = void 0;
var commander_1 = require("commander");
var local_api_1 = require("local-api");
var path_1 = __importDefault(require("path"));
exports.serverCommand = new commander_1.Command()
    .command("serve [fileName]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action(function (filename, options) {
    if (filename === void 0) { filename = "notebook.js"; }
    //   console.log(path.join(process.cwd(), path.basename(filename)));
    var dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    //   console.log(path.basename(filename));
    local_api_1.serve(parseInt(options.port), path_1.default.basename(filename), dir);
});
