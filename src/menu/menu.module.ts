import { Module } from '@nestjs/common';
import { AzureCosmosDbModule } from '@nestjs/azure-database';

import { menu } from './menu.entity';
import { MenuController } from './menu.controller';

@Module({
  imports: [
    AzureCosmosDbModule.forFeature([{ collection: 'menu', dto:menu }])],
  controllers: [MenuController],
})
export class MenuModule {}
