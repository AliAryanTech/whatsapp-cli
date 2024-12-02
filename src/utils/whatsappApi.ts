import chalk from 'chalk';

const API_URL = 'https://graph.facebook.com/v21.0';

export const validateConfig = (phoneNumberId?: string, accessToken?: string): boolean => {
  if (!phoneNumberId || !accessToken) {
    console.error(chalk.red('Missing required configurations. Please set:'));
    console.error(chalk.yellow('- phone_number_id (whatsapp config:set phone_number_id <value>)'));
    console.error(chalk.yellow('- access_token (whatsapp config:set access_token <value>)'));
    return false;
  }
  return true;
};

export const sendMessage = async (phoneNumberId: string, recipient: string, message: string, accessToken: string) => {
  if (!validateConfig(phoneNumberId, accessToken)) return;

  try {
    const response = await fetch(`${API_URL}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipient,
        text: { body: message },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(chalk.green('Message sent successfully!'));
    console.log(chalk.blue('Response:', JSON.stringify(data, null, 2)));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red('Failed to send message:', error.message));
    } else {
      console.error(chalk.red('Failed to send message:', String(error)));
    }
  }
}; 