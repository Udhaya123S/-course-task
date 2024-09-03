const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/course.controller');

router.post('/',  courseController.createCourse);

router.post('/upload',  courseController.uploadCsv);

router.get('/', courseController.getCourses);

router.get('/:id', courseController.getCourseById); 

router.put('/:id', courseController.updateCourseById);

router.delete('/:id', courseController.deleteCourseById);

module.exports = router;
