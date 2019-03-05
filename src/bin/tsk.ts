#!/usr/bin/env node

import { TypescriptToolkitCLI } from "../cli/typescript-toolkit-cli";

const commandLineInterface = new TypescriptToolkitCLI();
commandLineInterface.run();
