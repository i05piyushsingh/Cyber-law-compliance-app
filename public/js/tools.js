/**
 * Interactive Tools for Cyber Law, Risk & Compliance Web Application
 * - Quantitative Risk Calculator (SLE, ARO, ALE, Cost-Benefit)
 * - 7 Domains IT Infrastructure Explorer
 * - IT Act 2000 / 2008 Statutory Navigator
 * - Interactive Compliance Audit Readiness Checklist
 */

const SEVEN_DOMAINS_DATA = [
  {
    id: "user-domain",
    number: "Domain 1",
    name: "User Domain",
    icon: "users",
    color: "#0078d4",
    devices: ["Employees", "Contractors", "Consultants", "System Administrators", "Remote Workers", "Third-party Vendors"],
    threats: [
      "Social engineering, phishing, spear-phishing & pretexting",
      "Insider threats & unauthorized data exfiltration",
      "Weak or shared passwords and credential reuse",
      "Accidental disclosure of sensitive personal data (SPDI)"
    ],
    complianceDrivers: [
      "Acceptable Use Policy (AUP) annual sign-off",
      "Mandatory security awareness training logs (ISO 27001 A.7.2.2)",
      "Background checks & non-disclosure agreements (NDAs)",
      "Strict off-boarding protocols (Immediate account revocation)"
    ],
    auditProcedures: [
      "Sample 25 employee onboarding files to verify signed AUPs & NDAs.",
      "Inspect Active Directory for dormant accounts older than 30 days.",
      "Review phishing simulation metrics and remedial training records.",
      "Verify Clean Desk and Clear Screen policy compliance."
    ]
  },
  {
    id: "workstation-domain",
    number: "Domain 2",
    name: "Workstation Domain",
    icon: "monitor",
    color: "#6264a7",
    devices: ["Laptops", "Desktop PCs", "Thin Clients", "Workstation OS (Windows 11, macOS, Linux)", "Endpoint USB Ports"],
    threats: [
      "Endpoint malware, spyware, and ransomware",
      "Theft or loss of physical unencrypted laptops",
      "Unpatched operating systems and third-party software",
      "Unauthorized peripheral devices (rogue USB thumb drives)"
    ],
    complianceDrivers: [
      "Full Disk Encryption (BitLocker AES-256 / FileVault)",
      "Centralized Patch Management SLA (WSUS, Intune, SCCM)",
      "Endpoint Detection & Response (EDR) agent deployment",
      "USB mass storage blocking via Group Policy Objects (GPOs)"
    ],
    auditProcedures: [
      "Verify 100% full disk encryption across all active corporate laptops.",
      "Audit WSUS/Intune dashboard for unpatched workstations exceeding 14 days.",
      "Test USB port restrictions with an unauthorized flash drive.",
      "Verify automated 5-minute screen lockouts."
    ]
  },
  {
    id: "lan-domain",
    number: "Domain 3",
    name: "LAN Domain",
    icon: "network",
    color: "#107c41",
    devices: ["Layer-2/3 Switches", "Wireless Access Points (WAPs)", "VLANs", "Internal Routers", "Structured Cabling & Patch Panels"],
    threats: [
      "Eavesdropping and packet sniffing on unencrypted internal segments",
      "Rogue access points connected to internal switch ports",
      "Lateral movement of ransomware across flat networks",
      "ARP spoofing and DHCP starvation attacks"
    ],
    complianceDrivers: [
      "Network segmentation via isolated VLANs (ISO 27001 A.8.20)",
      "802.1X port-based Network Access Control (NAC)",
      "Dynamic ARP Inspection (DAI) and DHCP Snooping",
      "Disabling all unused physical switch ports"
    ],
    auditProcedures: [
      "Inspect switch configurations: confirm shutdown of unused ports.",
      "Verify guest Wi-Fi is physically/logically isolated from corporate VLANs.",
      "Conduct rogue AP sweeps using wireless scanner tools.",
      "Review switch administration access (SSHv2 only; Telnet blocked)."
    ]
  },
  {
    id: "lan-to-wan-domain",
    number: "Domain 4",
    name: "LAN-to-WAN Domain",
    icon: "shield-alert",
    color: "#ffb900",
    devices: ["Perimeter Firewalls (NGFW)", "Demilitarized Zones (DMZs)", "Intrusion Detection/Prevention (IDS/IPS)", "Proxy Servers", "WAF"],
    threats: [
      "Direct external ingress attacks and port scans",
      "Malicious command-and-control (C2) beaconing outbound",
      "Public-facing DMZ server compromise pivoting into internal LAN",
      "DDoS attacks targeting perimeter gateway bandwidth"
    ],
    complianceDrivers: [
      "PCI-DSS Requirement 1: Install and maintain firewall configurations",
      "Strict egress filtering (blocking outbound non-standard ports)",
      "Two-tier DMZ isolation between public internet and internal databases",
      "Regular firewall rule-base audits to eliminate 'ANY-ANY' rules"
    ],
    auditProcedures: [
      "Review firewall ACLs for obsolete, shadowed, or redundant rules.",
      "Verify that no direct connections exist between DMZ and internal core database.",
      "Examine IDS/IPS signature update frequency and alert logs.",
      "Confirm external penetration testing reports within the last 12 months."
    ]
  },
  {
    id: "wan-domain",
    number: "Domain 5",
    name: "WAN Domain",
    icon: "globe",
    color: "#f25022",
    devices: ["Internet Service Provider (ISP) Links", "Edge Routers", "BGP Routing Gateways", "MPLS Circuits", "SD-WAN Appliances"],
    threats: [
      "Man-in-the-Middle (MitM) wiretapping on ISP transmission paths",
      "BGP route hijacking and DNS redirection",
      "Carrier outage causing prolonged downtime",
      "Unencrypted WAN traffic exposing sensitive communications"
    ],
    complianceDrivers: [
      "Mandatory cryptographic protection (IPsec AES-256 / TLS 1.3)",
      "Multi-homed redundant ISP links with automatic BGP failover",
      "Strict Service Level Agreements (SLAs) with telecommunication vendors",
      "Validating WAN router hardening (disabling unused helper protocols)"
    ],
    auditProcedures: [
      "Verify dual-homed telecom vendor SLAs and failover test records.",
      "Ensure all inter-site communications traverse encrypted IPsec tunnels.",
      "Review edge router configuration files against CIS Benchmarks.",
      "Verify BGP route filtering and anti-spoofing (BCP 38) controls."
    ]
  },
  {
    id: "remote-access-domain",
    number: "Domain 6",
    name: "Remote Access Domain",
    icon: "key",
    color: "#00a4ef",
    devices: ["VPN Concentrators (IPsec/SSL)", "Zero Trust Network Access (ZTNA) Brokers", "MFA Authentication Servers", "Remote Desktop Gateways"],
    threats: [
      "Compromised remote user credentials leading to full network entry",
      "Insecure home Wi-Fi and infected personal devices (BYOD risks)",
      "Session hijacking and credential stuffing against VPN portals",
      "Man-in-the-Middle attacks on public Wi-Fi networks"
    ],
    complianceDrivers: [
      "Mandatory Multi-Factor Authentication (MFA) on all remote gateways",
      "Zero Trust Network Access (ZTNA) least-privilege micro-segmentation",
      "Client health posture assessment before admitting remote connection",
      "Enforced idle timeout (15 minutes) and split tunneling controls"
    ],
    auditProcedures: [
      "Attempt connection without MFA to verify strict enforcement.",
      "Review VPN gateway logs for concurrent logins and impossible travel alerts.",
      "Verify endpoint posture check rules (OS version, active antivirus).",
      "Confirm session termination and idle timeout configurations."
    ]
  },
  {
    id: "system-app-domain",
    number: "Domain 7",
    name: "System / Application Domain",
    icon: "database",
    color: "#744da9",
    devices: ["Web & Application Servers (Nginx, IIS, Tomcat)", "Relational & NoSQL Databases (MSSQL, Oracle, PostgreSQL)", "ERP / Core Banking Systems", "Cloud Workloads"],
    threats: [
      "OWASP Top 10 vulnerabilities (SQL Injection, XSS, SSRF, Broken Auth)",
      "Unpatched server operating systems and database CVEs",
      "Excessive database privileges and default admin accounts",
      "Lack of encryption for Sensitive Personal Data at rest"
    ],
    complianceDrivers: [
      "Transparent Data Encryption (TDE) for sensitive database columns",
      "Automated vulnerability scanning & Static/Dynamic Code Analysis (SAST/DAST)",
      "Strict Change Advisory Board (CAB) patch approval workflow",
      "Role-Based Access Control (RBAC) and database audit trails"
    ],
    auditProcedures: [
      "Test database configurations: verify encryption at rest and TLS connections.",
      "Inspect web server configs: confirm disabling of weak SSL/TLS ciphers.",
      "Review code security scan reports and third-party penetration testing.",
      "Verify segregation of duties between developers and production DBAs."
    ]
  }
];

