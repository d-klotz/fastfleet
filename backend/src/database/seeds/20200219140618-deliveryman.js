module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'deliverymans',
      [
        {
          id: 1,
          name: 'Alex Tarson',
          avatar_id: 1,
          email: 'alex@fastfleet.dev',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Jordan Maison',
          avatar_id: 1,
          email: 'jordan@fastfleet.dev',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('deliverymans', null, {});
  },
};
