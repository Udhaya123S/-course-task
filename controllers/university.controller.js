const httpStatus = require('http-status');
const universityService = require('../services/university.service');

exports.createUniversity = async (req, res) => {
  try {
    const university = await universityService.createUniversity(req.body);
    res.status(httpStatus.CREATED).json(university);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getUniversities = async (req, res) => {
  try {
    const { page, limit, sort, search } = req.query; 
    const universities = await universityService.getUniversities({ page, limit, sort, search });
    res.status(httpStatus.OK).json(universities);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getUniversityById = async (req, res) => {
  try {
    const university = await universityService.getUniversityById(req.params.id);
    if (university) {
      res.status(httpStatus.OK).json(university);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ message: 'University not found' });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.updateUniversity = async (req, res) => {
  try {
    const updatedUniversity = await universityService.updateUniversity(req.params.id, req.body);

    if (updatedUniversity) {
      res.status(httpStatus.OK).json({
        message: 'University updated successfully',
        data: updatedUniversity,
      });
    } else {
      res.status(httpStatus.NOT_FOUND).json({ message: 'University not found' });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};


exports.deleteUniversity = async (req, res) => {
  try {
    const university = await universityService.deleteUniversity(req.params.id);

    if (university) {
      res.status(httpStatus.OK).json({
        message: 'University deleted successfully',
        data: university,
      });
    } else {
      res.status(httpStatus.NOT_FOUND).json({ message: 'University not found' });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
