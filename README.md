# WhatsApp CLI

A command-line interface for testing WhatsApp Business API webhooks and sending messages.

## Features

- 📱 Send WhatsApp messages
- 🔄 Test webhook events
- 🛠️ Configure API credentials
- 🔒 Secure storage of configurations

## Installation 

```bash
npm install -g whatsapp-cli
```

## Quick Start

1. Configure your credentials:

```bash
whatsapp config:set phone_number_id "your_phone_number_id"
whatsapp config:set access_token "your_access_token"
whatsapp config:set webhook_url "https://example.com/webhook"
```

2. Send a message:

```bash
whatsapp message:send 5219991234567 "Hello, World!"
```
3. Test a webhook:

```bash
whatsapp webhook:trigger --event text_message
```

## Documentation

For detailed documentation, visit: [https://watools.github.io/whatsapp-cli](https://watools.github.io/whatsapp-cli)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.