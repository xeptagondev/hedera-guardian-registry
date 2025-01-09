import { Test, TestingModule } from '@nestjs/testing';
import { CustodianLibService } from './custodian-lib.service';

describe('CustodianLibService', () => {
  let service: CustodianLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustodianLibService],
    }).compile();

    service = module.get<CustodianLibService>(CustodianLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
