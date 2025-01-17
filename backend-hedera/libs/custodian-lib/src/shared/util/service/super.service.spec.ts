import { Test, TestingModule } from '@nestjs/testing';
import { SuperService } from './super.service';

describe('SuperService', () => {
  let service: SuperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperService],
    }).compile();

    service = module.get<SuperService>(SuperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
