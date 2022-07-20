import { expect } from 'chai';
import BadRequestError from '../../../middlewares/errors/BadRequestError';
import NotFoundError from '../../../middlewares/errors/NotFoundError';
import MotorcycleService from '../../../services/MotorcycleService';
import { motoMock, motoIdMock } from '../mocks/MotoMocks'
import { MotoModelMock } from '../mocks/MotoModelMock'

describe('Car Service', () => {

  const motoService = new MotorcycleService(new MotoModelMock());

  describe('Create motorcycle', () => {
    it('Success', async () => {
      const motoCreated = await motoService.create(motoMock);
      expect(motoCreated).to.be.deep.equal(motoMock);
    });
  });

  describe('Get all cars', () => {
    it('Success', async () => {
      const motorcycles = await motoService.read();
      expect(motorcycles).to.be.deep.equal([motoMock]);
    });
  });

  describe('Get car by id', () => {
    it('Success', async () => {
      const motorcycle = await motoService.readOne(motoIdMock);
      expect(motorcycle).to.be.equal(motoMock);
    });

    it('Throws a bad request errror if id invalid', async () => {
      try {
        await motoService.readOne('invalid_id');
      } catch (error) {
        expect(error instanceof BadRequestError).to.be.true;
      }
    });

    it('Throws a not fuond error if car not found', async () => {
      try {
        await motoService.readOne('meudeusqueprojetochato77')
      } catch (error) {
        expect(error instanceof NotFoundError).to.be.true;
      }
    });
  });

  describe('Update car by id', () => {
    it('Success', async () => {
      const car = await motoService.update(motoIdMock, motoMock);
      expect(car).to.be.equal(motoMock);
    });

    it('Throws a bad request errror if id invalid', async () => {
      try {
        await motoService.update('invalid_id', motoMock);
      } catch (error) {
        expect(error instanceof BadRequestError).to.be.true;
      }
    });

    it('Throws a not fuond error if car not found', async () => {
      try {
        await motoService.update('meudeusqueprojetochato77', motoMock)
      } catch (error) {
        expect(error instanceof NotFoundError).to.be.true;
      }
    });
  });

  describe('Delete car by id', () => {
    it('Success', async () => {
      const car = await motoService.delete(motoIdMock);
      expect(car).to.be.equal(motoMock);
    });

    it('Throws a bad request errror if id invalid', async () => {
      try {
        await motoService.delete('invalid_id');
      } catch (error) {
        expect(error instanceof BadRequestError).to.be.true;
      }
    });

    it('Throws a not fuond error if car not found', async () => {
      try {
        await motoService.delete('meudeusqueprojetochato77')
      } catch (error) {
        expect(error instanceof NotFoundError).to.be.true;
      }
    });
  });
});