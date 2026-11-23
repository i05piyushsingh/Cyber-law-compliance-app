# Cyber Law, Risk and Compliance - Web Application

**Course:** Cyber Law, Risk and Compliance (Course Code: `FSMS23 SIII SP-V P1`)  
**Program:** MSc Forensic Science (Cyber Forensics) SEM III  
**Institution:** School of Forensic Science, National Forensic Sciences University (NFSU)  
**Design System:** Microsoft Official Design System (Fluent 2 UI & `microsoft.com` palette)  
**Academic Emblem:** Scales of Justice (`⚖️`) on Microsoft Blue badge (zero proprietary corporate logo)  
**Host Environment:** Localhost (`http://localhost:3000`) — zero external npm dependencies  

---

## 🔐 Institutional Authentication & Login System

The application features a dedicated **Institutional Authentication Portal** modeled after Microsoft Entra ID / Fluent UI, ensuring compliance with academic examination standards and statutory security guidelines.

### Authorized Credentials
| Field | Value | Notes |
| :--- | :--- | :--- |
| **Default Username** | `Admin` | Case-insensitive; also accepts role-based keywords (`Student` / `Professor`) |
| **Default Password** | `Admin@123` | Case-sensitive authorized access passcode |
| **New User Accounts** | Custom Username | Any user created via the registration modal or the in-app User Database |

### Supported User Roles
- 🎓 **Student (`MSc Cyber Forensics SEM III`)**: Full access to syllabus units, splash cards, deep-dive notes, interactive tools, and persistent study progress tracking.
- 👨‍🏫 **Professor (`Course Faculty & Evaluator`)**: Faculty view with academic evaluation tools, examination scheme breakdowns, and audit readiness metrics.

### Authentication Features
- **One-Click Role Selection**: Instant toggle between Student and Professor personas with pre-filled authorized credentials.
- **Client-Side SQLi Filter**: Real-time OWASP SQL injection pattern detection and input sanitization on all authentication and registration forms (IT Act Section 66 compliant).
- **Add New User to Database Modal**: Accessible right from the login card (`➕ Add New User to Database`), allowing instant registration of new Students or Faculty with automated credentials pre-fill and live duplicate prevention.
- **Multi-Field Duplicate Rejection**: Prevents duplicate entries across **Username**, **Full Name**, **Roll No. / Faculty ID**, and **Email Address** on both client and backend layers.
- **Password Visibility Inspector**: Interactive eye toggle (`👁️` / `🔒`) to inspect or conceal the passcode.
- **Session Persistence**: "Keep me signed in on this workstation" stores sessions securely across page reloads via `localStorage` or `sessionStorage`.
- **Statutory Notice**: Prominent compliance disclaimer in accordance with **Section 43 & Section 66 of the Information Technology Act 2000**.
- **Active Session Badges & Sign-Out**: Real-time user profile widget in both the top header and sidebar navigation, featuring one-click session termination (`Sign Out`) returning to the login portal.
- **Help Desk Modal**: Provides institutional IT Cell contact details and credential guidance.

---

## 👥 User Database & Access Control Management

A dedicated administrative and access control section is built into the application to manage registered user accounts with persistent disk storage:

