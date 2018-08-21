
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id:1, username: 'admin', name: 'admin', email: 'admin@lit.com', address: '123 Sesame ST'},
        {id:2, username: 'isaiah', name: 'isaiah', email: 'isaiah@lit.com', address: '123 Sesame ST'},
      ]);
    });
};
