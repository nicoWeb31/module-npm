#!/usr/bin/env node
import {program} from 'commander';
import {serverCommand} from './src/commands/serve';


program
.addCommand(serverCommand);


program.parse(process.argv);

