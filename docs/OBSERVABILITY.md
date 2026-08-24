# OBSERVABILITY — Akshar Operations

## 1. Goals

Know whether Akshar is healthy, which workflow failed, which tenant/scope was affected and whether data integrity remains intact, without exposing secrets or unnecessary student information.

## 2. Signals

- Metrics
- Structured logs
- Traces where useful
- Audit events
- Queue metrics
- Integration status
- Database health

## 3. Request context

Each request receives a request/correlation ID. Logs include safe actor/scope identifiers where justified.

## 4. Core metrics

- API latency/error rate
- DB latency
- queue depth
- job failure rate
- notification delivery rate
- payment reconciliation backlog
- integration failures
- result publication duration
- export volume

## 5. Academic integrity alerts

Detect unusual spikes in:

- mark edits
- result revisions
- privilege changes
- bulk exports
- repeated login failures

## 6. Dashboards

Operational dashboards distinguish:

- zero
- no data
- delayed data
- data load error

## 7. Privacy

No passwords, tokens, full payment credentials or raw student documents in normal logs.

## 8. Retention

Log retention is configured by operational need and legal/privacy review.

## 9. Alerting

Alert only on actionable conditions; define severity, owner, acknowledgement and escalation.
