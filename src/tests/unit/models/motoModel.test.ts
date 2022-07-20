import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { Model } from 'mongoose';
import motoMongooseModel from '../../../schemas/MotorcycleSchema';
import { motoMock, motoIdMock } from '../mocks/MotoMocks';
import mongoose from 'mongoose';
import BadRequestError from '../../../middlewares/errors/BadRequestError';

describe('Motorcycle Model', () => {

  describe('Create motorcycle', () => {
    
    before(() => sinon.stub(Model, 'create').resolves(motoMock));

    after(() => (Model.create as SinonStub).restore());

    it('Success', async () => {
      const motoModel = new MotorcycleModel(motoMongooseModel);

      const motoCreated = await motoModel.create(motoMock);

      expect(motoCreated).to.be.deep.equal(motoMock);
    });
  });

  describe('Find all motorcycles', () => {

    before(() => sinon.stub(Model, 'find').resolves([motoMock]));

    after(() => (Model.find as SinonStub).restore());

    it('Success', async () => {
      const motoModel = new MotorcycleModel(motoMongooseModel);

      const motorcycles = await motoModel.read();

      expect(motorcycles).to.be.deep.equal([motoMock]);
    });
  });

  describe('Find motorcycle by id', () => {

    describe('Success', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findById').resolves(motoMock)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findById as SinonStub).restore()
      });
  
      it('Returns correct data', async () => {
        const motoModel = new MotorcycleModel(motoMongooseModel);
  
        const motorcycle = await motoModel.readOne(motoIdMock);
  
        expect(motorcycle).to.be.deep.equal(motoMock);
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

      it('Returns null if motorcycle does not exist', async () => {
        const motoModel = new MotorcycleModel(motoMongooseModel);
  
        const motorcycle = await motoModel.readOne('invalid_id');
  
        expect(motorcycle).to.be.equal(null);
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
          const motoModel = new MotorcycleModel(motoMongooseModel);
          await motoModel.readOne('invalid_id');
        } catch (error) {
          expect(error instanceof BadRequestError).to.be.true;
        }
      });
    });
  });

  describe('Update motorcycle by id', () => {

    describe('Success', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findOneAndUpdate').resolves(motoMock)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findOneAndUpdate as SinonStub).restore()
      });
  
      it('Updates and returns correct data', async () => {
        const motoModel = new MotorcycleModel(motoMongooseModel);
  
        const updated = await motoModel.update(motoIdMock, motoMock);
  
        expect(updated).to.be.deep.equal(motoMock);
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
        const motoModel = new MotorcycleModel(motoMongooseModel);
  
        const updated = await motoModel.update('invalid_id', motoMock);
  
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
          const motoModel = new MotorcycleModel(motoMongooseModel);
          await motoModel.update('invalid_id', motoMock);
        } catch (error) {
          expect(error instanceof BadRequestError).to.be.true;
        }
      });
    });
  });

  describe('Delete motorcycle by id', () => {

    describe('Success', () => {

      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(true),
        sinon.stub(Model, 'findOneAndDelete').resolves(motoMock)
      });

      after(() => {
        (mongoose.isValidObjectId as SinonStub).restore(),
        (Model.findOneAndDelete as SinonStub).restore()
      });

      it('Deletes and returns correct data', async () => {
        const motoModel = new MotorcycleModel(motoMongooseModel);
  
        const deleted = await motoModel.delete(motoIdMock);
  
        expect(deleted).to.be.deep.equal(motoMock);
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
        const motoModel = new MotorcycleModel(motoMongooseModel);
  
        const updated = await motoModel.delete('invalid_id');
  
        expect(updated).to.be.equal(null);
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
          const motoModel = new MotorcycleModel(motoMongooseModel);
          await motoModel.delete('invalid_id');
        } catch (error) {
          expect(error instanceof BadRequestError).to.be.true;
        }
      });
    });
  });
});