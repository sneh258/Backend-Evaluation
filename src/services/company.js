const axios = require('axios');
const { Company, Sector } = require('../../database/models');
const utils = require('../utils');
const { GET_COMPANY_API_URL, GET_SECTOR_API_URL } = require('../constants');
const save = async ({ urlLink }) => { // FUCNTION TO SAVE COMPANY AND SECTOR DATA;
    const csv = await axios.get(urlLink);
    const lines = utils.readDataByLine(csv);
    // CREATE COMPANY DATA
    lines.forEach(async (line, index) => {
        if(index === 0){
            return;
        }
        const data = utils.splitString(line);
        const companyData = await axios.get(`${GET_COMPANY_API_URL}${data[0]}`);
        const company = {
            id: companyData.id,
            name: companyData.name,
            ceo: companyData.ceo,
            description: companyData.description,
        };
        await Company.create(company);
    });

    // CREATE SECTOR DATA AND UPDATE COMPANY DATA
    lines.forEach(async (line, index) => {
        if(index === 0)
            return;
        const data = utils.splitString(line);
        const sectorData = await axios.get(`${GET_SECTOR_API_URL}${data[1]}`);
        const sector = {
            name: data[1],
        };
        const newSector = await Sector.create(sector);
        console.log(newSector);
        sectorData.data.forEach( async (secData) => {
            const score = ((Number(secData.performanceIndex[0].value) * 10) + (Number(secData.performanceIndex[1].value) / 10000) + (Number(secData.performanceIndex[2].value) * 10) + Number(secData.performanceIndex[3].value)) / 4;
      
            await Company.update({ sector_id: newSector.data.id, score: score }, { where: {
                id: secData.companyId
            } });
        });
    });
    return Company.findAll();
};

module.exports = { save };