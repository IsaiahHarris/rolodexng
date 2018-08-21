const express = require('express');
const router = express.Router();
const Contact = require('../server/db/models/Contact')



router.route('/')
  .get((req, res) => {

    const id = req.query.user;
    if (id) {

      return Contact
        .query({ where: { created_by: id } })
        .fetchAll()
        .then(contacts => {
          return res.json(contacts)
        })
    } else {
      return Contact
        .fetchAll()
        .then(contacts => {
          return res.json(contacts)
        })
    }


  })
  .post((req, res) => {
    const {
      name,
      address,
      mobile,
      work,
      home,
      email,
      twitter,
      instagram,
      github,
      created_by
    } = req.body

    const contact = {
      name: name ? name : null,
      address: address ? address : null,
      mobile: mobile ? mobile : null,
      work: work ? work : null,
      home: home ? home : null,
      email: email ? email : null,
      twitter: twitter ? twitter : null,
      instagram: instagram ? instagram : null,
      github: github ? github : null,
      created_by: created_by ? created_by : null
    }

    return new Contact(contact)
      .save()
      .then(newContact => {
        return newContact.refresh()
      })
      .then(contact => {
        return res.json(contact)
      })
      .catch(err => {
        console.log('err.message', err.message);
      })
  })

router.route('/search/:term')
  .get((req, res) => {

    const term = req.params.term;
    return Contact
      .query({ where: { name: term } })
      .fetchAll({ withRelated: ['created'] })
      .then(contacts => {
        return res.json(contacts)
      })
      .catch(err => {
        console.log('err.message', err.message);
      })
  })

router.route('/:id')
  .delete((req, res) => {
    const id = req.params.id;
    return new Contact({ id: id })
      .destroy()
      .then(users => {
        return Contact
          .fetchAll()
          .then(contacts => {
            return res.json(contacts)
          })
      })
      .catch(err => {
        console.log('err.message', err.message);
      })
  })
  .get((req, res) => {
    const id = req.params.id

    return Contact
      .query({ where: { id: id } })
      .fetch()
      .then(contact => {
        return res.json(contact)
      })
      .catch(err => {
        console.log('err.message', err.message);
      })
  })
  .put((req, res) => {
    const id = req.params.id;
    const {
      name,
      address,
      mobile,
      work,
      home,
      email,
      twitter,
      instagram,
      github,
      created_by
    } = req.body

    return new Contact({ id: id })
      .save({
        name,
        address,
        mobile,
        work,
        home,
        email,
        twitter,
        instagram,
        github,
        created_by
      })
      .then(contact => {
        return res.json(contact)
      })
      .catch(err => {
        console.log('err.message', err.message);
      })


  })

module.exports = router;