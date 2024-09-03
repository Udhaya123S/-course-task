const httpStatus = require('http-status');
const cityService = require('../services/city.service');

exports.createCity = async (req, res) => {
  try {
    const city = await cityService.createCity(req.body);
    res.status(httpStatus.CREATED).json(city);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getCities = async (req, res) => {
  try {
    const { page, limit, sort, search } = req.query; 
    const cities = await cityService.getCities({ page, limit, sort, search });
    res.status(httpStatus.OK).json(cities);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    if (city) {
      res.status(httpStatus.OK).json(city);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    
    const updatedCity = await cityService.updateCity(id, updates);

    if (updatedCity) {
      
      res.status(httpStatus.OK).json({
        message: 'City updated successfully',
        data: updatedCity,
      });
    } else {
      res.status(httpStatus.NOT_FOUND).json({
        message: 'City not found',
      });
    }
  } catch (error) {
  
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const deleted = await cityService.deleteCity(req.params.id);
    if (deleted) {
      res.status(httpStatus.OK).json({ message: 'City deleted successfully' });
    } else {
      res.status(httpStatus.NOT_FOUND).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

