import { InjectModel } from '@nestjs/azure-database';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  Put,
  Query,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { Container } from '@azure/cosmos';
import { MenuDto } from './menu.dto';
import { menu } from './menu.entity';
import { MenuExceptionFilter } from 'src/Exceptions/menu-exception.filter';
import { CorrelationIdService } from 'src/correlation/correlation-id.service';

@Controller('menu1')
@UseFilters(MenuExceptionFilter)
export class Menu1Controller {
  constructor(
    @InjectModel(menu) private readonly menuContainer: Container,
    private readonly correlationIdService: CorrelationIdService,
  ) {}

  @Put('update')
  async update(@Body(new ValidationPipe()) payload: MenuDto) {
    const itemupdate = new menu();
    itemupdate.id = payload.id;
    itemupdate.outlet_name = payload.outlet_name;
    itemupdate.item_name = payload.item_name;
    itemupdate.calories = payload.calories.toString();
    itemupdate.price = payload.price;

    const { resource } = await this.menuContainer.items.upsert(itemupdate);
    const correlationId = this.correlationIdService.getCorrelationId();
    console.log(`Correlation ID: ${correlationId}`);
    return {
      id: resource.id,
      outlet_name: resource.outlet_name,
      item_name: resource.item_name,
      calories: resource.calories,
      price: resource.price,
    };
  }

  @Delete('remove')
  async remove(
    @Query('id', new ValidationPipe()) id: string,
    @Query('partitionkey', new ValidationPipe()) partitionkey: string,
  ) {
    if (parseInt(id) < 0 || parseInt(id) > 10) {
      throw new HttpException('Enter ID greater than 0 less than 10', 400);
    }
    const correlationId = this.correlationIdService.getCorrelationId();
    console.log(`Correlation ID: ${correlationId}`);
    await this.menuContainer.item(id, partitionkey).delete();
    return 'deleted';
  }
}
