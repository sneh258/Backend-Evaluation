const {Company,Sector}=require('./../../database/models');
const getServices=require('./../../src/services/company');


describe('Testing Services', () => {
    
    // it('should return the deatils of the table Company', async () => {
    //     jest.spyOn(Company, 'create').mockResolvedValue([
    //         {
    //             'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
    //             'name': 'D-Mart',
    //             'score': '19.569474999999997'
    //         }
    //     ]
    //     );

    //     const data = await getServices.getData();
    //     expect(data).toEqual(
    //         [
    //             {
    //                 'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
    //                 'name': 'D-Mart',
    //                 'score': '19.569474999999997'
    //             }

    //         ]
    //     );

    //     jest.spyOn(Sector, 'create').mockResolvedValue([
    //         {
    //             'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
    //             'name': 'D-Mart',
                
    //         }
    //     ]
    //     );

    //     jest.spyOn(Company, 'update').mockResolvedValue([
    //         {
    //             'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
    //             'score': '19.569474999999997'
                
    //         }
    //     ]
    //     );

    //     jest.spyOn(Company, 'findAll').mockResolvedValue([
    //         {
    //             'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
    //             'name': 'D-Mart',
    //             'score': '19.569474999999997'
    //         }
    //     ]
    //     );

        

    //     const dataOne = await getServices.getData();
    //     expect(dataOne).toEqual(
    //         [
    //             {
    //                 'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
    //                 'name': 'D-Mart',
    //                 'score': '19.569474999999997'
    //             }

    //         ]
    //     );


    // });




    it('should return an array of objects', async () => {
        jest.spyOn(Company, 'findOne').mockResolvedValue([
            {
                'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
            
            }
        ]
        );
        jest.spyOn(Company, 'update').mockResolvedValue([
            {
                'ceo': 'sneha',
                'address': 'kaggadaspura'

            }
        ]
        );

        jest.spyOn(Company, 'findAll').mockResolvedValue([
            {
                'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
                'name': 'D-Mart',
                'score': '19.569474999999997'
            }
        ]
        );

        const data = await getServices.updateCompanyDetails();
        expect(data).toEqual(
            [
                {
                    'id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
                    'name': 'D-Mart',
                    'score': '19.569474999999997'
                }

            ]
        );
    });


});   