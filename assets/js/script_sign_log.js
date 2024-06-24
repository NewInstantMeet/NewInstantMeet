document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector(".container"),
        pwShowHide = document.querySelectorAll(".showHidePw"),
        pwFields = document.querySelectorAll(".password"),
        signUp = document.querySelector(".signup-link"),
        login = document.querySelector(".login-link");

    let users = JSON.parse(localStorage.getItem('users')) || [];

    function validateBirthdate(date) {
        const today = new Date();
        const birthdate = new Date(date);
        const age = today.getFullYear() - birthdate.getFullYear();
        const monthDifference = today.getMonth() - birthdate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        return age >= 16;
    }

    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('signupFirstName').value;
        const lastName = document.getElementById('signupLastName').value;
        const birthdate = document.getElementById('signupBirthdate').value;
        const gender = document.getElementById('signupGender').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        if (!validateBirthdate(birthdate)) {
            alert('Você deve ter pelo menos 16 anos para se registrar.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não correspondem.');
            return;
        }

        const user = { firstName, lastName, birthdate, gender, email, password };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro bem-sucedido!');
        container.classList.remove("active");
        // Redirecionar para o login após o cadastro bem-sucedido
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login bem-sucedido!');
            window.location.href = 'user.html';
        } else {
            alert('Credenciais inválidas');
        }
    });

    pwShowHide.forEach(eyeIcon => {
        eyeIcon.addEventListener("click", () => {
            pwFields.forEach(pwField => {
                if (pwField.type === "password") {
                    pwField.type = "text";
                    pwShowHide.forEach(icon => {
                        icon.classList.replace("fa-eye-slash", "fa-eye");
                    });
                } else {
                    pwField.type = "password";
                    pwShowHide.forEach(icon => {
                        icon.classList.replace("fa-eye", "fa-eye-slash");
                    });
                }
            });
        });
    });

    signUp.addEventListener("click", (e) => {
        e.preventDefault();
        container.classList.add("active");
    });

    login.addEventListener("click", (e) => {
        e.preventDefault();
        container.classList.remove("active");
    });

    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const steps = document.querySelectorAll('.signup-step');

    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
    }

    function validateStep(stepIndex) {
        if (stepIndex === 0) {
            const firstName = document.getElementById('signupFirstName').value;
            const lastName = document.getElementById('signupLastName').value;
            if (!firstName || !lastName) {
                alert('Por favor, preencha seu nome e sobrenome.');
                return false;
            }
        } else if (stepIndex === 1) {
            const birthdate = document.getElementById('signupBirthdate').value;
            const gender = document.getElementById('signupGender').value;
            if (!birthdate || !gender) {
                alert('Por favor, preencha sua data de nascimento e sexo.');
                return false;
            }
        }
        return true;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    showStep(currentStep);
});
