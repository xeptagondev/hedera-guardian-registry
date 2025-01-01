import { Test, TestingModule } from '@nestjs/testing';
import { ApiServiceController } from './api-service.controller';

describe('ApiServiceController', () => {
  let controller: ApiServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiServiceController],
    }).compile();

    controller = module.get<ApiServiceController>(ApiServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
