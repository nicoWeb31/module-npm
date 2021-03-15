"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var serve_1 = require("./src/commands/serve");
commander_1.program
    .addCommand(serve_1.serverCommand);
commander_1.program.parse(process.argv);
