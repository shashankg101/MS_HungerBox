import { Module } from '@nestjs/common';
import { AzureCosmosDbModule } from '@nestjs/azure-database';

import { menu } from './menu.entity';
import { MenuController } from './menu.controller';
import { Menu1Controller } from './menu1.controller';

@Module({
  imports: [
    AzureCosmosDbModule.forFeature([{ collection: 'menu', dto:menu }])],
  controllers: [MenuController, Menu1Controller],
})
export class MenuModule {}
