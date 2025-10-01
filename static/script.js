document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageEl = document.getElementById('message');

    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        messageEl.textContent = '';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        messageEl.textContent = '';
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        messageEl.textContent = data.message;
        
        if (response.ok) {
            messageEl.style.color = 'green';
            registerForm.reset();
            // Switch to login view after successful registration
            setTimeout(() => {
                showLoginLink.click();
            }, 1000);
        } else {
            messageEl.style.color = 'red';
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        messageEl.textContent = data.message;

        if (response.ok) {
            messageEl.style.color = 'green';
            // Here you would typically redirect the user or update the UI
            alert('Login successful! You would be redirected to the main app now.');
        } else {
            messageEl.style.color = 'red';
        }
    });
});
