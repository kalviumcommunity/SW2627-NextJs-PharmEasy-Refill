# PharmEasy Auto-Refill System
## Product Requirements Document

## 1. Problem Statement

PharmEasy wants a subscription system where users can set
auto-refill schedules (daily, weekly, or monthly).

The system should generate orders according to the schedule,
handle payment failures through retries, and notify users
before each order.

## 2. Product Goal

Build a system that allows users to automate recurring
medicine/product purchases while giving them control over
their subscriptions and providing appropriate notifications
and payment-failure handling.

## 3. Target User

Primary:
- PharmEasy customer who regularly purchases medicines/products.

## 4. Core User Journey

User
→ Selects product
→ Creates subscription
→ Selects frequency
→ Subscription becomes active
→ System approaches next refill date
→ User receives notification
→ Order is generated
→ Payment attempted
→ Success OR retry on failure

## 5. Core Features

### Subscription Management
- Create subscription
- View subscription
- Pause subscription
- Resume subscription
- Cancel subscription
- Modify schedule

### Scheduling
- Daily
- Weekly
- Monthly

### Order Generation
- Generate order according to subscription schedule
- Associate order with subscription

### Payment
- Attempt payment
- Detect payment failure
- Retry failed payment
- Handle repeated failures

### Notifications
- Notify user before scheduled order
- Notify user about payment failure
- Notify user about successful/failed processing

## 6. Functional Requirements

FR-01:
Users can create an auto-refill subscription.

FR-02:
Users can choose daily, weekly, or monthly frequency.

FR-03:
The system stores the next scheduled refill.

FR-04:
The system generates an order when the subscription reaches
its scheduled refill.

FR-05:
The system attempts payment for the generated order.

FR-06:
The system retries failed payments.

FR-07:
The system notifies users before each scheduled order.

FR-08:
Users can pause or cancel a subscription.

## 7. Non-Goals

To be discussed and finalized by the team.

## 8. Open Questions

- How many payment retries should occur?
- How much time should exist between retries?
- How many hours/days before an order should the notification be sent?
- Can users change a subscription after creating it?
- Can users change the medicine/product?
- What happens after all payment retries fail?
- Does the system automatically cancel the subscription?
- What exactly does "monthly" mean?
- Can a user have multiple subscriptions?
- What happens if the product is unavailable?
- What happens if the user's prescription is no longer valid?

## 9. Success Criteria

To be finalized with the team.

## 10. Assumptions

To be reviewed by the team.

## 11. Pending Team Decisions

- Final feature scope
- Payment retry policy
- Notification timing
- Subscription lifecycle
- Product availability handling
- User permissions
- Contribution lanes