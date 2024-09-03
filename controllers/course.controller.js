const httpStatus = require('http-status');
const courseService = require('../services/course.service');


exports.createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(httpStatus.CREATED).json({ message: 'Course created successfully', data: course });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.uploadCsv = async (req, res) => {
    const filePath = '/home/username/Desktop/udhaya/src/upload/data.csv'; 
  
    try {
        const results = await courseService.parseAndSaveCsv(filePath);
        res.status(200).send({
            message: 'CSV data successfully uploaded and inserted into the database',
            data: results,
        });
    } catch (error) {
        console.error('Error uploading CSV:', error);
        res.status(500).send({
            message: 'Error uploading CSV data',
            error: error.message || 'Unknown error',
        });
    }
  };
  
exports.getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', universityId, cityId, countryId } = req.query;

    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 10;

    const courses = await courseService.getCourses(parsedPage, parsedLimit, search, universityId, cityId, countryId);

    res.status(httpStatus.OK).json({
      message: 'Courses fetched successfully',
      data: courses.courses,
      total: courses.totalItems,
      totalPages: courses.totalPages,
      currentPage: courses.currentPage,
      limit: parsedLimit
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (course) {
      res.status(httpStatus.OK).json(course);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.updateCourseById= async (req, res) => {
  const courseId = req.params.id;
  const updateData = req.body;

  try {
    const updatedCourse = await courseService.updateCourse(courseId, updateData);

    res.status(httpStatus.OK).json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Error updating course',
      error: error.message
    });
  }
};

exports.deleteCourseById= async (req, res) => {
  const { id } = req.params;

  try {
    const result = await courseService.deleteCourse(id);
    return res.status(200).json({ message: 'Course deleted successfully', course: result });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};