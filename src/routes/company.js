const express = require('express');
const  companyController = require('../controllers/company');
const middlewares = require('../middlewares');
const router = express.Router();

router.route('/save')
    .post(middlewares.bodyValidation, companyController.getData);

module.exports = router;