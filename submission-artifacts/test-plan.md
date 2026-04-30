# CampusToCareer System Test Plan

## Objective

Verify that the prototype demonstrates the core CampusToCareer workflows: account verification, profile setup, mentorship booking, micro-internship posting and hiring, payment/escrow visibility, ratings, and dispute resolution.

| Test ID | Use Case | Scenario | Expected Result | Prototype Evidence |
|---|---|---|---|---|
| T-01 | UC-01 Register & Verify | User signs in with a valid `.edu` email | Account status is marked verified | Sidebar shows `.edu verified`; topbar shows account verified |
| T-02 | UC-02 Create Profile | Student, mentor, or employer completes profile details | Profile becomes searchable when complete | Mentor cards display searchable profile data and skills |
| T-03 | UC-03 Book Mentorship | Student selects a mentor and confirms a session | System calculates mentor rate plus 10% fee and displays total | Booking panel updates when a mentor is selected |
| T-04 | UC-03 Payment Failure Alternate | Payment is declined | User is prompted to retry payment | Represented in architecture and sequence model as external payment response |
| T-05 | UC-04 Post Micro-Internship | Employer fills out title, budget, skills, description and pays $20 fee | Project moves through Draft, Fee Paid, Published, Reviewing, Student Hired | Employer tools stepper changes status |
| T-06 | UC-05 Complete Work & Get Paid | Employer approves student work | Escrow releases payment minus $5 success fee | Escrow ledger and moderator recommendation show payout behavior |
| T-07 | UC-06 Rate User | User rates a completed session or project | Rating is posted and average reputation updates | Dashboard shows average reputation metric and mentor ratings |
| T-08 | UC-07 File & Resolve Dispute | User files a dispute with evidence | Funds lock in escrow and moderator chooses refund, release, or partial payment | Trust & safety queue shows locked funds and recommendations |
| T-09 | Responsive UI | User opens prototype on laptop and phone widths | Content remains readable with no overlap | CSS media queries adjust panels, tables, and cards |

## Risks and Future Testing

- Real payment processing should be tested with Stripe/PayPal sandbox webhooks.
- University verification should be tested against a real verification provider or approved campus identity API.
- File upload and evidence retention should include privacy and storage-permission tests.
- Accessibility testing should include keyboard navigation, color contrast, and screen reader labels.
