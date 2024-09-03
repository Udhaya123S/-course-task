const University = require('../models/university.model');
const { Op } = require('sequelize');

const createUniversity = async (data) => {
  return University.create(data);
};

const getUniversities = async ({ page = 1, limit, sort = 'asc', search = '' }) => {
  
  page = Math.max(1, parseInt(page) || 1); 
  
  limit = parseInt(limit);
  if (isNaN(limit) || limit <= 0) {
    limit = 10; 
  }

 
  sort = sort.toLowerCase() === 'desc' ? 'desc' : 'asc';

  const offset = (page - 1) * limit;
  const whereClause = search ? {
    [Op.or]: [
      { name: { [Op.iLike]: `%${search}%` } },
      { code: { [Op.iLike]: `%${search}%` } }
    ]
  } : {};

  const universities = await University.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [['name', sort]],
  });

  return {
    data: universities.rows,
    total: universities.count,
    totalPages: Math.ceil(universities.count / limit),
    currentPage: page,
  };
};

const getUniversityById = async (id) => {
  return University.findByPk(id);
};


const updateUniversity = async (id, data) => {
  const [updated] = await University.update(data, { where: { id } });

  if (updated) {
    const updatedUniversity = await University.findOne({ where: { id } });
    return updatedUniversity;
  }
  return null;
};

const deleteUniversity = async (id) => {
  const university = await University.findOne({ where: { id } });

  if (!university) {
    return null;
  }

  await University.destroy({ where: { id } });
  return university;
};


module.exports = { 
  createUniversity,
   getUniversities,
  getUniversityById,
    updateUniversity, 
    deleteUniversity 
    };
