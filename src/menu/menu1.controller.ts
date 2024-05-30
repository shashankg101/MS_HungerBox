import { InjectModel } from '@nestjs/azure-database';
import {
  Body,
  Controller,
  Delete,
  //Get,
  //Post,
  Put,
  Query,
} from '@nestjs/common';
import { Container } from '@azure/cosmos';
import { MenuDto } from './menu.dto';
import { menu } from './menu.entity';

@Controller('menu')
export class Menu1Controller {
  constructor(@InjectModel(menu) private readonly menuContainer: Container) {}

  //Update an item in the database
  @Put('update')
  async update(@Body() payload: MenuDto) {
    const itemupdate = new menu();
    itemupdate.id = payload.id;
    itemupdate.outlet_name = payload.outlet_name;
    itemupdate.item_name = payload.item_name;
    itemupdate.calories = payload.calories;
    itemupdate.price = payload.price;

    const { resource } = await this.menuContainer.items.upsert(itemupdate);
    return {
      id: resource.id,
      outlet_name: resource.outlet_name,
      item_name: resource.item_name,
      calories: resource.calories,
      price: resource.price,
    };
  }

  //Delete an item from the database
  @Delete('remove')
  async remove(
    @Query('id') id: string,
    @Query('partitionkey') partitionkey: string,
  ) {
    await this.menuContainer.item(id, partitionkey).delete();
    return 'deleted';
  }
}
