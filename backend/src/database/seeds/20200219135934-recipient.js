module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          id: 1,
          name: 'Leonard Mayor',
          address: 'Beckham Ave Street',
          number: 75702,
          complement: null,
          state: 'Texas',
          city: 'Tyler',
          cep: 9640000,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('recipients', null, {});
  },
};
