const express = require('express');
const countryController = require('../../controllers/country.controller');

const router = express.Router();


router.post('/', countryController.createCountry);

router.get('/', countryController.getCountries);

router.get('/:id', countryController.getCountryById);

router.put('/:id', countryController.updateCountryById);

router.delete('/:id', countryController.deleteCountryById );

module.exports = router;