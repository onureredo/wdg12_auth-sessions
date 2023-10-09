import express from 'express';
import session from 'express-session';

const app = express();
const PORT = 8000;

const sess = {
  secret: 'keyboard cat',
  cookie: {},
  resave: false, // Session wird nicht bei jedem Request erneut gespeichert, wenn keine Änderungen vorgenommen wurden
  saveUninitialized: false, // Neue Sessions, die noch nicht geändert wurden, werden nicht gespeichert
};

// console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV === 'development') {
//   // NODE_ENV = Global ==> 'production' || 'development' || test'
//   app.set('trust proxy', 1); // trust first proxy
//   //   sess.cookie.secure = true; //  ==> serve secure cookies in production => HTTPS only
// }

app.use(session(sess));

app.get('/login/:username', (req, res) => {
  req.session.username = req.params.username;
  res.send(`Hello, ${req.params.username}. You are now logged in!`);
});

app.get('/whoami', (req, res) => {
  if (req.session.username) {
    res.send(`You are logged in as: ${req.session.username}`);
  } else {
    res.send('Please login first');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Logged out');
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