const IT_ACT_SECTIONS = [
  {
    section: "Section 43",
    title: "Penalty and Compensation for Damage to Computer System",
    category: "Civil Liability",
    description: "Covers unauthorized access, downloading or copying data, introducing computer contaminants/viruses, damaging or disrupting computer systems, or denying access to authorized users.",
    penalty: "Civil compensation to the victim up to ₹1 Crore (adjudicated by the IT Adjudicating Officer).",
    status: "Civil Remedy",
    bailable: "N/A (Civil)",
    cognizable: "Non-criminal"
  },
  {
    section: "Section 43A",
    title: "Compensation for Failure to Protect Sensitive Personal Data (SPDI)",
    category: "Corporate Liability",
    description: "Applies when a body corporate possessing, dealing, or handling sensitive personal data or information is negligent in implementing and maintaining reasonable security practices, causing wrongful loss or wrongful gain.",
    penalty: "Liable to pay damages by way of compensation to the person so affected (Unlimited compensation).",
    status: "Civil Remedy",
    bailable: "N/A (Civil)",
    cognizable: "Non-criminal"
  },
  {
    section: "Section 65",
    title: "Tampering with Computer Source Documents",
    category: "Offence",
    description: "Knowingly or intentionally concealing, destroying, or altering computer source code required to be kept or maintained by law.",
    penalty: "Imprisonment up to 3 years, and/or fine up to ₹2 Lakhs.",
    status: "Criminal Offence",
    bailable: "Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 66",
    title: "Computer Related Offences (Hacking)",
    category: "Offence",
    description: "Dishonestly or fraudulently committing any act referred to in Section 43 (unauthorized deletion, alteration, diminishment in value/utility of data).",
    penalty: "Imprisonment up to 3 years, and/or fine up to ₹5 Lakhs.",
    status: "Criminal Offence",
    bailable: "Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 66B",
    title: "Punishment for Dishonestly Receiving Stolen Computer Resource",
    category: "Offence",
    description: "Dishonestly receiving or retaining any stolen computer resource or communication device knowing or having reason to believe it to be stolen.",
    penalty: "Imprisonment up to 3 years, and/or fine up to ₹1 Lakh.",
    status: "Criminal Offence",
    bailable: "Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 66C",
    title: "Punishment for Identity Theft",
    category: "Offence",
    description: "Fraudulently or dishonestly making use of the electronic signature, password, or any other unique identification feature of any other person.",
    penalty: "Imprisonment up to 3 years, and fine up to ₹1 Lakh.",
    status: "Criminal Offence",
    bailable: "Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 66D",
    title: "Punishment for Cheating by Personation using Computer Resource",
    category: "Offence",
    description: "Cheating by personation by means of any computer resource or communication device (e.g. phishing, impersonation scams).",
    penalty: "Imprisonment up to 3 years, and fine up to ₹1 Lakh.",
    status: "Criminal Offence",
    bailable: "Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 66E",
    title: "Punishment for Violation of Privacy",
    category: "Privacy Offence",
    description: "Intentionally or knowingly capturing, publishing, or transmitting the image of a private area of any person without consent, violating their privacy.",
    penalty: "Imprisonment up to 3 years, and/or fine up to ₹2 Lakhs.",
    status: "Criminal Offence",
    bailable: "Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 66F",
    title: "Punishment for Cyber Terrorism",
    category: "National Security",
    description: "Acts committed with intent to threaten the unity, integrity, security, or sovereignty of India or strike terror in the people by denying access to authorized personnel, penetrating restricted computer networks, or damaging critical information infrastructure.",
    penalty: "Imprisonment which may extend to LIFE IMPRISONMENT.",
    status: "Severe Felony",
    bailable: "Non-Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 67",
    title: "Publishing or Transmitting Obscene Material in Electronic Form",
    category: "Moral Offences",
    description: "Publishing or transmitting material that is lascivious or appeals to the prurient interest or depraves and corrupts persons.",
    penalty: "First conviction: Imprisonment up to 3 years & fine up to ₹5 Lakhs; Second conviction: up to 5 years & fine up to ₹10 Lakhs.",
    status: "Criminal Offence",
    bailable: "Bailable (1st offence)",
    cognizable: "Cognizable"
  },
  {
    section: "Section 67A",
    title: "Publishing or Transmitting Sexually Explicit Act in Electronic Form",
    category: "Moral Offences",
    description: "Publishing, transmitting, or causing to be published or transmitted in electronic form any material containing sexually explicit act or conduct.",
    penalty: "First conviction: Imprisonment up to 5 years & fine up to ₹10 Lakhs; Second conviction: up to 7 years & fine up to ₹10 Lakhs.",
    status: "Criminal Offence",
    bailable: "Non-Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 67B",
    title: "Child Sexual Abuse Material (CSAM)",
    category: "Child Protection",
    description: "Publishing, transmitting, creating, collecting, searching, browsing, or downloading material depicting children in sexually explicit acts in electronic form.",
    penalty: "First conviction: Imprisonment up to 5 years & fine up to ₹10 Lakhs; Second conviction: up to 7 years & fine up to ₹10 Lakhs.",
    status: "Strict Liability Offence",
    bailable: "Non-Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 69",
    title: "Powers to Intercept, Monitor or Decrypt Information",
    category: "State Powers",
    description: "Power of Central/State Government to issue directions for interception or monitoring or decryption of any information through any computer resource in the interest of national sovereignty or public order.",
    penalty: "Failure to assist: Imprisonment up to 7 years and fine.",
    status: "Statutory Power",
    bailable: "Cognizable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 69A",
    title: "Powers to Issue Directions for Blocking Public Access of Information",
    category: "State Powers",
    description: "Power to block public access of any information generated, transmitted, received, stored or hosted in any computer resource in interest of sovereignty, security of State, friendly relations with foreign States or public order.",
    penalty: "Intermediary failing to comply: Imprisonment up to 7 years and fine.",
    status: "Statutory Power",
    bailable: "Cognizable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 70",
    title: "Protected System (Critical Information Infrastructure - CII)",
    category: "National Security",
    description: "Government declaration of any computer system which directly or indirectly affects the facility of Critical Information Infrastructure as a 'Protected System'. NCIIPC established under 70A.",
    penalty: "Unauthorized access or attempt: Imprisonment up to 10 years and fine.",
    status: "Severe Felony",
    bailable: "Non-Bailable",
    cognizable: "Cognizable"
  },
  {
    section: "Section 72A",
    title: "Disclosure of Information in Breach of Lawful Contract",
    category: "Confidentiality",
    description: "Any person who has secured access to any material containing personal information in pursuance of a lawful contract disclosing such information without consent or in breach of contract.",
    penalty: "Imprisonment up to 3 years, and/or fine up to ₹5 Lakhs.",
    status: "Criminal Offence",
    bailable: "Bailable",
    cognizable: "Cognizable"
  }
];

