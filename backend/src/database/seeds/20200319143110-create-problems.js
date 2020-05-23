module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'delivery_problems',
      [
        {
          id: 1,
          delivery_id: 1,
          description: 'Absent Recipient',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          delivery_id: 2,
          description: 'Order Canceled',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('delivery_problems', null, {});
  },
};
