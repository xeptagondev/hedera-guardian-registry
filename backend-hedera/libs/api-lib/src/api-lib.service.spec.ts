import { Test, TestingModule } from '@nestjs/testing';
import { ApiLibService } from './api-lib.service';

describe('ApiLibService', () => {
  let service: ApiLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiLibService],
    }).compile();

    service = module.get<ApiLibService>(ApiLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
