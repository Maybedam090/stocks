require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 3000;
const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

// In-memory user storage (non-persistent). This removes file-based storage.
let users = [];

async function loadUsers() { return users; }
async function saveUsers(u) { users = u; }
async function findUserById(id) { const u = users.find(user => user.id === id); return u || null; }
async function findUserByEmail(email) { return users.find(user => user.email === email) || null; }
async function findUserByUsername(username) { return users.find(user => user.username === username) || null; }
async function updateUser(updated) {
  const index = users.findIndex(user => user.id === updated.id);
  if (index === -1) throw new Error('User not found');
  users[index] = updated;
}

app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'stock-game-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));

app.use(async (req, res, next) => {
  if (req.session.userId) {
    req.user = await findUserById(req.session.userId);
  }
  next();
});

function ensureAuth(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

function ensureAdmin(req, res, next) {
  if (req.user && (req.user.email === adminEmail || req.user.isAdmin)) {
    return next();
  }
  res.status(403).json({ message: 'Forbidden' });
}

app.post('/api/signup', async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username, and password are required' });
  }
  const [existingEmail, existingUsername] = await Promise.all([
    findUserByEmail(email),
    findUserByUsername(username),
  ]);
  if (existingEmail || existingUsername) {
    return res.status(409).json({ message: 'Email or username already in use' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: randomUUID(),
    username,
    email,
    passwordHash,
    progress: {
      cash: 10000,
      portfolio: [],
      lastUpdate: new Date().toISOString(),
    },
  };
  const users = await loadUsers();
  users.push(user);
  await saveUsers(users);
  req.session.userId = user.id;
  res.json({ success: true });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  req.session.userId = user.id;
  res.json({ success: true });
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.get('/api/me', (req, res) => {
  if (!req.user) {
    return res.json({ loggedIn: false });
  }
  res.json({
    loggedIn: true,
    user: {
      username: req.user.username,
      email: req.user.email,
      progress: req.user.progress,
      isAdmin: !!req.user.isAdmin || req.user.email === adminEmail,
    },
  });
});

app.post('/api/progress', ensureAuth, async (req, res) => {
  const updates = req.body.progress;
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ message: 'Invalid progress data' });
  }
  try {
    req.user.progress = { ...req.user.progress, ...updates, lastUpdate: new Date().toISOString() };
    await updateUser(req.user);
    res.json({ success: true, progress: req.user.progress });
  } catch (error) {
    res.status(500).json({ message: 'Could not save progress' });
  }
});

app.get('/api/admin/users', ensureAdmin, async (req, res) => {
  const users = await loadUsers();
  res.json({ users: users.map(user => ({ id: user.id, username: user.username, email: user.email, isAdmin: !!user.isAdmin, progress: user.progress })) });
});

app.post('/api/admin/toggle-admin/:id', ensureAdmin, async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.isAdmin = !user.isAdmin;
  await updateUser(user);
  res.json({ success: true, isAdmin: !!user.isAdmin });
});

app.post('/api/admin/delete/:id', ensureAdmin, async (req, res) => {
  const users = await loadUsers();
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(idx, 1);
  await saveUsers(users);
  res.json({ success: true });
});

app.post('/api/admin/reset/:id', ensureAdmin, async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.progress = { cash: 10000, portfolio: [], lastUpdate: new Date().toISOString() };
  await updateUser(user);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
