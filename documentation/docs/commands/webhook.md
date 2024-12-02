---
sidebar_position: 2
---

# Webhook Commands

Test and simulate webhook events from WhatsApp.

## Trigger Webhook Events
#### Basic webhook test

```bash
whatsapp webhook:trigger --event text_message
```
#### With custom phone number

```bash
whatsapp webhook:trigger --event text_message --from 5219991234567
```

#### Message status webhook
```bash
whatsapp webhook:trigger --event message_status --status delivered
```
#### Custom payload
```bash
whatsapp webhook:trigger --payload ./custom-payload.json
```

## Available Event Types

- text_message: Simulate incoming text message
- location_message: Simulate incoming location
- message_status: Simulate message status updates

## Status Types

For message_status events:

- sent
- delivered
- read
- failed
