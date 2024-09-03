const City = require('../models/city.model');
const { Op } = require('sequelize');

const createCity = async (data) => {
  return City.create(data);
};

const getCities = async ({ page = 1, limit, sort = 'asc', search = '' }) => {
    
    page = Math.max(1, parseInt(page) || 1); 
    
    
    limit = parseInt(limit);
    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }
  
    sort = sort.toLowerCase() === 'desc' ? 'desc' : 'asc';
  
    const offset = (page - 1) * limit;
    const whereClause = search ? {
      name: { [Op.iLike]: `%${search}%` }
    } : {};
  
    const cities = await City.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['name', sort]],
    });
  
    return {
      data: cities.rows,
      total: cities.count,
      totalPages: Math.ceil(cities.count / limit),
      currentPage: page,
    };
};

const getCityById = async (id) => {
  return City.findByPk(id);
};

const updateCity = async (id, updates) => {
  try {
    
    const city = await City.findByPk(id);
    if (!city) {
      return null; 
    }

  
    const [updated] = await City.update(updates, {
      where: { id },
      returning: true, 
    });

    if (updated) {
      
      const updatedCity = await City.findByPk(id);
      return updatedCity;
    } else {
      return null; 
    }
  } catch (error) {
    throw new Error(`Error updating city: ${error.message}`);
  }
};

const deleteCity = async (id) => {
  const result = await City.destroy({ where: { id } });
  return result > 0; 
};


module.exports = { 
   createCity,
   getCities, 
   getCityById,
  updateCity,
    deleteCity
     }
