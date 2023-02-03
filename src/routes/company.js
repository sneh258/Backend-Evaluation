const express = require('express');
const  companyController = require('../controllers/company');
const middleware = require('../middleware/bodyValidation');
const router = express.Router();

router.route('/save')
    .post(middleware, companyController.getData);

module.exports = router;