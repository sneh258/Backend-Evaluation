const axios = require('axios');
const { Company, Sector } = require('../../database/models');
const utils = require('../utils/readData');
const handleCompanyURL='http://54.167.46.10/company/95b5a067-808a-44a9-a490-b4ef8a045f61';
const handleSectorURL='http://54.167.46.10/sector?name=Software';

const getData = async () => {
    const csv = await axios.get('https://store-0001.s3.amazonaws.com/input.csv');
    const lines = utils.readData(csv);

    lines.forEach(async (line, index) => {
        if (index === 0) {
            return;
        }
        const data = utils.splitString(line);
        const companyData = await axios.get(`${handleCompanyURL}${data[0]}`);
        
        
        const company = {
            id: companyData.id,
            name: companyData.name,
            ceo: companyData.ceo,
            description: companyData.description,
        };
        await Company.create(company);
    });



    lines.forEach(async (line, index) => {
        if (index === 0)
            return;
        const data = utils.splitString(line);
        const sectorData = await axios.get(`${handleSectorURL}${data[1]}`);
        const sector = {
            name: data[1],
        };
        const newSector = await Sector.create(sector);

        sectorData.data.forEach(async (secData) => {
            let index = 0;
            const score = ((Number(secData.performanceIndex[index++].value) * 10) + (Number(secData.performanceIndex[index++].value) / 10000) + (Number(secData.performanceIndex[index++].value) * 10) + Number(secData.performanceIndex[index++].value)) / 4;

            await Company.update({ sector_id: newSector.data.id, score: score }, {
                where: {
                    id: secData.companyId
                }
            });
        });
    });
    return Company.findAll();
};

module.exports = getData;