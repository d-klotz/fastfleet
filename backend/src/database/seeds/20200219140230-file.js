module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          id: 1,
          name: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
          path: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'https://images.pexels.com/photos/903661/pexels-photo-903661.jpeg',
          path: 'https://images.pexels.com/photos/903661/pexels-photo-903661.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('files', null, {});
  },
};
