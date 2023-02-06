const { Company } = require('./../../database/models');
const getServices = require('./../../src/services/company');


describe('Testing Services', () => {

    it('should return updated company when company present and update method called', async () => {
        const id = '95b5a067-808a-44a9-a490-b4ef8a045f61';
        const body = {
            ceo: 'ceo',
            address: 'address'
        };
        jest.spyOn(Company, 'findOne').mockResolvedValue({
            data: {
                id,
                name: 'Volkswagen',
                ceo: 'Mr. Marie Sipes',
                address: '',
                score: '18.92',
            }
        });

        jest.spyOn(Company, 'update').mockResolvedValue([1]);
        jest.spyOn(Company, 'findAll').mockResolvedValue({
            address: null,
            ceo: 'Grady Smitham',
            createdAt: '2023-02-05T19:23:03.975Z',
            description: null,
            id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
            name: 'Volkswagen',
            score: '15.784075000000001',
            sector_id: 61,
            updatedAt: '2023-02-05T19:23:04.489Z',
        });

        const updatedCompany = await getServices.updateCompanyDetails(id, body);
        expect(updatedCompany).toEqual({
            address: null,
            ceo: 'Grady Smitham',
            createdAt: '2023-02-05T19:23:03.975Z',
            description: null,
            id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
            name: 'Volkswagen',
            score: '15.784075000000001',
            sector_id: 61,
            updatedAt: '2023-02-05T19:23:04.489Z',
        });
    });

    it('should return empty object when company not present and update method called', async () => {
        const id = '95b5a067-808a-44a9-a490-b4ef8a045f61';
        const body = {
            ceo: 'ceo',
            address: 'address'
        };
        jest.spyOn(Company, 'findOne').mockResolvedValue(null);

        const updatedCompany = await getServices.updateCompanyDetails(id, body);
        expect(updatedCompany).toEqual({});
    });


});   