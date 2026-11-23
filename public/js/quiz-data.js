/**
 * Quiz and Knowledge Check Data for Cyber Law, Risk and Compliance
 * NFSU M.Sc. Forensic Science (Cyber Forensics)
 */

const QUIZ_DATA = [
  {
    id: 1,
    unit: "unit-1",
    unitTitle: "Unit I: IT Security Assessment & Audit",
    question: "What is the primary difference between an IT Security Audit and an IT Security Assessment?",
    options: [
      "An audit is an independent verification against formal criteria/standards, while an assessment is a diagnostic review to discover gaps.",
      "An assessment is always performed by external law enforcement, while an audit is performed by internal staff.",
      "An audit only tests physical locks, while an assessment only tests passwords.",
      "An assessment results in criminal fines, while an audit is non-punitive."
    ],
    answer: 0,
    explanation: "Audits are formal, independent evaluations against recognized standards (like ISO 27001 or SOC 2), whereas assessments are consultative diagnostic exercises."
  },
  {
    id: 2,
    unit: "unit-1",
    unitTitle: "Unit I: IT Security Assessment & Audit",
    question: "Which of the following is considered a Computer Assisted Audit Technique (CAAT)?",
    options: [
      "Physical biometric turnstile",
      "Generalized Audit Software (GAS) such as ACL or IDEA for sampling and data queries",
      "Network punch-down tool",
      "Hardware token generator"
    ],
    answer: 1,
    explanation: "CAATs are software tools (e.g. ACL, IDEA, Python/SQL scripts) that allow auditors to interrogate high volumes of electronic transactions."
  },
  {
    id: 3,
    unit: "unit-1",
    unitTitle: "Unit I: IT Security Assessment & Audit",
    question: "In the 5 C's structure of an IT Audit finding, what does 'Cause' represent?",
    options: [
      "The monetary fine to be imposed by the auditor",
      "The underlying reason why the condition deviated from the established criteria",
      "The identity of the junior programmer who wrote the code",
      "The target date for server shutdown"
    ],
    answer: 1,
    explanation: "'Cause' addresses root-cause analysis—identifying why the observed condition failed to meet the required criteria."
  },
  {
    id: 4,
    unit: "unit-2",
    unitTitle: "Unit II: 7 Domains & Infrastructure Security",
    question: "In the Seven Domains of IT Infrastructure, which domain is universally recognized as the weakest link due to human psychology?",
    options: [
      "Workstation Domain",
      "LAN Domain",
      "User Domain",
      "WAN Domain"
    ],
    answer: 2,
    explanation: "The User Domain encompasses human employees and users, who are vulnerable to phishing, pretexting, and social engineering."
  },
  {
    id: 5,
    unit: "unit-2",
    unitTitle: "Unit II: 7 Domains & Infrastructure Security",
    question: "Which technology is specifically implemented in the LAN Domain to segment departments and isolate guest traffic?",
    options: [
      "Virtual Local Area Networks (VLANs)",
      "BGP Dynamic Routing",
      "Symmetric AES-256 ciphers",
      "Unshielded Twisted Pair (UTP) Category 5 cabling"
    ],
    answer: 0,
    explanation: "VLANs logically divide switch networks into separate broadcast domains, isolating guest traffic and sensitive departments."
  },
  {
    id: 6,
    unit: "unit-2",
    unitTitle: "Unit II: 7 Domains & Infrastructure Security",
    question: "What is the purpose of establishing a 'Security Baseline' in IT infrastructure?",
    options: [
      "To set the maximum price the company will pay for laptops",
      "To establish a standardized, documented minimum security configuration across systems",
      "To replace the need for security patch updates",
      "To eliminate all possibilities of malware infection"
    ],
    answer: 1,
    explanation: "Security baselines (such as CIS Benchmarks) provide a repeatable, minimum hardening standard across servers and endpoints."
  },
  {
    id: 7,
    unit: "unit-3",
    unitTitle: "Unit III: Risk Management & BCP",
    question: "A company's database server is valued at $200,000. An exploit has an Exposure Factor (EF) of 0.25 and an ARO of 0.5. What is the Annualized Loss Expectancy (ALE)?",
    options: [
      "$50,000",
      "$25,000",
      "$100,000",
      "$12,500"
    ],
    answer: 1,
    explanation: "SLE = $200,000 * 0.25 = $50,000. ALE = SLE * ARO = $50,000 * 0.5 = $25,000."
  },
  {
    id: 8,
    unit: "unit-3",
    unitTitle: "Unit III: Risk Management & BCP",
    question: "What risk treatment strategy is represented by purchasing a Cyber Insurance policy?",
    options: [
      "Risk Avoidance",
      "Risk Mitigation",
      "Risk Transference",
      "Risk Acceptance"
    ],
    answer: 2,
    explanation: "Insurance transfers financial liability and impact to a third-party underwriter."
  },
  {
    id: 9,
    unit: "unit-3",
    unitTitle: "Unit III: Risk Management & BCP",
    question: "In Business Impact Analysis (BIA), what does 'Recovery Point Objective' (RPO) define?",
    options: [
      "The maximum elapsed time to restore physical hardware to power-on state",
      "The maximum allowable age of data loss measured backward from the failure event",
      "The total financial revenue lost per day of downtime",
      "The geographic distance to the alternate hot site"
    ],
    answer: 1,
    explanation: "RPO dictates how much data loss the organization can withstand, determining backup frequency."
  },
  {
    id: 10,
    unit: "unit-3",
    unitTitle: "Unit III: Risk Management & BCP",
    question: "Which type of alternate continuity site has real-time data replication and can take over operations within minutes?",
    options: [
      "Cold Site",
      "Warm Site",
      "Hot Site",
      "Mobile Warehouse"
    ],
    answer: 2,
    explanation: "A Hot Site is fully equipped with mirrored hardware and real-time synchronized data, offering the fastest recovery time."
  },
  {
    id: 11,
    unit: "unit-4",
    unitTitle: "Unit IV: DR, Cyber Law & Frameworks",
    question: "Which section of the Indian Information Technology Act, 2000 prescribes Imprisonment for Life for Cyber Terrorism?",
    options: [
      "Section 43A",
      "Section 66B",
      "Section 66F",
      "Section 67"
    ],
    answer: 2,
    explanation: "Section 66F specifically addresses Cyber Terrorism with penalties extending up to life imprisonment."
  },
  {
    id: 12,
    unit: "unit-4",
    unitTitle: "Unit IV: DR, Cyber Law & Frameworks",
    question: "In Indian law, which statutory provision establishes the mandatory certificate for the admissibility of electronic evidence?",
    options: [
      "Section 65B of Indian Evidence Act, 1872 (Section 63 of Bharatiya Sakshya Adhiniyam, 2023)",
      "Section 302 of Indian Penal Code",
      "Section 138 of Negotiable Instruments Act",
      "Section 79 of IT Act"
    ],
    answer: 0,
    explanation: "Section 65B of the Indian Evidence Act (now Section 63 of BSA 2023) is the mandatory condition precedent for admitting secondary electronic records."
  },
  {
    id: 13,
    unit: "unit-4",
    unitTitle: "Unit IV: DR, Cyber Law & Frameworks",
    question: "Why was Section 66A of the IT Act struck down by the Supreme Court of India in Shreya Singhal vs Union of India (2015)?",
    options: [
      "Because it charged too small of a fine",
      "Because it was unconstitutionally vague and infringed upon freedom of speech under Article 19(1)(a)",
      "Because it applied only to laptops and not smartphones",
      "Because it was superseded by the Budapest Convention"
    ],
    answer: 1,
    explanation: "The Supreme Court struck down Section 66A as unconstitutional because its vague terminology curtailed protected freedom of speech."
  },
  {
    id: 14,
    unit: "unit-4",
    unitTitle: "Unit IV: DR, Cyber Law & Frameworks",
    question: "What is the key difference between a SOC 2 Type I and a SOC 2 Type II report?",
    options: [
      "Type I is for healthcare; Type II is for payment cards",
      "Type I tests control design at a single point in time, while Type II tests operational effectiveness over a period (usually 6+ months)",
      "Type I is mandatory by law; Type II is strictly voluntary",
      "Type I includes penetration testing results; Type II does not"
    ],
    answer: 1,
    explanation: "Type I validates that controls are suitably designed at a snapshot in time; Type II evaluates whether controls operated effectively over a minimum testing period."
  },
  {
    id: 15,
    unit: "unit-4",
    unitTitle: "Unit IV: DR, Cyber Law & Frameworks",
    question: "The 3-2-1 backup strategy recommends:",
    options: [
      "3 passwords, 2 administrators, 1 master key",
      "3 copies of data, across 2 different storage media, with 1 copy stored offsite",
      "3 backup attempts per hour, 2 days retention, 1 tape drive",
      "3 encrypted hard drives in 2 safe deposit boxes with 1 PIN"
    ],
    answer: 1,
    explanation: "The classic 3-2-1 backup rule specifies 3 copies of data, on 2 different media formats, with 1 copy maintained offsite."
  }
];
