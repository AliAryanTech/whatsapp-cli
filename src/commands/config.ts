import { Command } from 'commander';
import chalk from 'chalk';
import { Storage } from '../utils/storage.js';

const REQUIRED_CONFIGS = ['phone_number_id', 'access_token', 'webhook_url'];

export function configCommands(program: Command): void {
  Storage.initialize();

  program
    .command('config:set')
    .description('Set configuration values (phone_number_id or access_token)')
    .argument('<key>', 'Configuration key')
    .argument('<value>', 'Configuration value')
    .action((key, value) => {
      if (!REQUIRED_CONFIGS.includes(key)) {
        console.log(chalk.red(`Invalid config key. Use one of: ${REQUIRED_CONFIGS.join(', ')}`));
        return;
      }
      Storage.set(key, value);
      console.log(chalk.green(`Configuration ${key} has been set successfully`));
    });

  program
    .command('config:get')
    .description('View current configuration')
    .argument('<key>', 'Configuration key')
    .action((key) => {
      const value = Storage.get(key);
      if (value) {
        console.log(chalk.blue(`${key}: ${value}`));
      } else {
        console.log(chalk.yellow(`No configuration found for ${key}`));
      }
    });

  program
    .command('config:list')
    .description('List all stored configurations')
    .action(() => {
      const configs = Storage.list();
      if (Object.keys(configs).length === 0) {
        console.log(chalk.yellow('No configurations found'));
        return;
      }
      
      console.log(chalk.blue('Current configurations:'));
      Object.entries(configs).forEach(([key, value]) => {
        console.log(chalk.blue(`${key}: ${value}`));
      });
    });

  program
    .command('config:delete')
    .description('Delete a specific configuration')
    .argument('<key>', 'Configuration key')
    .action((key) => {
      Storage.delete(key);
      console.log(chalk.green(`Configuration ${key} has been deleted successfully`));
    });
} 