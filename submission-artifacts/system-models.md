# CampusToCareer System Models

## 1. Use Case Diagram

```mermaid
flowchart LR
  Student((Student))
  Mentor((Mentor))
  Employer((Employer))
  Moderator((Trust & Safety Moderator))
  Payment((Payment Processor))
  Verify((University Verification System))

  UC1[Register & Verify Account]
  UC2[Create Profile]
  UC3[Book Mentorship Session]
  UC4[Post & Hire Micro-Internship]
  UC5[Complete Work & Get Paid]
  UC6[Rate User]
  UC7[File & Resolve Dispute]

  Student --> UC1
  Mentor --> UC1
  Student --> UC2
  Mentor --> UC2
  Employer --> UC2
  Student --> UC3
  Mentor --> UC3
  Employer --> UC4
  Student --> UC4
  Student --> UC5
  Employer --> UC5
  Student --> UC6
  Mentor --> UC6
  Employer --> UC6
  Student --> UC7
  Mentor --> UC7
  Employer --> UC7
  Moderator --> UC7

  UC1 --> Verify
  UC3 --> Payment
  UC4 --> Payment
  UC5 --> Payment
  UC7 --> Payment
```

## 2. Domain Model Class Diagram

```mermaid
classDiagram
  class User {
    +uuid userId
    +string email
    +string passwordHash
    +string role
    +string verificationStatus
    +datetime createdAt
  }

  class Profile {
    +uuid profileId
    +string displayName
    +string bio
    +string university
    +int graduationYear
    +string company
    +string title
  }

  class Skill {
    +uuid skillId
    +string name
  }

  class MentorshipSession {
    +uuid sessionId
    +datetime scheduledAt
    +string topic
    +decimal mentorRate
    +decimal platformFee
    +string status
    +string meetingLink
  }

  class MicroInternship {
    +uuid projectId
    +string title
    +string description
    +decimal budget
    +date deadline
    +string status
  }

  class Application {
    +uuid applicationId
    +string coverNote
    +string status
    +datetime submittedAt
  }

  class PaymentTransaction {
    +uuid transactionId
    +decimal amount
    +decimal feeAmount
    +string escrowStatus
    +string processorRef
  }

  class Rating {
    +uuid ratingId
    +int stars
    +string comment
    +datetime createdAt
  }

  class Dispute {
    +uuid disputeId
    +string reason
    +string description
    +string status
    +string resolution
  }

  User "1" --> "1" Profile
  Profile "*" --> "*" Skill
  User "1" --> "*" MentorshipSession : books as student
  User "1" --> "*" MentorshipSession : hosts as mentor
  User "1" --> "*" MicroInternship : posts as employer
  MicroInternship "1" --> "*" Application
  User "1" --> "*" Application : submits
  MentorshipSession "1" --> "1" PaymentTransaction
  MicroInternship "1" --> "*" PaymentTransaction
  User "1" --> "*" Rating : writes
  User "1" --> "*" Rating : receives
  PaymentTransaction "1" --> "0..1" Dispute
```

## 3. System Sequence Diagram: Book Mentorship Session

```mermaid
sequenceDiagram
  actor Student
  participant UI as React Front End
  participant API as CampusToCareer API
  participant Pay as Payment Processor
  participant Video as Meeting Service
  participant Mentor

  Student->>UI: Select mentor time slot
  UI->>API: Submit session topic and slot
  API->>API: Calculate mentor rate + 10% fee
  API-->>UI: Return checkout total
  Student->>UI: Confirm payment
  UI->>Pay: Create escrow payment
  Pay-->>API: Payment authorized
  API->>Video: Generate meeting link
  Video-->>API: Meeting URL
  API->>Mentor: Send confirmation
  API-->>UI: Show confirmed session
```

## 4. System Architecture Diagram

```mermaid
flowchart TB
  subgraph Client
    React[React MVP Interface]
  end

  subgraph Application Layer
    API[REST API Gateway]
    Auth[Verification/Auth Service]
    Market[Marketplace Service]
    PaymentSvc[Escrow Payment Service]
    Trust[Trust & Safety Service]
    Notify[Notification Service]
  end

  subgraph Data Layer
    DB[(PostgreSQL Database)]
    Files[(Evidence / Work Upload Storage)]
  end

  subgraph External Systems
    Univ[University Verification System]
    Stripe[Stripe or PayPal]
    Video[Video Meeting Provider]
    Email[Email/SMS Provider]
  end

  React --> API
  API --> Auth
  API --> Market
  API --> PaymentSvc
  API --> Trust
  API --> Notify
  Auth --> Univ
  Market --> DB
  PaymentSvc --> Stripe
  Trust --> DB
  Trust --> Files
  Market --> Video
  Notify --> Email
  Auth --> DB
  PaymentSvc --> DB
```

## 5. Deployment Diagram

```mermaid
flowchart LR
  Browser[Student / Mentor / Employer Browser]
  CDN[Static Hosting or CDN]
  AppServer[Application Server]
  DB[(Managed PostgreSQL)]
  ObjectStore[(Object Storage)]
  Pay[Payment Processor]
  Verify[University Verification API]
  Email[Email Provider]

  Browser --> CDN
  Browser --> AppServer
  CDN --> Browser
  AppServer --> DB
  AppServer --> ObjectStore
  AppServer --> Pay
  AppServer --> Verify
  AppServer --> Email
```

## 6. User Interface Screens

The implemented React prototype provides these screens:

- Student hub: mentor search, session booking, and micro-internship marketplace
- Mentor search: verified alumni mentor directory
- Employer tools: project posting form, posting fee, and hiring workflow status
- Trust and safety: dispute cases, locked funds, and suggested resolutions

Source location: `src/main.jsx` and `src/styles.css`.
