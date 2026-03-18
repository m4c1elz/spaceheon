#!/usr/bin/env node
'use strict'

import 'dotenv/config'
import { Command } from 'commander'
import { migrate } from './commands/migrate'
import pkg from '../package.json'
import { setup } from './commands/setup'

const program = new Command()

program.name(pkg.name).version(pkg.version).description(pkg.description)

program
    .command('setup')
    .description('Set up your Session IDs for migrating blogs.')
    .action(() => setup())

program
    .command('migrate')
    .description('Migrates your blog from spacehey to napoleon.')
    .action(() => migrate())

program.parse()
