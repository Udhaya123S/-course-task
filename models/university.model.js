const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
  

const University = sequelize.define('university', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
    },
    establishedYear: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  }, {
    timestamps: false, 
  });

  module.exports= University;
