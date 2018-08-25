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

router.route('/profile')
  .put((req, res) => {
    let id = req.user.id;
    let { name, email, address } = req.body;
    return new User({ id: id })
      .save({ name, email, address }, { patch: true })
      .then(response => {
        return response.refresh({ withRelated: ['created'] })
      })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log('err.message on put', err.message);
      })
  })

module.exports = router;