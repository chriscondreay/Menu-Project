const mongoose = require('mongoose');
const User = mongoose.model('Users');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
    res.render('login', {title: 'Login' });
};

exports.registerForm = (req,res) => {
    res.render('register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'Enter your name').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Please enter a valid password').notEmpty();
    req.checkBody('password-confirm', 'Please enter the password used').notEmpty();
    req.checkBody('password-confirm', 'Password does not match!').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
        return;
    }
    next();
};

exports.register = async (req, res, next) => {
    const user = new User({ email: req.body.email, name: req.body.name });
    const registerPromise = promisify(User.register, User);
    await registerPromise(user, req.body.password);
    next();
}