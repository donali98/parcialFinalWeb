const express = require('express');
const router = express.Router();

const lolerController = require('../controllers/lolerController');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/',lolerController.add);
router.get('/',lolerController.find);


module.exports = router;
