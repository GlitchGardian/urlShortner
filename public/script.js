document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Validation function
    function validateForm() {
        let isValid = true;

        // Email validation
        if (!validateEmail(emailInput.value)) {
            gsap.to(emailInput, { duration: 0.5, x: 10, repeat: 1, yoyo: true });
            emailInput.classList.add('invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('invalid');
        }

        // Password validation
        if (passwordInput.value.length < 6) {
            gsap.to(passwordInput, { duration: 0.5, x: 10, repeat: 1, yoyo: true });
            passwordInput.classList.add('invalid');
            isValid = false;
        } else {
            passwordInput.classList.remove('invalid');
        }

        return isValid;
    }

    // Basic email format validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Form submission handler
    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            gsap.fromTo('form', { scale: 1 }, { duration: 0.5, scale: 0.9, ease: "elastic.out(1, 0.3)" });
        }
    });
});
