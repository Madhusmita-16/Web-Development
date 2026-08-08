/**
 * NEXORA Authentication System — auth.js
 *
 * Features:
 *  - Sign In with email/password validation & localStorage auth session
 *  - Sign Up with duplicate email detection (no two accounts with same email)
 *  - Password strength meter
 *  - Password confirmation check
 *  - Forgot Password: email check → OTP verification (simulated) → new password
 *  - Show/hide password toggle
 *  - Toast notifications
 *  - Loading spinner on submit
 *  - RememberMe (persists login email)
 *  - Redirect to index.html after successful login/signup
 */

(() => {
    'use strict';

    /* -----------------------------------------------------------------------
       Constants & Helpers
    ----------------------------------------------------------------------- */
    const USERS_KEY   = 'nexora_users';
    const SESSION_KEY = 'nexora_session';

    // Retrieve all registered users from localStorage
    function getUsers() {
        try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
        catch { return []; }
    }

    // Save users array
    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    // Find user by email (case-insensitive)
    function findUser(email) {
        return getUsers().find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    }

    // Save active session
    function saveSession(user) {
        const session = { email: user.email, name: user.name, loggedIn: true, ts: Date.now() };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    // Redirect to main app
    function redirectToApp() {
        window.location.href = 'index.html';
    }

    // If already logged in, go to app immediately
    function checkSession() {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
        if (session && session.loggedIn) redirectToApp();
    }
    checkSession();

    // Simple email regex
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Hash password (SHA-256 via SubtleCrypto)
    async function hashPassword(password) {
        const encoded = new TextEncoder().encode(password);
        const hashBuf = await crypto.subtle.digest('SHA-256', encoded);
        return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /* -----------------------------------------------------------------------
       Panel Management
    ----------------------------------------------------------------------- */
    const panels = {
        signin: document.getElementById('signinPanel'),
        signup: document.getElementById('signupPanel'),
        forgot: document.getElementById('forgotPanel'),
    };

    function showPanel(name) {
        Object.values(panels).forEach(p => {
            if (!p) return;
            p.classList.add('d-none');
        });
        if (panels[name]) {
            panels[name].classList.remove('d-none');
            panels[name].style.animation = 'none';
            requestAnimationFrame(() => { panels[name].style.animation = ''; });
        }
    }

    // Switch buttons
    document.getElementById('showSignupBtn')?.addEventListener('click', () => showPanel('signup'));
    document.getElementById('showSigninBtn')?.addEventListener('click', () => showPanel('signin'));
    document.getElementById('showForgotBtn')?.addEventListener('click', () => showPanel('forgot'));
    document.getElementById('backToSigninBtn')?.addEventListener('click', () => {
        showPanel('signin');
        resetForgotFlow();
    });

    /* -----------------------------------------------------------------------
       Alert Helper
    ----------------------------------------------------------------------- */
    function showAlert(alertId, message, type = 'danger') {
        const el = document.getElementById(alertId);
        if (!el) return;
        const iconMap = {
            danger: 'fa-circle-exclamation',
            success: 'fa-circle-check',
            warning: 'fa-triangle-exclamation',
            info: 'fa-circle-info',
        };
        el.className = `auth-alert alert alert-${type}`;
        el.innerHTML = `<i class="fa-solid ${iconMap[type] || 'fa-circle-info'} me-2"></i>${message}`;
        el.classList.remove('d-none');
        // Auto-hide success after 4s
        if (type === 'success') setTimeout(() => el.classList.add('d-none'), 4000);
    }

    function hideAlert(alertId) {
        const el = document.getElementById(alertId);
        if (el) el.classList.add('d-none');
    }

    /* -----------------------------------------------------------------------
       Loading Spinner
    ----------------------------------------------------------------------- */
    function setLoading(btnId, loading) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        const text = btn.querySelector('.btn-text');
        const spin = btn.querySelector('.btn-spinner');
        btn.disabled = loading;
        if (text) text.style.opacity = loading ? '0.5' : '1';
        if (spin) spin.classList.toggle('d-none', !loading);
    }

    /* -----------------------------------------------------------------------
       Password Strength Meter
    ----------------------------------------------------------------------- */
    const signupPwd = document.getElementById('signupPassword');
    const strengthFill = document.getElementById('strengthBarFill');
    const strengthLabel = document.getElementById('strengthLabel');

    function calcStrength(pw) {
        let score = 0;
        if (pw.length >= 8)  score++;
        if (pw.length >= 12) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    }

    signupPwd?.addEventListener('input', () => {
        const pw = signupPwd.value;
        const score = calcStrength(pw);
        const pct = Math.min((score / 5) * 100, 100);
        const levels = ['', '#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
        const labels = ['', 'Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
        if (strengthFill) {
            strengthFill.style.width = pw ? pct + '%' : '0%';
            strengthFill.style.backgroundColor = levels[score] || '#ef4444';
        }
        if (strengthLabel) {
            strengthLabel.innerText = pw ? labels[score] || 'Weak' : 'Password strength';
            strengthLabel.style.color = levels[score] || 'var(--text-muted)';
        }
    });

    /* -----------------------------------------------------------------------
       Show/Hide Password Toggle
    ----------------------------------------------------------------------- */
    document.querySelectorAll('.btn-toggle-pwd').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (!input) return;
            const isText = input.type === 'text';
            input.type = isText ? 'password' : 'text';
            btn.querySelector('i').className = isText ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash';
        });
    });

    /* -----------------------------------------------------------------------
       RememberMe — pre-fill email if saved
    ----------------------------------------------------------------------- */
    const savedEmail = localStorage.getItem('nexora_remember_email');
    if (savedEmail) {
        const signinEmail = document.getElementById('signinEmail');
        if (signinEmail) signinEmail.value = savedEmail;
        const rememberCheck = document.getElementById('rememberMe');
        if (rememberCheck) rememberCheck.checked = true;
    }

    /* -----------------------------------------------------------------------
       Real-time Duplicate Email Check on Sign Up
    ----------------------------------------------------------------------- */
    const signupEmailInput = document.getElementById('signupEmail');
    const emailCheckIcon   = document.getElementById('emailCheckIcon');
    const signupEmailFeedback = document.getElementById('signupEmailFeedback');

    let emailDebounce;
    signupEmailInput?.addEventListener('input', () => {
        clearTimeout(emailDebounce);
        emailDebounce = setTimeout(() => {
            const email = signupEmailInput.value.trim();
            if (!EMAIL_RE.test(email)) return;

            if (findUser(email)) {
                signupEmailInput.classList.add('is-invalid');
                signupEmailInput.classList.remove('is-valid');
                if (signupEmailFeedback) signupEmailFeedback.innerText = 'An account with this email already exists.';
            } else {
                signupEmailInput.classList.remove('is-invalid');
                signupEmailInput.classList.add('is-valid');
            }
        }, 500);
    });

    /* -----------------------------------------------------------------------
       SIGN IN Form Handler
    ----------------------------------------------------------------------- */
    document.getElementById('signinForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAlert('signinAlert');

        const emailInput = document.getElementById('signinEmail');
        const pwInput    = document.getElementById('signinPassword');
        const remember   = document.getElementById('rememberMe')?.checked;

        const email = emailInput.value.trim();
        const pw    = pwInput.value;

        // Client-side validation
        let valid = true;
        if (!EMAIL_RE.test(email)) { emailInput.classList.add('is-invalid'); valid = false; }
        else emailInput.classList.remove('is-invalid');

        if (pw.length < 6) { pwInput.classList.add('is-invalid'); valid = false; }
        else pwInput.classList.remove('is-invalid');

        if (!valid) return;

        setLoading('signinSubmitBtn', true);

        // Simulate network latency
        await sleep(900);

        const user = findUser(email);
        if (!user) {
            setLoading('signinSubmitBtn', false);
            showAlert('signinAlert', 'No account found with this email address.', 'danger');
            emailInput.classList.add('is-invalid');
            return;
        }

        const hash = await hashPassword(pw);
        if (user.passwordHash !== hash) {
            setLoading('signinSubmitBtn', false);
            showAlert('signinAlert', 'Incorrect password. Please try again.', 'danger');
            pwInput.classList.add('is-invalid');
            return;
        }

        // Success
        if (remember) localStorage.setItem('nexora_remember_email', email);
        else localStorage.removeItem('nexora_remember_email');

        saveSession(user);
        showAlert('signinAlert', `Welcome back, ${user.name}! Redirecting...`, 'success');

        setLoading('signinSubmitBtn', false);
        setTimeout(redirectToApp, 1200);
    });

    /* -----------------------------------------------------------------------
       SIGN UP Form Handler
    ----------------------------------------------------------------------- */
    document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAlert('signupAlert');

        const nameInput    = document.getElementById('signupName');
        const emailInput   = document.getElementById('signupEmail');
        const pwInput      = document.getElementById('signupPassword');
        const cpwInput     = document.getElementById('signupConfirmPassword');
        const termsInput   = document.getElementById('agreeTerms');
        const cpwFeedback  = document.getElementById('confirmPasswordFeedback');

        const name  = nameInput.value.trim();
        const email = emailInput.value.trim();
        const pw    = pwInput.value;
        const cpw   = cpwInput.value;

        let valid = true;

        // Name
        if (name.length < 3) { nameInput.classList.add('is-invalid'); valid = false; }
        else nameInput.classList.remove('is-invalid');

        // Email
        if (!EMAIL_RE.test(email)) { emailInput.classList.add('is-invalid'); valid = false; }
        else emailInput.classList.remove('is-invalid');

        // Duplicate email check
        if (EMAIL_RE.test(email) && findUser(email)) {
            emailInput.classList.add('is-invalid');
            if (signupEmailFeedback) signupEmailFeedback.innerText = 'An account with this email already exists.';
            valid = false;
        }

        // Password strength (min 8)
        if (pw.length < 8) { pwInput.classList.add('is-invalid'); valid = false; }
        else pwInput.classList.remove('is-invalid');

        // Confirm password
        if (pw !== cpw) {
            cpwInput.classList.add('is-invalid');
            if (cpwFeedback) cpwFeedback.innerText = 'Passwords do not match.';
            valid = false;
        } else cpwInput.classList.remove('is-invalid');

        // Terms
        if (!termsInput.checked) { termsInput.classList.add('is-invalid'); valid = false; }
        else termsInput.classList.remove('is-invalid');

        if (!valid) return;

        setLoading('signupSubmitBtn', true);
        await sleep(1000);

        // Double-check duplicate (race condition guard)
        if (findUser(email)) {
            setLoading('signupSubmitBtn', false);
            showAlert('signupAlert', 'This email is already registered. Please sign in.', 'warning');
            return;
        }

        const passwordHash = await hashPassword(pw);
        const newUser = {
            id: 'u_' + Date.now(),
            name,
            email,
            passwordHash,
            avatar: 'images/avatars/user.jpg',
            role: 'NEXORA Member',
            createdAt: new Date().toISOString(),
        };

        const users = getUsers();
        users.push(newUser);
        saveUsers(users);

        saveSession(newUser);
        showAlert('signupAlert', `Account created! Welcome to NEXORA, ${name}! 🎉`, 'success');
        setLoading('signupSubmitBtn', false);
        setTimeout(redirectToApp, 1500);
    });

    /* -----------------------------------------------------------------------
       OAuth Buttons (Simulated — demo only)
    ----------------------------------------------------------------------- */
    document.getElementById('googleSigninBtn')?.addEventListener('click', async () => {
        showAlert('signinAlert', 'Connecting to Google...', 'info');
        await sleep(1200);
        // Demo user created on Google OAuth simulation
        const demoUser = { id: 'google_demo', name: 'Google Demo User', email: 'demo@google.com', avatar: 'images/avatars/user.jpg', role: 'NEXORA Member' };
        saveSession(demoUser);
        showAlert('signinAlert', 'Signed in with Google! Redirecting...', 'success');
        setTimeout(redirectToApp, 1200);
    });

    document.getElementById('githubSigninBtn')?.addEventListener('click', async () => {
        showAlert('signinAlert', 'Connecting to GitHub...', 'info');
        await sleep(1200);
        const demoUser = { id: 'github_demo', name: 'GitHub Demo User', email: 'demo@github.com', avatar: 'images/avatars/user.jpg', role: 'NEXORA Developer' };
        saveSession(demoUser);
        showAlert('signinAlert', 'Signed in with GitHub! Redirecting...', 'success');
        setTimeout(redirectToApp, 1200);
    });

    /* -----------------------------------------------------------------------
       FORGOT PASSWORD Flow
    ----------------------------------------------------------------------- */
    let generatedOTP = null;
    let forgotUserEmail = null;

    // Step 1: Email Submit
    document.getElementById('forgotForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAlert('forgotAlert');

        const emailInput = document.getElementById('forgotEmail');
        const email = emailInput.value.trim();

        if (!EMAIL_RE.test(email)) { emailInput.classList.add('is-invalid'); return; }
        else emailInput.classList.remove('is-invalid');

        setLoading('forgotSubmitBtn', true);
        await sleep(900);
        setLoading('forgotSubmitBtn', false);

        if (!findUser(email)) {
            showAlert('forgotAlert', 'No account found with this email address.', 'danger');
            emailInput.classList.add('is-invalid');
            return;
        }

        forgotUserEmail = email.toLowerCase();

        // Generate 6-digit OTP
        generatedOTP = String(Math.floor(100000 + Math.random() * 900000));

        // In production this would be emailed — we show it as a demo
        console.log(`[NEXORA Auth Demo] OTP for ${email}: ${generatedOTP}`);

        showAlert('forgotAlert', `OTP sent to <strong>${email}</strong>. (Demo: check browser console for OTP)`, 'info');

        // Transition to Step 2
        document.getElementById('forgotStep1').classList.add('d-none');
        document.getElementById('forgotStep2').classList.remove('d-none');
        setupOtpInputs();
    });

    // OTP Inputs: auto-focus next field
    function setupOtpInputs() {
        const inputs = document.querySelectorAll('.otp-input');
        inputs.forEach((input, i) => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^0-9]/g, '');
                if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
                if (input.value) input.classList.add('filled');
                else input.classList.remove('filled');
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !input.value && i > 0) inputs[i - 1].focus();
            });
        });
    }

    // Step 2: Verify OTP
    document.getElementById('verifyOtpBtn')?.addEventListener('click', async () => {
        const inputs = document.querySelectorAll('.otp-input');
        const entered = Array.from(inputs).map(i => i.value).join('');

        if (entered.length < 6) {
            showAlert('otpAlert', 'Please enter all 6 digits.', 'warning');
            return;
        }

        const otpAlert = document.getElementById('otpAlert');
        if (entered !== generatedOTP) {
            showAlert('otpAlert', 'Invalid OTP. Please try again.', 'danger');
            document.querySelectorAll('.otp-input').forEach(i => { i.classList.add('is-invalid'); i.value = ''; });
            document.querySelector('.otp-input')?.focus();
            return;
        }

        if (otpAlert) otpAlert.classList.add('d-none');

        // Transition to Step 3
        document.getElementById('forgotStep2').classList.add('d-none');
        document.getElementById('forgotStep3').classList.remove('d-none');
        showAlert('forgotAlert', 'OTP verified successfully! Set your new password.', 'success');
    });

    // Resend OTP
    document.getElementById('resendOtpBtn')?.addEventListener('click', async () => {
        generatedOTP = String(Math.floor(100000 + Math.random() * 900000));
        console.log(`[NEXORA Auth Demo] Resent OTP for ${forgotUserEmail}: ${generatedOTP}`);
        document.querySelectorAll('.otp-input').forEach(i => { i.value = ''; i.classList.remove('filled', 'is-invalid'); });
        document.querySelector('.otp-input')?.focus();
        showAlert('forgotAlert', 'New OTP sent! Check browser console for demo.', 'info');
    });

    // Step 3: Reset Password
    document.getElementById('resetPasswordBtn')?.addEventListener('click', async () => {
        const newPwd  = document.getElementById('newPassword').value;
        const confPwd = document.getElementById('confirmNewPassword').value;
        const mismatch = document.getElementById('newPwdMismatch');

        if (newPwd.length < 8) {
            showAlert('forgotAlert', 'Password must be at least 8 characters.', 'danger');
            return;
        }
        if (newPwd !== confPwd) {
            if (mismatch) mismatch.classList.remove('d-none');
            return;
        }
        if (mismatch) mismatch.classList.add('d-none');

        const hash = await hashPassword(newPwd);
        const users = getUsers();
        const idx = users.findIndex(u => u.email.toLowerCase() === forgotUserEmail);
        if (idx !== -1) {
            users[idx].passwordHash = hash;
            saveUsers(users);
        }

        showAlert('forgotAlert', 'Password reset successfully! Redirecting to Sign In...', 'success');
        await sleep(2000);
        showPanel('signin');
        resetForgotFlow();
        showAlert('signinAlert', 'Your password has been reset. Please sign in with your new password.', 'info');
    });

    function resetForgotFlow() {
        document.getElementById('forgotStep1')?.classList.remove('d-none');
        document.getElementById('forgotStep2')?.classList.add('d-none');
        document.getElementById('forgotStep3')?.classList.add('d-none');
        document.getElementById('forgotForm')?.reset();
        document.querySelectorAll('.otp-input').forEach(i => { i.value = ''; i.classList.remove('filled', 'is-invalid'); });
        hideAlert('forgotAlert');
        hideAlert('otpAlert');
        generatedOTP = null;
        forgotUserEmail = null;
    }

    /* -----------------------------------------------------------------------
       Utility
    ----------------------------------------------------------------------- */
    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    // Demo: seed a default user so testers can log in immediately
    (function seedDemoUser() {
        const demo = findUser('demo@nexora.app');
        if (!demo) {
            hashPassword('nexora123').then(hash => {
                const users = getUsers();
                users.push({
                    id: 'demo_user',
                    name: 'Madhu Smita Mishra',
                    email: 'demo@nexora.app',
                    passwordHash: hash,
                    avatar: 'images/avatars/user.jpg',
                    role: 'Full Stack Engineer',
                    createdAt: new Date().toISOString(),
                });
                saveUsers(users);
            });
        }
    })();

})();
