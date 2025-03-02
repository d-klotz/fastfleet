module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'deliveries',
      [
        {
          id: 1,
          recipient_id: 1,
          deliveryman_id: 1,
          product: 'A very cool product',
          canceled_at: null,
          end_date: null,
          start_date: null,
          status: 'PENDING',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          recipient_id: 1,
          deliveryman_id: 2,
          product: 'A giant piano',
          canceled_at: null,
          end_date: null,
          start_date: new Date(),
          status: 'WITHDRAWN',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          recipient_id: 1,
          deliveryman_id: 1,
          product: 'Complete kitchen',
          canceled_at: null,
          end_date: null,
          start_date: null,
          status: 'PENDING',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          recipient_id: 1,
          deliveryman_id: 2,
          product: 'A pair of sofas',
          canceled_at: new Date(),
          start_date: new Date(),
          end_date: null,
          status: 'CANCELED',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          recipient_id: 1,
          deliveryman_id: 1,
          product: 'Utility boxes',
          canceled_at: null,
          start_date: new Date(),
          end_date: new Date(),
          status: 'DELIVERED',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          recipient_id: 1,
          deliveryman_id: 2,
          product: 'Dinner table with 6 chairs',
          canceled_at: null,
          end_date: null,
          start_date: null,
          status: 'PENDING',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          recipient_id: 1,
          deliveryman_id: 2,
          product: 'Garden Material',
          canceled_at: null,
          end_date: new Date(),
          start_date: new Date(),
          status: 'DELIVERED',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('deliveries', null, {});
  },
};
