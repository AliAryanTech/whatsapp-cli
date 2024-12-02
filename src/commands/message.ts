import { Command } from 'commander';
import { sendMessage } from '../utils/whatsappApi.js';
import { Storage } from '../utils/storage.js';

export function messageCommands(program: Command): void {
  program
    .command('message:send')
    .description('Send a WhatsApp message')
    .argument('<recipient>', 'Recipient phone number')
    .argument('<message>', 'Message text')
    .option('--phone-number-id <id>', 'Override configured phone number ID')
    .option('--access-token <token>', 'Override configured access token')
    .action(async (recipient, message, options) => {
      const phoneNumberId = options.phoneNumberId || Storage.get('phone_number_id');
      const accessToken = options.accessToken || Storage.get('access_token');

      if (!phoneNumberId || !accessToken) {
        console.error('Phone number ID and access token must be set in the configuration or provided as parameters.');
        return;
      }

      await sendMessage(phoneNumberId, recipient, message, accessToken);
    });
} 