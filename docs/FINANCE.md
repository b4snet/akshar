# FINANCE — Akshar Education Finance

## 1. Scope

Student fees, institutional finance, payments, refunds, discounts, scholarships, receivables and management reporting.

## 2. Fee architecture

```text
Fee Structure
 → Fee Head
 → Student Charge
 → Invoice
 → Payment
 → Allocation
 → Receipt
```

## 3. Fee heads

Tuition, admission, examination, library, transport, hostel, laboratory, computer, sports, events, uniform, ID card and configured institutional fees.

## 4. Discounts and scholarships

Discounts, scholarships and waivers are explicit allocation rules with approval and effective dates.

## 5. Payments

Provider-agnostic payment service with adapters for cash, bank, and supported digital providers.

## 6. Reconciliation

Provider/bank references are matched against internal payments. Duplicate or uncertain transactions enter reconciliation rather than silently creating extra receipts.

## 7. Refunds

Refunds require authorization, reason and controlled financial reversal. Posted financial records are not silently deleted.

## 8. Fiscal period

Financial configuration references a fiscal period and institution policy. Calendar conversions are display concerns.

## 9. Nepal rules

Tax/VAT and other Nepal-specific rules must be effective-dated and source-referenced where applicable. Do not hard-code assumptions into generic fee calculation.

## 10. Reports

Collection, outstanding, aging, scholarships, payment methods, refunds and reconciliation reports use real transactional data or controlled reporting projections.

## 11. Security

Financial roles are separate from academic roles; every adjustment, refund and privilege change is audited.
