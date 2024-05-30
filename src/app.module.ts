import { Module } from '@nestjs/common';

import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    AzureCosmosDbModule.forRoot({
      dbName: 'MS_HungerBox',
      endpoint: 'https://ms-hunger-box.documents.azure.com:443/',
      key: 'V7mPnlWUZySjELD3z9VHsbj31ylLRmOw4A09moAFfRqsrADiLHzQQUMNT6KxM18dcLgDgXwC99x3ACDbYdzI0w==',
    }),
    MenuModule
  ],
  
})
export class AppModule {}
