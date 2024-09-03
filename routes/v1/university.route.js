const express = require('express');
const universityController = require('../../controllers/university.controller');

const router = express.Router();


router.post('/', universityController.createUniversity);

router.get('/', universityController.getUniversities);

router.get('/:id', universityController.getUniversityById);

router.put('/:id', universityController.updateUniversity);

router.delete('/:id', universityController.deleteUniversity);

module.exports = router;