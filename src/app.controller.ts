import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { MenuExceptionFilter } from './Exceptions/menu-exception.filter';

@Controller()
@UseFilters(new MenuExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
