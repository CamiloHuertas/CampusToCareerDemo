import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  FileWarning,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  LogIn,
  LogOut,
  MessageSquareText,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  Star,
  UserPlus,
  UserRoundCheck,
  UsersRound
} from "lucide-react";
import "./styles.css";

const roleProfiles = {
  student: {
    name: "Camilo Huertas",
    email: "chuertas1@live.ndm.edu",
    roleLabel: "Student",
    headline: "Computer science student seeking mentorship and paid project experience",
    defaultView: "student"
  },
  mentor: {
    name: "Maya Robinson",
    email: "maya.robinson@alumni.ndmu.edu",
    roleLabel: "Alumni Mentor",
    headline: "Product manager offering career coaching and interview preparation",
    defaultView: "mentor"
  },
  employer: {
    name: "Jordan Ellis",
    email: "jordan@harborhealth.com",
    roleLabel: "Employer",
    headline: "Hiring students for scoped project work and early talent pipelines",
    defaultView: "employer"
  },
  moderator: {
    name: "Avery Brooks",
    email: "avery@campustocareer.com",
    roleLabel: "Trust & Safety",
    headline: "Reviewing disputes, evidence, escrow holds, and payout decisions",
    defaultView: "moderator"
  }
};

const mentors = [
  {
    name: "Maya Robinson",
    role: "Product Manager",
    company: "Adobe",
    school: "Notre Dame of Maryland University",
    skills: ["Product strategy", "Resume review", "Interview prep"],
    rating: 4.9,
    rate: 45,
    availability: "Tue 5:30 PM"
  },
  {
    name: "Daniel Chen",
    role: "Cybersecurity Analyst",
    company: "Northrop Grumman",
    school: "University of Maryland",
    skills: ["SOC workflows", "Certifications", "Career roadmap"],
    rating: 4.8,
    rate: 55,
    availability: "Wed 7:00 PM"
  },
  {
    name: "Sofia Martinez",
    role: "Data Engineer",
    company: "Capital One",
    school: "Towson University",
    skills: ["SQL", "Portfolio projects", "Internship search"],
    rating: 5.0,
    rate: 50,
    availability: "Thu 6:00 PM"
  }
];

const startingProjects = [
  {
    title: "Market research sprint",
    employer: "Harbor Health",
    budget: 280,
    duration: "8 days",
    skills: ["Research", "Excel", "Presentation"],
    applicants: 7,
    status: "Open",
    applied: false
  },
  {
    title: "Landing page QA report",
    employer: "BrightPath Learning",
    budget: 180,
    duration: "5 days",
    skills: ["Testing", "UX writing", "Screenshots"],
    applicants: 4,
    status: "Open",
    applied: false
  },
  {
    title: "Starter data dashboard",
    employer: "CivicWorks",
    budget: 350,
    duration: "10 days",
    skills: ["React", "Charts", "Data cleanup"],
    applicants: 11,
    status: "Reviewing",
    applied: false
  }
];

const transactions = [
  { label: "Mentorship escrow", amount: "$49.50", status: "Held" },
  { label: "Posting fees", amount: "$420.00", status: "Collected" },
  { label: "Student payouts", amount: "$1,125.00", status: "Ready" }
];