### 1. Persistent Storage & Architecture
- **Backend File Store:** All user records are stored permanently in [`data/users.json`](file:///C:/Users/Piyush%20Kumar%20Singh/.gemini/antigravity/scratch/cyber-law-compliance-app/data/users.json).
- **Two-Way Synchronization:** Client sessions automatically synchronize with `data/users.json` via native RESTful endpoints and maintain a client-side `localStorage` cache for instant offline responsiveness.
- **Multi-Field Duplicate Prevention:** Comprehensive duplicate detection on **Username**, **Full Name**, **Roll No. / Faculty ID**, and **Email**, returning standard HTTP 409 Conflict with descriptive field-specific error messages.
- **Admin-Only Visibility (RBAC):** The `User Database` management console and its navigation item are strictly restricted to the `Admin` account. For non-admin accounts, the navigation link is completely hidden and direct route attempts trigger an IT Act Sec 43/66 Access Denied screen.
- **Client SQLi Shield:** Built-in regular expression whitelist and SQL syntax scanner intercepting malicious statements (`UNION`, `SELECT`, `DROP`, `OR 1=1`, comments, and quotes) before network transmission.
- **Isolated Per-User Progress Tracking:** Each user account maintains their own independent syllabus completion percentage and mastered topic list stored under user-scoped keys (`cyber_progress_<username>`). Switching users instantly re-renders that user's unique progress.
- **Primary Admin Protection:** The default `Admin` account is protected from deletion to preserve evaluator access.

### 2. REST API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users` | Returns list of all registered users in the database |
| `POST` | `/api/users` | Validates and persists a new user account (Student or Professor) |
| `POST` | `/api/users/delete` | Deletes a user account from disk storage (Admin protected) |

### 3. User Database Dashboard (`Administration` → `User Database`)
- **Header Synchronization Badge:** Live visual indicator confirming disk storage alignment with `data/users.json`.
- **4-Card Metrics Grid:** Real-time counters for Total Accounts, Students Enrolled, Faculty Members, and IT Act Sec 43/66 Access Control status.
- **Add User Panel:** In-dashboard form with full field validation, password toggle, roll/faculty ID input, and instant list refresh.
- **Registered Users Directory Table:** Responsive table showing avatars, full names, usernames, role chips, student/faculty IDs, emails, one-click `Sign In As` session switching, and `Delete` actions.

---

## 🎯 Compliance with Core Project Requirements

| Requirement | Implementation Detail | Status |
| :--- | :--- | :--- |
| **1. Local Machine Hosting** | Hosted on `http://localhost:3000` via a high-performance, native Node.js HTTP server. Runs immediately on any machine without installing third-party npm packages. | ✅ Fully Met |
| **2a. Sidebar Component** | Sticky navigational sidebar listing all units (**Unit I, Unit II, Unit III, Unit IV**), Course Scheme, Practical Lab, Interactive Tools, and a live **Syllabus Progress Tracker** as separate, clickable sections with dynamic badge counters. Features the **Scales of Justice (`⚖️`)** emblem on Microsoft Blue badge and transforms into a touch-friendly slide-out drawer on mobile devices. | ✅ Fully Met |
| **2b. Dashboard Component** | Responsive dashboard rendering rich **Splash Cards** summarizing key topics and concepts of the selected unit, complete with category tags, bullet highlights, study status toggles, deep-dive academic notes modals, and instant self-check quizzes. | ✅ Fully Met |
| **2c. Syllabus Coverage Tracker** | Multi-tiered live progress bar tracking syllabus completion across the **Header**, **Sidebar**, **Unit Banners**, and individual **Splash Cards** with persistent local state. | ✅ Fully Met |
| **3. Accurate, Course-Aligned Content** | 100% faithful to the official NFSU M.Sc. Forensic Science (Cyber Forensics) curriculum, statutory Indian Bare Acts (IT Act 2000/2008, DPDP 2023), and prescribed reference authorities (Weiss & Solomon, Craig S. Wright, Angel R. Otero). | ✅ Fully Met |
| **4. Microsoft Official Design System** | Clean **Microsoft.com & Fluent 2 UI** theme: Light Mode (`#f2f2f2` surface, `#ffffff` cards, `#0067b8` Action Blue, `#242424` text, Segoe UI typography) and Dark Mode (`#181818` Windows 11 / Azure Dark base, `#282828` cards, `#0078d4` Fluent Blue). Strictly omits the proprietary Microsoft 4-square logo in favor of the authentic academic Scales of Justice emblem. | ✅ Fully Met |
| **5. Smooth Continuous Motions** | Continuous scroll progress indicator with a Fluent Azure gradient (`#0067b8` → `#0078d4` → `#00a4ef` → `#107c41`), and `IntersectionObserver`-powered staggered card entrance animations. | ✅ Fully Met |
| **6. Mobile Operationality** | Full responsive support across smartphones and tablets: slide-in drawer with backdrop blur, tap-friendly 44px targets, horizontally scrollable academic tables (`.table-responsive`), and full-width touch modals. | ✅ Fully Met |

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** (v14 or higher installed on your system). Zero external npm packages required.

### Launch Options

#### Option 1: One-Click Windows Batch Runner
Double-click `start.bat` in the project root directory.

#### Option 2: PowerShell Launcher
Right-click and run with PowerShell, or execute:
```powershell
.\start.ps1
```

#### Option 3: Using Node.js directly
```bash
node server.js
```

#### Option 4: Using npm
```bash
npm start
```

Once running, navigate your web browser to:
```
http://localhost:3000
```

---

## 🔑 Login Instructions for Evaluators

1. On the initial screen, the **Institutional Login Page** is displayed.
2. Select either **Student** (`MSc Cyber Forensics SEM III`) or **Professor** (`Course Faculty & Evaluator`).
3. The authorized credentials are automatically populated:
   - **Username:** `Admin`
   - **Password:** `Admin@123`
4. Click **`Sign In to Academic Portal →`** to access the dashboard.
5. To test role switching or sign-out, click **`Sign Out`** in either the top-right header or the bottom of the sidebar.

---

## 📚 Curriculum Coverage Matrix

### Unit I: IT Security Assessment, Audit & Compliance Fundamentals (15 Teaching Hours)
- **IT Security Assessment vs. IT Security Audit:** 6-dimension comparative matrix (goals, scope, independence, evidence, frequency, deliverables).
- **Governance & Non-Compliance Penalties:** Statutory fallout under IT Act (Sec 43A), DPDP Act 2023 (penalties up to ₹250 Cr), and GDPR.
- **Audit Scope & Critical Requirements:** Boundary definition, asset inventories, and Audit Charter authorization.
- **Audit Life Cycle & Methodology:** 5-phase audit life cycle and the 5 C's of audit findings (*Condition, Criteria, Cause, Consequence, Corrective Action*).
- **Types of IT Audits:** Systems/Applications, Data Center Processing Facilities, SDLC, Management of IT, and Extranet audits.
- **Computer Assisted Audit Techniques (CAATs):** Generalized Audit Software (ACL, IDEA), 100% population testing, Benford's Law, and application controls (input, processing, output).

### Unit II: IT Infrastructure Security, The 7 Domains & Compliance (15 Teaching Hours)
- **Acceptable Level of Risk (ALR) & Baselines:** CIS Benchmarks, NIST SP 800-70, DISA STIGs, and configuration drift.
- **The Seven Domains Architecture:** Martin M. Weiss & Michael G. Solomon framework.
- **User Domain:** Acceptable Use Policies (AUP), social engineering, phishing metrics, clean desk policy.
- **Workstation Domain:** Maximizing C-I-A triad, Full Disk Encryption (BitLocker AES-256), EDR agents, patch SLAs.
- **LAN & LAN-to-WAN Domains:** VLAN isolation, 802.1X NAC, port security, DMZ architectures, firewall rule auditing.
- **WAN Domain & Penetration Testing:** Border routing hardening, IPsec/TLS encryption, vulnerability scanning vs. penetration testing.
- **Remote Access & System/Application Domains:** Multi-Factor Authentication (MFA), OWASP Top 10, database encryption, segregation of duties.

### Unit III: Risk Management, Quantitative Assessment & Business Impact (15 Teaching Hours)
- **Risk Terminology & Relationships:** Vulnerabilities, Threats, Likelihood, Impact, and Residual Risk.
- **Quantitative Risk Analysis Formulas:**
  - Single Loss Expectancy: $\text{SLE} = \text{Asset Value} \times \text{Exposure Factor}$
  - Annualized Loss Expectancy: $\text{ALE} = \text{SLE} \times \text{Annualized Rate of Occurrence (ARO)}$
  - Safeguard Cost-Benefit: $\text{Net Benefit} = (\text{ALE}_{\text{before}} - \text{ALE}_{\text{after}}) - \text{Annual Cost of Safeguard}$
- **Risk Response Strategies:** Avoidance, Mitigation (Reduction), Transference (Cyber Insurance), and Acceptance.
- **Business Impact Analysis (BIA) & Continuity:** Maximum Tolerable Downtime (MTD), Recovery Time Objective (RTO), Recovery Point Objective (RPO), and Work Recovery Time (WRT).

### Unit IV: Disaster Recovery, Indian Cyber Law & Global Compliance (15 Teaching Hours)
- **Disaster Recovery Planning (DRP):** Hot Sites, Warm Sites, Cold Sites, and Cloud Disaster Recovery as a Service (DRaaS).
- **Indian Information Technology Act 2000 & 2008 Amendment:**
  - Section 43 / 43A: Unauthorized access, damage, and failure to protect sensitive personal data.
  - Section 65: Tampering with computer source documents.
  - Section 66 / 66B-F: Computer-related offences, stolen computer resources, identity theft, cheating by personation, privacy violations, and cyber terrorism.
  - Section 72 / 72A: Breach of confidentiality and disclosure of information in breach of lawful contract.
  - Section 79: Intermediary liability safe harbor and due diligence guidelines.
- **Digital Personal Data Protection (DPDP) Act 2023 & GDPR:** Data Fiduciary obligations, consent architectures, cross-border transfers, and significant financial penalties.

---

## 🧪 Interactive Cybersecurity Tools

1. **Quantitative Risk Calculator:** Live mathematical modeling of SLE, ARO, ALE, and Cost-Benefit Analysis (CBA) to evaluate safeguards quantitatively.
2. **7 Domains Architecture Explorer:** Interactive breakdown of Martin Weiss & Michael Solomon's Seven Domains of IT Infrastructure with threat mitigations.
3. **IT Act 2000 / 2008 Directory:** Searchable statutory directory covering civil penalties, hacking offences, privacy violations, CSAM provisions, and cyber terrorism.
4. **Audit Readiness Checklist:** Real-time compliance assessment meter calculating organizational readiness score across 12 critical audit checkpoints.
5. **Self-Assessment Practice Exam:** 15 multiple-choice questions with instant scoring, answer validation, and detailed forensic explanations.

---

## 📂 Project Structure

```
cyber-law-compliance-app/
├── package.json                 # Project configuration & npm start script
├── server.js                    # Zero-dependency local Node.js HTTP server & API router
├── start.bat                    # One-click Windows batch launcher
├── start.ps1                    # One-click PowerShell launcher script
├── README.md                    # Comprehensive project documentation
├── data/
│   └── users.json               # Persistent JSON database for user accounts
└── public/
    ├── index.html               # Semantic HTML shell (Login Portal, Modals & Dashboard)
    ├── css/
    │   └── styles.css           # Microsoft Fluent 2 CSS & responsive design system
    └── js/
        ├── app.js               # State, auth, user database CRUD, router & UI handlers
        ├── syllabus-data.js     # Structured academic content for Units I–IV & Lab
        ├── quiz-data.js         # 15 scenario-based examination questions
        └── tools.js             # Quantitative Risk Calculator & 7 Domains explorer
```

---

## 🏛️ Academic Course Information

- **Institution:** National Forensic Sciences University (NFSU), Gandhinagar
- **School:** School of Forensic Science
- **Program:** MSc Forensic Science (Cyber Forensics) SEM III
- **Course Code:** FSMS23 SIII SP-V P1
- **Credits:** 4 Credits (60 Teaching Hours)
- **Examination Scheme:**
  - Internal Continuous Assessment (TA-1 & TA-2): 50 Marks
  - Mid-Semester Examination (MSE): 50 Marks
  - University Terminal Examination: 100 Marks
  - **Total Theory Marks: 200 Marks**
  - **P1 Practical Laboratory Course: 100 Marks (6 Credits)**
