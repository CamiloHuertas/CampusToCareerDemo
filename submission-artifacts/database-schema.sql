-- CampusToCareer MVP Database Schema

CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL CHECK (role IN ('student', 'mentor', 'employer', 'moderator')),
  verification_status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
  profile_id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(user_id),
  display_name VARCHAR(120) NOT NULL,
  bio TEXT,
  photo_url TEXT,
  university VARCHAR(180),
  graduation_year INT,
  company VARCHAR(180),
  title VARCHAR(180),
  is_searchable BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE skills (
  skill_id UUID PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE profile_skills (
  profile_id UUID NOT NULL REFERENCES profiles(profile_id),
  skill_id UUID NOT NULL REFERENCES skills(skill_id),
  PRIMARY KEY (profile_id, skill_id)
);

CREATE TABLE mentorship_sessions (
  session_id UUID PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES users(user_id),
  mentor_id UUID NOT NULL REFERENCES users(user_id),
  scheduled_at TIMESTAMP NOT NULL,
  topic VARCHAR(255) NOT NULL,
  mentor_rate DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  meeting_link TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'pending_payment'
);

CREATE TABLE micro_internships (
  project_id UUID PRIMARY KEY,
  employer_id UUID NOT NULL REFERENCES users(user_id),
  hired_student_id UUID REFERENCES users(user_id),
  title VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  deadline DATE,
  status VARCHAR(30) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applications (
  application_id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES micro_internships(project_id),
  student_id UUID NOT NULL REFERENCES users(user_id),
  cover_note TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'submitted',
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_transactions (
  transaction_id UUID PRIMARY KEY,
  payer_id UUID NOT NULL REFERENCES users(user_id),
  payee_id UUID REFERENCES users(user_id),
  session_id UUID REFERENCES mentorship_sessions(session_id),
  project_id UUID REFERENCES micro_internships(project_id),
  amount DECIMAL(10,2) NOT NULL,
  fee_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  escrow_status VARCHAR(30) NOT NULL DEFAULT 'held',
  processor_ref VARCHAR(120),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ratings (
  rating_id UUID PRIMARY KEY,
  reviewer_id UUID NOT NULL REFERENCES users(user_id),
  recipient_id UUID NOT NULL REFERENCES users(user_id),
  session_id UUID REFERENCES mentorship_sessions(session_id),
  project_id UUID REFERENCES micro_internships(project_id),
  stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE disputes (
  dispute_id UUID PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES payment_transactions(transaction_id),
  filed_by_id UUID NOT NULL REFERENCES users(user_id),
  moderator_id UUID REFERENCES users(user_id),
  reason VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  evidence_url TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'open',
  resolution VARCHAR(120),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);
