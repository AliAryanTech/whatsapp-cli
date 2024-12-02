#!/usr/bin/env node
import { Command } from 'commander';
import { configCommands } from './commands/config.js';
import { messageCommands } from './commands/message.js';
import { webhookCommands } from './commands/webhook.js';

const program = new Command();

program
  .name('whatsapp')
  .description('WhatsApp CLI for developers')
  .version('1.0.0');

// Register command groups
configCommands(program);
webhookCommands(program);
messageCommands(program);

program.parse(process.argv);
