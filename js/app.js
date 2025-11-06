// ============================================
// HARDCODED DATA
// ============================================

// Users database
const USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    fullName: 'Juan Administrador',
    role: 'Administrador',
    email: 'admin@hospital.com'
  },
  {
    id: 2,
    username: 'doctor',
    password: 'doctor123',
    fullName: 'Dra. María García',
    role: 'Doctor',
    email: 'doctor@hospital.com'
  },
  {
    id: 3,
    username: 'nurse',
    password: 'nurse123',
    fullName: 'Pedro Enfermero',
    role: 'Enfermero',
    email: 'nurse@hospital.com'
  }
];

// Patients data
const PATIENTS = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    status: 'Estable',
    date: '2025-11-05',
    statusColor: 'green'
  },
  {
    id: 2,
    name: 'Ana Martínez',
    status: 'En tratamiento',
    date: '2025-11-05',
    statusColor: 'yellow'
  },
  {
    id: 3,
    name: 'Luis Pérez',
    status: 'Crítico',
    date: '2025-11-04',
    statusColor: 'red'
  },
  {
    id: 4,
    name: 'Carmen López',
    status: 'Estable',
    date: '2025-11-04',
    statusColor: 'green'
  },
  {
    id: 5,
    name: 'Roberto Sánchez',
    status: 'En observación',
    date: '2025-11-03',
    statusColor: 'yellow'
  }
];

// Appointments data
const APPOINTMENTS = [
  {
    id: 1,
    patientName: 'María González',
    doctor: 'Dr. Ramírez',
    time: '10:00 AM',
    type: 'Consulta General'
  },
  {
    id: 2,
    patientName: 'José Hernández',
    doctor: 'Dra. García',
    time: '11:30 AM',
    type: 'Cardiología'
  },
  {
    id: 3,
    patientName: 'Laura Díaz',
    doctor: 'Dr. Torres',
    time: '02:00 PM',
    type: 'Pediatría'
  },
  {
    id: 4,
    patientName: 'Miguel Ruiz',
    doctor: 'Dra. Morales',
    time: '03:30 PM',
    type: 'Traumatología'
  },
  {
    id: 5,
    patientName: 'Patricia Castro',
    doctor: 'Dr. Vega',
    time: '04:45 PM',
    type: 'Oftalmología'
  }
];

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

function login(username, password) {
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    // Store user session (without password)
    const userSession = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    return { success: true, user: userSession };
  }
  return { success: false, message: 'Usuario o contraseña incorrectos' };
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function isAuthenticated() {
  return getCurrentUser() !== null;
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// ============================================
// UI RENDERING FUNCTIONS
// ============================================

function renderPatientsTable() {
  const tableBody = document.getElementById('patientsTable');
  if (!tableBody) return;

  const statusColors = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800'
  };

  const html = PATIENTS.map(patient => `
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm font-medium text-gray-900">${patient.name}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[patient.statusColor]}">
          ${patient.status}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${formatDate(patient.date)}
      </td>
    </tr>
  `).join('');

  tableBody.innerHTML = html;
}

function renderAppointmentsList() {
  const list = document.getElementById('appointmentsList');
  if (!list) return;

  const html = APPOINTMENTS.map(appointment => `
    <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
      <div class="flex-shrink-0">
        <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900">${appointment.patientName}</p>
        <p class="text-sm text-gray-500">${appointment.type} - ${appointment.doctor}</p>
        <p class="text-xs text-gray-400 mt-1">${appointment.time}</p>
      </div>
    </div>
  `).join('');

  list.innerHTML = html;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

// ============================================
// PAGE INITIALIZATION
// ============================================

// Initialize Login Page
function initLoginPage() {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');

  // Redirect if already logged in
  if (isAuthenticated()) {
    window.location.href = 'dashboard.html';
    return;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const result = login(username, password);

      if (result.success) {
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      } else {
        // Show error message
        errorMessage.classList.remove('hidden');
        errorMessage.querySelector('p').textContent = result.message;

        // Hide error after 3 seconds
        setTimeout(() => {
          errorMessage.classList.add('hidden');
        }, 3000);
      }
    });
  }
}

// Initialize Dashboard Page
function initDashboardPage() {
  // Check authentication
  if (!requireAuth()) return;

  const currentUser = getCurrentUser();

  // Update user info in navbar
  const userFullName = document.getElementById('userFullName');
  const userRole = document.getElementById('userRole');
  const welcomeMessage = document.getElementById('welcomeMessage');

  if (userFullName) {
    userFullName.textContent = currentUser.fullName;
  }

  if (userRole) {
    userRole.textContent = currentUser.role;
  }

  if (welcomeMessage) {
    const hour = new Date().getHours();
    let greeting = 'Buen día';
    if (hour >= 12 && hour < 18) {
      greeting = 'Buenas tardes';
    } else if (hour >= 18) {
      greeting = 'Buenas noches';
    }
    welcomeMessage.textContent = `${greeting}, ${currentUser.fullName}`;
  }

  // Render data
  renderPatientsTable();
  renderAppointmentsList();

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        logout();
      }
    });
  }
}

// ============================================
// AUTO-INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname;

  if (currentPage.includes('dashboard.html')) {
    initDashboardPage();
  } else if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('S12-web-estatica/')) {
    initLoginPage();
  }
});

