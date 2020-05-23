require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  username: 'postgres',
  password: 'fastfleet',
  database: 'fastfleet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
