
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contacts').insert([
        {id: 1, name: 'isaiah', address: '123 Sesame ST', mobile:'(555) 555-5555', work: '(808) 296-9390', home: '(808) 859-0917', email:'isaiah@lit.com', twitter:'isaiahstwitter', instagram: 'isaiah.h__', github:'https://github.com/IsaiahHarris', created_by: 1},
        {id: 2, name: 'kenny', address: '123 Sesame ST', mobile:'(555) 555-5555', work: '(808) 296-9390', home: '(808) 859-0917', email:'kenny@lit.com', twitter:'isaiahstwitter', instagram: 'kenny.c__', github:'https://github.com/supahkenneh', created_by: 1},
      ]);
    });
};
