import { expect } from 'chai';
import BadRequestError from '../../../middlewares/errors/BadRequestError';
import NotFoundError from '../../../middlewares/errors/NotFoundError';
import CarService from '../../../services/CarService';
import { carMock, carIdMock } from '../mocks/CarMocks';
import { CarModelMock } from '../mocks/CarModelMock';

describe('Car Service', () => {

  const carService = new CarService(new CarModelMock());

  describe('Create car', () => {
    it('Success', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.be.deep.equal(carMock);
    });
  });

  describe('Get all cars', () => {
    it('Success', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal([carMock]);
    });
  });

  describe('Get car by id', () => {
    it('Success', async () => {
      const car = await carService.readOne(carIdMock);
      expect(car).to.be.equal(carMock);
    });

    it('Throws a bad request errror if id invalid', async () => {
      try {
        await carService.readOne('invalid_id');
      } catch (error) {
        expect(error instanceof BadRequestError).to.be.true;
      }
    });

    it('Throws a not fuond error if car not found', async () => {
      try {
        await carService.readOne('meudeusqueprojetochato77')
      } catch (error) {
        expect(error instanceof NotFoundError).to.be.true;
      }
    });
  });

  describe('Update car by id', () => {
    it('Success', async () => {
      const car = await carService.update(carIdMock, carMock);
      expect(car).to.be.equal(carMock);
    });

    it('Throws a bad request errror if id invalid', async () => {
      try {
        await carService.update('invalid_id', carMock);
      } catch (error) {
        expect(error instanceof BadRequestError).to.be.true;
      }
    });

    it('Throws a not fuond error if car not found', async () => {
      try {
        await carService.update('meudeusqueprojetochato77', carMock)
      } catch (error) {
        expect(error instanceof NotFoundError).to.be.true;
      }
    });
  });

  describe('Delete car by id', () => {
    it('Success', async () => {
      const car = await carService.delete(carIdMock);
      expect(car).to.be.equal(carMock);
    });

    it('Throws a bad request errror if id invalid', async () => {
      try {
        await carService.delete('invalid_id');
      } catch (error) {
        expect(error instanceof BadRequestError).to.be.true;
      }
    });

    it('Throws a not fuond error if car not found', async () => {
      try {
        await carService.delete('meudeusqueprojetochato77')
      } catch (error) {
        expect(error instanceof NotFoundError).to.be.true;
      }
    });
  });
});