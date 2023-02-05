const companyService  = require('../services/company');

const getData = async (req, res) => {
    try {
        const body = req.body;
        const data = await companyService.getData(body);
        res.status(201).json(data.map((company) => { return { id: company.id, name: company.name, score: company.score }; }));
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getScore=async(req,res)=>{

    try {
        const query = req.query.sector;
        const data = await companyService.getScore(query);
        const companies = data.data.company;
        //sorting is needed to be done
        res.status(200).json(companies.map((company, index) => { return { id: company.id, name: company.name, ceo: company.ceo, score: company.score, rank: index + 1 }; }));
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }


};

const updateCompany = async (req, res) => {
    try {
        const id = req.query.id;
        const bodyCeo = req.body.ceo;
        const bodyAddress=req.body.bodyAddress;
        const data = await companyService.updateCompanyDetails(id, bodyCeo,bodyAddress);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {getData,getScore,updateCompany};