const AUDIT_CHECKLIST_DATA = [
  { id: "c1", category: "Governance", text: "Approved Audit Charter establishing independence & scope is formally signed by the Board / Audit Committee.", weight: 10 },
  { id: "c2", category: "User Domain", text: "100% of employees have acknowledged and signed the Acceptable Use Policy (AUP) within the last 12 months.", weight: 10 },
  { id: "c3", category: "Workstation", text: "Full Disk Encryption (AES-256 BitLocker/FileVault) is enforced across all laptops and endpoints.", weight: 10 },
  { id: "c4", category: "LAN Domain", text: "Network segmentation (VLANs) isolates production databases, employee workstations, and guest Wi-Fi networks.", weight: 10 },
  { id: "c5", category: "Perimeter", text: "External perimeter penetration test conducted within the last 12 months with critical vulnerabilities remediated.", weight: 10 },
  { id: "c6", category: "Remote Access", text: "Multi-Factor Authentication (MFA) is strictly mandatory on all remote access VPNs and administrative consoles.", weight: 10 },
  { id: "c7", category: "Application", text: "Formal Change Advisory Board (CAB) approval and rollback testing required prior to production software patches.", weight: 10 },
  { id: "c8", category: "Risk Management", text: "Quantitative and qualitative risk assessments documented in an active Enterprise Risk Register with assigned owners.", weight: 10 },
  { id: "c9", category: "BCP & DR", text: "Business Continuity Plan (BCP) and Disaster Recovery (DR) plans tested via tabletop or simulation exercise this calendar year.", weight: 10 },
  { id: "c10", category: "Compliance & Law", text: "Documented compliance with IT Act Section 43A / DPDP Act 2023 for protecting Sensitive Personal Data or Information.", weight: 10 }
];
