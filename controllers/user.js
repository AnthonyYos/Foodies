// register_get, register_post, login_get, login_post, logout
const User = require('../models/user');

const register_get = (req, res) => {
  res.render('user/register');
};

const register_post = async (req, res) => {
  try {
    const { email, username, password, passwordConfirm } = req.body.user;
    if (password !== passwordConfirm) throw error;
    const user = new User({ email, username });
    user.roles.push('user');
    // passport-local-mongoose method(plugged in user model)
    const registeredUser = await User.register(user, password);
    // passport method
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash('success', 'Register Successful');
      res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    console.log('error', 'Username taken or passwords did not match.');
    res.redirect('register');
  }
};

const login_get = (req, res) => {
  res.render('user/login');
};

const login_post = (req, res) => {
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

const logout = (req, res) => {
  req.logout(err => {
    if (err) return next(err);
  });
  const redirectUrl = req.session.returnTo || '/';
  req.flash('success', 'Logged Out');
  res.redirect('/');
};

module.exports = {
  register_get,
  register_post,
  login_get,
  login_post,
  logout,
};
