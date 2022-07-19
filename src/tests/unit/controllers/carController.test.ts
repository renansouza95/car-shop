// import * as sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import server from '../../../server';
// import CarController from '../../../controllers/CarController';
// import { CarServiceMock } from '../mocks/CarServiceMock';
// import { carMock, carMockAndId } from '../mocks/CarMocks';
// import { Request, Response, NextFunction } from 'express';
// import BadRequestError from '../../../middlewares/errors/BadRequestError';

// chai.use(chaiHttp);

// const { expect } = chai;

// const NOTFOUND = 'car not found';

// const BADREQUEST = 'Id must have 24 hexadecimal characters';

// describe('Car Controller', () => {
//   describe('Create car', () => {
//     const req = {} as Request;
//     const res = {} as Response;
//     let next = () => ({}) as NextFunction;
  
//     before(async () => {
//       res.status = sinon.stub().resolves(res);
//       res.json = sinon.stub().resolves(res);
//       req.body = carMock;
//       next = sinon.stub();
//     });
  
//     // after(()=>{
//     //   res.status = sinon.restore();
//     // })
  
//     it('Success', async () => {
//       const carController = new CarController(new CarServiceMock());
//       await carController.create(req, res, next);
//       expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
//       expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true
//     });
  
//     it('Fails', async () => {
//       const carServiceMock = new CarServiceMock();
//       await carController.create(req, res, next);
//       expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
//       expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true
//     });
//   });
// })
