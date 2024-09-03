const { DataTypes } = require('sequelize');
const sequelize = require( '../config/db.config');

const Country = sequelize.define('country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate: {
      notEmpty: true,
      len: [1, 255],
    },
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 3],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  timestamps: false,
});

module.exports = Country;
