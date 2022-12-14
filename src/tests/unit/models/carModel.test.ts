import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import carMongooseModel from '../../../schemas/CarSchema';
import { carMock, carIdMock } from '../mocks/CarMocks';
import mongoose from 'mongoose';
import BadRequestError from '../../../middlewares/errors/BadRequestError';

describe('Car Model', () => {
  describe('Create car', () => {

    before(() => sinon.stub(Model, 'create').resolves(carMock));

    after(() => (Model.create as SinonStub).restore());

    it('Success', async () => {
      const carModel = new CarModel(carMongooseModel);

      const carCreated = await carModel.create(carMock);

      expect(carCreated).to.be.deep.equal(carMock);
    });
  });

  describe('Find all cars', () => {

    before(() => sinon.stub(Model, 'find').resolves([carMock]));

    after(() => (Model.find as SinonStub).restore());

    it('Success', async () => {
      const carModel = new CarModel(carMongooseModel);

      const cars = await carModel.read();

      expect(cars).to.be.deep.equal([carMock]);
    });
  });

  describe('Find car by id', () => {
    describe('Success', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findById').resolves(carMock)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findById as SinonStub).restore()
      });

      it('Returns correct data', async () => {
        const carModel = new CarModel(carMongooseModel);

        const car = await carModel.readOne(carIdMock);
  
        expect(car).to.be.deep.equal(carMock);
      });
    });

    describe('Failure', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findById').resolves(null)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findById as SinonStub).restore()
      });

      it('Returns null if id does not exist', async () => {
        const carModel = new CarModel(carMongooseModel);

        const car = await carModel.readOne('invalid_id');
  
        expect(car).to.be.equal(null);
      });
    });

    describe('Error', () => {
  
      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(false),
        sinon.stub(Model, 'findById').resolves(null)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findById as SinonStub).restore()
      });

      it('Throws bad request error if id is invalid', async () => {
        try {
          const carModel = new CarModel(carMongooseModel);
          await carModel.readOne('invalid_id');
        } catch (error) {
          expect(error instanceof BadRequestError).to.be.true;
        }
      });
    });
  });

  describe('Update car by id', () => {
    describe('Success', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findOneAndUpdate').resolves(carMock)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findOneAndUpdate as SinonStub).restore()
      });

      it('Updates and returns correct data', async () => {
        const carModel = new CarModel(carMongooseModel);
  
        const updated = await carModel.update(carIdMock, carMock);
  
        expect(updated).to.be.deep.equal(carMock);
      });
    });

    describe('Failure', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findOneAndUpdate').resolves(null)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findOneAndUpdate as SinonStub).restore()
      });

      it('Returns null if id does not exist', async () => {
        const carModel = new CarModel(carMongooseModel);
  
        const updated = await carModel.update('invalid_id', carMock);
  
        expect(updated).to.be.equal(null);
      });
    });

    describe('Error', () => {
  
      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(false),
        sinon.stub(Model, 'findOneAndUpdate').resolves(null)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findOneAndUpdate as SinonStub).restore()
      });

      it('Throws bad request error if id is invalid', async () => {
        try {
          const carModel = new CarModel(carMongooseModel);
          await carModel.update('invalid_id', carMock);
        } catch (error) {
          expect(error instanceof BadRequestError).to.be.true;
        }
      });
    });
  });

  describe('Delete car by id', () => {
    describe('Success', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findOneAndDelete').resolves(carMock)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findOneAndDelete as SinonStub).restore()
      });

      it('Deletes and returns correct data', async () => {
        const carModel = new CarModel(carMongooseModel);
  
        const deleted = await carModel.delete(carIdMock);
  
        expect(deleted).to.be.deep.equal(carMock);
      });
    });

    describe('Failure', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findOneAndDelete').resolves(null)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findOneAndDelete as SinonStub).restore()
      });

      it('Returns null if id does not exist', async () => {
        const carModel = new CarModel(carMongooseModel);
    
        const deleted = await carModel.delete('invalid_id');
  
        expect(deleted).to.be.equal(null);
      });
    });

    describe('Error', () => {
  
      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(false),
        sinon.stub(Model, 'findOneAndDelete').resolves(null)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findOneAndDelete as SinonStub).restore()
      });

      it('Throws bad request error if id is invalid', async () => {
        try {
          const carModel = new CarModel(carMongooseModel);
          await carModel.delete('invalid_id');
        } catch (error) {
          expect(error instanceof BadRequestError).to.be.true;
        }
      });
    });
  });
});