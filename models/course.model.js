const  { DataTypes }=require('sequelize');
const sequelize = require('../config/db.config'); 

const Course = sequelize.define('course', {
  universityId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'universities', 
      key: 'id'
    },
    allowNull: false
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cities', 
      key: 'id'
    },
    allowNull: false
  },
  countryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'countries', 
      key: 'id'
    },
    allowNull: false
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
   timestamps: true
});

module.exports = Course;
