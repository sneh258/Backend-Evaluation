const Joi = require('joi');

const bodyValidation = (req, res, next) => {
    const schema = Joi.object({
        urlLink: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if(error) {
        res.status(400).json({ message: error.message });
        return;
    }
    next();
};

const sectorValidation = (req, res, next) => {
    const schema = Joi.object({
        sector: Joi.string().required()
    });
    const { error } = schema.validate(req.query);
    if(error) {
        res.status(400).json({ message: error.message });
        return;
    }
    next();
};

const idValidation = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const { error } = schema.validate(req.query);
    if(error) {
        res.status(400).json({ message: error.message });
        return;
    }
    next();
};



module.exports = {bodyValidation,sectorValidation,idValidation};