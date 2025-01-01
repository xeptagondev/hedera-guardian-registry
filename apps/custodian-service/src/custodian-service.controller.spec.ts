import { Test, TestingModule } from '@nestjs/testing';
import { CustodianServiceController } from './custodian-service.controller';
import { CustodianServiceService } from './custodian-service.service';

describe('CustodianServiceController', () => {
  let custodianServiceController: CustodianServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustodianServiceController],
      providers: [CustodianServiceService],
    }).compile();

    custodianServiceController = app.get<CustodianServiceController>(CustodianServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(custodianServiceController.getHello()).toBe('Hello World!');
    });
  });
});
