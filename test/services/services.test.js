const { service } = require('../../src/service');
const { database } = require('../../database/models');

describe('Service', () => {
    it('should save data and add to databse', async () => {
        jest.spyOn(database, 'findAll').mockResolvedValue([
            {
                id: 1,
                name: 'todo1',
                isCompleted: false,
                createdAt: 'date-time',
                updatedAt: 'date-time'
            },
        ]);
        const task = await service.getAllTodos();
        expect(task).toEqual([
            {
                id: 1,
                name: 'todo1',
                isCompleted: false,
                createdAt: 'date-time',
                updatedAt: 'date-time'
            },
        ]);
    });

});