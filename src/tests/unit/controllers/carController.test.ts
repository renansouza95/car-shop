import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarController from '../../../controllers/CarController';
import { CarServiceMock } from '../mocks/CarServiceMock';
import { carMock, carIdMock } from '../mocks/CarMocks';
import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../../../middlewares/errors/BadRequestError';

chai.use(chaiHttp);

const { expect } = chai;

const req = {} as Request;
const res = {} as Response;
let next = () => ({}) as NextFunction;

const BADREQUEST = 'Id must have 24 hexadecimal characters';

describe('Car Controller', () => {
  describe('Create car', () => {
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new CarController(new CarServiceMock());
      await carController.create(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new CarServiceMock();
      const conflictError = new Error('Invalid fields');
      carServiceMock.create = () => { throw conflictError };
      const carController = new CarController(carServiceMock);
      await carController.create(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });

  describe('Get all cars', () => {
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new CarController(new CarServiceMock());
      await carController.read(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new CarServiceMock();
      const conflictError = new Error('Invalid fields');
      carServiceMock.read = () => { throw conflictError };
      const carController = new CarController(carServiceMock);
      await carController.read(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });

  describe('Get car by id', () => { 
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: carIdMock };
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new CarController(new CarServiceMock());
      await carController.readOne(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new CarServiceMock();
      const conflictError = new BadRequestError(BADREQUEST);
      carServiceMock.readOne = () => { throw conflictError };
      const carController = new CarController(carServiceMock);
      await carController.readOne(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });

  describe('Update car by id', () => { 
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: carIdMock };
      req.body = carMock;
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new CarController(new CarServiceMock());
      await carController.update(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new CarServiceMock();
      const conflictError = new BadRequestError(BADREQUEST);
      carServiceMock.update = () => { throw conflictError };
      const carController = new CarController(carServiceMock);
      await carController.update(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });

  describe('Delete car by id', () => { 
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: carIdMock };
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new CarController(new CarServiceMock());
      await carController.delete(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new CarServiceMock();
      const conflictError = new BadRequestError(BADREQUEST);
      carServiceMock.delete = () => { throw conflictError };
      const carController = new CarController(carServiceMock);
      await carController.delete(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });
});
