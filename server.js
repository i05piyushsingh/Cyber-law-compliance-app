/**
 * Local HTTP Server for Cyber Law, Risk & Compliance Web Application
 * NFSU M.Sc. Forensic Science (Cyber Forensics) - FSMS26 SIII SP-V P1
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default initial user accounts
const INITIAL_USERS = [
  {
    id: "NFSU-STU-042",
    name: "Student",
    username: "Admin",
    role: "Student",
    roleDescription: "MSc Forensic Science (Cyber Forensics) SEM III",
    email: "student@nfsu.ac.in",
    avatar: "🎓",
    password: "Admin@123",
    createdAt: new Date().toISOString()
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
    createdAt: new Date().toISOString()
  }
];

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(INITIAL_USERS, null, 2), 'utf8');
}

function getUsersFromDisk() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading users from database:', e);
  }
  return INITIAL_USERS;
}

function saveUsersToDisk(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Error saving users to database:', e);
    return false;
  }
}

// SQL Injection Detection Patterns (Defense-in-Depth)
const SQLI_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|EXECUTE|UNION|DECLARE|CAST|CONVERT|WAITFOR|BENCHMARK|SLEEP)\b)/i,
  /(--|#|\/\*|\*\/)/,
  /('|"|;)/,
  /(\bOR\b\s+['"\d\w]+\s*=\s*['"\d\w]+)/i,
  /(\bAND\b\s+['"\d\w]+\s*=\s*['"\d\w]+)/i,
  /(xp_[a-zA-Z0-9_]+)/i,
  /(<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)/i
];

function containsSQLi(str) {
  if (typeof str !== 'string') return false;
  return SQLI_PATTERNS.some(p => p.test(str.trim()));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(204);
    res.end();
    return;
  }

  // API endpoint for health / info
  if (pathname === '/api/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      course: 'Cyber Law, Risk and Compliance',
      courseCode: 'FSMS26 SIII SP-V P1',
      institution: 'National Forensic Sciences University (NFSU)',
      program: 'MSc Forensic Science (Cyber Forensics) SEM III',
      status: 'online',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // API endpoint: GET /api/users
  if (pathname === '/api/users' && req.method === 'GET') {
    const users = getUsersFromDisk();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'success', count: users.length, users }));
    return;
  }

  // API endpoint: POST /api/users (Add new user to database)
  if (pathname === '/api/users' && req.method === 'POST') {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(bodyData || '{}');
        const { name, username, password, role, email, id } = payload;

        if (!name || !username || !password || !role) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: 'All fields (Name, Username, Password, Role) are required.'
          }));
          return;
        }

        // Server-Side SQLi & Input Validation
        if (containsSQLi(name) || containsSQLi(username) || containsSQLi(password) || (id && containsSQLi(id)) || (email && containsSQLi(email))) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: 'Security Alert (SQLi Filter): Malicious SQL injection payload or prohibited syntax detected in request payload.'
          }));
          return;
        }

        const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
        if (!usernameRegex.test(username.trim())) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: 'Username must be 3-30 characters long and contain only alphanumeric characters, dots, underscores, or hyphens.'
          }));
          return;
        }

        const users = getUsersFromDisk();
        const normUsername = username.trim().toLowerCase();
        const normName = name.trim().toLowerCase();
        const normId = id && id.trim() ? id.trim().toLowerCase() : null;
        const normEmail = email && email.trim() ? email.trim().toLowerCase() : `${normUsername}@nfsu.ac.in`;

        // Multi-Field Duplicate Prevention Check
        const dupUsername = users.find(u => (u.username || '').toLowerCase() === normUsername);
        if (dupUsername) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: `Duplicate Entry Denied: Username '${username.trim()}' is already registered in the database.`
          }));
          return;
        }

        const dupName = users.find(u => (u.name || '').toLowerCase() === normName);
        if (dupName) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: `Duplicate Entry Denied: A user with Full Name '${name.trim()}' is already registered (@${dupName.username}).`
          }));
          return;
        }

        if (normId) {
          const dupId = users.find(u => (u.id || '').toLowerCase() === normId);
          if (dupId) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              status: 'error',
              message: `Duplicate Entry Denied: Roll No. / Faculty ID '${id.trim()}' is already assigned to user @${dupId.username}.`
            }));
            return;
          }
        }

        const dupEmail = users.find(u => (u.email || '').toLowerCase() === normEmail);
        if (dupEmail) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: `Duplicate Entry Denied: Email address '${normEmail}' is already registered to user @${dupEmail.username}.`
          }));
          return;
        }

        const newUser = {
          id: id && id.trim() ? id.trim() : ('NFSU-' + (role === 'Professor' ? 'FAC-' : 'STU-') + Math.floor(100 + Math.random() * 900)),
          name: name.trim(),
          username: username.trim(),
          role: role.trim(),
          roleDescription: role === 'Professor' 
            ? 'Course Faculty & Evaluator' 
            : 'MSc Forensic Science (Cyber Forensics) SEM III',
          email: normEmail,
          avatar: role === 'Professor' ? '👨‍🏫' : '🎓',
          password: password.trim(),
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsersToDisk(users);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'success',
          message: `User '${newUser.name}' successfully added to database!`,
          user: newUser,
          count: users.length
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: err.message }));
      }
    });
    return;
  }

  // API endpoint: POST /api/users/delete (Delete user from database)
  if (pathname === '/api/users/delete' && req.method === 'POST') {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { username } = JSON.parse(bodyData || '{}');
        if (!username) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: 'Username is required.' }));
          return;
        }

        if (containsSQLi(username)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: 'Security Alert: Prohibited SQL Injection pattern detected in username parameter.'
          }));
          return;
        }

        if (username.toLowerCase() === 'admin') {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: 'Primary Admin account cannot be deleted.' }));
          return;
        }

        let users = getUsersFromDisk();
        const initialCount = users.length;
        users = users.filter(u => u.username.toLowerCase() !== username.toLowerCase());

        if (users.length === initialCount) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: 'User not found in database.' }));
          return;
        }

        saveUsersToDisk(users);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', message: `User '${username}' removed from database.`, count: users.length }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: err.message }));
      }
    });
    return;
  }

  // Normalize static file path
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Prevent directory traversal
  const safeSuffix = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safeSuffix);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA client-side routes if applicable
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Internal Server Error: ${readErr.message}`);
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`  Cyber Law, Risk and Compliance - Web Application`);
  console.log(`  Course: FSMS26 SIII SP-V P1 (NFSU M.Sc. Cyber Forensics)`);
  console.log(`  Application is running locally at:`);
  console.log(`  -> http://localhost:${PORT}`);
  console.log(`================================================================`);
});
