module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '162.253.224.16'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'skyzunx1_hardwaredeckone'),
      user: env('DATABASE_USERNAME', 'skyzunx1_hardwaredeck'),
      password: env('DATABASE_PASSWORD', 'hwdeck9876!a'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
