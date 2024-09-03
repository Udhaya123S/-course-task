const University = require('../models/university.model');
const Country = require('../models/country.model');
const City = require('../models/city.model');
const Course = require('../models/course.model');

// Define associations with unique aliases

// course to University,city and country
Country.hasMany(Course, {foreignKey: 'countryId',as: 'CountryCourses',});
Course.belongsTo(Country, { as: 'Country', foreignKey: 'countryId' });


City.hasMany(Course, { foreignKey: 'cityId',as: 'CityCourses', });
Course.belongsTo(City, { as: 'City', foreignKey: 'cityId' });

University.hasMany(Course, { foreignKey: 'universityId', as: 'UniversityCourses', });
Course.belongsTo(University, { as: 'University', foreignKey: 'universityId' });

// country to city
// Country.hasMany(City, { foreignKey: 'countryId', as: 'cities' });
// City.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });


module.exports = { University, City, Country, Course };


