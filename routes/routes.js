const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/User.controller');
const foodController = require('../Controllers/Food.controller');

router.post('/students', [], studentController.createStudent);
router.get('/students/:studentId', [], studentController.readStudent);
router.patch('/students/:studentId/update', [], studentController.updateStudent);
router.delete('/students/:studentId/delete', [], studentController.deleteStudent);

router.post('/foods', [], foodController.createFood);
router.get('/foods/:id', [], foodController.readFood);
router.get('/foods', foodController.searchFood);

module.exports = router;
