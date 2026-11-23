/**
 * Main Application Logic for Cyber Law, Risk and Compliance Web App
 * NFSU M.Sc. Forensic Science (Cyber Forensics)
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentView = 'unit-1';
  let currentTheme = localStorage.getItem('theme') || 'light';
  let activeTagFilter = 'all';
  let searchQuery = '';
  let activeDomainId = 'user-domain';
  let quizCurrentIndex = 0;
  let quizAnswers = {};

  // Progress Tracking State (Isolated Per User)
  let completedTopicIds = [];
  const allCards = SYLLABUS_DATA.units.flatMap(u => u.cards);
  const totalCardsCount = allCards.length;
  let currentActiveModalCardId = null;

  // Authentication State & Demo Profiles (Student & Professor with Admin / Admin@123)
  const DEMO_PROFILES = {
    student: {
      id: 'NFSU-STU-042',
      name: 'Student',
      role: 'Student • MSc Forensic Science (Cyber Forensics) SEM III',
      username: 'Admin',
      avatar: '🎓',
      passcode: 'Admin@123'
    },
    professor: {
      id: 'NFSU-PROF-108',
      name: 'Professor',
      role: 'Professor • MSc Forensic Science (Cyber Forensics) SEM III',
      username: 'Admin',
      avatar: '👨‍🏫',
      passcode: 'Admin@123'
    }
  };

  // Persistent User Database (Synced with Backend data/users.json and LocalStorage)
  const INITIAL_USER_DB = [
    {
      id: "NFSU-STU-042",
      name: "Student",
      username: "Admin",
      role: "Student",
      roleDescription: "MSc Forensic Science (Cyber Forensics) SEM III",
      email: "student@nfsu.ac.in",
      avatar: "🎓",
      password: "Admin@123",
      createdAt: "2026-11-23T00:00:00.000Z"
    },
    {
      id: "NFSU-PROF-108",
      name: "Professor",
      username: "Professor",
      role: "Professor",
      roleDescription: "Course Faculty & Evaluator",
      email: "professor@nfsu.ac.in",
      avatar: "👨‍🏫",
      password: "Admin@123",
      createdAt: "2026-11-23T00:00:00.000Z"
    }
  ];

  let userDatabase = JSON.parse(localStorage.getItem('cyber_user_database') || 'null') || INITIAL_USER_DB;
  if (Array.isArray(userDatabase)) {
    const seenU = new Set();
    userDatabase = userDatabase.filter(u => {
      const un = (u.username || '').toLowerCase().trim();
      if (!un || seenU.has(un) || un === 'asd22') return false;
      seenU.add(un);
      return true;
    });
  }

  let currentSelectedRole = 'student';
  let authUser = JSON.parse(localStorage.getItem('cyber_auth_user') || sessionStorage.getItem('cyber_auth_user') || 'null');

  // DOM Elements
  const body = document.documentElement;
  const sidebarNav = document.getElementById('sidebar-nav');
  const contentArea = document.getElementById('content-viewport');
  const searchInput = document.getElementById('global-search');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const printBtn = document.getElementById('print-notes-btn');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('app-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');

  // Authentication DOM Elements
  const authWrapper = document.getElementById('auth-wrapper');
  const appContainer = document.getElementById('app-container');
  const authThemeToggleBtn = document.getElementById('auth-theme-toggle-btn');
  const loginForm = document.getElementById('login-form');
  const loginUsername = document.getElementById('login-username') || document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const togglePwBtn = document.getElementById('toggle-password-btn');
  const pwToggleIcon = document.getElementById('pw-toggle-icon');
  const rememberMeCheckbox = document.getElementById('remember-me-checkbox');
  const loginSubmitBtn = document.getElementById('login-submit-btn');
  const loginSpinner = document.getElementById('login-spinner');
  const authAlert = document.getElementById('auth-alert');
  const demoStudentBtn = document.getElementById('demo-student-btn');
  const demoProfessorBtn = document.getElementById('demo-professor-btn') || document.getElementById('demo-faculty-btn');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const authHelpModal = document.getElementById('auth-help-modal');
  const authHelpCloseBtn = document.getElementById('auth-help-close-btn');
  const authHelpOkBtn = document.getElementById('auth-help-ok-btn');

  // Registration Modal Elements (Add New User)
  const btnOpenRegisterModal = document.getElementById('btn-open-register-modal');
  const registerUserModal = document.getElementById('register-user-modal');
  const registerUserForm = document.getElementById('register-user-form');
  const regFullname = document.getElementById('reg-fullname');
  const regUsername = document.getElementById('reg-username');
  const regRole = document.getElementById('reg-role');
  const regPassword = document.getElementById('reg-password');
  const regId = document.getElementById('reg-id');
  const regAlert = document.getElementById('reg-alert');
  const regCloseBtn = document.getElementById('register-close-btn');
  const regCancelBtn = document.getElementById('reg-cancel-btn');
  const regSubmitBtn = document.getElementById('reg-submit-btn');
  const regSpinner = document.getElementById('reg-spinner');
  const regTogglePwBtn = document.getElementById('reg-toggle-pw-btn');
  const regPwIcon = document.getElementById('reg-pw-icon');

  // Header and Sidebar User Elements
  const headerUserBadge = document.getElementById('header-user-badge');
  const headerUserAvatar = document.getElementById('header-user-avatar');
  const headerUserName = document.getElementById('header-user-name');
  const headerUserRole = document.getElementById('header-user-role');
  const headerSignoutBtn = document.getElementById('header-signout-btn');

  const sidebarUserAvatar = document.getElementById('sidebar-user-avatar');
  const sidebarUserName = document.getElementById('sidebar-user-name');
  const sidebarUserRole = document.getElementById('sidebar-user-role');
  const sidebarSignoutBtn = document.getElementById('sidebar-signout-btn');

  // Modal Elements
  const modalBackdrop = document.getElementById('deep-dive-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCompleteBtn = document.getElementById('modal-complete-toggle-btn');
  const modalCompleteBtnText = document.getElementById('modal-complete-btn-text');

  // Set Theme
  body.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  // User-Specific Progress Storage Helpers
  function getUserProgressStorageKey() {
    if (!authUser) return 'cyber_progress_guest';
    const userIdentifier = (authUser.username || authUser.id || 'guest').toLowerCase().trim();
    return `cyber_progress_${userIdentifier}`;
  }

  function loadUserProgress() {
    const key = getUserProgressStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        completedTopicIds = JSON.parse(stored);
      } catch (e) {
        completedTopicIds = [];
      }
    } else {
      // Clean slate for new or distinct user
      completedTopicIds = [];
    }
  }

  function saveUserProgress() {
    const key = getUserProgressStorageKey();
    localStorage.setItem(key, JSON.stringify(completedTopicIds));
  }

  // Progress Helper Functions
  function isTopicCompleted(cardId) {
    return completedTopicIds.includes(cardId);
  }

  function toggleTopicCompletion(cardId) {
    const idx = completedTopicIds.indexOf(cardId);
    if (idx > -1) {
      completedTopicIds.splice(idx, 1);
    } else {
      completedTopicIds.push(cardId);
    }
    saveUserProgress();
    updateAllProgressUI();
  }

  function getOverallProgress() {
    const count = completedTopicIds.length;
    const total = totalCardsCount;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return { count, total, percent };
  }

  function getUnitProgress(unitId) {
    const unit = SYLLABUS_DATA.units.find(u => u.id === unitId);
    if (!unit) return { count: 0, total: 0, percent: 0 };
    const count = unit.cards.filter(c => completedTopicIds.includes(c.id)).length;
    const total = unit.cards.length;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return { count, total, percent };
  }

  function updateAllProgressUI() {
    const overall = getOverallProgress();

    // 1. Header Progress Bar
    const headerFill = document.getElementById('header-progress-fill');
    const headerStats = document.getElementById('header-progress-stats');
    if (headerFill) headerFill.style.width = `${overall.percent}%`;
    if (headerStats) headerStats.textContent = `${overall.count} / ${overall.total} (${overall.percent}%)`;

    // 2. Sidebar Progress Widget
    const sidePercent = document.getElementById('sidebar-progress-percent');
    const sideFill = document.getElementById('sidebar-progress-fill');
    const sideCount = document.getElementById('sidebar-progress-count');
    if (sidePercent) sidePercent.textContent = `${overall.percent}%`;
    if (sideFill) sideFill.style.width = `${overall.percent}%`;
    if (sideCount) sideCount.textContent = `${overall.count} of ${overall.total} Topics Mastered`;

    // 3. Sidebar Nav Item Badges
    SYLLABUS_DATA.units.forEach(unit => {
      const up = getUnitProgress(unit.id);
      const badge = document.getElementById(`nav-badge-${unit.id}`);
      if (badge) {
        badge.textContent = `${up.count}/${unit.cards.length}`;
        if (up.count === unit.cards.length && unit.cards.length > 0) {
          badge.classList.add('all-done');
        } else {
          badge.classList.remove('all-done');
        }
      }
    });

    // 4. Unit Banner Progress Bar (if viewing a unit)
    if (currentView.startsWith('unit-')) {
      const up = getUnitProgress(currentView);
      const bannerFill = document.getElementById('unit-progress-fill');
      const bannerCount = document.getElementById('unit-progress-count');
      const bannerPercent = document.getElementById('unit-progress-percent');
      if (bannerFill) bannerFill.style.width = `${up.percent}%`;
      if (bannerCount) bannerCount.textContent = `${up.count} of ${up.total} Topics Studied`;
      if (bannerPercent) bannerPercent.textContent = `${up.percent}%`;
    }

    // 5. Update cards on the current dashboard
    document.querySelectorAll('.splash-card').forEach(cardEl => {
      const cardId = cardEl.id.replace('card-', '');
      const isDone = isTopicCompleted(cardId);
      const markBtn = cardEl.querySelector('.mark-complete-btn');

      if (isDone) {
        cardEl.classList.add('is-completed');
        if (markBtn) {
          markBtn.classList.add('completed');
          markBtn.innerHTML = '<span>✅ Studied</span>';
        }
        const headerTags = cardEl.querySelector('.card-header-tags');
        if (headerTags && !headerTags.querySelector('.card-mastered-pill')) {
          const pill = document.createElement('span');
          pill.className = 'card-mastered-pill';
          pill.textContent = '✓ Mastered';
          headerTags.appendChild(pill);
        }
      } else {
        cardEl.classList.remove('is-completed');
        if (markBtn) {
          markBtn.classList.remove('completed');
          markBtn.innerHTML = '<span>⚪ Mark as Studied</span>';
        }
        const pill = cardEl.querySelector('.card-mastered-pill');
        if (pill) pill.remove();
      }
    });

    // 6. Modal button
    updateModalCompleteButton();
  }

  function updateModalCompleteButton() {
    if (!currentActiveModalCardId || !modalCompleteBtn || !modalCompleteBtnText) return;
    const isDone = isTopicCompleted(currentActiveModalCardId);
    if (isDone) {
      modalCompleteBtn.classList.add('completed');
      modalCompleteBtnText.textContent = '✅ Topic Completed (Click to Unmark)';
    } else {
      modalCompleteBtn.classList.remove('completed');
      modalCompleteBtnText.textContent = '⚪ Mark Topic as Studied';
    }
  }

  // Authentication & RBAC Helper Functions
  function isCurrentUserAdmin() {
    if (!authUser) return false;
    const username = (authUser.username || '').toLowerCase().trim();
    const role = (authUser.role || '').toLowerCase().trim();
    const name = (authUser.name || '').toLowerCase().trim();
    return username === 'admin' || 
           username === 'professor' || 
           authUser.isAdmin === true || 
           role.includes('admin') || 
           role.includes('professor') ||
           role.includes('faculty') ||
           name === 'admin' ||
           name === 'professor';
  }

  function updateAuthDisplay() {
    if (authUser) {
      if (authWrapper) authWrapper.classList.add('hidden');
      if (appContainer) appContainer.classList.remove('auth-hidden');

      // Update Header User Profile
      if (headerUserAvatar) headerUserAvatar.textContent = authUser.avatar || '👤';
      if (headerUserName) headerUserName.textContent = authUser.name || 'Student';
      if (headerUserRole) headerUserRole.textContent = 'MSc Forensic Science (Cyber Forensics) SEM III';

      // Update Sidebar User Profile
      if (sidebarUserAvatar) sidebarUserAvatar.textContent = authUser.avatar || '👤';
      if (sidebarUserName) sidebarUserName.textContent = authUser.name || 'Student';
      if (sidebarUserRole) sidebarUserRole.textContent = authUser.role || 'MSc Forensic Science (Cyber Forensics) SEM III';

      // RBAC Protection: If current view is user-management but user is not admin, redirect to overview
      if (currentView === 'user-management' && !isCurrentUserAdmin()) {
        currentView = 'overview';
        renderView('overview');
      }
    } else {
      if (authWrapper) authWrapper.classList.remove('hidden');
      if (appContainer) appContainer.classList.add('auth-hidden');
    }

    // Isolate & Load User-Specific Progress
    loadUserProgress();
    updateAllProgressUI();

    buildSidebar();
  }

  function showAuthAlert(msg, type = 'error') {
    if (!authAlert) return;
    authAlert.className = `auth-alert ${type}`;
    authAlert.innerHTML = `<span>${type === 'error' ? '⚠️' : '✅'}</span> <span>${msg}</span>`;
    authAlert.style.display = 'flex';
  }

  function hideAuthAlert() {
    if (authAlert) authAlert.style.display = 'none';
  }

  function setDemoProfile(profileKey) {
    currentSelectedRole = profileKey;
    const profile = DEMO_PROFILES[profileKey];
    if (!profile) return;

    if (loginUsername) loginUsername.value = profile.username;
    if (loginPassword) loginPassword.value = profile.passcode;

    if (demoStudentBtn) demoStudentBtn.classList.toggle('active', profileKey === 'student');
    if (demoProfessorBtn) demoProfessorBtn.classList.toggle('active', profileKey === 'professor');

    hideAuthAlert();
  }

  function performLogin(userData) {
    if (loginSpinner) loginSpinner.style.display = 'inline-block';
    if (loginSubmitBtn) loginSubmitBtn.disabled = true;

    setTimeout(() => {
      if (loginSpinner) loginSpinner.style.display = 'none';
      if (loginSubmitBtn) loginSubmitBtn.disabled = false;

      authUser = userData;
      if (rememberMeCheckbox && rememberMeCheckbox.checked) {
        localStorage.setItem('cyber_auth_user', JSON.stringify(authUser));
      } else {
        sessionStorage.setItem('cyber_auth_user', JSON.stringify(authUser));
        localStorage.removeItem('cyber_auth_user');
      }

      showAuthAlert(`Authenticated as ${authUser.name}. Redirecting to dashboard...`, 'success');

      setTimeout(() => {
        updateAuthDisplay();
        hideAuthAlert();
      }, 350);
    }, 400);
  }

  function performLogout() {
    localStorage.removeItem('cyber_auth_user');
    sessionStorage.removeItem('cyber_auth_user');
    authUser = null;
    updateAuthDisplay();
    setDemoProfile('student');
    hideAuthAlert();
  }

  // Sync Users with Backend API (data/users.json) and Local Storage
  async function syncUsersFromBackend() {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users) && data.users.length > 0) {
          userDatabase = data.users;
          localStorage.setItem('cyber_user_database', JSON.stringify(userDatabase));
          updateNavUserBadge();
        }
      }
    } catch (err) {
      console.warn('Backend database sync fallback to local storage:', err);
    }
  }

  function updateNavUserBadge() {
    const badge = document.getElementById('nav-badge-users');
    if (badge) badge.textContent = `${userDatabase.length} Users`;
  }

  // ==========================================================================
  // Client-Side Security Filter & SQL Injection (SQLi) Prevention Suite
  // ==========================================================================

  const SQLI_PATTERNS = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|EXECUTE|UNION|DECLARE|CAST|CONVERT|WAITFOR|BENCHMARK|SLEEP)\b)/i,
    /(--|#|\/\*|\*\/)/,                         // SQL comment indicators
    /('|"|;)/,                                  // Quotes and statement terminators
    /(\bOR\b\s+['"\d\w]+\s*=\s*['"\d\w]+)/i,    // OR 1=1, OR 'a'='a'
    /(\bAND\b\s+['"\d\w]+\s*=\s*['"\d\w]+)/i,   // AND 1=1
    /(xp_[a-zA-Z0-9_]+)/i,                      // Extended stored procedures
    /(@@[a-zA-Z0-9_]+)/i,                       // System variables (@@version)
    /(<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)/i, // Script tags (XSS)
    /(javascript\s*:)/i,                        // Pseudo-protocols
    /(on\w+\s*=)/i                              // Inline event handlers
  ];

  function detectSQLi(value) {
    if (typeof value !== 'string') return null;
    const str = value.trim();
    for (const pattern of SQLI_PATTERNS) {
      if (pattern.test(str)) {
        return pattern;
      }
    }
    return null;
  }

  function sanitizeClientInput(value) {
    if (typeof value !== 'string') return '';
    return value
      .replace(/['"`;\\]/g, '')
      .replace(/--/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .trim();
  }

  function validateUserInputFields({ name, username, password, role, id, email }) {
    // 1. Full Name Validation (letters, spaces, periods, hyphens)
    if (!name || name.trim().length < 2 || name.trim().length > 60) {
      return { valid: false, field: 'name', message: 'Full Name must be between 2 and 60 characters.' };
    }
    const nameRegex = /^[a-zA-Z\s.'-]{2,60}$/;
    if (!nameRegex.test(name.trim())) {
      return { 
        valid: false, 
        field: 'name', 
        message: 'Security Alert (SQLi Filter): Full Name contains invalid or prohibited characters (quotes, semicolons, or symbols).' 
      };
    }
    if (detectSQLi(name)) {
      return { 
        valid: false, 
        field: 'name', 
        message: 'Security Alert (SQLi Filter): SQL Injection pattern or keywords detected in Full Name.' 
      };
    }

    // 2. Username Validation (Strict Whitelist: letters, digits, dot, underscore, hyphen)
    if (!username || username.trim().length < 3 || username.trim().length > 30) {
      return { valid: false, field: 'username', message: 'Username must be between 3 and 30 characters.' };
    }
    const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
    if (!usernameRegex.test(username.trim())) {
      return { 
        valid: false, 
        field: 'username', 
        message: 'Security Alert (SQLi Filter): Username must contain only alphanumeric characters, dots (.), underscores (_), or hyphens (-). Quotes, semicolons, and SQL operators are prohibited.' 
      };
    }
    if (detectSQLi(username)) {
      return { 
        valid: false, 
        field: 'username', 
        message: 'Security Alert (SQLi Filter): Prohibited SQL Injection payload detected in Username.' 
      };
    }

    // 3. Password Validation
    if (!password || password.length < 6 || password.length > 50) {
      return { valid: false, field: 'password', message: 'Password must be between 6 and 50 characters.' };
    }
    if (detectSQLi(password)) {
      return { 
        valid: false, 
        field: 'password', 
        message: 'Security Alert (SQLi Filter): Potential SQL Injection / illegal statement terminator (quotes, semicolons, comments) detected in Password.' 
      };
    }

    // 4. Role Validation
    if (role && role !== 'Student' && role !== 'Professor') {
      return { valid: false, field: 'role', message: 'Academic Role must be either Student or Professor.' };
    }

    // 5. Optional ID Validation
    if (id && id.trim()) {
      const idRegex = /^[a-zA-Z0-9._-]{2,30}$/;
      if (!idRegex.test(id.trim()) || detectSQLi(id)) {
        return { 
          valid: false, 
          field: 'id', 
          message: 'Security Alert (SQLi Filter): Roll No. / Faculty ID contains invalid characters or SQL injection patterns.' 
        };
      }
    }

    // 6. Optional Email Validation
    if (email && email.trim()) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.trim()) || detectSQLi(email)) {
        return { 
          valid: false, 
          field: 'email', 
          message: 'Security Alert (SQLi Filter): Please enter a valid academic email address without SQL injection or script patterns.' 
        };
      }
    }

    return { valid: true };
  }

  // Multi-Field Duplicate Prevention Filter
  function checkDuplicateUser(userData) {
    if (!userDatabase || !Array.isArray(userDatabase)) return { isDuplicate: false };

    const normUsername = (userData.username || '').trim().toLowerCase();
    const normName = (userData.name || '').trim().toLowerCase();
    const normId = userData.id && userData.id.trim() ? userData.id.trim().toLowerCase() : null;
    const normEmail = userData.email && userData.email.trim() ? userData.email.trim().toLowerCase() : `${normUsername}@nfsu.ac.in`;

    // 1. Check Username
    const dupUsername = userDatabase.find(u => (u.username || '').toLowerCase() === normUsername);
    if (dupUsername) {
      return { 
        isDuplicate: true, 
        field: 'username', 
        message: `Duplicate Entry Denied: Username '${userData.username.trim()}' is already registered in the database.` 
      };
    }

    // 2. Check Full Name
    const dupName = userDatabase.find(u => (u.name || '').toLowerCase() === normName);
    if (dupName) {
      return { 
        isDuplicate: true, 
        field: 'name', 
        message: `Duplicate Entry Denied: A user named '${userData.name.trim()}' is already registered (@${dupName.username}).` 
      };
    }

    // 3. Check Roll No. / Faculty ID (if specified)
    if (normId) {
      const dupId = userDatabase.find(u => (u.id || '').toLowerCase() === normId);
      if (dupId) {
        return { 
          isDuplicate: true, 
          field: 'id', 
          message: `Duplicate Entry Denied: Roll No. / Faculty ID '${userData.id.trim()}' is already assigned to user @${dupId.username}.` 
        };
      }
    }

    // 4. Check Email
    const dupEmail = userDatabase.find(u => (u.email || '').toLowerCase() === normEmail);
    if (dupEmail) {
      return { 
        isDuplicate: true, 
        field: 'email', 
        message: `Duplicate Entry Denied: Email '${normEmail}' is already registered to user @${dupEmail.username}.` 
      };
    }

    return { isDuplicate: false };
  }

  async function addUserToDatabase(userData) {
    // 1. Defense-in-depth: Run client SQLi filter before sending request
    const clientValidation = validateUserInputFields(userData);
    if (!clientValidation.valid) {
      return { success: false, message: clientValidation.message };
    }

    // 2. Defense-in-depth: Run client-side multi-field duplicate check
    const dupCheck = checkDuplicateUser(userData);
    if (dupCheck.isDuplicate) {
      return { success: false, message: dupCheck.message };
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const data = await res.json();
        userDatabase.push(data.user);
        localStorage.setItem('cyber_user_database', JSON.stringify(userDatabase));
        updateNavUserBadge();
        return { success: true, user: data.user, message: data.message };
      }
      if (res.status === 404) {
        // Static hosting fallback (e.g., GitHub Pages)
        throw new Error('Static hosting detected');
      }
      const data = await res.json().catch(() => ({}));
      return { success: false, message: data.message || 'Error saving user' };
    } catch (err) {
      // Local fallback (offline or GitHub Pages)
      const exists = userDatabase.some(u => u.username.toLowerCase() === userData.username.trim().toLowerCase());
      if (exists) {
        return { success: false, message: `Username '${userData.username}' already exists in database.` };
      }
      const newUser = {
        id: userData.id && userData.id.trim() ? userData.id.trim() : ('NFSU-' + (userData.role === 'Professor' ? 'FAC-' : 'STU-') + Math.floor(100 + Math.random() * 900)),
        name: userData.name.trim(),
        username: userData.username.trim(),
        role: userData.role,
        roleDescription: userData.role === 'Professor' ? 'Course Faculty & Evaluator' : 'MSc Forensic Science (Cyber Forensics) SEM III',
        email: userData.email || `${userData.username.trim().toLowerCase()}@nfsu.ac.in`,
        avatar: userData.role === 'Professor' ? '👨‍🏫' : '🎓',
        password: userData.password.trim(),
        createdAt: new Date().toISOString()
      };
      userDatabase.push(newUser);
      localStorage.setItem('cyber_user_database', JSON.stringify(userDatabase));
      updateNavUserBadge();
      return { success: true, user: newUser, message: `User '${newUser.name}' saved to database!` };
    }
  }

  async function deleteUserFromDatabase(username) {
    if (username.toLowerCase() === 'admin') {
      alert('Primary Admin account cannot be deleted.');
      return false;
    }
    if (!confirm(`Are you sure you want to remove user '${username}' from the database?`)) {
      return false;
    }

    try {
      await fetch('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
    } catch (e) {
      console.warn('Backend delete fallback:', e);
    }

    userDatabase = userDatabase.filter(u => u.username.toLowerCase() !== username.toLowerCase());
    localStorage.setItem('cyber_user_database', JSON.stringify(userDatabase));
    updateNavUserBadge();
    return true;
  }

  // Initialize
  buildSidebar();
  renderView(currentView);
  updateAllProgressUI();
  updateAuthDisplay();
  syncUsersFromBackend();

  const headerProgressWrap = document.getElementById('header-progress-wrap');
  if (headerProgressWrap) {
    headerProgressWrap.addEventListener('click', () => {
      switchView('overview');
    });
  }

  // Reset Progress Link (Per-User Scope)
  const resetLink = document.getElementById('reset-progress-link');
  if (resetLink) {
    resetLink.addEventListener('click', (e) => {
      e.preventDefault();
      const userName = authUser ? authUser.name : 'current user';
      if (confirm(`Are you sure you want to reset syllabus progress for ${userName}? All checkmarks for this user account will be cleared.`)) {
        completedTopicIds = [];
        localStorage.removeItem(getUserProgressStorageKey());
        updateAllProgressUI();
        if (currentView.startsWith('unit-')) {
          const unit = SYLLABUS_DATA.units.find(u => u.id === currentView);
          if (unit) renderUnitDashboard(unit);
        }
      }
    });
  }

  if (modalCompleteBtn) {
    modalCompleteBtn.addEventListener('click', () => {
      if (currentActiveModalCardId) {
        toggleTopicCompletion(currentActiveModalCardId);
      }
    });
  }

  // Authentication Event Listeners (Supports Admin / Admin@123 AND any User in Database)
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = loginUsername ? loginUsername.value.trim() : '';
      const passwordInput = loginPassword ? loginPassword.value.trim() : '';

      if (!usernameInput) {
        showAuthAlert('Please enter your Username.', 'error');
        return;
      }
      if (!passwordInput) {
        showAuthAlert('Please enter your Password.', 'error');
        return;
      }

      // Client-Side SQLi & Malicious Input Filter
      if (detectSQLi(usernameInput) || detectSQLi(passwordInput)) {
        showAuthAlert('Security Alert (SQLi Filter): Malicious SQL injection payload or prohibited syntax detected. Request aborted under IT Act Sec 66.', 'error');
        return;
      }

      // 1. Check against user database (including any newly registered users)
      let matchedUser = userDatabase.find(u => 
        u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === passwordInput
      );

      // 2. Also support universal Admin / Admin@123 credentials for active selected role
      if (!matchedUser && (usernameInput.toLowerCase() === 'admin' || usernameInput.toLowerCase() === 'student' || usernameInput.toLowerCase() === 'professor') && passwordInput === 'Admin@123') {
        const activeRole = currentSelectedRole === 'professor' ? 'Professor' : 'Student';
        matchedUser = userDatabase.find(u => u.role === activeRole) || DEMO_PROFILES[currentSelectedRole];
      }

      if (matchedUser) {
        performLogin(matchedUser);
      } else {
        showAuthAlert('Invalid credentials! Please use Username: Admin and Password: Admin@123 (or credentials of any user added to the database).', 'error');
      }
    });
  }

  // Registration Modal Handlers (Add New User from Login Screen)
  function openRegisterModal() {
    if (registerUserModal) {
      registerUserModal.classList.add('open');
      if (regAlert) regAlert.style.display = 'none';
      if (regFullname) regFullname.focus();
    }
  }

  function closeRegisterModal() {
    if (registerUserModal) registerUserModal.classList.remove('open');
  }

  if (btnOpenRegisterModal) {
    btnOpenRegisterModal.addEventListener('click', openRegisterModal);
  }
  if (regCloseBtn) {
    regCloseBtn.addEventListener('click', closeRegisterModal);
  }
  if (regCancelBtn) {
    regCancelBtn.addEventListener('click', closeRegisterModal);
  }
  if (registerUserModal) {
    registerUserModal.addEventListener('click', (e) => {
      if (e.target === registerUserModal) closeRegisterModal();
    });
  }

  if (regTogglePwBtn && regPassword && regPwIcon) {
    regTogglePwBtn.addEventListener('click', () => {
      const isPw = regPassword.type === 'password';
      regPassword.type = isPw ? 'text' : 'password';
      regPwIcon.textContent = isPw ? '🔒' : '👁️';
    });
  }

  if (registerUserForm) {
    registerUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = regFullname.value.trim();
      const username = regUsername.value.trim();
      const role = regRole.value;
      const password = regPassword.value.trim();
      const id = regId ? regId.value.trim() : '';

      if (!name || !username || !password) {
        if (regAlert) {
          regAlert.className = 'auth-alert error';
          regAlert.innerHTML = '<span>⚠️</span> <span>Please fill in all required fields.</span>';
          regAlert.style.display = 'flex';
        }
        return;
      }

      // Apply Client-Side SQLi Filter & Input Validation
      const clientValidation = validateUserInputFields({ name, username, role, password, id });
      if (!clientValidation.valid) {
        if (regAlert) {
          regAlert.className = 'auth-alert error';
          regAlert.innerHTML = `<span>🛡️</span> <span>${clientValidation.message}</span>`;
          regAlert.style.display = 'flex';
        }
        return;
      }

      // Multi-Field Duplicate Information Check
      const dupCheck = checkDuplicateUser({ name, username, role, password, id });
      if (dupCheck.isDuplicate) {
        if (regAlert) {
          regAlert.className = 'auth-alert error';
          regAlert.innerHTML = `<span>⚠️</span> <span>${dupCheck.message}</span>`;
          regAlert.style.display = 'flex';
        }
        return;
      }

      if (regSpinner) regSpinner.style.display = 'inline-block';
      if (regSubmitBtn) regSubmitBtn.disabled = true;

      const result = await addUserToDatabase({ name, username, role, password, id });

      if (regSpinner) regSpinner.style.display = 'none';
      if (regSubmitBtn) regSubmitBtn.disabled = false;

      if (result.success) {
        if (regAlert) {
          regAlert.className = 'auth-alert success';
          regAlert.innerHTML = `<span>✅</span> <span>${result.message}</span>`;
          regAlert.style.display = 'flex';
        }

        // Auto-fill login form with new user's credentials!
        if (loginUsername) loginUsername.value = username;
        if (loginPassword) loginPassword.value = password;
        if (role === 'Professor') {
          setDemoProfile('professor');
        } else {
          setDemoProfile('student');
        }

        setTimeout(() => {
          closeRegisterModal();
          registerUserForm.reset();
          showAuthAlert(`User '${username}' saved to database! Click 'Sign In' below to enter.`, 'success');
        }, 900);
      } else {
        if (regAlert) {
          regAlert.className = 'auth-alert error';
          regAlert.innerHTML = `<span>⚠️</span> <span>${result.message}</span>`;
          regAlert.style.display = 'flex';
        }
      }
    });
  }

  if (togglePwBtn && loginPassword && pwToggleIcon) {
    togglePwBtn.addEventListener('click', () => {
      const isPw = loginPassword.type === 'password';
      loginPassword.type = isPw ? 'text' : 'password';
      pwToggleIcon.textContent = isPw ? '🔒' : '👁️';
    });
  }

  if (demoStudentBtn) demoStudentBtn.addEventListener('click', () => setDemoProfile('student'));
  if (demoProfessorBtn) demoProfessorBtn.addEventListener('click', () => setDemoProfile('professor'));

  if (forgotPasswordLink && authHelpModal) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      authHelpModal.classList.add('open');
    });
  }
  if (authHelpCloseBtn && authHelpModal) {
    authHelpCloseBtn.addEventListener('click', () => authHelpModal.classList.remove('open'));
  }
  if (authHelpOkBtn && authHelpModal) {
    authHelpOkBtn.addEventListener('click', () => authHelpModal.classList.remove('open'));
  }
  if (authHelpModal) {
    authHelpModal.addEventListener('click', (e) => {
      if (e.target === authHelpModal) authHelpModal.classList.remove('open');
    });
  }

  if (authThemeToggleBtn) {
    authThemeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeIcon();
    });
  }

  if (headerSignoutBtn) {
    headerSignoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      performLogout();
    });
  }

  if (sidebarSignoutBtn) {
    sidebarSignoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      performLogout();
    });
  }

  // Event Listeners
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeIcon();
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Mobile Drawer Controls
  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Continuous Smooth Motion: Top Scroll Progress Indicator
  function handleWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }
  }
  window.addEventListener('scroll', handleWindowScroll, { passive: true });

  // Continuous Smooth Motion: Scroll Reveal Intersection Observer
  let scrollObserver = null;
  function initScrollObserver() {
    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -20px 0px'
    });

    const elementsToReveal = contentArea.querySelectorAll(
      '.splash-card, .unit-banner, .scheme-card, .tool-container, .quiz-container, .overview-hero, .exam-tip-box, .stat-item, .domain-box'
    );
    elementsToReveal.forEach(el => {
      el.classList.add('scroll-reveal');
      scrollObserver.observe(el);
    });
  }

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalBackdrop && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
      if (sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      handleSearch();
    });
  }

  function updateThemeIcon() {
    const iconHtml = currentTheme === 'dark' 
      ? '<span>☀️ Light</span>' 
      : '<span>🌙 Dark</span>';
    if (themeToggleBtn) themeToggleBtn.innerHTML = iconHtml;
    if (authThemeToggleBtn) authThemeToggleBtn.innerHTML = iconHtml;
  }

  // Build Sidebar Nav Items
  function buildSidebar() {
    sidebarNav.innerHTML = `
      <div class="nav-section-title">Course Information</div>
      <a class="nav-item ${currentView === 'overview' ? 'active' : ''}" data-view="overview">
        <span class="nav-icon">📋</span>
        <span class="nav-text">Syllabus & Scheme</span>
        <span class="nav-badge">200M</span>
      </a>

      <div class="nav-section-title">Syllabus Units</div>
      ${SYLLABUS_DATA.units.map(unit => {
        const up = getUnitProgress(unit.id);
        const isAllDone = up.count === unit.cards.length && unit.cards.length > 0;
        return `
        <a class="nav-item ${currentView === unit.id ? 'active' : ''}" data-view="${unit.id}">
          <span class="nav-icon">${getUnitIcon(unit.id)}</span>
          <span class="nav-text">${unit.number}: ${unit.title.split('&')[0].trim()}</span>
          <span class="nav-progress-badge ${isAllDone ? 'all-done' : ''}" id="nav-badge-${unit.id}">${up.count}/${unit.cards.length}</span>
        </a>
      `}).join('')}

      <div class="nav-section-title">Lab & Practical</div>
      <a class="nav-item ${currentView === 'practicals' ? 'active' : ''}" data-view="practicals">
        <span class="nav-icon">🔬</span>
        <span class="nav-text">P1 Practical Lab</span>
        <span class="nav-badge">10 Exps</span>
      </a>

      <div class="nav-section-title">Interactive Tools</div>
      <a class="nav-item ${currentView === 'tool-calculator' ? 'active' : ''}" data-view="tool-calculator">
        <span class="nav-icon">🧮</span>
        <span class="nav-text">Quantitative Risk Calc</span>
        <span class="nav-badge">ALE/SLE</span>
      </a>
      <a class="nav-item ${currentView === 'tool-domains' ? 'active' : ''}" data-view="tool-domains">
        <span class="nav-icon">🏛️</span>
        <span class="nav-text">7 Domains Explorer</span>
        <span class="nav-badge">Arch</span>
      </a>
      <a class="nav-item ${currentView === 'tool-itact' ? 'active' : ''}" data-view="tool-itact">
        <span class="nav-icon">⚖️</span>
        <span class="nav-text">IT Act 2000 Directory</span>
        <span class="nav-badge">Law</span>
      </a>
      <a class="nav-item ${currentView === 'tool-checklist' ? 'active' : ''}" data-view="tool-checklist">
        <span class="nav-icon">✅</span>
        <span class="nav-text">Audit Readiness Check</span>
        <span class="nav-badge">Score</span>
      </a>

      <div class="nav-section-title">Self Assessment</div>
      <a class="nav-item ${currentView === 'quiz' ? 'active' : ''}" data-view="quiz">
        <span class="nav-icon">🎯</span>
        <span class="nav-text">Practice Quiz</span>
        <span class="nav-badge">15 Qs</span>
      </a>

      ${isCurrentUserAdmin() ? `
      <div class="nav-section-title">Administration</div>
      <a class="nav-item ${currentView === 'user-management' ? 'active' : ''}" data-view="user-management">
        <span class="nav-icon">👥</span>
        <span class="nav-text">User Database</span>
        <span class="nav-badge" id="nav-badge-users">${userDatabase.length} Users</span>
      </a>
      ` : ''}
    `;

    // Attach click events
    sidebarNav.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = item.getAttribute('data-view');
        switchView(view);
        if (window.innerWidth <= 900) {
          closeSidebar();
        }
      });
    });
  }

  function getUnitIcon(unitId) {
    switch (unitId) {
      case 'unit-1': return '🛡️';
      case 'unit-2': return '🌐';
      case 'unit-3': return '📊';
      case 'unit-4': return '⚖️';
      default: return '📄';
    }
  }

  function switchView(view) {
    currentView = view;
    activeTagFilter = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';

    // Update active class on nav
    sidebarNav.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === view) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    renderView(view);
    updateAllProgressUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Render View Dispatcher
  function renderView(view) {
    if (view.startsWith('unit-')) {
      const unit = SYLLABUS_DATA.units.find(u => u.id === view);
      if (unit) {
        breadcrumbCurrent.textContent = `${unit.number}: ${unit.title.split('&')[0].trim()}`;
        breadcrumbCurrent.title = `${unit.number}: ${unit.title}`;
        renderUnitDashboard(unit);
      }
    } else if (view === 'overview') {
      breadcrumbCurrent.textContent = 'Course Overview & Examination Scheme';
      renderOverview();
    } else if (view === 'practicals') {
      breadcrumbCurrent.textContent = 'P1 Practical Laboratory Curriculum';
      renderPracticals();
    } else if (view === 'tool-calculator') {
      breadcrumbCurrent.textContent = 'Interactive Quantitative Risk Calculator';
      renderRiskCalculator();
    } else if (view === 'tool-domains') {
      breadcrumbCurrent.textContent = 'The Seven Domains of IT Infrastructure';
      renderDomainsExplorer();
    } else if (view === 'tool-itact') {
      breadcrumbCurrent.textContent = 'Indian IT Act 2000 & 2008 Statutory Directory';
      renderITActDirectory();
    } else if (view === 'tool-checklist') {
      breadcrumbCurrent.textContent = 'Audit Readiness Checklist';
      renderAuditChecklist();
    } else if (view === 'quiz') {
      breadcrumbCurrent.textContent = 'Exam Preparation & Knowledge Check Quiz';
      renderQuiz();
    } else if (view === 'user-management') {
      if (!isCurrentUserAdmin()) {
        breadcrumbCurrent.textContent = 'Access Control - Access Denied';
        renderAccessDenied();
        return;
      }
      breadcrumbCurrent.textContent = 'NFSU User Database & Access Control Management';
      renderUserManagement();
    }

    requestAnimationFrame(() => {
      initScrollObserver();
    });
  }

  // ==========================================================================
  // Unit Dashboard with Splash Cards
  // ==========================================================================

  function renderUnitDashboard(unit) {
    const up = getUnitProgress(unit.id);
    // Collect all unique tags for filter chips
    const tags = Array.from(new Set(unit.cards.map(c => c.tag)));

    // Filter cards by active tag and search query
    let filteredCards = unit.cards.filter(card => {
      const matchTag = (activeTagFilter === 'all') || (card.tag === activeTagFilter);
      const matchSearch = !searchQuery || 
        card.title.toLowerCase().includes(searchQuery) ||
        card.subtitle.toLowerCase().includes(searchQuery) ||
        card.summary.toLowerCase().includes(searchQuery) ||
        card.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery));
      return matchTag && matchSearch;
    });

    contentArea.innerHTML = `
      <div class="unit-banner">
        <div class="banner-meta">
          <span class="banner-unit-badge">${unit.number}</span>
          <span class="banner-hours">⏱️ ${unit.hours} Teaching Hours</span>
        </div>
        <h2>${unit.title}</h2>
        <p class="banner-summary">${unit.summary}</p>

        <!-- Unit Syllabus Progress Tracker -->
        <div class="unit-progress-container">
          <div class="unit-progress-header">
            <div class="up-text">
              <span>📈</span>
              <span class="up-label">${unit.number} Syllabus Coverage:</span>
              <strong id="unit-progress-count">${up.count} of ${unit.cards.length} Topics Studied</strong>
            </div>
            <span class="up-percentage" id="unit-progress-percent">${up.percent}%</span>
          </div>
          <div class="progress-track banner-track">
            <div class="progress-fill banner-fill" id="unit-progress-fill" style="width: ${up.percent}%"></div>
          </div>
        </div>

        <div class="banner-stats">
          <div class="stat-item">
            <span class="stat-val">${unit.cards.length}</span>
            <span class="stat-lbl">Key Splash Cards</span>
          </div>
          <div class="stat-item">
            <span class="stat-val">15 Hrs</span>
            <span class="stat-lbl">Classroom Weightage</span>
          </div>
          <div class="stat-item">
            <span class="stat-val" id="banner-stat-percent">${up.percent}%</span>
            <span class="stat-lbl">Unit Completed</span>
          </div>
          <div class="stat-item">
            <span class="stat-val">Theory + Lab</span>
            <span class="stat-lbl">Exam Aligned</span>
          </div>
        </div>
      </div>

      <div class="dashboard-controls">
        <div class="filter-tags">
          <button class="filter-chip ${activeTagFilter === 'all' ? 'active' : ''}" data-tag="all">All Topics (${unit.cards.length})</button>
          ${tags.map(t => `
            <button class="filter-chip ${activeTagFilter === t ? 'active' : ''}" data-tag="${t}">${t}</button>
          `).join('')}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Showing ${filteredCards.length} of ${unit.cards.length} splash cards
        </div>
      </div>

      <div class="cards-grid" id="unit-cards-grid">
        ${filteredCards.length > 0 ? filteredCards.map(card => {
          const isDone = isTopicCompleted(card.id);
          return `
          <div class="splash-card ${isDone ? 'is-completed' : ''}" id="card-${card.id}">
            <div class="card-top">
              <div class="card-header-tags">
                <span class="card-tag">${card.tag}</span>
                <span class="card-badge">✨ ${card.badge}</span>
                ${isDone ? '<span class="card-mastered-pill">✓ Mastered</span>' : ''}
              </div>
              <h3 class="card-title">${card.title}</h3>
              <div class="card-subtitle">${card.subtitle}</div>
              <p class="card-summary">${card.summary}</p>
              <ul class="card-highlights">
                ${card.keyPoints.slice(0, 4).map(kp => `<li>${kp}</li>`).join('')}
              </ul>
            </div>
            <div class="card-footer">
              <button class="card-btn mark-complete-btn ${isDone ? 'completed' : ''}" data-card-id="${card.id}" title="Toggle study status">
                <span>${isDone ? '✅ Studied' : '⚪ Mark as Studied'}</span>
              </button>
              <button class="card-btn deep-dive" data-card-id="${card.id}">
                <span>📖 Deep Dive</span>
              </button>
              <button class="card-btn quiz-btn" data-card-id="${card.id}" data-action="quick-quiz">
                <span>⚡ Quiz</span>
              </button>
            </div>
          </div>
        `}).join('') : `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">No splash cards match "${searchQuery}"</h4>
            <p>Try searching for terms like "audit", "compliance", "firewall", "SLE", or "Section 66".</p>
          </div>
        `}
      </div>
    `;

    // Mark as studied button click handlers
    contentArea.querySelectorAll('.card-btn.mark-complete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardId = btn.getAttribute('data-card-id');
        toggleTopicCompletion(cardId);
      });
    });

    // Filter chip click handlers
    contentArea.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTagFilter = btn.getAttribute('data-tag');
        renderUnitDashboard(unit);
      });
    });

    // Deep dive button click handlers
    contentArea.querySelectorAll('.card-btn.deep-dive').forEach(btn => {
      btn.addEventListener('click', () => {
        const cardId = btn.getAttribute('data-card-id');
        openDeepDiveModal(cardId);
      });
    });

    // Quick quiz button click handlers
    contentArea.querySelectorAll('.card-btn.quiz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cardId = btn.getAttribute('data-card-id');
        openDeepDiveModal(cardId, true);
      });
    });

    requestAnimationFrame(() => {
      initScrollObserver();
    });
  }

  // ==========================================================================
  // Deep Dive Modal
  // ==========================================================================

  function openDeepDiveModal(cardId, focusQuiz = false) {
    let targetCard = null;
    let parentUnit = null;

    for (const unit of SYLLABUS_DATA.units) {
      const found = unit.cards.find(c => c.id === cardId);
      if (found) {
        targetCard = found;
        parentUnit = unit;
        break;
      }
    }

    if (!targetCard) return;

    currentActiveModalCardId = cardId;
    updateModalCompleteButton();

    modalTitle.textContent = targetCard.title;
    modalSubtitle.textContent = `${parentUnit.number} • ${targetCard.tag} • ${targetCard.badge}`;

    // Convert markdown headings and tables into HTML
    const formattedNotes = formatMarkdownContent(targetCard.deepDive);

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
        <h4 style="border-left: none; padding-left: 0; color: var(--accent-cyan); font-size: 1.05rem;">Topic Abstract</h4>
        <p style="font-size: 0.95rem; color: var(--text-primary);">${targetCard.summary}</p>
      </div>

      <div class="detailed-academic-notes">
        ${formattedNotes}
      </div>

      <div class="exam-tip-box">
        <strong>💡 High-Yield University Exam Tip:</strong>
        ${targetCard.examTip}
      </div>

      <div class="modal-self-check" id="modal-quiz-section">
        <h5>⚡ Instant Knowledge Check:</h5>
        <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.85rem;">
          ${targetCard.selfCheck.question}
        </p>
        <div class="quiz-options">
          ${targetCard.selfCheck.options.map((opt, idx) => `
            <div class="quiz-option" data-opt-idx="${idx}">
              ${opt}
            </div>
          `).join('')}
        </div>
        <div class="quiz-explanation" id="modal-quiz-feedback">
          <strong>Explanation:</strong> ${targetCard.selfCheck.explanation}
        </div>
      </div>
    `;

    // Self check option click
    const optionEls = modalContent.querySelectorAll('#modal-quiz-section .quiz-option');
    const feedbackEl = modalContent.querySelector('#modal-quiz-feedback');

    optionEls.forEach(optEl => {
      optEl.addEventListener('click', () => {
        const selectedIdx = parseInt(optEl.getAttribute('data-opt-idx'), 10);
        optionEls.forEach(el => el.classList.remove('selected', 'correct', 'incorrect'));

        if (selectedIdx === targetCard.selfCheck.answer) {
          optEl.classList.add('correct');
          if (!isTopicCompleted(cardId)) {
            toggleTopicCompletion(cardId);
          }
        } else {
          optEl.classList.add('incorrect');
          optionEls[targetCard.selfCheck.answer].classList.add('correct');
        }
        feedbackEl.style.display = 'block';
      });
    });

    modalBackdrop.classList.add('open');

    if (focusQuiz) {
      setTimeout(() => {
        const quizEl = document.getElementById('modal-quiz-section');
        if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
  }

  // Simple Markdown Formatter for Deep Dive content
  function formatMarkdownContent(mdText) {
    if (!mdText) return '';
    let html = mdText;

    // Convert code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Convert headings
    html = html.replace(/#### (.*)/g, '<h4>$1</h4>');
    html = html.replace(/### (.*)/g, '<h3>$1</h3>');

    // Convert bold and italics
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert markdown tables
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim().length > 0);
      if (match.includes('---')) return ''; // separator row
      const isHeader = !match.includes('<td>');
      const rowTag = isHeader ? 'th' : 'td';
      return '<tr>' + cells.map(c => `<${rowTag}>${c.trim()}</${rowTag}>`).join('') + '</tr>';
    });

    // Wrap consecutive table rows into responsive container
    html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<div class="table-responsive"><table>$&</table></div>');

    // Convert bullet lists
    html = html.replace(/^- (.*)/gm, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul>$&</ul>');

    return html;
  }

  // ==========================================================================
  // Global Search Handler across all units
  // ==========================================================================

  function handleSearch() {
    if (!searchQuery) {
      renderView(currentView);
      return;
    }

    if (currentView.startsWith('unit-')) {
      const unit = SYLLABUS_DATA.units.find(u => u.id === currentView);
      if (unit) renderUnitDashboard(unit);
    } else if (currentView === 'tool-itact') {
      renderITActDirectory();
    }
  }

  // ==========================================================================
  // Course Overview & Examination Scheme View
  // ==========================================================================

  function renderOverview() {
    const info = SYLLABUS_DATA.courseInfo;
    const overall = getOverallProgress();

    contentArea.innerHTML = `
      <div class="unit-banner">
        <div class="banner-meta">
          <span class="banner-unit-badge">${info.code}</span>
          <span class="banner-hours">🎓 ${info.specialization}</span>
        </div>
        <h2>${info.title}</h2>
        <p class="banner-summary">
          Offered by the <strong>${info.department}</strong> at <strong>${info.institution}</strong>. 
          A core academic curriculum designed to master Security Audits, Seven Domains of IT Infrastructure, Risk Assessment models, Disaster Recovery, Indian Cyber Law (IT Act 2000 & 2008), and Global Compliance Frameworks.
        </p>
        <div class="banner-stats">
          <div class="stat-item">
            <span class="stat-val">4</span>
            <span class="stat-lbl">Credits</span>
          </div>
          <div class="stat-item">
            <span class="stat-val">60 Hrs</span>
            <span class="stat-lbl">Teaching Hours</span>
          </div>
          <div class="stat-item">
            <span class="stat-val">200 Marks</span>
            <span class="stat-lbl">Theory Scheme</span>
          </div>
          <div class="stat-item">
            <span class="stat-val" style="color: var(--accent-emerald);">${overall.percent}%</span>
            <span class="stat-lbl">Syllabus Covered</span>
          </div>
        </div>
      </div>

      <div class="scheme-card">
        <h3>📈 Live Syllabus Completion Tracker</h3>
        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 600;">
            <span>Overall Course Progress:</span>
            <span style="color: var(--accent-emerald); font-weight: 800;">${overall.count} of ${overall.total} Topics Mastered (${overall.percent}%)</span>
          </div>
          <div class="progress-track" style="height: 12px;">
            <div class="progress-fill" style="width: ${overall.percent}%"></div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
          ${SYLLABUS_DATA.units.map(unit => {
            const up = getUnitProgress(unit.id);
            return `
              <div class="overview-unit-progress-card" data-unit-id="${unit.id}" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; cursor: pointer; transition: var(--transition);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <strong style="font-size: 0.85rem; color: var(--text-primary);">${unit.number}</strong>
                  <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent-cyan);">${up.percent}%</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.6rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${unit.title.split('&')[0].trim()}
                </div>
                <div class="progress-track" style="height: 6px;">
                  <div class="progress-fill" style="width: ${up.percent}%"></div>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.4rem;">
                  ${up.count} / ${unit.cards.length} Topics Studied
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="scheme-card">
        <h3>📊 Teaching & Examination Scheme</h3>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Evaluation Head</th>
              <th>Marks</th>
              <th>Duration</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Internal Continuous</strong></td>
              <td>TA-1 & TA-2</td>
              <td>50 Marks</td>
              <td>1 Hour 30 Min</td>
              <td>Assignments, case studies, hands-on workshops</td>
            </tr>
            <tr>
              <td><strong>Internal Mid-Term</strong></td>
              <td>MSE (Mid Semester Exam)</td>
              <td>50 Marks</td>
              <td>1 Hour 30 Min</td>
              <td>Comprehensive written midterm examination</td>
            </tr>
            <tr>
              <td><strong>External University</strong></td>
              <td>End-Semester University Exam</td>
              <td>100 Marks</td>
              <td>3 Hours</td>
              <td>Terminal university theory examination</td>
            </tr>
            <tr style="background: rgba(56, 189, 248, 0.08); font-weight: bold;">
              <td><strong>Total Theory</strong></td>
              <td>Combined Evaluation</td>
              <td>200 Marks</td>
              <td>-</td>
              <td>4 Credits (4 Teaching Hours / Week)</td>
            </tr>
            <tr>
              <td><strong>Practical Laboratory</strong></td>
              <td>LPW University Practical</td>
              <td>100 Marks (+50 MSE)</td>
              <td>6 Hours (Exam)</td>
              <td>Hands-on FTK, HxD, Sysinternals, SIEM analysis (6 Credits)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scheme-card">
        <h3>🎯 Course Objectives & Learning Outcomes</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>
            <h4 style="color: var(--accent-cyan); margin-bottom: 0.75rem;">Course Objectives:</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
              ${info.objectives.map(o => `<li>🔹 ${o}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h4 style="color: var(--accent-emerald); margin-bottom: 0.75rem;">Course Learning Outcomes:</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
              ${info.outcomes.map(o => `<li>✅ ${o}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="scheme-card">
        <h3>📚 Prescribed Reference Textbooks</h3>
        <div class="books-grid">
          ${info.referenceBooks.map(b => `
            <div class="book-card">
              <span class="book-num">${b.id}</span>
              <div class="book-info">
                <h5>${b.title}</h5>
                <p><strong>Author:</strong> ${b.author}</p>
                <p><strong>Publisher:</strong> ${b.publisher} (${b.year})</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    contentArea.querySelectorAll('.overview-unit-progress-card').forEach(card => {
      card.addEventListener('click', () => {
        const uid = card.getAttribute('data-unit-id');
        switchView(uid);
      });
    });
  }

  // ==========================================================================
  // Practical Lab View
  // ==========================================================================

  function renderPracticals() {
    const prac = SYLLABUS_DATA.practicals;

    contentArea.innerHTML = `
      <div class="unit-banner">
        <div class="banner-meta">
          <span class="banner-unit-badge">LABORATORY COURSE</span>
          <span class="banner-hours">🔬 6 Credits • 150 Total Marks</span>
        </div>
        <h2>P1: Cyber Law, Risk and Compliance (Practical Curriculum)</h2>
        <p class="banner-summary">
          Hands-on forensic and security audit laboratory exercises prescribed by NFSU. Covers Windows Sysinternals diagnostics, Event log scenario filtering, SIEM deployment, bit-stream drive acquisition via FTK Imager, raw hex analysis with HxD, and forensic image processing.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem;">
        ${prac.experiments.map(exp => `
          <div class="splash-card" style="margin-bottom: 0;">
            <div class="card-top">
              <div class="card-header-tags">
                <span class="card-tag">Lab Experiment</span>
                <span class="card-badge">🛠️ Tools: ${exp.tools}</span>
              </div>
              <h3 class="card-title">${exp.number}: ${exp.title}</h3>
              <p style="font-size: 0.88rem; color: var(--accent-cyan); margin-bottom: 0.75rem;">
                <strong>Objective:</strong> ${exp.objective}
              </p>
              <p class="card-summary" style="margin-bottom: 0.5rem;">
                ${exp.details}
              </p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ==========================================================================
  // Tool 1: Interactive Quantitative Risk Calculator
  // ==========================================================================

  function renderRiskCalculator() {
    contentArea.innerHTML = `
      <div class="tool-container">
        <div class="tool-header">
          <h3>🧮 Quantitative Risk & Cost-Benefit Calculator</h3>
          <p>
            Perform real-time mathematical risk analysis as taught in <strong>Unit III: Risk Management</strong>.
            Calculate Single Loss Expectancy (SLE), Annualized Loss Expectancy (ALE), and evaluate whether a proposed security safeguard is economically justified using Cost-Benefit Analysis (CBA).
          </p>
        </div>

        <div class="calculator-grid">
          <div class="calc-inputs">
            <div class="input-field">
              <label>Asset Identification</label>
              <input type="text" id="calc-asset-name" value="Customer Database & Cloud Cluster" placeholder="e.g. Core Database">
              <span class="help-text">Name of the critical asset under evaluation</span>
            </div>

            <div class="input-field">
              <label>Asset Value (AV) - $ / ₹</label>
              <input type="number" id="calc-av" value="500000" min="0" step="1000">
              <span class="help-text">Total replacement, legal, and operational value of the asset</span>
            </div>

            <div class="input-field">
              <label>Exposure Factor (EF) - Pre-Control (%)</label>
              <input type="number" id="calc-ef" value="40" min="1" max="100" step="1">
              <span class="help-text">Percentage of asset value lost if the incident occurs (e.g. 40%)</span>
            </div>

            <div class="input-field">
              <label>Annualized Rate of Occurrence (ARO) - Events / Year</label>
              <input type="number" id="calc-aro" value="0.5" min="0.01" max="50" step="0.05">
              <span class="help-text">Expected frequency per year (e.g. 0.5 = once every 2 years; 2 = twice per year)</span>
            </div>

            <div class="input-field">
              <label>Annual Cost of Proposed Safeguard (ACC) - $ / ₹</label>
              <input type="number" id="calc-acc" value="35000" min="0" step="500">
              <span class="help-text">Annual cost of license, maintenance, and operation of countermeasure</span>
            </div>

            <div class="input-field">
              <label>Residual Exposure Factor with Safeguard (%)</label>
              <input type="number" id="calc-residual-ef" value="10" min="0" max="100" step="1">
              <span class="help-text">Reduced damage percentage after control implementation (e.g. 10%)</span>
            </div>
          </div>

          <div class="calc-results">
            <div>
              <h4 style="color: var(--text-primary); font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                Mathematical Computation Results
              </h4>

              <div class="result-card-metric">
                <span class="metric-title">Single Loss Expectancy (SLE):</span>
                <span class="metric-val" id="res-sle">$200,000</span>
              </div>

              <div class="result-card-metric">
                <span class="metric-title">Inherent Annual Loss (ALE Before):</span>
                <span class="metric-val" id="res-ale-before">$100,000 / yr</span>
              </div>

              <div class="result-card-metric">
                <span class="metric-title">Residual Annual Loss (ALE After):</span>
                <span class="metric-val" id="res-ale-after" style="color: var(--accent-emerald);">$25,000 / yr</span>
              </div>

              <div class="result-card-metric">
                <span class="metric-title">Gross Risk Reduction (ΔALE):</span>
                <span class="metric-val" id="res-delta-ale">$75,000 / yr</span>
              </div>

              <div class="result-card-metric">
                <span class="metric-title">Net Annual Benefit (CBA):</span>
                <span class="metric-val" id="res-net-cba" style="color: var(--accent-cyan); font-size: 1.35rem;">+$40,000 / yr</span>
              </div>
            </div>

            <div class="recommendation-badge" id="res-recommendation">
              <strong>Recommendation:</strong> Economically Justified. The proposed safeguard saves $40,000 annually over its cost. Proceed with acquisition.
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach listeners
    ['calc-av', 'calc-ef', 'calc-aro', 'calc-acc', 'calc-residual-ef'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateCalculator);
    });

    updateCalculator();
  }

  function updateCalculator() {
    const av = parseFloat(document.getElementById('calc-av').value) || 0;
    const efPercent = parseFloat(document.getElementById('calc-ef').value) || 0;
    const aro = parseFloat(document.getElementById('calc-aro').value) || 0;
    const acc = parseFloat(document.getElementById('calc-acc').value) || 0;
    const residualEfPercent = parseFloat(document.getElementById('calc-residual-ef').value) || 0;

    const ef = efPercent / 100;
    const residualEf = residualEfPercent / 100;

    const sle = av * ef;
    const aleBefore = sle * aro;

    const sleAfter = av * residualEf;
    const aleAfter = sleAfter * aro;

    const deltaAle = aleBefore - aleAfter;
    const netBenefit = deltaAle - acc;

    document.getElementById('res-sle').textContent = formatCurrency(sle);
    document.getElementById('res-ale-before').textContent = `${formatCurrency(aleBefore)} / yr`;
    document.getElementById('res-ale-after').textContent = `${formatCurrency(aleAfter)} / yr`;
    document.getElementById('res-delta-ale').textContent = `${formatCurrency(deltaAle)} / yr`;

    const netCbaEl = document.getElementById('res-net-cba');
    const recEl = document.getElementById('res-recommendation');

    if (netBenefit >= 0) {
      netCbaEl.textContent = `+${formatCurrency(netBenefit)} / yr`;
      netCbaEl.style.color = 'var(--accent-emerald)';
      recEl.style.background = 'rgba(16, 185, 129, 0.12)';
      recEl.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      recEl.style.color = 'var(--accent-emerald)';
      recEl.innerHTML = `<strong>✅ Executive Recommendation: Economically Justified.</strong><br>Deploying this control produces a positive return on security investment (ROSI), yielding ${formatCurrency(netBenefit)} in net annual savings.`;
    } else {
      netCbaEl.textContent = `-${formatCurrency(Math.abs(netBenefit))} / yr`;
      netCbaEl.style.color = 'var(--accent-rose)';
      recEl.style.background = 'rgba(244, 63, 94, 0.12)';
      recEl.style.borderColor = 'rgba(244, 63, 94, 0.3)';
      recEl.style.color = 'var(--accent-rose)';
      recEl.innerHTML = `<strong>⚠️ Executive Recommendation: Control Overpriced.</strong><br>The cost of the safeguard (${formatCurrency(acc)}) exceeds the financial risk reduction (${formatCurrency(deltaAle)}). Consider <em>Risk Transference</em> (Cyber Insurance) or <em>Risk Acceptance</em>.`;
    }
  }

  function formatCurrency(val) {
    return '$' + Math.round(val).toLocaleString();
  }

  // ==========================================================================
  // Tool 2: 7 Domains of IT Infrastructure Explorer
  // ==========================================================================

  function renderDomainsExplorer() {
    contentArea.innerHTML = `
      <div class="tool-container">
        <div class="tool-header">
          <h3>🏛️ The Seven Domains of IT Infrastructure Interactive Explorer</h3>
          <p>
            Explore the Martin Weiss & Michael Solomon architectural framework covered in <strong>Unit II</strong>. 
            Click on each domain to examine target components, common threat vectors, statutory compliance drivers, and mandatory auditor inspection procedures.
          </p>
        </div>

        <div class="domain-tabs-nav" id="domain-tabs">
          ${SEVEN_DOMAINS_DATA.map(d => `
            <button class="domain-tab-btn ${d.id === activeDomainId ? 'active' : ''}" data-domain="${d.id}">
              ${d.number}: ${d.name}
            </button>
          `).join('')}
        </div>

        <div id="domain-content-area"></div>
      </div>
    `;

    // Click handler
    contentArea.querySelectorAll('.domain-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeDomainId = btn.getAttribute('data-domain');
        contentArea.querySelectorAll('.domain-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderActiveDomainDetails();
      });
    });

    renderActiveDomainDetails();
  }

  function renderActiveDomainDetails() {
    const domain = SEVEN_DOMAINS_DATA.find(d => d.id === activeDomainId) || SEVEN_DOMAINS_DATA[0];
    const container = document.getElementById('domain-content-area');
    if (!container) return;

    container.innerHTML = `
      <div class="domain-display-card">
        <div class="domain-box">
          <h5>🖥️ Typical Devices & Entities</h5>
          <ul>
            ${domain.devices.map(dev => `<li>${dev}</li>`).join('')}
          </ul>

          <h5 style="margin-top: 1.25rem;">⚡ Threat Vectors & Vulnerabilities</h5>
          <ul>
            ${domain.threats.map(thr => `<li>${thr}</li>`).join('')}
          </ul>
        </div>

        <div class="domain-box">
          <h5>📜 Compliance Laws & Hardening Baselines</h5>
          <ul>
            ${domain.complianceDrivers.map(cd => `<li>${cd}</li>`).join('')}
          </ul>

          <h5 style="margin-top: 1.25rem;">🔍 Mandatory Audit Inspection Steps</h5>
          <ul>
            ${domain.auditProcedures.map(ap => `<li>${ap}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    contentArea.querySelectorAll('.overview-unit-progress-card').forEach(card => {
      card.addEventListener('click', () => {
        const uid = card.getAttribute('data-unit-id');
        switchView(uid);
      });
    });
  }

  // ==========================================================================
  // Tool 3: IT Act 2000 & 2008 Statutory Directory
  // ==========================================================================

  function renderITActDirectory() {
    contentArea.innerHTML = `
      <div class="tool-container">
        <div class="tool-header">
          <h3>⚖️ Indian Information Technology Act, 2000 & 2008 Directory</h3>
          <p>
            Statutory reference directory covering core penal and civil sections from <strong>Unit IV</strong>. 
            Filter by classification or search for terms like "hacking", "pornography", "privacy", "CSAM", or "terrorism".
          </p>
        </div>

        <div class="act-table-controls">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="act-category-filters">
            <button class="filter-chip active" data-cat="all">All Sections (${IT_ACT_SECTIONS.length})</button>
            <button class="filter-chip" data-cat="Civil Liability">Civil Penalties</button>
            <button class="filter-chip" data-cat="Offence">Criminal Offences</button>
            <button class="filter-chip" data-cat="National Security">National Security</button>
            <button class="filter-chip" data-cat="Privacy Offence">Privacy</button>
            <button class="filter-chip" data-cat="Child Protection">CSAM / Child Protection</button>
          </div>
        </div>

        <div class="act-table-container">
          <table class="act-table">
            <thead>
              <tr>
                <th style="width: 140px;">Section</th>
                <th style="width: 240px;">Offence Title</th>
                <th>Statutory Description</th>
                <th style="width: 200px;">Prescribed Penalty</th>
                <th style="width: 130px;">Classification</th>
              </tr>
            </thead>
            <tbody id="act-table-body">
              ${renderITActRows('all')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Filter clicks
    contentArea.querySelectorAll('#act-category-filters .filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        contentArea.querySelectorAll('#act-category-filters .filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        document.getElementById('act-table-body').innerHTML = renderITActRows(cat);
      });
    });
  }

  function renderITActRows(category) {
    let list = IT_ACT_SECTIONS.filter(sec => {
      const matchCat = (category === 'all') || (sec.category === category);
      const matchSearch = !searchQuery ||
        sec.section.toLowerCase().includes(searchQuery) ||
        sec.title.toLowerCase().includes(searchQuery) ||
        sec.description.toLowerCase().includes(searchQuery) ||
        sec.penalty.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (list.length === 0) {
      return `<tr><td colspan="5" style="text-align: center; padding: 2rem;">No statutory sections found matching criteria.</td></tr>`;
    }

    return list.map(sec => {
      let badgeClass = 'bailable';
      if (sec.bailable === 'Non-Bailable') badgeClass = 'felony';
      if (sec.bailable === 'N/A (Civil)') badgeClass = 'civil';

      return `
        <tr>
          <td><strong style="color: var(--accent-cyan);">${sec.section}</strong></td>
          <td><strong>${sec.title}</strong></td>
          <td>${sec.description}</td>
          <td style="color: var(--accent-amber); font-weight: 600;">${sec.penalty}</td>
          <td>
            <span class="act-badge ${badgeClass}">${sec.bailable}</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================================================
  // Tool 4: Audit Readiness Checklist
  // ==========================================================================

  function renderAuditChecklist() {
    contentArea.innerHTML = `
      <div class="tool-container">
        <div class="tool-header">
          <h3>✅ Interactive Compliance Audit Readiness Checklist</h3>
          <p>
            Evaluate organizational preparedness against ISO 27001, IT Act Section 43A, and BCP standards. 
            Toggle controls to calculate your live <strong>Audit Readiness Score</strong>.
          </p>
        </div>

        <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Current Compliance Rating</div>
            <div id="checklist-score-text" style="font-size: 2.2rem; font-weight: 800; color: var(--accent-cyan);">0% • Non-Compliant</div>
          </div>
          <div style="max-width: 400px; font-size: 0.85rem; color: var(--text-secondary);" id="checklist-verdict">
            Select implemented controls below to assess enterprise readiness for a formal third-party audit.
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="checklist-items">
          ${AUDIT_CHECKLIST_DATA.map(item => `
            <label style="display: flex; align-items: flex-start; gap: 0.85rem; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; cursor: pointer; transition: var(--transition);">
              <input type="checkbox" class="audit-checkbox" data-id="${item.id}" data-weight="${item.weight}" style="margin-top: 0.25rem; width: 18px; height: 18px; accent-color: var(--accent-cyan); cursor: pointer;">
              <div style="flex: 1;">
                <span class="card-tag" style="margin-bottom: 0.35rem; display: inline-block;">${item.category}</span>
                <div style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.4;">${item.text}</div>
              </div>
            </label>
          `).join('')}
        </div>
      </div>
    `;

    contentArea.querySelectorAll('.audit-checkbox').forEach(cb => {
      cb.addEventListener('change', updateChecklistScore);
    });
  }

  function updateChecklistScore() {
    const checkboxes = contentArea.querySelectorAll('.audit-checkbox');
    let totalScore = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        totalScore += parseInt(cb.getAttribute('data-weight'), 10);
      }
    });

    const scoreEl = document.getElementById('checklist-score-text');
    const verdictEl = document.getElementById('checklist-verdict');
    if (!scoreEl) return;

    if (totalScore >= 90) {
      scoreEl.textContent = `${totalScore}% • Audit Ready (Unqualified Opinion)`;
      scoreEl.style.color = 'var(--accent-emerald)';
      verdictEl.textContent = 'Excellent posture! Systems and controls are robust, well-documented, and ready for statutory certification.';
    } else if (totalScore >= 60) {
      scoreEl.textContent = `${totalScore}% • Substantial Gaps (Qualified Opinion)`;
      scoreEl.style.color = 'var(--accent-amber)';
      verdictEl.textContent = 'Core controls are present, but multiple high-severity non-conformities remain. Address gaps in BCP, remote access, or patching.';
    } else {
      scoreEl.textContent = `${totalScore}% • Critical Deficiency (Adverse Opinion)`;
      scoreEl.style.color = 'var(--accent-rose)';
      verdictEl.textContent = 'High exposure to statutory penalties, data breach liability, and failed external audit.';
    }
  }

  // ==========================================================================
  // Knowledge Check Quiz View
  // ==========================================================================

  function renderQuiz() {
    quizCurrentIndex = 0;
    quizAnswers = {};
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = QUIZ_DATA[quizCurrentIndex];
    const total = QUIZ_DATA.length;
    const answered = Object.keys(quizAnswers).length;

    contentArea.innerHTML = `
      <div class="quiz-container">
        <div class="unit-banner" style="margin-bottom: 1.5rem; padding: 1.25rem 1.75rem;">
          <div class="banner-meta">
            <span class="banner-unit-badge">Knowledge Check</span>
            <span class="banner-hours">Question ${quizCurrentIndex + 1} of ${total}</span>
          </div>
          <h2 style="font-size: 1.35rem; margin-bottom: 0.25rem;">Cyber Law, Risk and Compliance Mock Examination</h2>
          <p class="banner-summary" style="font-size: 0.85rem;">
            Test your mastery across all four units before mid-semester and university terminal exams.
          </p>
        </div>

        <div class="quiz-question-card">
          <div class="quiz-meta">
            <span class="quiz-unit-tag">${q.unitTitle}</span>
            <span class="quiz-number">Answered: ${answered} / ${total}</span>
          </div>

          <div class="quiz-text">${q.question}</div>

          <div class="quiz-options">
            ${q.options.map((opt, idx) => {
              const isSelected = quizAnswers[q.id] === idx;
              let extraClass = '';
              if (quizAnswers[q.id] !== undefined) {
                if (idx === q.answer) extraClass = 'correct';
                else if (isSelected) extraClass = 'incorrect';
              }
              return `
                <button class="quiz-option ${extraClass} ${isSelected ? 'selected' : ''}" data-idx="${idx}">
                  ${opt}
                </button>
              `;
            }).join('')}
          </div>

          <div class="quiz-explanation" id="quiz-explanation-box" style="${quizAnswers[q.id] !== undefined ? 'display: block;' : ''}">
            <strong>Explanation:</strong> ${q.explanation}
          </div>

          <div class="quiz-footer">
            <button class="header-btn" id="quiz-prev-btn" ${quizCurrentIndex === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
              ← Previous
            </button>
            <span style="font-size: 0.82rem; color: var(--text-muted);">
              Question ${quizCurrentIndex + 1} of ${total}
            </span>
            ${quizCurrentIndex < total - 1 ? `
              <button class="header-btn primary" id="quiz-next-btn">
                Next →
              </button>
            ` : `
              <button class="header-btn primary" id="quiz-finish-btn">
                Finish & View Score 🏆
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    // Attach listeners
    contentArea.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizAnswers[q.id] !== undefined) return; // already answered
        const chosen = parseInt(btn.getAttribute('data-idx'), 10);
        quizAnswers[q.id] = chosen;
        renderQuizQuestion();
      });
    });

    const prevBtn = document.getElementById('quiz-prev-btn');
    if (prevBtn && quizCurrentIndex > 0) {
      prevBtn.addEventListener('click', () => {
        quizCurrentIndex--;
        renderQuizQuestion();
      });
    }

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        quizCurrentIndex++;
        renderQuizQuestion();
      });
    }

    const finishBtn = document.getElementById('quiz-finish-btn');
    if (finishBtn) {
      finishBtn.addEventListener('click', showQuizSummary);
    }
  }

  function showQuizSummary() {
    let score = 0;
    QUIZ_DATA.forEach(q => {
      if (quizAnswers[q.id] === q.answer) score++;
    });

    const percent = Math.round((score / QUIZ_DATA.length) * 100);

    contentArea.innerHTML = `
      <div class="quiz-container">
        <div class="tool-container" style="text-align: center; padding: 3rem 2rem;">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">
            ${percent >= 80 ? '🎉' : percent >= 60 ? '👍' : '📚'}
          </div>
          <h2 style="font-size: 1.8rem; color: var(--text-primary); margin-bottom: 0.5rem;">
            Quiz Completed!
          </h2>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-cyan); margin-bottom: 1rem;">
            ${score} / ${QUIZ_DATA.length} (${percent}%)
          </div>
          <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 2rem auto; font-size: 0.95rem;">
            ${percent >= 80 
              ? 'Outstanding performance! You have demonstrated deep academic comprehension of cyber law, risk analysis formulas, and audit frameworks.' 
              : percent >= 60 
              ? 'Good effort! Review the deep dive splash cards in Unit II and Unit IV to strengthen your recall on IT Act sections and 7 Domains.' 
              : 'Keep studying! Focus on quantitative formulas (ALE = SLE * ARO) and the difference between assessments and audits.'}
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem;">
            <button class="header-btn primary" id="quiz-retry-btn">
              🔄 Retake Quiz
            </button>
            <button class="header-btn" id="quiz-review-units-btn">
              📖 Review Units
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('quiz-retry-btn').addEventListener('click', () => {
      quizAnswers = {};
      quizCurrentIndex = 0;
      renderQuizQuestion();
    });

    document.getElementById('quiz-review-units-btn').addEventListener('click', () => {
      switchView('unit-1');
    });
  }

  // ==========================================================================
  // User Management & Access Control Database View
  // ==========================================================================

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderAccessDenied() {
    contentArea.innerHTML = `
      <div class="user-db-container" style="max-width: 720px; margin: 2rem auto; text-align: center;">
        <div class="user-add-panel" style="padding: 3rem 2.5rem; border-top: 4px solid var(--accent-rose, #f25022);">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">🚫</div>
          <h2 style="font-size: 1.6rem; color: var(--accent-rose, #f25022); margin-bottom: 0.75rem;">
            Access Denied: Administrative Privileges Required
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
            The User Database and Credential Management Console is restricted strictly to authorized <strong>Admin</strong> accounts.
            Under <strong>Section 43 & Section 66 of the Information Technology Act 2000</strong>, unauthorized inspection or modification of system user records is prohibited.
          </p>
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(242, 80, 34, 0.08); border: 1px solid rgba(242, 80, 34, 0.25); padding: 0.6rem 1.25rem; border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-primary); margin-bottom: 2rem;">
            <span>👤 Current Session:</span>
            <strong>${escapeHtml(authUser?.name || 'Guest')}</strong>
            <span style="color: var(--text-muted);">(@${escapeHtml(authUser?.username || 'unknown')})</span>
            <span>· Role:</span>
            <span class="role-badge-chip ${(authUser?.role || 'student').toLowerCase()}">${escapeHtml(authUser?.role || 'Student')}</span>
          </div>
          <div style="display: flex; justify-content: center; gap: 1rem;">
            <button class="fluent-btn-primary" id="btn-return-overview" style="background: var(--accent-blue); color: white; padding: 0.65rem 1.5rem; border-radius: var(--radius-sm); border: none; font-weight: 600; cursor: pointer;">
              <span>📋 Return to Course Overview</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-return-overview')?.addEventListener('click', () => {
      switchView('overview');
    });
  }

  function renderUserManagement() {
    // RBAC: Restrict to Admin only
    if (!isCurrentUserAdmin()) {
      renderAccessDenied();
      return;
    }

    const totalUsers = userDatabase.length;
    const studentCount = userDatabase.filter(u => u.role === 'Student').length;
    const profCount = userDatabase.filter(u => u.role === 'Professor').length;

    contentArea.innerHTML = `
      <div class="user-db-container">
        <!-- Top Banner -->
        <div class="user-db-banner">
          <h2>NFSU User Database & Access Control Management</h2>
          <p>
            Centralized administrative directory for Course FSMS23 SIII SP-V P1. All users registered below or at the login screen 
            are permanently recorded in <code>data/users.json</code> and grant immediate authentication privileges.
          </p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.75rem;">
            <div class="user-db-sync-chip">
              <span class="status-indicator-dot online"></span>
              <span>Persistent Disk Storage Synced: <code>data/users.json</code></span>
            </div>
            <div class="user-db-sync-chip" style="background: rgba(0, 103, 184, 0.08); color: var(--accent-blue); border-color: rgba(0, 103, 184, 0.25);">
              <span>🛡️ Client SQLi Filter: Enforced</span>
            </div>
            <div class="user-db-sync-chip" style="background: rgba(116, 77, 169, 0.08); color: var(--accent-purple); border-color: rgba(116, 77, 169, 0.25);">
              <span>🔒 Admin Privilege: Active</span>
            </div>
          </div>
        </div>

        <!-- 4-Card Stats Grid -->
        <div class="user-db-stats-grid">
          <div class="user-stat-card">
            <div class="user-stat-icon">👥</div>
            <div class="user-stat-info">
              <strong>${totalUsers}</strong>
              <span>Total Accounts</span>
            </div>
          </div>
          <div class="user-stat-card">
            <div class="user-stat-icon">🎓</div>
            <div class="user-stat-info">
              <strong>${studentCount}</strong>
              <span>Students Enrolled</span>
            </div>
          </div>
          <div class="user-stat-card">
            <div class="user-stat-icon">👨‍🏫</div>
            <div class="user-stat-info">
              <strong>${profCount}</strong>
              <span>Faculty Members</span>
            </div>
          </div>
          <div class="user-stat-card">
            <div class="user-stat-icon">⚖️</div>
            <div class="user-stat-info">
              <strong style="color: var(--accent-emerald, #107c41); font-size: 1.15rem;">Sec 43 / 66</strong>
              <span>IT Act 2000 Enforced</span>
            </div>
          </div>
        </div>

        <!-- Add User Panel -->
        <div class="user-add-panel" id="add-user-section">
          <div class="uap-header">
            <h3><span>➕</span> Add New User to Database</h3>
            <span>Persists to disk and memory instantly</span>
          </div>

          <div id="panel-user-alert" class="auth-alert" style="display: none; margin-bottom: 1.25rem;"></div>

          <form id="panel-add-user-form" autocomplete="off">
            <div class="form-row-2col">
              <div class="fluent-form-group">
                <label for="p-fullname">Full Name <span class="required-star">*</span></label>
                <input type="text" id="p-fullname" class="fluent-input" placeholder="e.g. Dr. Rajesh Varma" required />
              </div>
              <div class="fluent-form-group">
                <label for="p-username">Username <span class="required-star">*</span></label>
                <input type="text" id="p-username" class="fluent-input" placeholder="e.g. rajesh.v" required />
              </div>
            </div>

            <div class="form-row-2col">
              <div class="fluent-form-group">
                <label for="p-role">Academic Role <span class="required-star">*</span></label>
                <select id="p-role" class="fluent-select" required>
                  <option value="Student">Student (MSc Cyber Forensics)</option>
                  <option value="Professor">Professor (Faculty & Evaluator)</option>
                </select>
              </div>
              <div class="fluent-form-group">
                <label for="p-password">Password <span class="required-star">*</span></label>
                <div class="password-input-wrap">
                  <input type="password" id="p-password" class="fluent-input" placeholder="Enter secure password" required />
                  <button type="button" class="btn-toggle-pw" id="p-toggle-pw-btn" title="Toggle password visibility">
                    <span id="p-pw-icon">👁️</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="form-row-2col">
              <div class="fluent-form-group">
                <label for="p-id">Roll No. / Faculty ID <span class="optional-tag">(Optional)</span></label>
                <input type="text" id="p-id" class="fluent-input" placeholder="e.g. FSMS23-018 or FAC-CYBER-09" />
              </div>
              <div class="fluent-form-group">
                <label for="p-email">Academic Email <span class="optional-tag">(Optional)</span></label>
                <input type="email" id="p-email" class="fluent-input" placeholder="e.g. user@nfsu.ac.in" />
              </div>
            </div>

            <div class="modal-actions-row" style="margin-top: 1.25rem;">
              <button type="button" class="btn-cancel" id="p-clear-btn">Clear</button>
              <button type="submit" class="auth-submit-btn" id="p-submit-btn" style="flex: 1; justify-content: center;">
                <span id="p-spinner" class="login-spinner" style="display: none;"></span>
                <span>💾 Add User to Database</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Registered Users Directory Table -->
        <div class="user-table-card">
          <div class="utc-header">
            <h3><span>📋</span> Registered Users Directory</h3>
            <div>
              <span class="nav-badge" style="font-size: 0.8rem; padding: 0.3rem 0.75rem;">${userDatabase.length} Active Accounts</span>
            </div>
          </div>

          <div class="user-table-wrap">
            <table class="user-db-table">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Role</th>
                  <th>Roll / Faculty ID</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="user-table-tbody">
                ${userDatabase.map(user => {
                  const isPrimaryAdmin = user.username.toLowerCase() === 'admin';
                  const roleLower = (user.role || 'Student').toLowerCase();
                  return `
                    <tr data-username="${escapeHtml(user.username)}">
                      <td>
                        <div class="user-cell">
                          <span class="user-cell-avatar">${user.avatar || (user.role === 'Professor' ? '👨‍🏫' : '🎓')}</span>
                          <div class="user-cell-meta">
                            <strong>${escapeHtml(user.name)}</strong>
                            <small>@${escapeHtml(user.username)}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="role-badge-chip ${roleLower}">${escapeHtml(user.role || 'Student')}</span>
                      </td>
                      <td>
                        <code>${escapeHtml(user.id || 'N/A')}</code>
                      </td>
                      <td>
                        ${escapeHtml(user.email || 'N/A')}
                      </td>
                      <td>
                        <div class="table-actions-cell">
                          <button class="btn-table-action login-as-btn" data-username="${escapeHtml(user.username)}" title="Sign in as this user">
                            🔑 Sign In
                          </button>
                          ${isPrimaryAdmin ? `
                            <span style="font-size: 0.72rem; color: var(--text-muted); padding: 0.2rem 0.5rem;">🔒 Primary Admin</span>
                          ` : `
                            <button class="btn-table-action delete delete-user-btn" data-username="${escapeHtml(user.username)}" title="Delete user from database">
                              🗑️ Delete
                            </button>
                          `}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Event Listeners for Panel Add User Form
    const pForm = document.getElementById('panel-add-user-form');
    const pAlert = document.getElementById('panel-user-alert');
    const pSubmitBtn = document.getElementById('p-submit-btn');
    const pSpinner = document.getElementById('p-spinner');
    const pTogglePw = document.getElementById('p-toggle-pw-btn');
    const pPwInput = document.getElementById('p-password');
    const pPwIcon = document.getElementById('p-pw-icon');
    const pClearBtn = document.getElementById('p-clear-btn');

    if (pTogglePw && pPwInput && pPwIcon) {
      pTogglePw.addEventListener('click', () => {
        const isPassword = pPwInput.getAttribute('type') === 'password';
        pPwInput.setAttribute('type', isPassword ? 'text' : 'password');
        pPwIcon.textContent = isPassword ? '🙈' : '👁️';
      });
    }

    if (pClearBtn && pForm) {
      pClearBtn.addEventListener('click', () => {
        pForm.reset();
        if (pAlert) pAlert.style.display = 'none';
      });
    }

    if (pForm) {
      pForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullname = document.getElementById('p-fullname').value.trim();
        const username = document.getElementById('p-username').value.trim();
        const role = document.getElementById('p-role').value;
        const password = document.getElementById('p-password').value;
        const idNumber = document.getElementById('p-id').value.trim();
        const email = document.getElementById('p-email').value.trim();

        if (!fullname || !username || !password) {
          if (pAlert) {
            pAlert.className = 'auth-alert error';
            pAlert.innerHTML = '<span>⚠️</span> <span>Please fill in Full Name, Username, and Password.</span>';
            pAlert.style.display = 'flex';
          }
          return;
        }

        // Apply Client-Side SQLi Filter & Input Validation
        const clientValidation = validateUserInputFields({
          name: fullname,
          username,
          role,
          password,
          id: idNumber,
          email
        });
        if (!clientValidation.valid) {
          if (pAlert) {
            pAlert.className = 'auth-alert error';
            pAlert.innerHTML = `<span>🛡️</span> <span>${escapeHtml(clientValidation.message)}</span>`;
            pAlert.style.display = 'flex';
          }
          return;
        }

        // Multi-Field Duplicate Information Check
        const dupCheck = checkDuplicateUser({
          name: fullname,
          username,
          role,
          password,
          id: idNumber,
          email
        });
        if (dupCheck.isDuplicate) {
          if (pAlert) {
            pAlert.className = 'auth-alert error';
            pAlert.innerHTML = `<span>⚠️</span> <span>${escapeHtml(dupCheck.message)}</span>`;
            pAlert.style.display = 'flex';
          }
          return;
        }

        if (pSpinner) pSpinner.style.display = 'inline-block';
        if (pSubmitBtn) pSubmitBtn.disabled = true;

        const result = await addUserToDatabase({
          name: fullname,
          username,
          role,
          password,
          id: idNumber,
          email
        });

        if (pSpinner) pSpinner.style.display = 'none';
        if (pSubmitBtn) pSubmitBtn.disabled = false;

        if (result.success) {
          if (pAlert) {
            pAlert.className = 'auth-alert success';
            pAlert.innerHTML = `<span>✅</span> <span>${escapeHtml(result.message || 'User registered successfully!')}</span>`;
            pAlert.style.display = 'flex';
          }
          pForm.reset();
          buildSidebar();
          setTimeout(() => {
            renderUserManagement();
          }, 600);
        } else {
          if (pAlert) {
            pAlert.className = 'auth-alert error';
            pAlert.innerHTML = `<span>⚠️</span> <span>${escapeHtml(result.message || 'Failed to add user.')}</span>`;
            pAlert.style.display = 'flex';
          }
        }
      });
    }

    // Attach Table Actions (Sign In As & Delete)
    contentArea.querySelectorAll('.login-as-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const username = btn.getAttribute('data-username');
        const targetUser = userDatabase.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (targetUser) {
          authUser = {
            id: targetUser.id,
            name: targetUser.name,
            username: targetUser.username,
            role: targetUser.role === 'Professor' ? 'Professor (Course Faculty)' : 'Student (Cyber Forensics)',
            academicRole: targetUser.role,
            roleDescription: targetUser.roleDescription || (targetUser.role === 'Professor' ? 'Course Faculty & Evaluator' : 'MSc Forensic Science (Cyber Forensics) SEM III'),
            avatar: targetUser.avatar || (targetUser.role === 'Professor' ? '👨‍🏫' : '🎓'),
            email: targetUser.email
          };
          localStorage.setItem('cyber_auth_user', JSON.stringify(authUser));
          updateAuthDisplay();
          renderUserManagement();
        }
      });
    });

    contentArea.querySelectorAll('.delete-user-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const username = btn.getAttribute('data-username');
        const deleted = await deleteUserFromDatabase(username);
        if (deleted) {
          buildSidebar();
          renderUserManagement();
        }
      });
    });
  }

});
