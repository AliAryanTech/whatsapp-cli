import { Command } from 'commander';
import { simulateWebhookEvent } from '../utils/webhook.js';
import { Storage } from '../utils/storage.js';
import chalk from 'chalk';
import fs from 'fs';

const VALID_STATUSES = ['sent', 'delivered', 'read', 'failed'] as const;
type MessageStatus = typeof VALID_STATUSES[number];

const DEFAULT_PHONE = '5219991234567'; // Default Mexican phone number (521 + 10 digits)

const SAMPLE_PAYLOADS: Record<string, object> = {
  text_message: {
    object: "whatsapp_business_account",
    entry: [{
      id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
      changes: [{
        value: {
          messaging_product: "whatsapp",
          metadata: {
            display_phone_number: "PHONE_NUMBER",
            phone_number_id: "PHONE_NUMBER_ID"
          },
          contacts: [{
            profile: {
              name: "Test User"
            },
            wa_id: "PHONE_NUMBER"
          }],
          messages: [{
            from: "PHONE_NUMBER",
            id: "wamid.test123",
            timestamp: Date.now().toString(),
            text: {
              body: "Hello, this is a test message"
            },
            type: "text"
          }]
        },
        field: "messages"
      }]
    }]
  },
  location_message: {
    object: "whatsapp_business_account",
    entry: [{
      id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
      changes: [{
        value: {
          messaging_product: "whatsapp",
          metadata: {
            display_phone_number: "PHONE_NUMBER",
            phone_number_id: "PHONE_NUMBER_ID"
          },
          contacts: [{
            profile: {
              name: "Test User"
            },
            wa_id: "PHONE_NUMBER"
          }],
          messages: [{
            from: "PHONE_NUMBER",
            id: "wamid.test123",
            timestamp: Date.now().toString(),
            location: {
              latitude: 40.7128,
              longitude: -74.0060,
              name: "New York City",
              address: "New York, NY, USA"
            },
            type: "location"
          }]
        },
        field: "messages"
      }]
    }]
  },
  message_status: {
    object: "whatsapp_business_account",
    entry: [{
      id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
      changes: [{
        value: {
          messaging_product: "whatsapp",
          metadata: {
            display_phone_number: "PHONE_NUMBER",
            phone_number_id: "PHONE_NUMBER_ID"
          },
          statuses: [{
            id: "wamid.test123",
            status: "delivered",
            timestamp: Date.now().toString(),
            recipient_id: "PHONE_NUMBER"
          }]
        },
        field: "messages"
      }]
    }]
  }
};

export function webhookCommands(program: Command): void {
  program
    .command('webhook:trigger')
    .description('Simulate a webhook event')
    .option('--event <event-type>', 'Type of event to simulate (text_message, location_message, message_status)')
    .option('--url <webhook-url>', 'Override configured webhook URL')
    .option('--payload <payload.json>', 'Path to a JSON file containing a custom payload')
    .option('--from <phone-number>', `Phone number the webhook should come from (default: ${DEFAULT_PHONE})`)
    .option('--business-id <id>', 'WhatsApp Business Account ID')
    .option('--phone-number-id <id>', 'Phone Number ID')
    .option('--status <status>', `Message status (${VALID_STATUSES.join(', ')})`)
    .action(async (options) => {
      const webhookUrl = options.url || Storage.get('webhook_url');
      if (!webhookUrl) {
        console.error(chalk.red('Webhook URL not provided. Either:'));
        console.error(chalk.yellow('1. Configure it: whatsapp config:set webhook_url <url>'));
        console.error(chalk.yellow('2. Provide it as parameter: --url <webhook-url>'));
        return;
      }

      let payload;
      if (options.payload) {
        try {
          payload = JSON.parse(fs.readFileSync(options.payload, 'utf8'));
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(chalk.red('Failed to read or parse the JSON file:', error.message));
          } else {
            console.error(chalk.red('Failed to read or parse the JSON file:', String(error)));
          }
          return;
        }
      } else if (options.event && SAMPLE_PAYLOADS[options.event]) {
        payload = JSON.parse(JSON.stringify(SAMPLE_PAYLOADS[options.event]));
        
        // Replace IDs in payload if provided
        if (options.businessId || options.phoneNumberId || options.from || options.status) {
          const changes = payload.entry[0].changes[0].value;
          
          if (options.businessId) {
            payload.entry[0].id = options.businessId;
          }
          
          if (options.phoneNumberId) {
            changes.metadata.phone_number_id = options.phoneNumberId;
          }
          
          const phoneNumber = options.from || DEFAULT_PHONE;
          changes.metadata.display_phone_number = phoneNumber;
          if (changes.contacts) {
            changes.contacts[0].wa_id = phoneNumber;
          }
          if (changes.messages) {
            changes.messages[0].from = phoneNumber;
          }
          if (changes.statuses) {
            changes.statuses[0].recipient_id = phoneNumber;
          }

          if (options.status && options.event === 'message_status') {
            if (!VALID_STATUSES.includes(options.status as MessageStatus)) {
              console.error(chalk.red(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`));
              return;
            }
            changes.statuses[0].status = options.status;
          }
        }
      } else {
        console.log(chalk.red(`Invalid event type. Available types: ${Object.keys(SAMPLE_PAYLOADS).join(', ')}`));
        return;
      }

      await simulateWebhookEvent(webhookUrl, options.event || 'custom', payload);
    });
} 