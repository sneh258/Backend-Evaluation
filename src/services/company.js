const axios = require('axios');
const { Company, Sector } = require('../../database/models');
const utils = require('../utils');
const { handle_Company_URL, handle_sector_URL } = require('../constants');



const getData = async ({ urlLink }) => { 
    const csv = await axios.get(urlLink);
    const lines = utils.readDataByLine(csv);

    lines.forEach(async (line, index) => {
        if(index === 0){
            return;
        }
        const data = utils.splitString(line);
        const companyData = await axios.get(`${handle_Company_URL}${data[0]}`);
        const company = {
            id: companyData.id,
            name: companyData.name,
            ceo: companyData.ceo,
            description: companyData.description,
        };
        await Company.create(company);
    });

    

    lines.forEach(async (line, index) => {
        if(index === 0)
            return;
        const data = utils.splitString(line);
        const sectorData = await axios.get(`${handle_sector_URL}${data[1]}`);
        const sector = {
            name: data[1],
        };
        const newSector = await Sector.create(sector);
    
        sectorData.data.forEach( async (secData) => {
            let index=0;
            const score = ((Number(secData.performanceIndex[index++].value) * 10) + (Number(secData.performanceIndex[index++].value) / 10000) + (Number(secData.performanceIndex[index++].value) * 10) + Number(secData.performanceIndex[index++].value)) / 4;
      
            await Company.update({ sector_id: newSector.data.id, score: score }, { where: {
                id: secData.companyId
            } });
        });
    });
    return Company.findAll();
};

module.exports = { getData };