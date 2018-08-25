const express = require('express')
const app = express()
const session = require('express-session');
const Redis = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const saltedRounds = 12;
const bodyParser = require('body-parser');
const routes = require('../routes');
const PORT = process.env.PORT || 8080
const User = require('./db/models/User')
const bcrypt = require('bcrypt')
app.use(express.static('../public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(session({
  store: new Redis(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  })
})

passport.deserializeUser((user, done) => {
  new User({ id: user.id })
    .fetch()
    .then(user => {
      if (!user) {
        return done(null, false)
      } else {
        user = user.toJSON();
        return done(null, {
          id: user.id,
          username: user.username
        })
      }
    })
    .catch(err => {
      console.log('err.message', err.message);
      return done(err)
    })
})

passport.use(new LocalStrategy(function (username, password, done) {
  return new User({ username: username }).fetch()
    .then(user => {
      if (user === null) {
        return done(null, false, { message: 'bad username or password' });
      } else {
        user = user.toJSON();
        bcrypt.compare(password, user.password)
          .then(samePassword => {
            if (samePassword) { return done(null, user); }
            else {
              return done(null, false, { message: 'bad username or password' });
            }
          })
      }
    })
    .catch(err => {
      return done(err);
    });
}));

app.post('/api/login', (req, res, next) => {
  req.body.username = req.body.username
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json({ message: 'username or password invalid' })
    }
    req.login(user, (err) => {
      if (err) { return next(err); }
      else {
        res.json({ username: user.username })
      }
    });
  })(req, res, next);
});

app.post('/api/register', (req, res) => {
  let {
    username,
    name,
    email,
    address
  } = req.body;
  bcrypt.genSalt(saltedRounds, (err, salt) => {
    if (err) { return res.status(500); }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) { return res.status(500); }
      return new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        name,
        email,
        address
      })
        .save()
        .then((result) => {
          res.json(result.attributes.username);
        })
        .catch(err => {
          res.json({ message: 'username already exists' })
        });
    })
  })
});



app.get('/api/logout', (req, res) => {
  console.log('logging out server')
  req.logout();
  res.json({ success: true })
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('smoke test')
})

app.listen(PORT, () => {
  console.log('PORT', PORT);
})