const config = require('./config');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password, 
  {
    host: config.database.host,
    dialect: config.database.dialect,    
    pool: {
      max: config.database.max,
      min:config.database.min,
      acquire: config.database.acquire,
      idle: config.database.idle
    }
});

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

sequelize.options.logging = false

module.exports = sequelize
