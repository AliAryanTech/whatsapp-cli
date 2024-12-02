---
sidebar_position: 1
---

# Introduction

WhatsApp CLI is a command-line interface tool for testing and interacting with the WhatsApp Business API.

## Features

- Configure API credentials
- Send messages
- Test webhooks with various event types
- Simulate webhook events

## Quick Start

### Install globally

```bash
npm install -g whatsapp-cli
Configure your credentials
whatsapp config:set phone_number_id your_phone_number_id
whatsapp config:set access_token your_access_token
```

### Send a message

```bash
whatsapp message:send 1234567890 "Hello, World!"
```

### Test a webhook

```bash
whatsapp webhook:trigger --event text_message
```
