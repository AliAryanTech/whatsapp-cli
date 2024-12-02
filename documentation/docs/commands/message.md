---
sidebar_position: 3
---

# Message Commands

Send WhatsApp messages using the CLI.

## Sending Messages

#### Basic usage
```bash
whatsapp message:send <recipient> "Your message here"
```

#### With optional parameters

```bash
whatsapp message:send <recipient> "Your message" --phone-number-id your_id --access-token your_token    
```

## Parameters

- `recipient`: The recipient's phone number (e.g., 5219991234567)
- `message`: The message text to send (use quotes for messages with spaces)
- `--phone-number-id`: (Optional) Override the configured phone number ID
- `--access-token`: (Optional) Override the configured access token

## Examples

#### Send a simple message
    
```bash
whatsapp message:send 5219991234567 "Hello, World!"
```

#### Override credentials

```bash
whatsapp message:send 5219991234567 "Hello" --phone-number-id 12345 --access-token abc123
```

## Notes

- The recipient number should include the country code
- For Mexican numbers, include the '521' prefix (e.g., 5219991234567)
- Make sure you have configured your credentials or provide them as parameters