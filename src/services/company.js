const axios = require('axios');
const { Company, Sector } = require('../../database/models');
const readData = require('../utils/readData');
const splitString = require('../utils/splitString');
const handleCompanyURL='http://54.167.46.10/company/';
const handleSectorURL='http://54.167.46.10/sector?name=';

const getData = async () => {
    const csv = await axios.get('https://store-0001.s3.amazonaws.com/input.csv');//read
    const lines = readData(csv);//split

    lines.forEach(async (line, index) => { //traverse for company creation (company table)
        if (index === 0) {
            return;
        }
        const data = splitString(line); // to split id and sector
        const companyData = await axios.get(`${handleCompanyURL}${data[0]}`); //get id and sector
        
        
        const company = {
            id: companyData.data.id,
            name: companyData.data.name,
            ceo: companyData.data.ceo,
            //description: companyData.data.description,
        };
        await Company.create(company);
    });



    lines.forEach(async (line, index) => {// (sector table)
        if (index === 0)
            return;
        const data = splitString(line);//split  by commas
        const sectorData = await axios.get(`${handleSectorURL}${data[1]}`);
        const sector = {
            name: data[1],
        };
        const newSector = await Sector.create(sector);// filling sector table

        sectorData.data.forEach(async (secData) => {
            let index = 0;
            const score = ((Number(secData.performanceIndex[index++].value) * 10) + (Number(secData.performanceIndex[index++].value) / 10000) + (Number(secData.performanceIndex[index++].value) * 10) + Number(secData.performanceIndex[index++].value)) / 4;

            await Company.update({ sector_id: newSector.id, score: score }, {
                where: {
                    id: secData.companyId
                }
            });
        });
        
    });
    return Company.findAll();
};


const getScore = async (query) => {
    const found=Sector.findOne({ where: { name: query }, include: [ 'company' ] });
    return found;
};

const updateCompanyDetails = async (id, body) => {
    const company = await Company.findOne({ where: { id: id } });
    if(!company)
        return {};
    const ceo = body.ceo ? body.ceo : company.data.ceo;
    const address = body.address ? body.address : company.data.address;

    
    Company.update({ ceo: ceo, address:address }, { where: { id: id } });
    return Company.findAll({where:{id:id}});
};

module.exports = {getData,getScore,updateCompanyDetails};