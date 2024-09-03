const Country = require('../models/country.model');
const { Op } = require('sequelize');
const fs = require('fs');
const csv = require('csv-parser');
const City =require('../models/city.model')

const createCountry = async (data) => {
  return Country.create(data);
};

const getCountries = async (page, limit, search, status) => {
  const offset = (page - 1) * limit;

  const where = {};
  if (search) {
    where.name = { [Op.iLike]: `%${search}%` }; 
  }
  if (status) {
    where.status = status; 
  }

  const { count, rows } = await Country.findAndCountAll({
    where,
    // include: [{ model: City, as: 'cities', required: true }],  
    limit,
    offset,
    order: [['name', 'ASC']], 
  });

  return { count, rows };
};

const getCountryById = async (id) => {
 return Country.findByPk(id, {
    include: [City]
  });
};

const updateCountry = async (id, data) => {
  return Country.update(data, { where: { id } });
};

const deleteCountry = async (id) => {
 
  const deletedCount = await Country.destroy({ where: { id } });

  
  if (deletedCount > 0) {
    return { success: true, message: 'Country deleted successfully' };
  } else {
    return { success: false, message: 'Country not found' };
  }
};


module.exports = { 
  createCountry,
   getCountries, 
  getCountryById, 
   updateCountry,
    deleteCountry };
