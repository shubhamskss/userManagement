const validateUserName = (userName) => userName && userName.trim().length > 0;

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password);

module.exports = {
    validateUserName,
    validateEmail,
    validatePassword
};