import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Default')
@Controller('')
export class ApiServiceController {
  constructor(
    private readonly logger: Logger) {}

  @Get('ping')
  @ApiOperation({ summary: 'System health check'})
  @ApiResponse({ status: 200, description: 'Environment name' })
  getHello(): string {
    this.logger.debug('Ping received debug')
    return "Hello";
  }
}
