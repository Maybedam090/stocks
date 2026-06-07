const authActions = document.getElementById('auth-actions');
const progressState = document.getElementById('progress-state');
const simulateButton = document.getElementById('simulate-trade');
const saveButton = document.getElementById('save-progress');
const adminState = document.getElementById('admin-state');
const usersList = document.getElementById('users-list');
const adminSearch = document.getElementById('admin-search');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

async function fetchMe() {
  const response = await fetch('/api/me');
  return response.json();
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

async function loadHome() {
  const data = await fetchMe();
  if (!data.loggedIn) {
    progressState.innerHTML = '<p>You are not logged in. Use the form above to sign up or log in.</p>';
    return;
  }

  const { username, email, progress, isAdmin } = data.user;
  authActions.innerHTML = `<p>Signed in as <strong>${username}</strong> (${email})</p><a class="button secondary" href="/auth/logout">Logout</a>`;
  progressState.innerHTML = `
    <p><strong>Cash:</strong> ${formatCurrency(progress.cash || 0)}</p>
    <p><strong>Portfolio:</strong> ${progress.portfolio.length} items</p>
    <p><strong>Last saved:</strong> ${new Date(progress.lastUpdate).toLocaleString()}</p>
    <p>${isAdmin ? '<strong>Admin access enabled.</strong>' : ''}</p>
  `;
}

async function loadAdmin() {
  const data = await fetchMe();
  if (!data.loggedIn) {
    adminState.innerHTML = '<p>You must log in with the admin account to view this panel.</p>';
    return;
  }
  if (!data.user.isAdmin) {
    adminState.innerHTML = '<p>You are logged in, but you are not the admin.</p>';
    return;
  }
  adminState.innerHTML = `<p>Welcome, ${data.user.username}. You can manage user progress below.</p>`;

  const response = await fetch('/api/admin/users');
  const payload = await response.json();
  if (!payload.users || payload.users.length === 0) {
    usersList.innerHTML = '<p>No users found.</p>';
    return;
  }
  let users = payload.users;

  function renderUsers(filter = '') {
    const f = (filter || '').toLowerCase();
    const filtered = users.filter(u => u.username.toLowerCase().includes(f) || u.email.toLowerCase().includes(f));
    if (filtered.length === 0) {
      usersList.innerHTML = '<p>No users match that search.</p>';
      return;
    }
    usersList.innerHTML = filtered
      .map(user => `
        <div class="user-card">
          <p><strong>${user.username}</strong> ${user.isAdmin ? '<span style="color:green">(admin)</span>' : ''} <small>(${user.email})</small></p>
          <p>Cash: ${formatCurrency(user.progress.cash || 0)}</p>
          <p>Portfolio items: ${user.progress.portfolio.length}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="button secondary" onclick="resetUser('${user.id}')">Reset progress</button>
            <button class="button" onclick="toggleAdmin('${user.id}', this)">${user.isAdmin ? 'Remove admin' : 'Make admin'}</button>
            <button class="button secondary" onclick="deleteUser('${user.id}', this)">Delete user</button>
          </div>
        </div>
      `)
      .join('');
  }

  renderUsers('');
  if (adminSearch) {
    adminSearch.addEventListener('input', (e) => renderUsers(e.target.value));
  }
}

async function resetUser(id) {
  await fetch(`/api/admin/reset/${id}`, { method: 'POST' });
  await loadAdmin();
}

async function toggleAdmin(id, btn) {
  btn.disabled = true;
  const res = await fetch(`/api/admin/toggle-admin/${id}`, { method: 'POST' });
  const json = await res.json();
  btn.disabled = false;
  if (res.ok) {
    await loadAdmin();
  } else {
    alert(json.message || 'Could not toggle admin');
  }
}

async function deleteUser(id, btn) {
  if (!confirm('Delete this user permanently?')) return;
  btn.disabled = true;
  const res = await fetch(`/api/admin/delete/${id}`, { method: 'POST' });
  btn.disabled = false;
  if (res.ok) {
    await loadAdmin();
  } else {
    const j = await res.json();
    alert(j.message || 'Could not delete user');
  }
}

async function simulateTrade() {
  const data = await fetchMe();
  if (!data.loggedIn) {
    alert('Login first to simulate trades.');
    return;
  }
  const current = data.user.progress;
  const change = (Math.random() - 0.4) * 700;
  const nextCash = Math.max(0, (current.cash || 10000) + change);
  const nextPortfolio = [...current.portfolio];
  if (Math.random() > 0.5) {
    nextPortfolio.push({ symbol: 'STK', price: Math.round(100 + Math.random() * 400) });
  }
  progressState.innerHTML = `
    <p><strong>After simulation:</strong></p>
    <p><strong>Cash:</strong> ${formatCurrency(nextCash)}</p>
    <p><strong>Portfolio items:</strong> ${nextPortfolio.length}</p>
  `;
  saveButton.dataset.progress = JSON.stringify({ cash: nextCash, portfolio: nextPortfolio });
}

async function saveProgress() {
  const raw = saveButton.dataset.progress;
  if (!raw) {
    alert('Simulate a trade first before saving.');
    return;
  }
  const progress = JSON.parse(raw);
  await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ progress }),
  });
  alert('Progress saved!');
  await loadHome();
}

async function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const password = formData.get('password');
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();
  if (!response.ok) {
    alert(result.message || 'Login failed');
    return;
  }
  window.location.reload();
}

async function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const result = await response.json();
  if (!response.ok) {
    alert(result.message || 'Signup failed');
    return;
  }
  window.location.reload();
}

if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}
if (signupForm) {
  signupForm.addEventListener('submit', handleSignup);
}
if (simulateButton) {
  simulateButton.addEventListener('click', simulateTrade);
}
if (saveButton) {
  saveButton.addEventListener('click', saveProgress);
}

if (adminState) {
  loadAdmin();
} else if (progressState) {
  loadHome();
}
