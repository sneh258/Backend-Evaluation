const validateBody = require('../../src/middleware/bodyValidation');
describe('validateBody', () => {

    //body validation

    it('Should give success message', () => {
        const mockReq = {
            body: {
                urlLink: 'https://www.google.com'
            }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();
        validateBody.bodyValidation(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalled();
    });
    it('Should give error message', () => {
        const req = {
            body: {
                urlLink: ''
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        validateBody.bodyValidation(req, res, next);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            message: '"urlLink" is not allowed to be empty'
        });
    });

    //sector Validation

    it('Should give success message', () => {
        const mockReq = {
            query: {
                sector:'Software'
            }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();
        validateBody.sectorValidation(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalled();
    });
    it('Should give error message', () => {
        const req = {
            query: {
                sector:''
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        validateBody.sectorValidation(req, res, next);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            message: '"sector" is not allowed to be empty'
        });
    });

    //idValidation

    it('Should give success message', () => {
        const mockReq = {
            query: {
                id:'1234'
            }
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockNext = jest.fn();
        validateBody.idValidation(mockReq, mockRes, mockNext);
        expect(mockNext).toBeCalled();
    });
    it('Should give error message', () => {
        const req = {
            query: {
                id:''
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        validateBody.idValidation(req, res, next);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            message: '"id" is not allowed to be empty'
        });
    });



});