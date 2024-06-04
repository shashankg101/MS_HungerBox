import { InjectModel } from '@nestjs/azure-database';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UseFilters,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { Container } from '@azure/cosmos';
import { MenuDto } from './menu.dto';
import { menu } from './menu.entity';
import { v4 as uuidv4 } from 'uuid';
import { CorrelationIdService } from 'src/correlation/correlation-id.service';
import { MenuExceptionFilter } from 'src/Exceptions/menu-exception.filter';

@Controller('menu')
export class MenuController {
  constructor(
    @InjectModel(menu) private readonly menuContainer: Container,
    private readonly correlationIdService: CorrelationIdService,
  ) {}

  @Get('all')
  async getmenu() {
    const sqlQuery = 'select * from c';
    const cosmosResults = await this.menuContainer?.items
      ?.query<menu>(sqlQuery)
      .fetchAll();
    const correlationId = this.correlationIdService.getCorrelationId();
      console.log(`Correlation ID: ${correlationId}`);
      const result = cosmosResults.resources.map<MenuDto>((value) => {
      return {
        id: value.id,
        outlet_name: value.outlet_name,
        item_name: value.item_name,
        calories: value.calories.toString(),
        price: value.price,
      };
    });
    return result;
  }

  @Post('create')
  async create(@Body(new ValidationPipe()) payload: MenuDto) {
    const newitem = new menu();
    newitem.id = uuidv4();
    newitem.outlet_name = payload.outlet_name;
    newitem.item_name = payload.item_name;
    newitem.calories = payload.calories;
    newitem.price = payload.price;
    const { resource } = await this.menuContainer.items.create(newitem);
    return {
      id: resource.id,
      outlet_name: resource.outlet_name,
      item_name: resource.item_name,
      calories: resource.calories,
      price: resource.price,
    };
  }
}
