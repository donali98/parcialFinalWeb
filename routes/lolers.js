const express = require('express');
const router = express.Router();

const lolerController = require('../controllers/lolerController');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/',lolerController.add);
router.get('/',lolerController.find);
router.get('/:id',lolerController.findOne);
router.put('/:id',lolerController.update);
router.delete('/:id',lolerController.delete);



module.exports = router;
