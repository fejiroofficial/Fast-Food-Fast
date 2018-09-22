export default {
  development: {
    user: 'postgres',
    password: 'fejiro21',
    database: 'fastdb',
    host: '127.0.0.1',
    port: 5432,
  },
  test: {
    user: 'postgres',
    password: 'fejiro21',
    database: 'fastdb_test',
    host: '127.0.0.1',
    port: 5432,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
