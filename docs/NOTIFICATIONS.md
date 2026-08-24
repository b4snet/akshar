# NOTIFICATIONS — Akshar Communication and Alerts

## 1. Channels

- In-app
- Email
- SMS
- Push
- WhatsApp adapter where approved

## 2. Shared notification service

No module creates its own delivery engine. All events flow through one notification service.

## 3. Event model

```text
Domain Event
 → Notification Rule
 → Audience Resolver
 → Channel Selection
 → Delivery Job
 → Provider
 → Delivery Receipt
```

## 4. Examples

- Student absent
- Fee due
- Payment received
- Result published
- Assignment due
- Examination notice
- Admission status
- Transport update
- Leave decision

## 5. Templates

Templates are versioned and localized.

## 6. Delivery safety

Idempotency keys prevent duplicate notifications when jobs retry.

## 7. Privacy

Messages contain only the minimum necessary information. Sensitive records should require authenticated portal access rather than embedding full details in SMS.

## 8. Preferences

Users may have configurable channel preferences subject to institution rules and mandatory operational notices.

## 9. Monitoring

Track queued, sent, delivered, failed and permanently rejected states.
