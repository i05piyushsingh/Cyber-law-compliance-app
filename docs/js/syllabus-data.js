/**
 * Academic Course Data for Cyber Law, Risk and Compliance
 * Course Code: FSMS23 SIII SP-V P1
 * National Forensic Sciences University (NFSU), School of Forensic Science
 * Specialization - V (Cyber Forensics)
 */

const SYLLABUS_DATA = {
  courseInfo: {
    title: "Cyber Law, Risk and Compliance",
    code: "FSMS23 SIII SP-V P1",
    institution: "National Forensic Sciences University (NFSU)",
    department: "School of Forensic Science",
    program: "MSc Forensic Science (Cyber Forensics) SEM III",
    specialization: "Cyber Forensics Specialization",
    credits: 4,
    teachingHours: 60,
    examinationScheme: {
      theory: {
        internal: {
          ta: { name: "TA-1 & TA-2 (Assignments/Workshops)", marks: 50, hours: "1:30" },
          mse: { name: "Mid-Semester Examination (MSE)", marks: 50, hours: "1:30" }
        },
        universityExam: { name: "End-Semester University Exam", marks: 100, hours: "3:00" },
        totalMarks: 200
      },
      practicalLab: {
        courseCode: "FSMS23 SIII SP-V LC: LABORATORY COURSE",
        credits: 6,
        internalMSE: 50,
        universityLPW: 100,
        totalMarks: 150
      }
    },
    objectives: [
      "Master IT Security Audit and Compliance fundamentals and regulatory imperatives.",
      "Understand the systematic process of security audits and industry standard auditing practices.",
      "Implement risk analysis, identification, response, and business continuity planning (BCP).",
      "Analyze legal aspects, the Indian Information Technology Act 2000 & 2008 amendments, international cyber laws, and compliance frameworks."
    ],
    outcomes: [
      "Conduct comprehensive IT security assessments and compliance audits.",
      "Evaluate security controls across the Seven Domains of typical IT infrastructure.",
      "Execute qualitative and quantitative risk analysis (SLE, ARO, ALE) and disaster recovery strategies.",
      "Apply statutory cyber laws, cyber ethics, child protection statutes (POCSO/CSAM), and industry frameworks (ISO 27001, COBIT, SOC, HIPAA)."
    ],
    referenceBooks: [
      { id: 1, title: "Auditing IT Infrastructures for Compliance", author: "Martin M. Weiss, Michael G. Solomon", publisher: "Jones & Bartlett Learning", year: "2015" },
      { id: 2, title: "The IT Regulatory and Standards Compliance Handbook", author: "Craig S. Wright", publisher: "Syngress", year: "2015" },
      { id: 3, title: "Information Technology Control and Audit (5th Edition)", author: "Angel R. Otero", publisher: "CRC Press", year: "2019" },
      { id: 4, title: "The Complete Guide to Cybersecurity Risks and Controls", author: "Anne Kohnke, Dan Shoemaker, Ken Sigler", publisher: "CRC Press / Internal Audit Series", year: "2016" },
      { id: 5, title: "PCI DSS: An Integrated Data Security Standard Guide", author: "Jim Seaman", publisher: "Apress", year: "2020" },
      { id: 6, title: "AICPA SOC 2 Reporting on an Examination of Controls", author: "AICPA / Wiley", publisher: "Wiley", year: "2018" },
      { id: 7, title: "Business Continuity (2nd Edition)", author: "Bob Hayes, Kathleen Kotwica", publisher: "Elsevier", year: "2013" },
      { id: 8, title: "Governance, Risk, and Compliance", author: "Microsoft Security Guide", publisher: "Microsoft", year: "2019" },
      { id: 9, title: "IT Act 2000 and 2008 Bare Acts Documents", author: "Government of India", publisher: "Universal Law Publishing", year: "2008" },
      { id: 10, title: "Cyber Law in India", author: "Satish Chandra", publisher: "Centax Law Publications", year: "2017" }
    ]
  },

  units: [
    {
      id: "unit-1",
      number: "UNIT-I",
      title: "IT Security Assessment, Audit & Compliance Fundamentals",
      hours: "15 Hours",
      summary: "Conceptual foundations of IT security assessment versus audit, governance mandates, statutory compliance drivers, audit planning, execution lifecycle, and Computer Assisted Audit Techniques (CAATs).",
      topicsCount: 6,
      cards: [
        {
          id: "u1-card-1",
          tag: "Foundations",
          badge: "Core Distinction",
          title: "IT Security Assessment vs. IT Security Audit",
          subtitle: "Differentiating diagnostic vulnerability reviews from formal compliance attestations",
          summary: "An IT Security Assessment is an ongoing, diagnostic, and consultative evaluation of security posture to identify weaknesses. In contrast, an IT Security Audit is an independent, rigorous, evidence-based verification against formal standards or regulations.",
          keyPoints: [
            "Purpose: Assessments seek technical gaps & improvement; Audits evaluate formal compliance against predefined criteria.",
            "Independence: Assessments can be conducted internally; Audits require objective independence (internal/external audit charter).",
            "Output: Assessment produces a vulnerability report & remediation roadmap; Audit produces formal assurance or qualification opinions.",
            "Nature: Non-punitive and advisory (Assessment) vs. Formal, binding, and attestational (Audit)."
          ],
          deepDive: `
#### Comparative Matrix: Assessment vs. Audit

| Dimension | IT Security Assessment | IT Security Audit |
| :--- | :--- | :--- |
| **Primary Goal** | Identify security gaps, vulnerabilities, and improvement areas. | Determine compliance against specific regulatory standards, laws, or policies. |
| **Standard / Baseline** | Best-practice benchmarks (CIS, OWASP, NIST CSF). | Formal criteria (ISO/IEC 27001, SOC 2, HIPAA, PCI-DSS, IT Act). |
| **Auditor Status** | Can be internal team or external technical consultant. | Must be independent (Certified Information Systems Auditor - CISA, ISO Lead Auditor). |
| **Evidence Threshold** | Qualitative risk observations, proof-of-concept exploits. | Verifiable, tamper-evident audit trails, sampling, documentary artifacts. |
| **Frequency** | Continuous or triggered by architecture updates. | Scheduled annually, bi-annually, or by regulatory mandate. |
| **Final Deliverable** | Vulnerability matrix, gap analysis, mitigation recommendations. | Formal Audit Report with findings, opinion (Qualified/Unqualified), and CAPA. |

#### What is Compliance?
Compliance refers to the state of adhering to established external regulatory mandates (e.g., IT Act 2000, GDPR, HIPAA, PCI-DSS) as well as internal organizational policies, contractual security agreements, and security baselines.
          `,
          examTip: "Exam favorite: Draw the 6-point comparative matrix between IT Security Audit and IT Security Assessment. Always mention 'Formal Criteria' and 'Independence'.",
          selfCheck: {
            question: "Which of the following best characterizes an IT Security Audit over an Assessment?",
            options: [
              "A) It is solely focused on discovering zero-day software vulnerabilities.",
              "B) It is an independent, evidence-based examination verifying adherence to formal criteria.",
              "C) It is always non-binding and informal.",
              "D) It can only be conducted by the system developers themselves."
            ],
            answer: 1,
            explanation: "Audits require rigorous independence and test operational controls against formal statutory, regulatory, or policy benchmarks."
          }
        },
        {
          id: "u1-card-2",
          tag: "Governance & Law",
          badge: "Regulatory Mandate",
          title: "Governance, Compliance & Cost of Non-Compliance",
          subtitle: "Why organizations govern IT risk and the severe fallout of regulatory violations",
          summary: "Governance provides the strategic compass and accountability structure, while compliance validates adherence. Failing to comply results in catastrophic financial penalties, criminal liability, civil damages, and license revocation.",
          keyPoints: [
            "Governance aligns IT strategies with enterprise goals and risk appetite (COBIT, ITIL).",
            "Compliance acts as the regulatory guardrail ensuring legal, contractual, and privacy adherence.",
            "Financial Penalties: Millions in regulatory fines (GDPR up to 4% global turnover; DPDP up to ₹250 Crores).",
            "Legal & Criminal Liability: Directors' liability, imprisonment under cyber statutes (e.g., Section 43A, 66, 67B of IT Act).",
            "Reputational & Operational Loss: Revocation of banking/fintech operating licenses, loss of customer trust."
          ],
          deepDive: `
#### The Triad: Governance, Risk, and Compliance (GRC)
- **Governance:** The leadership, organizational structures, and processes that ensure IT sustains and extends enterprise strategies.
- **Risk Management:** The systematic identification, evaluation, and mitigation of uncertainties that threaten organizational objectives.
- **Compliance:** Conforming with applicable laws, regulations, codes, and organizational standards.

#### Consequences of Non-Compliance:
1. **Direct Statutory Penalties:**
   - *IT Act 2000 (India):* Section 43A mandates unlimited compensation for failure to protect Sensitive Personal Data or Information (SPDI).
   - *Digital Personal Data Protection Act (DPDP 2023):* Penalties up to ₹250 Crores for failure to take reasonable security safeguards.
   - *GDPR (EU):* Tier 2 fines up to €20 Million or 4% of total worldwide annual turnover.
2. **Criminal Prosecution:** Imprisonment of Officers in Default under relevant company and cyber laws.
3. **Contractual Breach:** Cancellation of Master Service Agreements (MSAs), forfeiture of performance guarantees, vendor blacklisting.
4. **Market & Reputational Destruction:** Stock devaluation, credit rating downgrades, loss of investor confidence.
          `,
          examTip: "Remember the GRC relationship: Governance dictates policies -> Risk identifies vulnerabilities -> Compliance tests and verifies execution.",
          selfCheck: {
            question: "Under India's Digital Personal Data Protection (DPDP) Act 2023, what is the maximum penalty for failure to adopt reasonable security safeguards?",
            options: [
              "A) Up to ₹50 Lakhs",
              "B) Up to ₹25 Crores",
              "C) Up to ₹250 Crores",
              "D) Unlimited compensation under Sec 43A only"
            ],
            answer: 2,
            explanation: "The DPDP Act 2023 sets maximum penalties up to ₹250 Crores for significant breaches of security safeguard obligations."
          }
        },
        {
          id: "u1-card-3",
          tag: "Audit Scope",
          badge: "Planning Phase",
          title: "Scope of an IT Compliance Audit & Critical Requirements",
          subtitle: "Defining boundary conditions, critical assets, and compliance baselines",
          summary: "An IT compliance audit must establish strict boundaries to avoid scope creep. Auditors identify applicable laws, critical information infrastructure, data flows, and stakeholder expectations to draft an authoritative Audit Charter.",
          keyPoints: [
            "Scoping parameters: Physical locations, logical network segments, cloud services, and third-party APIs.",
            "Data boundary definition: PII, SPDI, cardholder data (PCI-DSS CDE), intellectual property.",
            "Audit Charter: Executive authorization conferring auditor independence, access rights, and mandate.",
            "Identifying critical requirements: Regulatory laws, contractual SLAs, internal security policies."
          ],
          deepDive: `
#### Steps in Defining Audit Scope:
1. **Identify Regulatory Drivers:** Determine whether HIPAA, PCI-DSS, IT Act, ISO 27001, or SOC 2 applies.
2. **Map Information Assets & Data Flows:** Track where Sensitive Personal Data enters, processes, is stored (data at rest), and leaves (data in transit).
3. **Establish Logical & Physical Boundaries:**
   - Cardholder Data Environment (CDE) segmentation.
   - Demilitarized Zones (DMZs), cloud VPCs, on-premise server rooms.
4. **Determine Temporal Boundaries:** The audit period (e.g., SOC 2 Type II requires a minimum 6-month continuous operational review).
5. **Establish Exclusion Criteria:** Explicitly state what systems or environments (e.g., unintegrated sandbox R&D servers) are out-of-scope to prevent ambiguity.

#### Critical Requirements for Audit Execution:
- Executive Sponsorship & Approved Audit Charter.
- Unhindered access to logs, configurations, and key personnel.
- Protection of evidence integrity (chain-of-custody for audit logs).
          `,
          examTip: "Define 'Audit Charter': The formal document approved by the Board or Audit Committee that establishes the role, authority, independence, and scope of the IT audit function.",
          selfCheck: {
            question: "Why must the scope of an IT Compliance Audit be formalized in an Audit Charter?",
            options: [
              "A) To ensure auditors can modify source code without supervisor approval.",
              "B) To establish auditor independence, authority, access permissions, and clear boundary limits.",
              "C) To allow penetration testers to perform destructive denial-of-service attacks.",
              "D) To bypass local privacy laws."
            ],
            answer: 1,
            explanation: "The Audit Charter formally establishes independence, executive authority, access rights, and clear operational boundaries."
          }
        },
        {
          id: "u1-card-4",
          tag: "Audit Methodology",
          badge: "Lifecycle Process",
          title: "The Audit Plan & IT Audit Process Life Cycle",
          subtitle: "A systematic 5-phase framework from pre-audit planning to remediation closure",
          summary: "A robust IT audit follows an internationally recognized life cycle: Planning & Preparation, Fieldwork & Evidence Gathering, Control Evaluation, Reporting, and Follow-Up / Remediation Verification.",
          keyPoints: [
            "Phase 1: Planning - Risk assessment, audit charter review, scope document, resource allocation.",
            "Phase 2: Fieldwork - Inquiries, observation, configuration inspection, log sampling, vulnerability scans.",
            "Phase 3: Evaluation - Testing control design effectiveness and operational effectiveness.",
            "Phase 4: Reporting - Drafting audit report with 5 C's (Condition, Criteria, Cause, Consequence, Corrective Action).",
            "Phase 5: Follow-Up - Tracking Corrective and Preventive Actions (CAPA) to verify closure."
          ],
          deepDive: `
#### Detailed 5-Phase Audit Process:

\`\`\`
[1. Planning & Scoping] -> [2. Fieldwork & Testing] -> [3. Evidence Evaluation] -> [4. Reporting & Briefing] -> [5. Follow-Up & CAPA]
\`\`\`

1. **Phase 1: Planning & Pre-Audit Assessment**
   - Establish audit objectives, assemble multidisciplinary team (forensic experts, network auditors).
   - Review past audit reports, existing risk registers, and system architecture diagrams.
2. **Phase 2: Fieldwork & Evidence Collection**
   - Corroborative evidence gathering:
     - Inspection (reading configs, firewall rules).
     - Observation (watching server room badge access).
     - Inquiry (structured interviews with DevOps/SecOps).
     - Re-performance (re-running automated control tests).
3. **Phase 3: Evaluation of Controls**
   - **Design Effectiveness:** Is the control designed adequately to mitigate the intended risk?
   - **Operating Effectiveness:** Did the control operate reliably and consistently throughout the audit period?
4. **Phase 4: Reporting**
   - Executive Summary (non-technical risk rating for BoD).
   - Detailed Findings documented using the **5 C's of Audit**:
     1. *Condition:* What is the current factual state?
     2. *Criteria:* What standard or policy was violated?
     3. *Cause:* Why did the deviation occur?
     4. *Consequence:* What is the business impact / exposure?
     5. *Corrective Action:* What remediation must management take?
5. **Phase 5: Follow-Up & Remediation Review**
   - Remediation milestone validation; re-testing controls before formal issue closure.
          `,
          examTip: "Memorize the 5 C's of an Audit Finding: Condition, Criteria, Cause, Consequence, Corrective Action. Frequently asked in 5-mark and 10-mark questions.",
          selfCheck: {
            question: "In audit reporting, what does the 'Criteria' component in the 5 C's represent?",
            options: [
              "A) The monetary value of the damaged server.",
              "B) The standard, law, or policy against which current conditions were evaluated.",
              "C) The root cause why an employee clicked a phishing email.",
              "D) The corrective action deadline."
            ],
            answer: 1,
            explanation: "Criteria represents the benchmark, standard, law, or policy against which the auditor evaluated the observed condition."
          }
        },
        {
          id: "u1-card-5",
          tag: "Audit Typologies",
          badge: "Classifications",
          title: "Types of IT Audits",
          subtitle: "Systems, processing facilities, SDLC, management, and network infrastructure audits",
          summary: "IT audits are categorized based on their technical target and organizational focus, ranging from application-specific reviews to enterprise IT governance and data center physical controls.",
          keyPoints: [
            "Systems & Applications Audit: Evaluates whether business software controls maintain C-I-A and data accuracy.",
            "Information Processing Facilities Audit: Inspects data centers, environmental controls, HVAC, fire suppression, physical security.",
            "Systems Development (SDLC) Audit: Assesses controls during development life cycle, DevSecOps, change management.",
            "Management of IT & Enterprise Architecture: Reviews governance, strategic alignment, ITIL frameworks, IT leadership.",
            "Telecommunications, Intranet & Extranet: Tests network perimeter, firewalls, VPNs, routing protocols, and bandwidth availability."
          ],
          deepDive: `
#### Breakdown of IT Audit Types:

- **1. Systems and Applications Audits:**
  - Verifies input validation, segregation of duties (SoD), user authentication, audit logging, and output verification within core software (e.g., SAP, Oracle ERP, Core Banking Systems).
- **2. Information Processing Facilities (Data Center Audits):**
  - Physical access controls (biometric gates, CCTV, visitor logs).
  - Environmental controls (temperature, humidity, clean agent fire suppression FM200/Novec 1230, UPS power redundancy, dual generators).
- **3. Systems Development Life Cycle (SDLC) Audits:**
  - Validates that new systems adhere to secure coding standards (OWASP ASVS), code reviews, penetration testing before release, and segregated DEV/TEST/PROD environments.
- **4. Management of IT & Governance Audits:**
  - Evaluates IT organizational structure, steering committees, resource allocation, and alignment with business objectives (COBIT framework).
- **5. Telecommunications, Intranet, and Extranet Audits:**
  - Examines network security controls, edge routing, WAN link encryption, IDS/IPS effectiveness, and secure partner extranet connections.
          `,
          examTip: "Be ready to cite examples for each IT audit type. For Information Processing Facilities, mention physical access, HVAC, UPS, and fire suppression systems.",
          selfCheck: {
            question: "An audit assessing whether software development adheres to code reviews and separate Dev/Test/Prod environments is called:",
            options: [
              "A) Systems Development Life Cycle (SDLC) Audit",
              "B) Extranet Telecommunications Audit",
              "C) Information Processing Facility Audit",
              "D) Physical Security Audit"
            ],
            answer: 0,
            explanation: "SDLC audits specifically inspect software development governance, secure coding, testing, and environment segregation."
          }
        },
        {
          id: "u1-card-6",
          tag: "Audit Tooling",
          badge: "Technical CAATs",
          title: "Computer Assisted Audit Techniques (CAATs)",
          subtitle: "Automated sampling, application reviews, and application control auditing",
          summary: "CAATs empower auditors to automate the extraction, analysis, and verification of massive transaction datasets. CAATs are indispensable for statistical sampling, detecting anomalies, and auditing automated application controls.",
          keyPoints: [
            "CAATs definition: Specialized software (ACL, IDEA, Python/SQL scripts) that analyzes 100% of data populations.",
            "CAATs for Sampling: Statistical sampling (attribute, variable, monetary unit) vs. judgmental sampling.",
            "CAATs for Application Reviews: Interrogating database logs, detecting orphan accounts, flagging unauthorized schema modifications.",
            "CAATs for Auditing Application Controls: Testing input controls (checksums, field formats), processing controls (run totals), and output controls."
          ],
          deepDive: `
#### Detailed Analysis of CAATs Capabilities:

1. **CAATs for Sampling:**
   - Traditional manual audit is limited to small judgmental sample sizes (e.g., 25 out of 100,000 transactions).
   - CAATs enable:
     - **100% Population Testing:** Full analysis of millions of ledger rows to catch every anomaly.
     - **Attribute Sampling:** Testing the rate of deviation in internal controls (e.g., % of invoices lacking manager approval).
     - **Variable / Stratified Sampling:** Grouping high-value transactions into mandatory audit strata.
     - **Benford's Law Analysis:** Mathematical analysis of leading digits to detect financial fraud and falsified records.

2. **CAATs for Application Reviews:**
   - Querying live databases to detect duplicate transactions, split payments to circumvent approval limits, and ghost employees.
   - Segregation of Duties (SoD) Conflict Analysis: Identifying users who hold conflicting privileges (e.g., creating a vendor AND approving payments).

3. **CAATs for Auditing Application Controls:**
   - **Input Controls:** Verifying field length checks, data type validations (preventing text in numeric fields), check digits (Luhn algorithm on cards).
   - **Processing Controls:** Run-to-run control totals, sequence check verification, automated boundary limit checks.
   - **Output Controls:** Automated spool file reconciliation, authorized recipient access logs.
          `,
          examTip: "Key distinction for tests: Differentiate between General Controls (ITGC) and Application Controls (Automated input/processing/output logic). CAATs excel at testing application controls.",
          selfCheck: {
            question: "Which of the following is a key advantage of CAATs over manual auditing?",
            options: [
              "A) It eliminates the need for an audit report.",
              "B) It allows testing 100% of large electronic transaction populations rather than small samples.",
              "C) It allows auditors to legally bypass corporate password policies.",
              "D) It guarantees zero residual risk."
            ],
            answer: 1,
            explanation: "CAATs allow auditors to interrogate 100% of high-volume datasets, discovering fraud, outliers, and control failures that small manual samples miss."
          }
        }
      ]
    },

    {
      id: "unit-2",
      number: "UNIT-II",
      title: "IT Infrastructure Security, The 7 Domains & Compliance",
      hours: "15 Hours",
      summary: "Acceptable Level of Risk (ALR), security baseline architectures, comprehensive auditing across the Seven Domains of IT infrastructure, maximizing CIA, and writing professional audit reports.",
      topicsCount: 8,
      cards: [
        {
          id: "u2-card-1",
          tag: "Risk Baselines",
          badge: "Foundational Metric",
          title: "Acceptable Level of Risk (ALR) & Security Baselines",
          subtitle: "Establishing risk tolerance thresholds and minimum enforceable security configurations",
          summary: "Organizations cannot eliminate all risk; they must determine an Acceptable Level of Risk (ALR) aligned with risk appetite. Security Baselines define the minimum non-negotiable hardening configurations across infrastructure.",
          keyPoints: [
            "Acceptable Level of Risk (ALR): The residual risk threshold an organization chooses to tolerate after controls are applied.",
            "Security Baselines: Standardized configuration guides (CIS Benchmarks, NIST SP 800-70, DISA STIGs).",
            "Baseline enforcement: Golden image builds, Group Policy Objects (GPO), configuration management (Ansible, Puppet).",
            "Drift Detection: Periodic automated compliance scans to detect deviations from established baselines."
          ],
          deepDive: `
#### Defining ALR and Baseline Hardening:
- **Risk Appetite vs. Risk Tolerance:**
  - *Risk Appetite:* Broad amount of risk an enterprise is willing to accept in pursuit of strategic value.
  - *Risk Tolerance:* The acceptable variance around specific operational objectives.
  - *ALR (Acceptable Level of Risk):* The quantifiable ceiling of residual risk. Anything above ALR requires immediate remediation.

#### Implementing Security Baselines:
1. **Operating System Baselines:** Disabling default accounts (guest, administrator rename), turning off unused services (Telnet, SMBv1), enforcing password complexity.
2. **Network Device Baselines:** Disabling HTTP management, enforcing SSHv2 with public-key authentication, restricting SNMP community strings.
3. **Database Baselines:** Encrypting data at rest (TDE), enforcing TLS 1.3 for connections, removing sample schemas.
          `,
          examTip: "Always mention 'CIS Benchmarks' (Center for Internet Security) and 'DISA STIGs' as the gold standard examples of Security Baselines.",
          selfCheck: {
            question: "What is the primary function of a Security Baseline in enterprise IT?",
            options: [
              "A) To measure maximum network bandwidth.",
              "B) To define the mandatory minimum security configuration settings across devices and software.",
              "C) To eliminate the need for backup systems.",
              "D) To replace disaster recovery planning."
            ],
            answer: 1,
            explanation: "A security baseline establishes the standardized, minimum acceptable hardening configuration across all infrastructure components."
          }
        },
        {
          id: "u2-card-2",
          tag: "Infrastructure",
          badge: "7 Domains Model",
          title: "The Seven Domains of a Typical IT Infrastructure",
          subtitle: "The Martin Weiss & Michael Solomon architectural framework for compliance auditing",
          summary: "Enterprise IT is divided into seven interconnected domains to systematically evaluate threats, vulnerabilities, controls, and compliance requirements across physical, logical, and human layers.",
          keyPoints: [
            "Domain 1: User Domain - People, employees, contractors, acceptable use.",
            "Domain 2: Workstation Domain - End-user computers, laptops, thin clients, mobile devices.",
            "Domain 3: LAN Domain - Local network switches, routers, VLANs, Wi-Fi access points.",
            "Domain 4: LAN-to-WAN Domain - Perimeter firewalls, IDS/IPS, DMZs, proxy servers.",
            "Domain 5: WAN Domain - Internet connectivity, leased lines, external service providers.",
            "Domain 6: Remote Access Domain - VPN concentrators, telecommuting, zero trust access.",
            "Domain 7: System/Application Domain - Servers, databases, web applications, cloud workloads."
          ],
          deepDive: `
#### The 7 Domains Architecture Overview:

\`\`\`
[1. User Domain] ──> [2. Workstation Domain] ──> [3. LAN Domain]
                                                        │
[7. System/App Domain] <── [6. Remote Access] <── [4. LAN-to-WAN] ──> [5. WAN Domain]
\`\`\`

Every domain presents unique attack surfaces and requires tailored compliance controls:
- **User Domain:** Weakest link due to social engineering; governed by AUP and training.
- **Workstation Domain:** Direct endpoint target for malware, ransomware; governed by EDR and disk encryption.
- **LAN Domain:** Internal threat movement; governed by VLAN segmentation and 802.1X.
- **LAN-to-WAN Domain:** Boundary defense between trusted internal and untrusted external networks.
- **WAN Domain:** Public transmission path; governed by cryptographic protocols (IPsec, TLS).
- **Remote Access Domain:** Boundary extension for teleworkers; governed by MFA and ZTNA.
- **System/Application Domain:** Repository of critical organizational data; governed by patching, RBAC, and encryption.
          `,
          examTip: "Draw the 7 Domains diagram in the examination. Label each domain clearly with one primary device and one key risk.",
          selfCheck: {
            question: "Which domain in the 7 Domains model is universally acknowledged as the weakest link due to social engineering vulnerability?",
            options: [
              "A) LAN Domain",
              "B) WAN Domain",
              "C) User Domain",
              "D) System/Application Domain"
            ],
            answer: 2,
            explanation: "The User Domain encompasses humans whose behavioral psychology makes them vulnerable to phishing, pretexting, and social engineering."
          }
        },
        {
          id: "u2-card-3",
          tag: "User Domain",
          badge: "Human Security",
          title: "Compliance within the User Domain",
          subtitle: "Mitigating human risk through policy enforcement, AUP, and security awareness",
          summary: "The User Domain encompasses employees, contractors, and administrators. Compliance requires establishing Acceptable Use Policies (AUP), continuous awareness programs, background screening, and strict access governance.",
          keyPoints: [
            "Business drivers: Preventing data exfiltration, insider threats, and social engineering breaches.",
            "Acceptable Use Policy (AUP): Formal contractual agreement delineating permitted system use.",
            "Security Awareness & Phishing Simulations: Regular training to condition vigilance against pretexting.",
            "Items found: Signed NDAs, training audit logs, credential management rules, clean desk policies."
          ],
          deepDive: `
#### Key Audit Checkpoints in User Domain:
1. **Acceptable Use Policy (AUP):**
   - Must be acknowledged and signed annually by every employee.
   - Prohibits personal use of corporate assets that could expose the firm to liability.
   - States explicitly that users have no expectation of privacy on corporate systems.
2. **Security Awareness Training:**
   - Documentation proving 100% completion by onboarding staff and annual refreshers.
   - Simulated phishing metrics tracking Click Rate and Report Rate.
3. **Password & Credential Governance:**
   - Enforcing passphrase lengths (minimum 12-14 characters), blocking breached passwords.
   - Prohibition against password sharing or credential sticky notes (Clean Desk / Clear Screen Policy).
4. **Separation of Duties & Least Privilege:**
   - Mandatory background checks for staff handling Sensitive Personal Data.
   - Immediate offboarding protocol: Revoking Active Directory / SSO access within 1 hour of termination.
          `,
          examTip: "Highlight that 'Clean Desk and Clear Screen' policy is an explicit ISO 27001 Annex A control under User Domain compliance.",
          selfCheck: {
            question: "Which policy explicitly defines what employees can and cannot do on company IT assets?",
            options: [
              "A) Disaster Recovery Plan (DRP)",
              "B) Acceptable Use Policy (AUP)",
              "C) Business Impact Analysis (BIA)",
              "D) Statement of Work (SoW)"
            ],
            answer: 1,
            explanation: "The Acceptable Use Policy (AUP) specifies user privileges, acceptable activities, and prohibited behaviors."
          }
        },
        {
          id: "u2-card-4",
          tag: "Endpoint Security",
          badge: "Maximizing CIA",
          title: "Workstation Domain Compliance & Maximizing C-I-A",
          subtitle: "Hardening endpoints, patch compliance, full disk encryption, and endpoint detection",
          summary: "The Workstation Domain consists of user laptops, desktops, and mobile devices. Compliance requires maximizing Confidentiality, Integrity, and Availability (C-I-A) via robust technical controls.",
          keyPoints: [
            "Maximizing Confidentiality: Full Disk Encryption (BitLocker/FileVault), screen lockouts, privacy screens.",
            "Maximizing Integrity: Antivirus/EDR, File Integrity Monitoring (FIM), USB port blocking, application whitelisting.",
            "Maximizing Availability: Automated OS patch management, automated endpoint backups, standardized image deployment.",
            "Compliance drivers: Data protection laws, PCI-DSS requirement 5 & 6, HIPAA device security."
          ],
          deepDive: `
#### Triad Matrix for Workstation Domain:

| CIA Triad Pillar | Primary Threat | Key Compliance Controls |
| :--- | :--- | :--- |
| **Confidentiality** | Lost/stolen laptops, shoulder surfing, unauthorized data dump. | Full Disk Encryption (AES-256), TPM chip integration, 5-minute idle screen lock, USB storage disabled via GPO. |
| **Integrity** | Malware execution, unauthorized file modification, rootkits. | Endpoint Detection & Response (EDR), AppLocker / Software Restriction Policies, Secure Boot, FIM. |
| **Availability** | OS crashes, ransomware lockouts, hardware component failure. | Centralized patch deployment (WSUS/SCCM/Intune), cloud endpoint backup (OneDrive/CrashPlan), rapid image provisioning. |

#### Patch Management SLA Standards:
- **Critical / Zero-Day Vulnerabilities:** Remediate / patch within 24–48 hours.
- **High Severity:** Within 7 to 14 days.
- **Medium / Low:** Regular monthly maintenance cycle.
          `,
          examTip: "Structure your answer using the C-I-A triad pillars. Examiners award maximum marks when controls are mapped specifically to Confidentiality, Integrity, and Availability.",
          selfCheck: {
            question: "Enforcing AES-256 Full Disk Encryption (BitLocker) on laptops primarily protects which pillar of the C-I-A triad if a laptop is stolen?",
            options: [
              "A) Availability",
              "B) Integrity",
              "C) Confidentiality",
              "D) Non-repudiation"
            ],
            answer: 2,
            explanation: "Full disk encryption ensures unauthorized persons cannot read stored data off stolen storage, preserving Confidentiality."
          }
        },
        {
          id: "u2-card-5",
          tag: "Internal Network",
          badge: "Network Segmentation",
          title: "Compliance within the LAN & LAN-to-WAN Domains",
          subtitle: "Switching security, VLAN isolation, 802.1X authentication, and perimeter firewalls",
          summary: "The LAN Domain provides internal connectivity, while the LAN-to-WAN Domain defends the perimeter boundary. Auditing focuses on network segmentation, preventing lateral movement, and inspecting boundary firewalls.",
          keyPoints: [
            "LAN Devices: Managed layer-2/layer-3 switches, Wi-Fi access points, DHCP/DNS servers, structured cabling.",
            "LAN Controls: 802.1X port-based authentication, private VLANs, port security (MAC limiting), Rogue AP detection.",
            "LAN-to-WAN Devices: Next-Generation Firewalls (NGFW), DMZ proxies, stateful packet inspection, IDS/IPS.",
            "Compliance drivers: ISO 27001 network separation, PCI-DSS requirement 1 (firewall configuration and CDE isolation)."
          ],
          deepDive: `
#### LAN & LAN-to-WAN Security Controls:

1. **Network Segmentation via VLANs:**
   - Separating sensitive zones: Management VLAN, Finance VLAN, Voice (VoIP) VLAN, Guest Wi-Fi, and Server Farm.
   - Preventing lateral spread of ransomware: Workstation-to-workstation communication blocked on switch ports.
2. **Switch Port Hardening:**
   - Port Security: Restricting switch ports to specific authorized MAC addresses; disabling unused ports and placing them in an isolated dead VLAN.
   - DHCP Snooping & Dynamic ARP Inspection (DAI) to prevent Man-in-the-Middle (MitM) ARP poisoning.
3. **LAN-to-WAN Boundary Defense:**
   - DMZ (Demilitarized Zone) deployment: Public-facing services (Web, Mail, Reverse Proxy) isolated from internal core LAN.
   - Dual-homed firewalls with strict egress filtering: Blocking internal systems from communicating over unauthorized ports.
          `,
          examTip: "Explain why DMZ is critical: It ensures that if a public-facing web server is compromised, attackers cannot directly pivot into internal databases.",
          selfCheck: {
            question: "Why should guest wireless networks be isolated on a separate VLAN from corporate internal LAN?",
            options: [
              "A) To save electrical power on routers.",
              "B) To prevent unauthenticated guest devices from accessing sensitive internal servers and propagating malware.",
              "C) To increase the physical speed of copper cables.",
              "D) To bypass firewall inspection rules."
            ],
            answer: 1,
            explanation: "Segmenting guests onto a separate VLAN restricts untrusted devices from accessing internal enterprise resources."
          }
        },
        {
          id: "u2-card-6",
          tag: "Perimeter & WAN",
          badge: "Pen Testing",
          title: "WAN Domain Compliance & Penetration Testing",
          subtitle: "Auditing edge routers, leased lines, ISP uplinks, and validating defenses via pen testing",
          summary: "The WAN Domain covers public communications and Internet service provider links. Compliance mandates strong encryption for all traversing traffic, resilient edge routing, and recurring penetration testing to validate configurations.",
          keyPoints: [
            "WAN Devices: Edge border routers, BGP gateways, MPLS circuits, SD-WAN appliances.",
            "Penetration Testing: Rigorous simulated adversarial attacks to discover exploitable vulnerabilities.",
            "Validating Configurations: Verifying firewall rules, eliminating obsolete 'ANY-ANY' rules, auditing access control lists (ACLs).",
            "DDoS Protection: Cloud scrubbing centers, rate limiting, and ISP anti-DDoS agreements."
          ],
          deepDive: `
#### Penetration Testing vs. Vulnerability Scanning:
- **Vulnerability Scanning:** Automated, high-level discovery of known CVE vulnerabilities without exploitation.
- **Penetration Testing:** Active human-driven attempt to exploit identified flaws, bypass controls, escalate privileges, and simulate breach scenarios.

#### Methodologies for Validating Configurations:
1. **Rule-Base Auditing:** Reviewing every firewall rule to remove shadowed, redundant, or overly permissive rules.
2. **External Penetration Testing:** Simulating external cyber attacks against public IP blocks and WAN endpoints.
3. **Cryptographic Verification:** Ensuring all WAN traffic utilizes modern encryption protocols (IPsec IKEv2, AES-GCM, TLS 1.3) and verifying that weak ciphers (DES, 3DES, RC4, MD5) are completely disabled.
          `,
          examTip: "Distinguish between Black-box, White-box, and Gray-box penetration testing. External WAN testing typically starts as Black-box or Gray-box.",
          selfCheck: {
            question: "What is the key difference between an automated Vulnerability Scan and a Penetration Test?",
            options: [
              "A) Vulnerability scans are always illegal.",
              "B) Penetration testing actively attempts to exploit identified vulnerabilities to prove real-world impact.",
              "C) Vulnerability scans modify database records.",
              "D) Penetration testing does not require written permission."
            ],
            answer: 1,
            explanation: "Penetration tests actively exploit vulnerabilities to simulate real-world attacks and measure the depth of potential compromise."
          }
        },
        {
          id: "u2-card-7",
          tag: "Applications & Cloud",
          badge: "AppSec Hardening",
          title: "Remote Access & Application Domain Compliance",
          subtitle: "Securing VPNs, ZTNA, application servers, vulnerability management, and patch cycles",
          summary: "Secures remote teleworkers and organizational software applications. Compliance requires Multi-Factor Authentication (MFA), OWASP Top 10 mitigation, rigorous vulnerability scanning, and disciplined patch management.",
          keyPoints: [
            "Remote Access: IPsec/SSL VPNs, Zero Trust Network Access (ZTNA), mandatory Multi-Factor Authentication (MFA).",
            "Application Domain: Web servers (Nginx/IIS/Apache), database engines (SQL, NoSQL), application runtimes.",
            "Application Server Vulnerability Management: Continuous scanning, static/dynamic analysis (SAST/DAST).",
            "Application Patch Management: Structured staging environments (DEV -> UAT -> PROD), rollback procedures."
          ],
          deepDive: `
#### Deep Dive into AppSec & Remote Access Compliance:

1. **Remote Access Safeguards:**
   - Enforce MFA (FIDO2 WebAuthn / TOTP) across all external remote access gateways.
   - Endpoint posture checking: Disallowing connections from unmanaged or out-of-date remote workstations.
   - Session timeouts: Terminating idle sessions after 15 minutes.
2. **Application Server Vulnerability Management:**
   - Mitigating OWASP Top 10 (Injection, Broken Authentication, SSRF, Security Misconfiguration).
   - Web Application Firewalls (WAF) to inspect Layer 7 HTTP/HTTPS traffic.
   - Database Hardening: Parameterized queries, disabling xp_cmdshell, least privilege DB accounts.
3. **Application Patch Management Workflow:**
   - *Identification:* Monitoring CVE notices from vendors and CERT-In advisories.
   - *Testing:* Deploying patches into isolated staging/test environments to test for regression bugs.
   - *Change Advisory Board (CAB):* Securing formal change management authorization.
   - *Deployment & Rollback:* Deploying during scheduled maintenance windows with pre-verified rollback snapshots.
          `,
          examTip: "Always mention 'Change Management / CAB Approval' when discussing enterprise patch management in audit scenarios.",
          selfCheck: {
            question: "Which of the following is a critical safeguard for securing external administrative Remote Access?",
            options: [
              "A) Permitting cleartext Telnet access for speed.",
              "B) Enforcing Multi-Factor Authentication (MFA) and encrypted tunnels.",
              "C) Sharing one root password among all administrators.",
              "D) Disabling audit log generation to optimize disk performance."
            ],
            answer: 1,
            explanation: "MFA and encrypted channels (e.g. TLS/IPsec) are mandatory baselines for securing remote access domains."
          }
        },
        {
          id: "u2-card-8",
          tag: "Audit Reporting",
          badge: "Deliverable",
          title: "Writing the IT Infrastructure Audit Report",
          subtitle: "Structuring executive summaries, severity matrices, findings, and remediation plans",
          summary: "The IT Infrastructure Audit Report is the official final deliverable. It translates technical vulnerabilities into business risk for executive leadership and details prioritized corrective actions for engineers.",
          keyPoints: [
            "Report Sections: Executive Summary, Scope & Objectives, Methodology, Findings, Action Plan (CAPA).",
            "Risk Scoring: Rating findings by Impact and Likelihood (Critical, High, Medium, Low).",
            "Documenting Findings: Applying the 5 C's structure for each identified non-conformity.",
            "Management Response: Assigning accountable owners, target remediation dates, and tracking mechanisms."
          ],
          deepDive: `
#### Standard Architecture of an IT Infrastructure Audit Report:

1. **Cover Page & Metadata:** Audit Title, Course/Organization, Audit Team Credentials, Date, Classification (Confidential).
2. **Executive Summary:**
   - Written for Board of Directors and C-suite.
   - High-level overall security posture rating.
   - Visual dashboard / heat map of identified risks.
3. **Audit Scope, Objectives & Exclusions:**
   - Explicit listing of audited domains, IP subnets, applications, and time windows.
4. **Methodology & Standards Used:**
   - Reference to ISO/IEC 27001, NIST SP 800-53, or CIS Controls.
5. **Detailed Audit Findings (Formatted using the 5 C's):**
   - *Finding Title & Risk Level* (e.g., Critical: Unpatched Remote Code Execution on External Web Gateway)
   - *Condition:* Detailed technical observation with screenshot/log proof.
   - *Criteria:* Policy / Standard violated (e.g., CIS Benchmark 2.1).
   - *Cause:* Root cause analysis (e.g., lack of automated patch tooling).
   - *Consequence:* Business risk (e.g., data breach, ransom payout).
   - *Corrective Action:* Actionable engineering steps to resolve.
6. **Corrective Action Plan (CAPA) Matrix:**
   - Finding ID | Recommendation | Owner | Priority | Remediation Due Date | Verification Status
          `,
          examTip: "To score full marks on report writing questions, sketch a sample CAPA table with columns: Finding, Severity, Recommendation, Owner, and Target Date.",
          selfCheck: {
            question: "Why does an IT Audit Report include an Executive Summary in addition to detailed technical findings?",
            options: [
              "A) Because legal regulations forbid executives from reading technical details.",
              "B) To synthesize complex technical risk into strategic business impact for executive decision-makers.",
              "C) To fill page count requirements.",
              "D) To disguise software vulnerabilities."
            ],
            answer: 1,
            explanation: "The executive summary allows senior leadership to understand business risk exposure and allocate capital for remediation."
          }
        }
      ]
    },

    {
      id: "unit-3",
      number: "UNIT-III",
      title: "Risk Management & Business Continuity Planning (BCP)",
      hours: "15 Hours",
      summary: "Comprehensive risk management methodologies, quantitative and qualitative assessment models (SLE, ARO, ALE), risk response strategies, BCP life cycle, Business Impact Analysis (BIA), and continuity site strategies.",
      topicsCount: 8,
      cards: [
        {
          id: "u3-card-1",
          tag: "Risk Theory",
          badge: "Core Formula",
          title: "Introduction to Risk Analysis & Key Concepts",
          subtitle: "Deconstructing the risk equation: Assets, Threats, Vulnerabilities, and Impacts",
          summary: "Information security risk is the probability of a threat source exploiting an existing vulnerability to cause damage or loss to an information asset. Analyzing risk is fundamental to proportional security investments.",
          keyPoints: [
            "The Core Risk Equation: Risk = Threat × Vulnerability × Asset Value (Impact).",
            "Asset: Any item of value to the organization (tangible like servers, intangible like customer data or reputation).",
            "Threat: A potential cause of an unwanted incident that may result in harm (cybercriminals, earthquakes, rogue insiders).",
            "Vulnerability: A flaw or weakness in design, implementation, or operational control that can be exploited."
          ],
          deepDive: `
#### Fundamental Definitions:
- **Threat Actor:** The entity initiating the threat (e.g., nation-state APT, script kiddie, malicious insider).
- **Threat Vector:** The path or means by which a threat actor gains access (e.g., phishing link, unpatched VPN port).
- **Vulnerability:** Weakness (e.g., SQL injection flaw in login script, weak password policy).
- **Impact (Magnitude of Harm):** Financial loss, regulatory fines, operational downtime, reputational damage.
- **Residual Risk vs. Inherent Risk:**
  - *Inherent Risk:* Risk level before any controls are applied.
  - *Residual Risk:* Risk remaining after security controls and safeguards are deployed.
  - *Relationship:* Residual Risk = Inherent Risk - Impact of Safeguards.
          `,
          examTip: "Be sure to state: 'If either Threat or Vulnerability is zero, Risk is zero.' Risk requires both a threat and an exploitable vulnerability.",
          selfCheck: {
            question: "What is 'Residual Risk' in risk management terminology?",
            options: [
              "A) The risk that existed before any security measures were ever implemented.",
              "B) The remaining risk after security controls and countermeasures have been implemented.",
              "C) The risk that an organization can completely eliminate without spending money.",
              "D) The risk caused only by natural disasters."
            ],
            answer: 1,
            explanation: "Residual risk is the risk that remains after implementing countermeasures and safeguards."
          }
        },
        {
          id: "u3-card-2",
          tag: "Methodologies",
          badge: "Identification",
          title: "Risk Identification Methodologies",
          subtitle: "Cataloging assets, modeling threats, and uncovering vulnerabilities systematically",
          summary: "Risk identification is the proactive process of locating, recognizing, and describing risks. It requires comprehensive asset inventories, threat modeling frameworks (like STRIDE), and vulnerability scans.",
          keyPoints: [
            "Asset Valuation: Categorizing critical data and infrastructure to establish business priority.",
            "Threat Modeling Frameworks: STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege).",
            "Vulnerability Discovery: Combining automated vulnerability scanners, code audits, and penetration tests.",
            "Creating the Risk Register: Initial logging of threat-vulnerability pairs and asset ownership."
          ],
          deepDive: `
#### Threat Modeling with STRIDE:
Developed by Microsoft, STRIDE categorizes threat vectors against security objectives:

| Threat Category | Violated Property | Example |
| :--- | :--- | :--- |
| **S**poofing Identity | Authenticity | An attacker impersonates a CEO using forged email headers. |
| **T**ampering with Data | Integrity | Altering banking transaction amounts in transit. |
| **R**epudiation | Non-repudiation | A rogue employee deletes audit logs and denies the action. |
| **I**nformation Disclosure | Confidentiality | Database exfiltration containing cleartext customer passwords. |
| **D**enial of Service | Availability | SYN flooding a web server to crash e-commerce operations. |
| **E**levation of Privilege | Authorization | Exploiting buffer overflow to elevate from guest to SYSTEM. |
          `,
          examTip: "Examiners love questions on STRIDE! Memorize the full acronym and match each letter to the corresponding CIA / security objective.",
          selfCheck: {
            question: "In the STRIDE threat modeling framework, which threat violates the security property of Non-Repudiation?",
            options: [
              "A) Spoofing",
              "B) Repudiation",
              "C) Tampering",
              "D) Information Disclosure"
            ],
            answer: 1,
            explanation: "Repudiation occurs when an entity denies having performed an action without the other party being able to prove otherwise."
          }
        },
        {
          id: "u3-card-3",
          tag: "Quantitative Risk",
          badge: "Mathematical Models",
          title: "Risk Assessment: Qualitative vs. Quantitative Analysis",
          subtitle: "Formulas for SLE, ARO, ALE and comparing qualitative risk rating matrices",
          summary: "Risk assessment evaluates the severity of identified risks. Qualitative methods use subjective ranking (High/Medium/Low), while Quantitative analysis calculates exact financial metrics using SLE, ARO, and ALE.",
          keyPoints: [
            "Qualitative Analysis: Fast, intuitive, based on likelihood/impact matrices (e.g. 5x5 heat map).",
            "Asset Value (AV): Total monetary replacement, legal, and operational value of the asset.",
            "Exposure Factor (EF): The percentage of asset loss caused by a realized threat event (0.0 to 1.0).",
            "Single Loss Expectancy (SLE): SLE = Asset Value (AV) × Exposure Factor (EF).",
            "Annualized Rate of Occurrence (ARO): Estimated frequency of the incident occurring per year.",
            "Annualized Loss Expectancy (ALE): ALE = SLE × ARO."
          ],
          deepDive: `
#### Mathematical Equations in Quantitative Risk:

1. **Single Loss Expectancy (SLE):**
   $$\\text{SLE} = \\text{Asset Value (AV)} \\times \\text{Exposure Factor (EF)}$$
   - *Example:* A database asset value is $1,000,000. A ransomware attack would corrupt 40% of operations ($EF = 0.40$).
   - $\\text{SLE} = \\$1,000,000 \\times 0.40 = \\$400,000$.

2. **Annualized Loss Expectancy (ALE):**
   $$\\text{ALE} = \\text{SLE} \\times \\text{Annualized Rate of Occurrence (ARO)}$$
   - If historical intelligence shows a threat occurs once every 2 years ($ARO = 0.5$):
   - $\\text{ALE} = \\$400,000 \\times 0.5 = \\$200,000 \\text{ per year}$.

3. **Cost-Benefit Analysis for Security Safeguards:**
   $$\\text{Net Benefit} = (\\text{ALE}_{\\text{before}} - \\text{ALE}_{\\text{after}}) - \\text{Annual Cost of Control (ACC)}$$
   - If a new control costs $40,000/year and reduces ALE from $200,000 to $30,000:
   - $\\text{Net Savings} = (\\$200,000 - \\$30,000) - \\$40,000 = \\$130,000 \\text{ net annual benefit}$.
   - If Net Benefit > 0, the security investment is mathematically justified!
          `,
          examTip: "Numerical problems on SLE, ARO, and ALE appear in almost every Cyber Risk exam paper! Practice calculating Net Benefit.",
          selfCheck: {
            question: "If an e-commerce server is valued at $500,000, has an Exposure Factor (EF) of 0.20, and the expected frequency is once every 4 years (ARO = 0.25), what is the ALE?",
            options: [
              "A) $100,000",
              "B) $25,000",
              "C) $50,000",
              "D) $12,500"
            ],
            answer: 1,
            explanation: "SLE = $500,000 * 0.20 = $100,000. ALE = SLE * ARO = $100,000 * 0.25 = $25,000."
          }
        },
        {
          id: "u3-card-4",
          tag: "Risk Treatment",
          badge: "The 4 Ts",
          title: "Risk Response & Mitigation Strategies (The 4 Ts)",
          subtitle: "Avoidance, Transference, Mitigation, and Acceptance frameworks",
          summary: "Once assessed, management must determine how to treat each risk. The four primary strategies are Risk Avoidance (Terminate), Risk Mitigation (Treat), Risk Transference (Transfer), and Risk Acceptance (Tolerate).",
          keyPoints: [
            "Risk Mitigation (Treat): Deploying technical, administrative, or physical controls to lower probability or impact.",
            "Risk Avoidance (Terminate): Discontinuing the high-risk activity, shutting down vulnerable legacy services.",
            "Risk Transference (Transfer): Shifting financial liability to a third party (Cyber Insurance, cloud outsourcing).",
            "Risk Acceptance (Tolerate): Formally accepting residual risk within approved risk appetite without additional controls."
          ],
          deepDive: `
#### Detailed Breakdown of Risk Response Strategies:

1. **Risk Mitigation / Reduction (Treat):**
   - The most common response. Implementing safeguards such as firewalls, MFA, encryption, intrusion detection, and employee training.
2. **Risk Avoidance (Terminate):**
   - Choosing not to engage in an action that carries risk.
   - *Example:* A hospital decides not to launch an unvetted mobile telehealth app that cannot guarantee HIPAA compliance.
3. **Risk Transference (Transfer):**
   - Sharing or moving risk burden.
   - *Example 1:* Purchasing a Cyber Insurance policy to cover ransomware recovery costs.
   - *Example 2:* Shifting physical data center hardware risks to AWS/Azure with high-availability SLAs.
4. **Risk Acceptance (Tolerate):**
   - Exercised when the cost of countermeasure exceeds the potential loss ($ACC > ALE$), or risk falls below the Acceptable Level of Risk (ALR).
   - Requires formal sign-off from designated executive risk owners.
          `,
          examTip: "Remember the mnemonic 'The 4 Ts': Treat (Mitigate), Terminate (Avoid), Transfer (Share/Insure), Tolerate (Accept).",
          selfCheck: {
            question: "Purchasing a comprehensive Cyber Insurance policy to cover financial liabilities of potential data breaches is an example of which risk response?",
            options: [
              "A) Risk Avoidance",
              "B) Risk Transference",
              "C) Risk Acceptance",
              "D) Risk Ignorance"
            ],
            answer: 1,
            explanation: "Purchasing insurance transfers the financial burden of an incident to a third-party insurer."
          }
        },
        {
          id: "u3-card-5",
          tag: "Risk Governance",
          badge: "Monitoring Tool",
          title: "Risk Reporting & The Enterprise Risk Register",
          subtitle: "Communicating risk posture to the Board of Directors and managing risk registers",
          summary: "Risk reporting maintains continuous visibility over organizational exposure. The Risk Register acts as the central repository tracking identified risks, control owners, mitigation deadlines, and Key Risk Indicators (KRIs).",
          keyPoints: [
            "Risk Register: Comprehensive ledger containing risk descriptions, ratings, owners, and remediation status.",
            "Key Risk Indicators (KRIs): Metric-driven early-warning indicators signaling changes in risk exposure.",
            "Heat Maps: Visual 2D grid plotting likelihood against consequence for executive briefing.",
            "Board-level Reporting: Translating technical vulnerabilities into financial solvency and operational continuity impacts."
          ],
          deepDive: `
#### Essential Columns in an Enterprise Risk Register:
1. **Risk ID:** Unique identifier (e.g., R-SEC-2024-04).
2. **Risk Description:** Detailed threat-vulnerability-asset scenario.
3. **Asset & Owner:** Critical server or database and responsible department head.
4. **Inherent Risk Score:** Impact (1-5) × Likelihood (1-5).
5. **Existing Controls:** Current firewalls, endpoint agents, or backup policies.
6. **Residual Risk Score:** Risk score after accounting for current controls.
7. **Action Plan (Treatment):** Mitigation plan, milestone deliverables.
8. **Target Resolution Date:** Specific calendar deadline.
9. **Status:** Open, In Progress, Transferred, or Accepted.

#### Key Risk Indicators (KRIs):
- Number of unpatched critical CVEs older than 14 days.
- Percentage of employees failing monthly phishing simulations.
- Unauthorized administrative privilege escalation attempts detected per week.
          `,
          examTip: "Define 'Key Risk Indicator (KRI)': A metric used to gauge how risky an activity is and provide an early warning of increasing risk exposure.",
          selfCheck: {
            question: "What is the primary operational purpose of an Enterprise Risk Register?",
            options: [
              "A) To store passwords securely.",
              "B) To act as a central master log documenting all identified risks, severity scores, assigned owners, and remediation actions.",
              "C) To calculate corporate tax liabilities.",
              "D) To automate firewall port shutdowns."
            ],
            answer: 1,
            explanation: "A Risk Register provides an auditable master record tracking all identified risks, impacts, owners, and corrective milestones."
          }
        },
        {
          id: "u3-card-6",
          tag: "Resilience",
          badge: "Continuity Theory",
          title: "Introduction to Business Continuity Planning (BCP)",
          subtitle: "Organizational resilience, sustaining critical operations, and the regulatory mandate",
          summary: "Business Continuity Planning (BCP) is the strategic and operational framework that ensures an organization can continue delivering critical services during and after an unprecedented disruption or catastrophe.",
          keyPoints: [
            "Definition: Proactive planning to maintain mission-critical functions during a crisis.",
            "BCP vs. Disaster Recovery (DR): BCP focuses on broader business survival (people, operations, revenue); DR focuses specifically on restoring IT infrastructure.",
            "Need for BCP: Regulatory compliance, customer retention, supply chain survivability, avoiding insolvency.",
            "Scope: Natural disasters, cyber attacks, pandemics, supply chain failures, utility blackouts."
          ],
          deepDive: `
#### Why Organizations Need BCP:
- **Financial Survival:** Statistics show that over 40% of businesses that suffer a severe disaster without a tested BCP never reopen, and another 25% fail within one year.
- **Regulatory & Legal Mandates:**
  - Financial regulators (RBI, SEC, FCA) mandate stringent BCP/DR guidelines with severe penalties for downtime.
  - Healthcare standards (HIPAA Contingency Plan rule).
- **Brand & Reputation:** Retaining client trust when competitor services remain offline.

#### Fundamental Relationship: BCP vs. DR
- **BCP (The Umbrella):** How do we keep the bank serving customers? (Branch re-routing, manual workarounds, customer communication, call center mobilization).
- **DR (The IT Engine):** How do we bring the database cluster back online from backup snapshots? (Server provisioning, database roll-forward, SAN failover).
          `,
          examTip: "State clearly: 'Disaster Recovery is a technical subset of Business Continuity Planning.' BCP encompasses people, facilities, and processes.",
          selfCheck: {
            question: "Which statement accurately describes the relationship between BCP and Disaster Recovery (DR)?",
            options: [
              "A) DR and BCP are completely identical in scope.",
              "B) DR is a technical subset of BCP focused on restoring IT infrastructure and data, while BCP covers overall business operations.",
              "C) BCP only applies to natural disasters, while DR only applies to hackers.",
              "D) BCP replaces the need for IT backups."
            ],
            answer: 1,
            explanation: "BCP is the overarching business resilience framework, while DR is the technical IT sub-discipline focused on system restoration."
          }
        },
        {
          id: "u3-card-7",
          tag: "Continuity Lifecycle",
          badge: "5 Phases",
          title: "Overview of the BCP Life Cycle",
          subtitle: "Governance, Business Impact Analysis (BIA), strategy, implementation, and testing",
          summary: "A robust BCP adheres to a cyclical, five-phase life cycle: Project Initiation & Governance, Business Impact Analysis (BIA), Continuity Strategy Formulation, Plan Development, and Testing/Maintenance.",
          keyPoints: [
            "Phase 1: Project Initiation - Securing executive sponsorship, policy formulation, steering committee.",
            "Phase 2: Business Impact Analysis (BIA) - Identifying critical functions, MTD, RTO, and RPO.",
            "Phase 3: Strategy Formulation - Selecting cost-effective continuity architectures.",
            "Phase 4: Plan Development - Drafting emergency response, communication, and operational procedures.",
            "Phase 5: Testing & Maintenance - Conducting tabletop exercises, drills, and annual updates."
          ],
          deepDive: `
#### Detailed Phases of the BCP Life Cycle:

\`\`\`
[1. Initiation & Governance] ──> [2. Business Impact Analysis] ──> [3. Strategy Formulation]
                                                                          │
[5. Testing & Maintenance] <────── [4. Plan Development & Training] <──────┘
\`\`\`

1. **Phase 1: Project Scope and Initiation:**
   - Appointing a BCP Coordinator, establishing a cross-functional BCP steering committee.
2. **Phase 2: Business Impact Analysis (BIA):**
   - The foundational analytical step.
   - Measures the quantitative (lost revenue) and qualitative (reputational) impacts of disruption over time.
   - Identifies Maximum Tolerable Downtime (MTD) for each business process.
3. **Phase 3: Continuity Strategy Design:**
   - Determining how to keep operations alive if primary facilities or systems are unavailable.
4. **Phase 4: Plan Development & Documentation:**
   - Standard Operating Procedures (SOPs), emergency phone trees, alternate facility agreements.
5. **Phase 5: Testing, Training, and Maintenance:**
   - An untested plan is only an assumption.
   - Types of BCP Tests: Checklist review, Tabletop walkthrough, Simulation drill, Parallel test, Full interruption cutover.
          `,
          examTip: "List the 5 types of BCP testing methods in order of operational impact: Checklist -> Tabletop -> Simulation -> Parallel -> Full Interruption.",
          selfCheck: {
            question: "Which phase of the BCP Life Cycle is responsible for identifying mission-critical business processes and calculating their Maximum Tolerable Downtime (MTD)?",
            options: [
              "A) Plan Development",
              "B) Business Impact Analysis (BIA)",
              "C) Checklist Review",
              "D) Tabletop Exercise"
            ],
            answer: 1,
            explanation: "Business Impact Analysis (BIA) calculates the business consequences of disruption, establishing MTD, RTO, and RPO."
          }
        },
        {
          id: "u3-card-8",
          tag: "Continuity Metrics",
          badge: "BIA & Recovery Sites",
          title: "BIA Metrics & Alternate Continuity Strategies",
          subtitle: "Analyzing MTD, RTO, RPO, and selecting Hot, Warm, Cold, and Cloud DR sites",
          summary: "Business Impact Analysis calculates crucial operational metrics: MTD, RTO, and RPO. Organizations select alternate sites (Hot, Warm, Cold, Cloud) balancing recovery speed against infrastructure expenditure.",
          keyPoints: [
            "Maximum Tolerable Downtime (MTD): The maximum time a business process can be down before fatal collapse.",
            "Recovery Time Objective (RTO): The target time within which systems must be restored after disruption (RTO <= MTD).",
            "Recovery Point Objective (RPO): The maximum acceptable age of data loss measured in time (e.g., 15 minutes of transactions).",
            "Site Types: Hot Site (minutes, real-time sync, $$$$), Warm Site (hours/days, hardware present, $$), Cold Site (weeks, empty shell, $), Cloud DR / DRaaS."
          ],
          deepDive: `
#### Core Metrics Diagram & Definitions:

\`\`\`
[Data Backup Point] <── RPO ──> [Disaster Event] <── RTO ──> [Restored Operations] <── WRT ──> [Normal Business Operations]
|<──────────────────────────────────────── MTD ──────────────────────────────────────────────>|
\`\`\`

- **RPO (Recovery Point Objective):** Amount of data loss tolerance. If backup occurs at 12:00 AM and disaster strikes at 4:00 AM, up to 4 hours of data could be lost.
- **RTO (Recovery Time Objective):** Maximum elapsed time to restore hardware/software to operational status.
- **WRT (Work Recovery Time):** Time required to test data integrity, enter backlog transactions, and certify normal operations.
- **Golden Rule:** $\\text{RTO} + \\text{WRT} \\le \\text{MTD}$.

#### Alternate Site Comparison:

| Feature | Hot Site | Warm Site | Cold Site | Cloud DR (DRaaS) |
| :--- | :--- | :--- | :--- | :--- |
| **Recovery Time** | Seconds to Hours | 24 to 72 Hours | Several Weeks | Minutes |
| **Hardware** | Fully configured, mirrored | Present, requires config | None (empty shell) | On-demand virtualized |
| **Data Sync** | Real-time replication | Restored from backups | None (tape delivery) | Cloud snapshot replication |
| **Cost** | Extremely High | Moderate | Low | Pay-per-use / Elastic |
          `,
          examTip: "Remember the inequality: RTO + WRT must always be less than or equal to MTD, otherwise the organization faces existential collapse.",
          selfCheck: {
            question: "If a bank requires that financial transactions can afford at most 10 minutes of data loss during a failure, which metric does this represent?",
            options: [
              "A) Recovery Time Objective (RTO)",
              "B) Maximum Tolerable Downtime (MTD)",
              "C) Recovery Point Objective (RPO)",
              "D) Mean Time Between Failures (MTBF)"
            ],
            answer: 2,
            explanation: "Recovery Point Objective (RPO) dictates the acceptable data loss threshold measured in elapsed time."
          }
        }
      ]
    },

    {
      id: "unit-4",
      number: "UNIT-IV",
      title: "Disaster Recovery, Cyber Law, Legal Frameworks & Compliance Standards",
      hours: "15 Hours",
      summary: "Disaster Recovery strategies, categorization of cybercrimes, Cyber Law & India's IT Act 2000 (with 2008 amendments), Indian Evidence Act 65B/BSA, CSAM/POCSO, social media regulations, and global compliance frameworks (ISO 27001/2, COBIT, SOC 1/2/3, HIPAA).",
      topicsCount: 8,
      cards: [
        {
          id: "u4-card-1",
          tag: "Disaster Recovery",
          badge: "Resumption Plans",
          title: "Disaster Recovery (DR) Planning & Business Resumption",
          subtitle: "Emergency declaration, disaster categorization, backup topologies, and resumption",
          summary: "Disaster Recovery (DR) is the tactical execution plan to restore IT infrastructure and data following natural or man-made disasters. It establishes clear disaster declaration criteria, backup schemes, and orderly business resumption.",
          keyPoints: [
            "Disaster Categories: Natural (floods, earthquakes), Human/Adversarial (ransomware, sabotage), Technical (grid failure, SAN corruption).",
            "Disaster Declaration Criteria: Objective thresholds that trigger evacuation, alternate site cutover, and public notification.",
            "Backup Strategies: Full, Incremental, Differential, and modern 3-2-1 backup topologies (3 copies, 2 media, 1 offsite/immutable).",
            "Business Resumption: Phased failback process returning operations from alternate recovery sites to primary facilities."
          ],
          deepDive: `
#### Backup Topology Comparison:

| Backup Type | Backup Speed | Storage Required | Restoration Speed | Restoration Process |
| :--- | :--- | :--- | :--- | :--- |
| **Full Backup** | Slowest | Maximum | Fastest | Requires only the latest single full backup archive. |
| **Differential Backup** | Moderate | Moderate | Fast | Requires the last Full backup + the latest single Differential backup. |
| **Incremental Backup** | Fastest | Minimum | Slowest | Requires the last Full backup + *EVERY* sequential Incremental backup up to failure point. |

#### Modern 3-2-1-1-0 Backup Rule:
- **3** Copies of data.
- **2** Different media types (e.g., Disk and Tape/Cloud).
- **1** Copy stored offsite.
- **1** Copy immutable / air-gapped (to prevent ransomware encryption).
- **0** Errors verified via regular automated recovery testing.
          `,
          examTip: "Be ready to explain the difference in restoration between Differential and Incremental backups. Differential needs 2 sets; Incremental needs all chained sets.",
          selfCheck: {
            question: "Which backup strategy backs up all files modified since the last FULL backup, without clearing the archive bit?",
            options: [
              "A) Incremental Backup",
              "B) Differential Backup",
              "C) Snapshot Mirroring",
              "D) Synthetic Full"
            ],
            answer: 1,
            explanation: "Differential backups capture all changes made since the last full backup, cumulative until the next full backup."
          }
        },
        {
          id: "u4-card-2",
          tag: "Criminology",
          badge: "Cybercrime Taxonomy",
          title: "Categorization of Cyber-crimes",
          subtitle: "Crimes against individuals, property, and government / critical infrastructure",
          summary: "Cybercrimes are classified based on the target of the malicious act. Criminological frameworks categorize them into crimes against Persons (Individuals), crimes against Property, and crimes against Organizations/Government.",
          keyPoints: [
            "Against Individuals: Cyber stalking, cyber bullying, harassment, unauthorized voyeurism (Sec 66E), defamation.",
            "Against Property: Ransomware extortion, unauthorized computer access, intellectual property theft, credit card skimming.",
            "Against Organizations & Government: Cyber terrorism (Sec 66F), attacks on Critical Information Infrastructure (CII), espionage, DDoS attacks.",
            "Evolution: Cybercrime-as-a-Service (CaaS), AI-generated deepfakes, darknet marketplace syndicates."
          ],
          deepDive: `
#### Detailed Criminological Categorization:

1. **Crimes Against Individuals (Persons):**
   - *Cyber Stalking & Harassment:* Repeated unwanted online tracking, intimidation.
   - *Violation of Privacy (Sec 66E IT Act):* Capturing, publishing, or transmitting images of private areas without consent.
   - *Impersonation & Defamation (Sec 66D IT Act):* Cheating by personation over electronic channels.
2. **Crimes Against Property:**
   - *Ransomware & Extortion:* Encrypting corporate assets and demanding cryptocurrency payments.
   - *Data Theft & Computer Damage (Sec 43 IT Act):* Unauthorized extraction or destruction of digital assets.
   - *Cyber Fraud & Wire Fraud:* Altering electronic banking commands, SIM swap scams.
3. **Crimes Against Organizations & State Sovereignty:**
   - *Cyber Terrorism (Sec 66F IT Act):* Actions intending to threaten the unity, integrity, security, or sovereignty of India or strike terror in people.
   - *Critical Information Infrastructure (CII) Attacks (Sec 70 IT Act):* Attacking protected systems such as power grids, nuclear command, or telecom backbones.
          `,
          examTip: "Cite Section 70 of the IT Act regarding 'Protected Systems' and Critical Information Infrastructure (CII) under NCIIPC.",
          selfCheck: {
            question: "Under the Indian legal framework, which body is designated as the National Nodal Agency for Critical Information Infrastructure Protection?",
            options: [
              "A) NCIIPC",
              "B) TRAI",
              "C) SEBI",
              "D) CBI Academy"
            ],
            answer: 0,
            explanation: "NCIIPC (National Critical Information Infrastructure Protection Centre) is created under Section 70A of the IT Act 2000."
          }
        },
        {
          id: "u4-card-3",
          tag: "Indian Cyber Law",
          badge: "IT Act 2000 & 2008",
          title: "The Information Technology Act, 2000 & Key Amendments",
          subtitle: "Comprehensive review of penal sections, electronic contracts, and cyber jurisprudence",
          summary: "The IT Act, 2000 is India's mother legislation for electronic commerce and cyber offences, substantially overhauled by the IT (Amendment) Act 2008. It criminalizes hacking, data theft, identity theft, cyber terrorism, and establishes civil compensations.",
          keyPoints: [
            "Section 43 & 43A: Civil penalties for damage to computer systems; corporate liability for failure to protect sensitive data.",
            "Section 65: Tampering with computer source documents (punishment up to 3 years imprisonment).",
            "Section 66 & 66B-F: Computer related offences, hacking, stolen computer resources, identity theft, cheating by personation, privacy, and cyber terrorism.",
            "Section 67, 67A, 67B: Obscenity, sexually explicit material, and child sexual abuse material.",
            "Section 69 & 69A: Government powers for interception, monitoring, decryption, and blocking public access."
          ],
          deepDive: `
#### Statutory Directory of Key IT Act Sections:

| Section | Offence / Subject Matter | Punishment / Penalty | Cognizable / Bailable |
| :--- | :--- | :--- | :--- |
| **Sec 43** | Penalty for unauthorized damage to computer, downloading data, virus introduction. | Civil compensation up to ₹1 Crore (Adjudicating Officer). | Non-criminal (Civil) |
| **Sec 43A** | Corporate failure to protect Sensitive Personal Data or Information (SPDI). | Compensation to affected persons (unlimited). | Civil Liability |
| **Sec 65** | Tampering with computer source documents with malicious intent. | Imprisonment up to 3 years, and/or fine up to ₹2 Lakhs. | Cognizable, Bailable |
| **Sec 66** | Computer related offences (dishonestly/fraudulently doing acts in Sec 43 - Hacking). | Imprisonment up to 3 years, and/or fine up to ₹5 Lakhs. | Cognizable, Bailable |
| **Sec 66C** | Identity theft (fraudulent use of electronic signature, password, biometric). | Imprisonment up to 3 years, and fine up to ₹1 Lakh. | Cognizable, Bailable |
| **Sec 66D** | Cheating by personation by using computer resource. | Imprisonment up to 3 years, and fine up to ₹1 Lakh. | Cognizable, Bailable |
| **Sec 66E** | Violation of privacy (transmitting images of private body parts without consent). | Imprisonment up to 3 years, and/or fine up to ₹2 Lakhs. | Cognizable, Bailable |
| **Sec 66F** | **Cyber Terrorism** (Attacks threatening sovereignty, unity of India, or CII). | **Imprisonment for LIFE.** | **Cognizable, Non-Bailable** |
| **Sec 67** | Publishing/transmitting obscene material in electronic form. | 1st conviction: 3 yrs & ₹5 Lakh; 2nd: 5 yrs & ₹10 Lakh. | Cognizable, Bailable (1st) |
| **Sec 67A** | Publishing/transmitting sexually explicit act in electronic form. | 1st conviction: 5 yrs & ₹10 Lakh; 2nd: 7 yrs & ₹10 Lakh. | Cognizable, Non-Bailable |
| **Sec 67B** | **Child Sexual Abuse Material (CSAM)** - creating, publishing, browsing, storing. | 1st: 5 yrs & ₹10 Lakh; 2nd: 7 yrs & ₹10 Lakh. | **Cognizable, Non-Bailable** |
| **Sec 69** | Power to issue directions for interception or monitoring or decryption. | Non-compliance: Imprisonment up to 7 years & fine. | Cognizable |
| **Sec 69A** | Power to issue directions for blocking for public access of information. | Non-compliance: Imprisonment up to 7 years & fine. | Cognizable |
| **Sec 72A** | Disclosure of information in breach of lawful contract. | Imprisonment up to 3 years, and/or fine up to ₹5 Lakhs. | Cognizable, Bailable |

#### Landmark Judicial Precedents:
- **Shreya Singhal vs Union of India (2015):** The Supreme Court struck down **Section 66A** (punishment for sending offensive messages through communication services) as unconstitutional for violating the fundamental right to freedom of speech (Article 19(1)(a)).
          `,
          examTip: "Crucial point: Section 66A was struck down in Shreya Singhal (2015). Never list Sec 66A as an active law without stating it was struck down!",
          selfCheck: {
            question: "What is the maximum punishment prescribed under Section 66F of the IT Act, 2000 for Cyber Terrorism?",
            options: [
              "A) 3 years imprisonment",
              "B) 7 years imprisonment",
              "C) Imprisonment for Life",
              "D) Fine of ₹10 Lakhs only"
            ],
            answer: 2,
            explanation: "Section 66F prescribes imprisonment for life for committing or conspiring to commit cyber terrorism."
          }
        },
        {
          id: "u4-card-4",
          tag: "Evidence Law",
          badge: "Forensic Admissibility",
          title: "Admissibility of Electronic Evidence (Section 65B)",
          subtitle: "Certificate requirements, Supreme Court jurisprudence, and Bharatiya Sakshya Adhiniyam",
          summary: "Electronic records are easily manipulated, making admissibility strictly conditional. Section 65B of the Indian Evidence Act, 1872 (now Section 63 of Bharatiya Sakshya Adhiniyam, 2023) establishes the mandatory evidentiary certificate for digital evidence.",
          keyPoints: [
            "Electronic Record definition: Data, record, generated image, sound stored or transmitted electronically.",
            "Section 65B Certificate: Mandatory document certifying device lawful custody, operational normalcy, and integrity.",
            "Supreme Court ruling in Anvar P.V. vs P.K. Basheer (2014): Section 65B is a mandatory condition precedent for secondary electronic evidence.",
            "Re-affirmed in Arjun Khotkar vs Kailash Gorantyal (2020): Clarified timing and production requirements of the 65B certificate."
          ],
          deepDive: `
#### Four Mandatory Conditions under Section 65B(2):
1. The electronic record must have been produced by the computer during a period over which the computer was used regularly to store or process information.
2. During the said period, information of the kind contained in the electronic record was regularly fed into the computer in the ordinary course of activities.
3. Throughout the material part of the period, the computer was operating properly (or if not, did not affect the accuracy of the record).
4. The information contained in the electronic record reproduces or is derived from information fed into the computer in the ordinary course.

#### The Section 65B(4) Certificate Requirements:
- Must identify the electronic record containing the statement.
- Must describe the manner in which it was produced.
- Must give particulars of the device involved.
- Must be signed by a person occupying a responsible official position in relation to the operation of the relevant device.

#### Modern Transition:
- Under the **Bharatiya Sakshya Adhiniyam (BSA), 2023**, electronic evidence provisions are codified under **Section 61 and Section 63**, introducing explicit schedules for electronic certificates.
          `,
          examTip: "Cite the landmark judgment 'Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020)' which settled the mandatory nature of Section 65B certificate.",
          selfCheck: {
            question: "In the landmark judgment of Anvar P.V. vs P.K. Basheer (2014), what did the Supreme Court hold regarding Section 65B?",
            options: [
              "A) Section 65B certificates are entirely optional.",
              "B) Secondary electronic evidence is inadmissible without a mandatory Section 65B certificate.",
              "C) Electronic evidence cannot be used in Indian courts.",
              "D) Only the original hard drive can be brought to court without exceptions."
            ],
            answer: 1,
            explanation: "The Supreme Court held that Section 65B is a mandatory statutory condition precedent for admitting secondary electronic evidence."
          }
        },
        {
          id: "u4-card-5",
          tag: "International & Ethics",
          badge: "Global Norms",
          title: "International Cyber Laws & Cyber Ethics",
          subtitle: "The Budapest Convention, trans-border jurisdiction, and codes of ethical conduct",
          summary: "Cyber threats transcend physical borders, requiring international legal harmonization. The Budapest Convention on Cybercrime is the leading international treaty. Cyber ethics governs professional responsibility and moral computing.",
          keyPoints: [
            "Budapest Convention (Convention on Cybercrime, 2001): Council of Europe treaty standardizing criminal law and international cooperation.",
            "Cross-border jurisdiction challenges: Extradition, Mutual Legal Assistance Treaties (MLAT), cloud sovereign data.",
            "Cyber Ethics: The Ten Commandments of Computer Ethics (Computer Ethics Institute).",
            "Professional Codes: ACM & (ISC)² Code of Professional Conduct for cyber practitioners."
          ],
          deepDive: `
#### The Budapest Convention on Cybercrime (ETS No. 185):
- First international treaty seeking to address Internet and computer crime by harmonizing national laws, improving investigative techniques, and increasing cooperation among nations.
- **Three Pillars:**
  1. Substantive criminal law (criminalizing unauthorized access, data interception, system interference).
  2. Procedural law (expedited preservation of stored data, production orders, real-time collection of traffic data).
  3. International cooperation (24/7 network for international judicial assistance, expedited extradition).
- *India's Status:* India is currently not a signatory to the Budapest Convention (relying instead on bilateral MLAT agreements and proposed UN cybercrime frameworks), citing concerns over data sovereignty and access protocols.

#### The Ten Commandments of Computer Ethics:
1. Thou shalt not use a computer to harm other people.
2. Thou shalt not interfere with other people's computer work.
3. Thou shalt not snoop around in other people's computer files.
4. Thou shalt not use a computer to steal.
5. Thou shalt not use a computer to bear false witness.
          `,
          examTip: "State why trans-border cybercrime is difficult to prosecute: Sovereignty clashes, differences in dual criminality, and the slow pace of MLAT requests.",
          selfCheck: {
            question: "What is the primary international treaty dedicated to harmonizing cybercrime laws and investigative cooperation across member states?",
            options: [
              "A) Geneva Convention",
              "B) Budapest Convention on Cybercrime",
              "C) Kyoto Protocol",
              "D) Paris Agreement"
            ],
            answer: 1,
            explanation: "The Budapest Convention on Cybercrime (2001) is the landmark international treaty for cybercrime harmonization."
          }
        },
        {
          id: "u4-card-6",
          tag: "Special Statutes",
          badge: "Privacy & Protection",
          title: "CSAM, Social Media Rules & Privacy Legislation",
          subtitle: "Child protection (POCSO & 67B), IT Intermediary Rules 2021, and DPDP 2023 / GDPR",
          summary: "Strict specialized laws regulate online harms. Child Sexual Abuse Material (CSAM) carries severe non-bailable penalties. Social media platforms face strict intermediary due diligence, while modern privacy laws mandate data rights.",
          keyPoints: [
            "CSAM & Section 67B IT Act / POCSO Act 2012: Zero tolerance, criminalizing creation, downloading, browsing, and sharing.",
            "IT Intermediary Guidelines & Digital Media Ethics Code Rules, 2021: Resident Grievance Officer, 24-hr takedown of non-consensual imagery.",
            "DPDP Act 2023 (India): Data Fiduciary, Data Principal, Consent Managers, penalties up to ₹250 Crores.",
            "GDPR (EU): 7 core principles, 72-hour breach notification, Right to be Forgotten, extraterritorial scope."
          ],
          deepDive: `
#### Child Sexual Abuse Material (CSAM) Legal Architecture:
- **Section 67B of IT Act:** Imposes strict liability for publishing, transmitting, or facilitating CSAM in electronic form. First conviction: up to 5 years imprisonment and ₹10 Lakh fine; subsequent conviction: up to 7 years.
- **POCSO Act, 2012 (Section 15):** Storage of child pornographic material without reporting or deleting it is an offence. Mandatory reporting to National Cyber Crime Reporting Portal (cybercrime.gov.in).

#### IT Intermediary Guidelines (2021):
- Significant Social Media Intermediaries (SSMIs > 50 lakh users) must appoint:
  - Chief Compliance Officer (resident in India).
  - Nodal Contact Person for 24x7 coordination with law enforcement.
  - Resident Grievance Officer.
- Strict 24-hour takedown requirement for non-consensual intimate imagery.

#### Privacy Regimes: DPDP 2023 vs. GDPR:
- **DPDP Act 2023 (India):** Focuses on digital personal data, mandates affirmative verifiable consent, establishes Data Protection Board of India (DPBI).
- **GDPR (EU):** Comprehensive protection covering lawful basis, Data Protection Officers (DPO), Data Protection Impact Assessments (DPIA), and heavy global turnover fines.
          `,
          examTip: "Note the 3 mandatory statutory appointments for Significant Social Media Intermediaries under the 2021 Rules: Chief Compliance Officer, Nodal Officer, Resident Grievance Officer.",
          selfCheck: {
            question: "Under the IT Intermediary Guidelines 2021, within what timeframe must an intermediary remove non-consensual intimate imagery after complaint?",
            options: [
              "A) 24 hours",
              "B) 72 hours",
              "C) 7 days",
              "D) 30 days"
            ],
            answer: 0,
            explanation: "The rules mandate removal or disabling of access to non-consensual intimate imagery within 24 hours of receipt of complaint."
          }
        },
        {
          id: "u4-card-7",
          tag: "Standards",
          badge: "Global Frameworks",
          title: "Auditing Standards & Frameworks: ISO 27001, COBIT, SOC & HIPAA",
          subtitle: "Deconstructing ISO/IEC 27001/2, COBIT governance, AICPA SOC reports, and HIPAA rules",
          summary: "Enterprise compliance relies on internationally recognized frameworks. Auditors evaluate Information Security Management Systems (ISO 27001), IT governance (COBIT), service organization trust criteria (SOC 2), and healthcare privacy (HIPAA).",
          keyPoints: [
            "ISO/IEC 27001 & 27002: Plan-Do-Check-Act (PDCA) management system and 93 Annex A controls in 4 themes.",
            "COBIT (ISACA): Separates Governance from Management across 5 domains (EDM, APO, BAI, DSS, MEA).",
            "SOC 1, SOC 2, and SOC 3 (AICPA): Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy).",
            "SOC Type I (design at a point in time) vs. Type II (operational effectiveness over minimum 6 months).",
            "HIPAA: Privacy Rule, Security Rule (Administrative, Physical, Technical Safeguards), and Breach Notification Rule."
          ],
          deepDive: `
#### Detailed Framework Breakdown:

1. **ISO/IEC 27001:2022:**
   - Specification for an Information Security Management System (ISMS).
   - Clauses 4 to 10 outline organizational requirements (Context, Leadership, Risk assessment, Improvement).
   - **Annex A Controls (93 controls grouped into 4 themes):**
     - Organizational (37 controls)
     - People (8 controls)
     - Physical (14 controls)
     - Technological (34 controls)
   - *ISO 27002:* The practical implementation guide for Annex A controls.

2. **COBIT (Control Objectives for Information and Related Technologies):**
   - Developed by ISACA. Bridges the gap between business risk and technical controls.
   - Distinctly separates **Governance** (Evaluate, Direct, Monitor - EDM) from **Management** (Align, Plan, Organize - APO; Build, Acquire, Implement - BAI; Deliver, Service, Support - DSS; Monitor, Evaluate, Assess - MEA).

3. **AICPA SOC Reporting Framework:**
   - **SOC 1 (SSAE 18):** Focuses strictly on Internal Controls over Financial Reporting (ICFR).
   - **SOC 2:** Focuses on technology controls based on the **5 Trust Services Criteria (TSC)**:
     - 1. *Security* (Firewalls, 2FA - Common Criteria mandatory for all)
     - 2. *Availability* (Disaster recovery, uptime SLAs)
     - 3. *Processing Integrity* (Accurate data delivery)
     - 4. *Confidentiality* (NDAs, data encryption)
     - 5. *Privacy* (Personal information handling)
   - **Type I vs Type II:** Type I tests control *design* on a single calendar day; Type II tests operating *effectiveness* over a historical 6-to-12 month window.
   - **SOC 3:** General-use, publicly distributable executive summary without confidential technical test details.

4. **HIPAA (Health Insurance Portability and Accountability Act):**
   - Protects Protected Health Information (PHI).
   - **Privacy Rule:** Defines rights of patients and disclosure boundaries.
   - **Security Rule:** Enforces mandatory safeguards across:
     - *Administrative:* Risk assessments, training, contingency planning.
     - *Physical:* Server room locks, badge access, device media disposition.
     - *Technical:* Access controls, audit controls, transmission encryption.
          `,
          examTip: "SOC 2 Type I vs Type II is a classic exam question! Type I = Point-in-time design. Type II = Historical operating effectiveness (at least 6 months).",
          selfCheck: {
            question: "What is the core distinction between a SOC 2 Type I report and a SOC 2 Type II report?",
            options: [
              "A) Type I is for banks; Type II is for hospitals.",
              "B) Type I tests control design at a single point in time; Type II tests operating effectiveness over a period of time (typically 6 months).",
              "C) Type I reports are public; Type II reports are illegal.",
              "D) Type I covers all 5 Trust Criteria; Type II only covers Availability."
            ],
            answer: 1,
            explanation: "SOC 2 Type I evaluates control design at a specific snapshot date; Type II evaluates operational performance over a multi-month period."
          }
        },
        {
          id: "u4-card-8",
          tag: "Case Studies",
          badge: "Real-World Breaches",
          title: "Landmark Cyber Law & Compliance Case Studies",
          subtitle: "Target, Equifax, Cosmos Bank cyber heist, and Puttaswamy right to privacy",
          summary: "Examining real-world cyber disasters illustrates how failures in third-party vendor access, unpatched vulnerabilities, or SWIFT network isolation lead to multi-million dollar penalties and transformative legal precedents.",
          keyPoints: [
            "Target Data Breach (2013): Compromise of third-party HVAC vendor credentials; lack of internal network segmentation.",
            "Equifax Breach (2017): Unpatched Apache Struts CVE vulnerability; failure in internal patch management audit.",
            "Cosmos Bank Cyber Heist (Pune, 2018): Malware infection on ATM switch proxy and SWIFT infrastructure netting ₹94 Crores.",
            "Justice K.S. Puttaswamy vs Union of India (2017): 9-judge bench declared Right to Privacy as a fundamental right under Article 21."
          ],
          deepDive: `
#### Analytical Breakdown of Case Studies:

1. **Target Data Breach (Third-Party Risk & Segmentation Failure):**
   - *Attack Vector:* Phishing email compromised an external HVAC refrigeration contractor who had direct billing access.
   - *Control Failure:* No segmentation between third-party billing network and Point-of-Sale (POS) Cardholder Data Environment (CDE).
   - *Impact:* 40 million credit cards stolen; over $200 million in settlements and CEO resignation.

2. **Equifax Breach (Patch Management & Vulnerability Failure):**
   - *Attack Vector:* Known vulnerability in Apache Struts (CVE-2017-5638). CERT had warned about it months prior.
   - *Control Failure:* Internal vulnerability scan failed to identify the unpatched server due to misconfigured scan definitions; an expired SSL certificate disabled internal network traffic monitoring for 9 months.
   - *Impact:* Sensitive financial records of 147 million citizens exposed; FTC settlement exceeding $575 million.

3. **Cosmos Bank Cyber Heist (2018 - Indian Landmark):**
   - *Attack Vector:* Coordinated malware attack that created a rogue ATM switch proxy server.
   - *Execution:* Bypassed Core Banking System (CBS) balance verification; simultaneous cloned card withdrawals in 28 countries totaling ₹94 Crores, followed by fraudulent SWIFT transactions.
   - *Compliance Lessons:* Need for real-time SIEM behavioral anomaly detection and complete isolation of ATM switch and SWIFT networks.

4. **Justice K.S. Puttaswamy vs. Union of India (2017):**
   - Unanimous 9-judge constitutional bench ruled that the **Right to Privacy is an intrinsic part of the Right to Life and Personal Liberty** under Article 21 of the Indian Constitution.
   - Established the legal bedrock that mandated India to legislate the Digital Personal Data Protection (DPDP) Act.
          `,
          examTip: "Use the Target case to illustrate 'Failure of Third-Party Vendor Segmentation' and Equifax to illustrate 'Failure of Patch Management Audit'.",
          selfCheck: {
            question: "In the 2013 Target data breach, what was the primary architectural failure that allowed attackers to reach credit card POS terminals?",
            options: [
              "A) Quantum computers cracked the encryption.",
              "B) Lack of network segmentation between the third-party HVAC billing network and the Cardholder Data Environment.",
              "C) The data center was physically broken into.",
              "D) Target did not use password protection on any computer."
            ],
            answer: 1,
            explanation: "Target failed to segment the external HVAC vendor's access from its internal Cardholder Data Environment (CDE)."
          }
        }
      ]
    }
  ],

  practicals: {
    courseCode: "FSMS23 SIII SP-V LC: LABORATORY COURSE (P1: Cyber Law, Risk and Compliance)",
    title: "Practical Laboratory Curriculum",
    hours: "Lab Exercises",
    experiments: [
      {
        id: "exp-1",
        number: "Experiment 1",
        title: "Windows Sysinternals Diagnostic Suite",
        tools: "Process Explorer, Autoruns, TCPView, ProcMon",
        objective: "Analyze running system processes, inspect loaded DLLs, identify unauthorized persistent startup entries, and map network sockets.",
        details: "Sysinternals provides deep visibility into Windows internals. Students use Process Explorer to detect hidden processes, verify digital code signatures, inspect process trees, and use Autoruns to identify rootkit persistence mechanisms."
      },
      {
        id: "exp-2",
        number: "Experiment 2 & 3",
        title: "Windows Event Logs & Scenario-based Filtering",
        tools: "Windows Event Viewer, PowerShell (Get-WinEvent), XPath filters",
        objective: "Inspect Windows Security, System, and Application logs to detect simulated cyber incidents and filter logs based on specific security scenarios.",
        details: "Deep dive into Event IDs: 4624 (Successful Logon), 4625 (Failed Logon / Brute force), 4720 (User Account Created), 4726 (User Account Deleted), 1102 (The audit log was cleared). Filtering using XML XPath queries for rapid incident detection."
      },
      {
        id: "exp-4",
        number: "Experiment 4, 5 & 6",
        title: "SIEM Implementation, Real-time Visibility & Log Management",
        tools: "Wazuh / Splunk / Elastic SIEM",
        objective: "Deploy an enterprise Security Information and Event Management (SIEM) tool to ingest logs from multiple endpoints, establish correlation rules, and provide real-time dashboard visibility.",
        details: "Setting up forwarder agents, parsing syslogs, creating custom detection rules for privilege escalation and unauthorized port changes, and generating automated compliance audit reports."
      },
      {
        id: "exp-7",
        number: "Experiment 7",
        title: "Forensic Acquisition of Drive Media",
        tools: "FTK Imager (GUI & CLI), Hardware Write-Blockers",
        objective: "Perform bit-stream forensic acquisition of storage drives (HDD, SSD, USB) preserving chain-of-custody and evidence integrity.",
        details: "Creating forensic image formats (Raw/DD, Expert Witness Format - E01), calculating pre-acquisition and post-acquisition cryptographic hashes (MD5, SHA-256) to ensure 100% mathematical evidence integrity."
      },
      {
        id: "exp-8",
        number: "Experiment 8 & 9",
        title: "Hex Analysis & Data Manipulation using HxD Editor",
        tools: "HxD Hex Editor",
        objective: "Inspect raw binary structures, analyze Master Boot Records (MBR/GPT), recognize file header/footer magic numbers, and manipulate hex bytes.",
        details: "Examining hex signatures (e.g. JPEG: FF D8 FF E0; PDF: 25 50 44 46; ZIP: 50 4B 03 04). Understanding how anti-forensics modifies magic bytes to disguise file extensions and how to repair corrupted partition boot records."
      },
      {
        id: "exp-10",
        number: "Experiment 10",
        title: "Detailed Analysis of Forensic Image via Forensic Toolkit",
        tools: "AccessData FTK (Forensic Toolkit)",
        objective: "Ingest acquired forensic images into FTK, index evidence, analyze unallocated clusters, carve deleted files, and extract user activity artifacts.",
        details: "Automated indexing, searching for sensitive keywords, recovering deleted documents from unallocated space, extracting browser history and registry hives to prepare a court-admissible forensic audit report."
      }
    ]
  }
};
