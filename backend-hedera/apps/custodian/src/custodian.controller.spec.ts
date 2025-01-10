import { Test, TestingModule } from '@nestjs/testing';
import { CustodianController } from './custodian.controller';
import { CustodianService } from './custodian.service';

describe('CustodianController', () => {
  let custodianController: CustodianController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustodianController],
      providers: [CustodianService],
    }).compile();

    custodianController = app.get<CustodianController>(CustodianController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(custodianController.getHello()).toBe('Hello World!');
    });
  });
});
