const  Course = require('../models/course.model');
const  City = require('../models/city.model');
const  University = require('../models/university.model');
const  Country = require('../models/country.model');

const fs = require('fs');
const cron = require('node-cron');
const csv = require('csv-parser');
const {Op} =require('sequelize')

const createCourse = async (courseData) => {
  return Course.create(courseData);
};

const parseAndSaveCsv = async (filePath) => {
  try {
    console.log('Starting to process CSV file...');

    // Delete existing data using truncate
    await Country.truncate({ cascade: true });
    await City.truncate({ cascade: true });
    await University.truncate({ cascade: true });
    await Course.truncate({ cascade: true });

    const results = [];

    // Read and parse the CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    // Initialize ID counters
    let countryId = 1;
    let cityId = 1;
    let universityId = 1;
    let courseId = 1;

    // Process and insert data
    for (const row of results) {
      const countryName = row.Country?.trim();
      const cityName = row.City?.trim();
      const universityName = row.University?.trim();

      let country;
      if (countryName) {
        country = await Country.findOne({ where: { name: countryName } });
        if (!country) {
          country = await Country.create({ id: countryId++, name: countryName });
        }
      }

      let city;
      if (cityName) {
        city = await City.findOne({ where: { name: cityName, countryId: country ? country.id : null } });
        if (!city) {
          city = await City.create({ id: cityId++, name: cityName, countryId: country ? country.id : null });
        }
      }

      let university;
      if (universityName) {
        university = await University.findOne({ where: { name: universityName } });
        if (!university) {
          university = await University.create({ id: universityId++, name: universityName });
        }
      }

      if (row.CourseName?.trim()) {
        await Course.create({
          id: courseId++, // Set ID manually for Course
          courseName: row.CourseName.trim(),
          courseDescription: row.CourseDescription?.trim() || null,
          startDate: row.StartDate ? new Date(row.StartDate.trim()) : null,
          endDate: row.EndDate ? new Date(row.EndDate.trim()) : null,
          price: row.Price ? parseFloat(row.Price.trim()) : null,
          currency: row.Currency?.trim() || null,
          countryId: country ? country.id : null,
          cityId: city ? city.id : null,
          universityId: university ? university.id : null
        });
      }
    }

    console.log('Data successfully stored.');
  } catch (error) {
    console.error(`Error processing CSV data: ${error.message}`);
  }
};

const filePath = '/home/username/Desktop/udhaya/src/upload/data.csv'; 

// Schedule a cron job to run every minute
cron.schedule('* * * * *', () => {
  console.log('Running the CSV parsing operation...');
  parseAndSaveCsv(filePath)
    .then(() => console.log('CSV parsing operation completed.'))
    .catch((error) => console.error(`Error during CSV parsing operation: ${error.message}`));
});

const getCourses = async (page = 1, limit = 10, search = '', universityId, cityId, countryId) => {
  const offset = (page - 1) * limit;

  const where = {
    ...(search && { courseName: { [Op.iLike]: `%${search}%` } }),
    ...(universityId && { universityId }),
    ...(cityId && { cityId }),
    ...(countryId && { countryId })
  };

  try {
    const { count, rows } = await Course.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        { model: University, as: 'University' },
        { model: City, as: 'City' },
        { model: Country, as: 'Country' }
      ]
    });

    return {
      data:rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      courses: rows
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

const getCourseById = async (id) => {
  return Course.findByPk(id, {
    include: ['University', 'City', 'Country']
  });
};

const updateCourse= async (courseId, updateData) => {
  try {
    const course = await Course.findByPk(courseId);

    if (!course) {
      throw new Error('Course not found');
    }

    await course.update(updateData);

    return course;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

const deleteCourse = async (Id) => {
  try {
    const course = await Course.findByPk(Id);

    if (!course) {
      throw new Error('Course not found');
    }

    await course.destroy();

    return course;  
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};


module.exports = {
  getCourses,
  parseAndSaveCsv,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse
};