function App() {
  const [selectedRole, setSelectedRole] = useState("student");
  const [session, setSession] = useState(null);
  const [activeView, setActiveView] = useState("student");
  const [query, setQuery] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(mentors[0]);
  const [bookedSession, setBookedSession] = useState(null);
  const [projects, setProjects] = useState(startingProjects);
  const [projectStatus, setProjectStatus] = useState("Draft");
  const [publishedProject, setPublishedProject] = useState(null);
  const [resolvedCases, setResolvedCases] = useState([]);

  const filteredMentors = useMemo(() => {
    const q = query.toLowerCase();
    return mentors.filter((mentor) =>
      [mentor.name, mentor.role, mentor.company, mentor.skills.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  function handleLogin(event) {
    event.preventDefault();
    const profile = roleProfiles[selectedRole];
    setSession({ ...profile, role: selectedRole, verified: true });
    setActiveView(profile.defaultView);
  }

  function resetDemo() {
    setSession(null);
    setActiveView("student");
    setQuery("");
    setSelectedMentor(mentors[0]);
    setBookedSession(null);
    setProjects(startingProjects);
    setProjectStatus("Draft");
    setPublishedProject(null);
    setResolvedCases([]);
  }

  if (!session) {
    return <LoginScreen selectedRole={selectedRole} setSelectedRole={setSelectedRole} onLogin={handleLogin} />;
  }

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="CampusToCareer navigation">
        <div className="brand-lockup">
          <div className="brand-mark">CTC</div>
          <div>
            <p className="eyebrow">Verified career marketplace</p>
            <h1>CampusToCareer</h1>
          </div>
        </div>

        <section className="user-card">
          <span className="avatar">{initials(session.name)}</span>
          <div>
            <strong>{session.name}</strong>
            <small>{session.roleLabel}</small>
          </div>
        </section>

        <nav className="nav-stack">
          <button className={activeView === "student" ? "active" : ""} onClick={() => setActiveView("student")}>
            <LayoutDashboard size={18} /> Student hub
          </button>
          <button className={activeView === "mentor" ? "active" : ""} onClick={() => setActiveView("mentor")}>
            <UsersRound size={18} /> Mentor search
          </button>
          <button className={activeView === "employer" ? "active" : ""} onClick={() => setActiveView("employer")}>
            <BriefcaseBusiness size={18} /> Employer tools
          </button>
          <button className={activeView === "moderator" ? "active" : ""} onClick={() => setActiveView("moderator")}>
            <ShieldCheck size={18} /> Trust & safety
          </button>
        </nav>

        <section className="verification-panel">
          <BadgeCheck size={20} />
          <div>
            <strong>.edu verified</strong>
            <span>{session.email}</span>
          </div>
        </section>

        <button className="ghost-action" onClick={resetDemo}>
          <LogOut size={17} /> Sign out / reset demo
        </button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Signed in as {session.roleLabel}</p>
            <h2>{viewTitle(activeView)}</h2>
            <p className="page-subtitle">{session.headline}</p>
          </div>
          <div className="status-strip">
            <span><CheckCircle2 size={16} /> Account verified</span>
            <span><CircleDollarSign size={16} /> Escrow enabled</span>
          </div>
        </header>

        <section className="metrics-grid" aria-label="Revenue and activity summary">
          <Metric icon={<CalendarCheck />} label="Mentorship sessions" value={bookedSession ? "61" : "60"} helper={bookedSession ? "1 new booking" : "$300 commission"} />
          <Metric icon={<BriefcaseBusiness />} label="Micro-internships" value={publishedProject ? "21" : "20"} helper={publishedProject ? "New project live" : "$400 posting fees"} />
          <Metric icon={<GraduationCap />} label="Student applications" value={projects.filter((project) => project.applied).length} helper="Submitted in this demo" />
          <Metric icon={<Star />} label="Avg. reputation" value="4.8" helper="Published ratings" />
        </section>

        {activeView === "student" && (
          <StudentHub
            query={query}
            setQuery={setQuery}
            mentors={filteredMentors}
            selectedMentor={selectedMentor}
            setSelectedMentor={setSelectedMentor}
            bookedSession={bookedSession}
            setBookedSession={setBookedSession}
            projects={projects}
            setProjects={setProjects}
          />
        )}

        {activeView === "mentor" && (
          <MentorDirectory
            query={query}
            setQuery={setQuery}
            mentors={filteredMentors}
            selectedMentor={selectedMentor}
            setSelectedMentor={setSelectedMentor}
            bookedSession={bookedSession}
            setBookedSession={setBookedSession}
            projects={projects}
            setProjects={setProjects}
          />
        )}

        {activeView === "employer" && (
          <EmployerTools
            projectStatus={projectStatus}
            setProjectStatus={setProjectStatus}
            publishedProject={publishedProject}
            setPublishedProject={setPublishedProject}
          />
        )}

        {activeView === "moderator" && (
          <ModeratorQueue resolvedCases={resolvedCases} setResolvedCases={setResolvedCases} />
        )}
      </section>
    </main>
  );
}

function LoginScreen({ selectedRole, setSelectedRole, onLogin }) {
  const profile = roleProfiles[selectedRole];

  return (
    <main className="auth-shell">
      <section className="auth-hero">
        <div className="brand-lockup">
          <div className="brand-mark">CTC</div>
          <div>
            <p className="eyebrow">CampusToCareer</p>
            <h1>Verified career marketplace</h1>
          </div>
        </div>
        <div className="auth-copy">
          <p className="eyebrow">Prototype demo</p>
          <h2>Mentorship, paid projects, escrow, and trust workflows in one product.</h2>
        </div>
        <div className="auth-proof-grid">
          <span><BadgeCheck size={18} /> .edu verification</span>
          <span><CreditCard size={18} /> Escrow checkout</span>
          <span><ClipboardCheck size={18} /> Micro-internship hiring</span>
          <span><ShieldCheck size={18} /> Dispute resolution</span>
        </div>
      </section>

      <form className="login-panel" onSubmit={onLogin}>
        <div>
          <p className="eyebrow">Secure sign in</p>
          <h2>Access the platform</h2>
        </div>

        <div className="role-grid" role="group" aria-label="Demo role">
          {Object.entries(roleProfiles).map(([role, user]) => (
            <button
              type="button"
              className={selectedRole === role ? "role-option selected" : "role-option"}
              key={role}
              onClick={() => setSelectedRole(role)}
            >
              <strong>{user.roleLabel}</strong>
              <small>{user.email}</small>
            </button>
          ))}
        </div>

        <label>Email
          <input value={profile.email} readOnly />
        </label>

        <label>Password
          <input value="demo-password" type="password" readOnly />
        </label>

        <div className="verification-code">
          <LockKeyhole size={18} />
          <span>Verification code accepted: <strong>248913</strong></span>
        </div>

        <button className="primary-action auth-button" type="submit">
          <LogIn size={18} /> Sign in as {profile.roleLabel}
        </button>
      </form>
    </main>
  );
}

function viewTitle(view) {
  return {
    student: "Book mentorship and find paid experience",
    mentor: "Search verified alumni mentors",
    employer: "Post and hire micro-internships",
    moderator: "Resolve disputes and protect escrow"
  }[view];
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("");
}

function Metric({ icon, label, value, helper }) {
  return (
    <article className="metric-card">
      <div className="metric-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </article>
  );
}

function StudentHub({ query, setQuery, mentors, selectedMentor, setSelectedMentor, bookedSession, setBookedSession, projects, setProjects }) {
  return (
    <div className="content-grid">
      <section className="panel wide">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">UC-03</p>
            <h3>Book a mentorship session</h3>
          </div>
          <div className="search-box">
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search mentor, skill, company" />
          </div>
        </div>
        <div className="mentor-list">
          {mentors.map((mentor) => (
            <button
              className={selectedMentor.name === mentor.name ? "mentor-row selected" : "mentor-row"}
              key={mentor.name}
              onClick={() => setSelectedMentor(mentor)}
            >
              <span className="avatar">{initials(mentor.name)}</span>
              <span>
                <strong>{mentor.name}</strong>
                <small>{mentor.role} at {mentor.company}</small>
              </span>
              <span className="rating"><Star size={15} /> {mentor.rating}</span>
            </button>
          ))}
        </div>
      </section>

      <BookingPanel mentor={selectedMentor} bookedSession={bookedSession} setBookedSession={setBookedSession} />
      <ProjectBoard projects={projects} setProjects={setProjects} />
    </div>
  );
}

function BookingPanel({ mentor, bookedSession, setBookedSession }) {
  const platformFee = mentor.rate * 0.1;
  const total = mentor.rate + platformFee;
  const isBooked = bookedSession?.mentor === mentor.name;

  function confirmSession() {
    setBookedSession({
      mentor: mentor.name,
      time: mentor.availability,
      total,
      status: "Confirmed",
      meetingLink: "campustocareer.video/session-8842"
    });
  }

  return (
    <section className="panel">
      <div className="panel-heading compact">
        <div>
          <p className="eyebrow">Escrow checkout</p>
          <h3>{mentor.name}</h3>
        </div>
        <span className="pill">Available {mentor.availability}</span>
      </div>
      <div className="detail-stack">
        <p>{mentor.role} at {mentor.company}. Best for {mentor.skills.slice(0, 2).join(" and ").toLowerCase()}.</p>
        <div className="price-row"><span>Mentor rate</span><strong>${mentor.rate.toFixed(2)}</strong></div>
        <div className="price-row"><span>Platform fee (10%)</span><strong>${platformFee.toFixed(2)}</strong></div>
        <div className="price-row total"><span>Total due</span><strong>${total.toFixed(2)}</strong></div>
        <button className={isBooked ? "primary-action confirmed" : "primary-action"} onClick={confirmSession}>
          {isBooked ? <CheckCircle2 size={18} /> : <CalendarCheck size={18} />}
          {isBooked ? "Session confirmed" : "Confirm session"}
        </button>
        {bookedSession && (
          <div className="success-note">
            <strong>{bookedSession.status}</strong>
            <span>{bookedSession.mentor} at {bookedSession.time}. Meeting link generated and payment held in escrow.</span>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectBoard({ projects, setProjects }) {
  function applyToProject(title) {
    setProjects((current) =>
      current.map((project) =>
        project.title === title
          ? { ...project, applied: true, applicants: project.applicants + 1, status: "Applied" }
          : project
      )
    );
  }

  return (
    <section className="panel wide">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">UC-04 and UC-05</p>
          <h3>Micro-internship marketplace</h3>
        </div>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className={project.applied ? "project-card selected-card" : "project-card"} key={project.title}>
            <span className={project.applied ? "pill" : "pill neutral"}>{project.status}</span>
            <h4>{project.title}</h4>
            <p>{project.employer} / {project.duration} / ${project.budget}</p>
            <div className="skill-row">
              {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
            <footer>
              <span>{project.applicants} applicants</span>
              <button onClick={() => applyToProject(project.title)} disabled={project.applied}>
                <Send size={15} /> {project.applied ? "Applied" : "Apply"}
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function MentorDirectory(props) {
  return <StudentHub {...props} />;
}

function EmployerTools({ projectStatus, setProjectStatus, publishedProject, setPublishedProject }) {
  const steps = ["Draft", "Fee Paid", "Published", "Reviewing", "Student Hired"];

  function publishProject() {
    setProjectStatus("Published");
    setPublishedProject({
      title: "Accessibility audit for student portal",
      budget: "$240",
      status: "Published",
      applicants: 0
    });
  }

  return (
    <div className="content-grid">
      <section className="panel wide">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">UC-04</p>
            <h3>Create project posting</h3>
          </div>
          <span className="pill">$20 posting fee</span>
        </div>
        <div className="form-grid">
          <label>Project title<input defaultValue="Accessibility audit for student portal" /></label>
          <label>Budget<input defaultValue="$240" /></label>
          <label className="span-two">Required skills<input defaultValue="UX testing, documentation, screenshots" /></label>
          <label className="span-two">Description<textarea defaultValue="Review common student workflows, capture usability issues, and deliver a prioritized findings report." /></label>
        </div>
        <div className="stepper">
          {steps.map((step) => (
            <button key={step} className={projectStatus === step ? "active" : ""} onClick={() => setProjectStatus(step)}>
              {step}
            </button>
          ))}
        </div>
        <button className="primary-action publish-action" onClick={publishProject}>
          <UserPlus size={18} /> Pay posting fee and publish
        </button>
      </section>

      <section className="panel">
        <div className="panel-heading compact">
          <div>
            <p className="eyebrow">Payment state</p>
            <h3>Escrow ledger</h3>
          </div>
        </div>
        <div className="ledger">
          {transactions.map((item) => (
            <div className="price-row" key={item.label}>
              <span>{item.label}<small>{item.status}</small></span>
              <strong>{item.amount}</strong>
            </div>
          ))}
        </div>
        {publishedProject && (
          <div className="success-note">
            <strong>{publishedProject.title}</strong>
            <span>Posting fee collected. Project is now visible to verified students.</span>
          </div>
        )}
      </section>
    </div>
  );
}

function ModeratorQueue({ resolvedCases, setResolvedCases }) {
  const cases = [
    { id: "CTC-1042", icon: <FileWarning size={16} />, reason: "Work quality dispute", funds: "$280 locked", recommendation: "Request revision evidence" },
    { id: "CTC-1043", icon: <MessageSquareText size={16} />, reason: "Mentor cancellation", funds: "$49.50 locked", recommendation: "Issue full refund" },
    { id: "CTC-1044", icon: <UserRoundCheck size={16} />, reason: "Completion approved", funds: "$345 ready", recommendation: "Release payout minus $5 fee" }
  ];

  function resolveCase(id) {
    setResolvedCases((current) => current.includes(id) ? current : [...current, id]);
  }

  return (
    <div className="content-grid">
      <section className="panel wide">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">UC-07</p>
            <h3>Dispute resolution queue</h3>
          </div>
          <span className="pill urgent">{cases.length - resolvedCases.length} pending</span>
        </div>
        <div className="case-table">
          <div className="table-header"><span>Case</span><span>Reason</span><span>Funds</span><span>Recommendation</span><span>Action</span></div>
          {cases.map((item) => {
            const resolved = resolvedCases.includes(item.id);
            return (
              <div className={resolved ? "resolved-row" : ""} key={item.id}>
                <span>{item.icon} {item.id}</span>
                <span>{item.reason}</span>
                <span>{resolved ? "Released" : item.funds}</span>
                <span>{resolved ? "Resolved and parties notified" : item.recommendation}</span>
                <button onClick={() => resolveCase(item.id)} disabled={resolved}>
                  {resolved ? <CheckCircle2 size={15} /> : <ShieldCheck size={15} />}
                  {resolved ? "Resolved" : "Resolve"}
                </button>
              </div>
            );
          })}
        </div>
        {resolvedCases.length > 0 && (
          <button className="ghost-light" onClick={() => setResolvedCases([])}>
            <RotateCcw size={16} /> Reopen cases for demo
          </button>
        )}
      </section>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
