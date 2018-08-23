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
    name: user.name
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

passport.use(new LocalStrategy(
  function (username, done) {
    return new User({ username })
      .fetch()
      .then(user => {
        if (user === null) {
          return done(null, false, { message: 'bad username or password' })
        } else {
          user = user.toJSON()
        }
      })
      .catch(err => {
        return done(err)
      })
  }
))

app.post('/api/register', (req, res) => {
  return new User({ username: req.body.username })
    .save()
    .then(() => {
      return res.status(200)
    })
})


app.post('/api/login', (req, res, next) => {
  req.body.username = req.body.username.toLowerCase();
  passport.authenticate('local', (err, user, info) => {
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('loggedin')
      return res.status(200)
    })
  })(req, res, next)
})

app.get('/api/logout', (req, res) => {
  req.logout();
  return res.status(200)
})
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('smoke test')
})

app.listen(PORT, () => {
  console.log('PORT', PORT);
})