#!/usr/bin/env node
import * as program from 'commander';
import { TokenFlowService } from './tokenFlowService';

program
    .option('-c, --catalog <catalog>', 'The location of the catalog used to create the token-flow service')
    .option('-p, --port <port>', 'The port where you want your token-flow service to live')
    .action(() => {
        if (program.catalog && program.port) {
            let tokenFlowService = new TokenFlowService(program.catalog, program.port);
            tokenFlowService.listen();
        } else {
            console.log('The tokenflow command requires you to enter a file path to your catalog (--catalog or -c) and a port (--port or -p) where your token-flow service will live');
        }
    })
    .parse(process.argv);
