const express = require('express');
const router = express.Router();
const User = require('../server/db/models/User');

router.route('/')
  .get((req, res) => {
    return User.fetchAll({ withRelated: ['created'] })
      .then(users => {
        return res.json(users)
      })
      .catch(err => {
        console.log('err.message', err.message);
      })
  })


router.route('/profile')
  .get((req, res) => {
    console.log('req.user', req.user)
    const username = req.user.username
    return User
      .query({ where: { username: username } })
      .fetch(['username', 'name', 'email', 'address'])
      .then(user => {
        let profileUser = {
          username: user.attributes.username,
          name: user.attributes.name,
          email: user.attributes.email,
          address: user.attributes.address
        }
        return res.json(profileUser)
      })
      .catch(err => {
        console.log('err.message', err.message);
      })
  })

router.route('/:id')
  .put((req, res) => {
    let id = req.params.id;
    let { username, name, email, address } = req.body;
    return new User({ id: id })
      .save({ username, name, email, address })
      .then(response => {
        return response.refresh({ withRelated: ['created'] })
      })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log('err.message', err.message);
      })
  })

module.exports = router;