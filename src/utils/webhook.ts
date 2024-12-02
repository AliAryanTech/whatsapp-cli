import chalk from 'chalk';

export const simulateWebhookEvent = async (webhookUrl: string, eventType: string, payload: object): Promise<void> => {
  try {
    console.log(chalk.blue(`Sending webhook to: ${webhookUrl}`));
    console.log(chalk.blue(`Event type: ${eventType}`));
    console.log(chalk.blue('Payload:', JSON.stringify(payload, null, 2)));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(chalk.green('Webhook sent successfully!'));
    console.log(chalk.blue('Response:', JSON.stringify(data, null, 2)));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red('Failed to send webhook:', error.message));
    } else {
      console.error(chalk.red('Failed to send webhook:', String(error)));
    }
  }
}; 