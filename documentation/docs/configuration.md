---
sidebar_position: 3
---

# Configuration

Before using WhatsApp CLI, you need to configure your credentials.

## Setting Up Credentials

#### Set your Phone Number ID
```bash
whatsapp config:set phone_number_id your_phone_number_id
```

#### Set your Access Token
```bash
whatsapp config:set access_token your_access_token
```

#### Set your Webhook URL (optional)
```bash
whatsapp config:set webhook_url your_webhook_url
```
    
## Viewing Configuration

#### List all configurations
```bash
whatsapp config:list
```

#### Get a specific configuration
```bash
whatsapp config:get phone_number_id
```

## Removing Configuration

#### Remove a specific configuration
```bash
whatsapp config:delete phone_number_id
```

