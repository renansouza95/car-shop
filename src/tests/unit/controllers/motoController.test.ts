import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import MotorcycleController from '../../../controllers/MotorcycleController';
import { MotoServiceMock } from '../mocks/MotoServiceMock';
import { motoMock, motoIdMock } from '../mocks/MotoMocks';
import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../../../middlewares/errors/BadRequestError';

chai.use(chaiHttp);

const { expect } = chai;

const req = {} as Request;
const res = {} as Response;
let next = () => ({}) as NextFunction;

const BADREQUEST = 'Id must have 24 hexadecimal characters';

describe('Motorcycle Controller', () => {
  describe('Create motorcycle', () => {
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = motoMock;
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new MotorcycleController(new MotoServiceMock());
      await carController.create(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMock)).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new MotoServiceMock();
      const conflictError = new Error('Invalid fields');
      carServiceMock.create = () => { throw conflictError };
      const carController = new MotorcycleController(carServiceMock);
      await carController.create(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });

  describe('Get all motorcycles', () => {
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new MotorcycleController(new MotoServiceMock());
      await carController.read(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motoMock])).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new MotoServiceMock();
      const conflictError = new Error('Invalid fields');
      carServiceMock.read = () => { throw conflictError };
      const carController = new MotorcycleController(carServiceMock);
      await carController.read(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });

  describe('Get motorcycle by id', () => { 
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: motoIdMock };
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new MotorcycleController(new MotoServiceMock());
      await carController.readOne(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMock)).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new MotoServiceMock();
      const conflictError = new BadRequestError(BADREQUEST);
      carServiceMock.readOne = () => { throw conflictError };
      const carController = new MotorcycleController(carServiceMock);
      await carController.readOne(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });

  describe('Update motorcycle by id', () => { 
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: motoIdMock };
      req.body = motoMock;
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new MotorcycleController(new MotoServiceMock());
      await carController.update(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMock)).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new MotoServiceMock();
      const conflictError = new BadRequestError(BADREQUEST);
      carServiceMock.update = () => { throw conflictError };
      const carController = new MotorcycleController(carServiceMock);
      await carController.update(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });

  describe('Delete motorcycle by id', () => { 
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: motoIdMock };
      next = sinon.stub();
    });
  
    it('Success', async () => {
      const carController = new MotorcycleController(new MotoServiceMock());
      await carController.delete(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMock)).to.be.true
    });
  
    it('Fails', async () => {
      const carServiceMock = new MotoServiceMock();
      const conflictError = new BadRequestError(BADREQUEST);
      carServiceMock.delete = () => { throw conflictError };
      const carController = new MotorcycleController(carServiceMock);
      await carController.delete(req, res, next);
      expect((next as sinon.SinonStub).calledWith(conflictError)).to.be.true;
    });
  });
});
