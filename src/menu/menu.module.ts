import { Module } from '@nestjs/common';
import { AzureCosmosDbModule } from '@nestjs/azure-database';

import { menu } from './menu.entity';
import { MenuController } from './menu.controller';
import { Menu1Controller } from './menu1.controller';
import { CorrelationModule } from 'src/correlation/correlation.module';

@Module({
  imports: [ CorrelationModule,
    AzureCosmosDbModule.forFeature([{ collection: 'menu', dto:menu }])],
  controllers: [MenuController, Menu1Controller],
})
export class MenuModule {}
