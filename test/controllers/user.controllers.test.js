import { expect } from 'chai';
import sinon from 'sinon';
import UserControllers from '../../src/controllers/users.controllers.js';
import UserModels from '../../src/models/UserModel.js';
import { User } from '../../src/DTO/userDTO.js';


describe('UserControllers', () => {
    let req, res, userCreateStub, userReadStub, userReadAllStub, userUpdateStub, userDeleteStub;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        userCreateStub = sinon.stub(UserModels, 'create');
        userReadStub = sinon.stub(UserModels, 'read');
        userReadAllStub = sinon.stub(UserModels, 'readAll');
        userUpdateStub = sinon.stub(UserModels, 'update');
        userDeleteStub = sinon.stub(UserModels, 'delete');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('createUser', () => {
        it('should create a user and return 201 status if successful', async () => {
            req.body = { name: 'John', lastname: 'Doe', email: 'john.doe@example.com' };
            const mockUser = { id: 1, ...req.body };
            userCreateStub.resolves(mockUser);

            await UserControllers.createUser(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(mockUser)).to.be.true;
        });

        it('should return 400 status if missing data', async () => {
            req.body = { name: 'John' }; // Missing lastname and email

            await UserControllers.createUser(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ error: 'Faltan datos' })).to.be.true;
        });

        it('should return 500 status if there is an error', async () => {
            const error = new Error('Database error');
            userCreateStub.rejects(error);

            await UserControllers.createUser(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: 'Error interno del servidor' })).to.be.true;
        });
    });

    describe('getUserById', () => {
        it('should return user data and 200 status if successful', async () => {
            req.params.idUser = 1;
            const mockUser = { id: 1, name: 'John', lastname: 'Doe', email: 'john.doe@example.com' };
            userReadStub.resolves(mockUser);

            await UserControllers.getUserById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(mockUser)).to.be.true;
        });

        it('should return 500 status if there is an error', async () => {
            req.params.idUser = 1;
            const error = new Error('Database error');
            userReadStub.rejects(error);

            await UserControllers.getUserById(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: 'Error interno del servidor' })).to.be.true;
        });
    });

    describe('getAllUsers', () => {
        it('should return all users and 200 status if successful', async () => {
            const mockUsers = [
                { id: 1, name: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
                { id: 2, name: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com' }
            ];
            userReadAllStub.resolves(mockUsers);

            await UserControllers.getAllUsers(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(mockUsers)).to.be.true;
        });

        it('should return 500 status if there is an error', async () => {
            const error = new Error('Database error');
            userReadAllStub.rejects(error);

            await UserControllers.getAllUsers(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: 'Error interno del servidor' })).to.be.true;
        });
    });

    describe('updateUser', () => {
        it('should update a user and return 200 status if successful', async () => {
            req.params.idUser = 1;
            req.body = { name: 'John', lastname: 'Doe', email: 'john.doe@example.com' };
            const mockUser = { id: 1, ...req.body };
            userUpdateStub.resolves(mockUser);

            await UserControllers.updateUser(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(mockUser)).to.be.true;
        });

        it('should return 400 status if missing data', async () => {
            req.params.idUser = 1;
            req.body = { name: 'John' }; // Missing lastname and email

            await UserControllers.updateUser(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ error: 'Faltan datos' })).to.be.true;
        });

        it('should return 500 status if there is an error', async () => {
            req.params.idUser = 1;
            const error = new Error('Database error');
            userUpdateStub.rejects(error);

            await UserControllers.updateUser(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: 'Error interno del servidor' })).to.be.true;
        });
    });

    describe('deleteUser', () => {
        it('should delete a user and return 200 status if successful', async () => {
            req.params.idUser = 1;
            const mockResult = { message: 'User deleted successfully' };
            userDeleteStub.resolves(mockResult);

            await UserControllers.deleteUser(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(mockResult)).to.be.true;
        });

        it('should return 500 status if there is an error', async () => {
            req.params.idUser = 1;
            const error = new Error('Database error');
            userDeleteStub.rejects(error);

            await UserControllers.deleteUser(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: 'Error interno del servidor' })).to.be.true;
        });
    });
});
