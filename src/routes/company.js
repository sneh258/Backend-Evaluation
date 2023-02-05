const express = require('express');
const companyController = require('../controllers/company');
const middleware = require('../middleware/bodyValidation');
const router = express.Router();

router.route('/save')
    .post(middleware.bodyValidation, companyController.getData);

router.route('/companies')
    .get(middleware.sectorValidation,companyController.getScore);
    
router.route('/update')
    .patch(middleware.idValidation,companyController.updateCompany);    

module.exports = router;