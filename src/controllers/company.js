const { companyService } = require('../services');
const save = async (req, res) => {
    try {
        const body = req.body;
        const data = await companyService.save(body);
        console.log(data);
        res.status(201).json(data.map((company) => { return { id: company.id, name: company.name, score: company.score }; }));
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {save};