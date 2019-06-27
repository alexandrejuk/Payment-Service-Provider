module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: null,
    database: 'database_production',
    host: 'localhost',
    dialect: 'postgres'
  }
}