# CampusToCareer Presentation Slides

## Slide 1: Title

**CampusToCareer**  
A verified marketplace for paid mentorship and micro-internships.

Presenter notes: Introduce the problem: students need experience and connections; alumni and employers need flexible ways to help and scout talent.

## Slide 2: Business Problem

- Students lack access to professional networks and real-world experience.
- Alumni want to mentor but cannot commit to long programs.
- Employers need small project help and early talent discovery.

## Slide 3: Proposed System

CampusToCareer connects verified students, alumni mentors, and employers in one trusted platform.

Core services:

- Paid 1-on-1 mentorship sessions
- Paid short-term micro-internship projects
- Escrow payments
- Ratings and trust/safety review

## Slide 4: Actors and Use Cases

Actors:

- Student
- Mentor
- Employer
- Trust & Safety Moderator
- Payment Processor
- University Verification System

Main use cases:

- Register and verify account
- Create profile
- Book mentorship session
- Post and hire micro-internship
- Complete work and get paid
- Rate user
- File and resolve dispute

## Slide 5: Prototype Demo Flow

Demo path:

1. Show `.edu` verification and dashboard metrics.
2. Search alumni mentors.
3. Select a mentor and view escrow checkout.
4. Browse micro-internships.
5. Switch to employer tools and move a posting through the hiring workflow.
6. Switch to trust and safety and explain locked escrow funds.

## Slide 6: Domain Model and Database

Important entities:

- User and Profile
- MentorshipSession
- MicroInternship
- Application
- PaymentTransaction
- Rating
- Dispute

The database schema supports the key relationships and can be extended into a production backend.

## Slide 7: Architecture

The React front end communicates with an application API. The backend would separate authentication, marketplace workflows, escrow payments, notifications, and trust/safety services.

External integrations:

- University verification
- Stripe or PayPal
- Video meeting provider
- Email/SMS provider

## Slide 8: Test Plan

Testing focuses on:

- Verification and profile setup
- Mentor search and booking
- Fee calculation and escrow behavior
- Employer posting and hiring status
- Student completion and payout
- Rating updates
- Dispute resolution
- Responsive UI behavior

## Slide 9: MVP Limitations

The prototype is not fully production-functional. It mocks:

- Real payments
- Real university verification
- Real video links
- File uploads
- Notification delivery

These are represented in the interface and system diagrams.

## Slide 10: Conclusion

CampusToCareer demonstrates a realistic, professional system design for connecting students with paid career-building opportunities while protecting trust through verification, escrow, ratings, and dispute resolution.
