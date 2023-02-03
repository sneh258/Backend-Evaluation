const getControllers = require('./../../src/controllers/company');
const getServices = require('./../../src/services/company');

describe('Company Controllers', () => {
    it('should return an array of objects', async () => {
        jest.spyOn(getServices, 'getData').mockResolvedValue([
            {
                id: 1
            }
        ]
        );

        const mockReq = {};

        const mockRes = {

            status: jest.fn().mockReturnThis(),
            json: jest.fn()

        };
        await getControllers.getData(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith(
            [
                {
                    id: 1
                }
            ]
        );
    });
    it('should return error', async () => {
        jest.spyOn(getServices, 'save').mockRejectedValue(new Error('Internal Server error!!'));

        const mockReq = {};

        const mockRes = {

            status: jest.fn().mockReturnThis(),
            json: jest.fn()

        };
        await getControllers.getData(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(500);
        expect(mockRes.json).toBeCalledWith({
            error: 'Internal Server error!!'
        });
    });
});