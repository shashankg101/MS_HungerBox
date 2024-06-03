import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { MenuModule } from './menu/menu.module';
import { CorrelationIdService } from './correlation/correlation-id.service';
import { CorrelationIdMiddleware } from './correlation/correlation-id.middleware';

@Module({
  imports: [
    AzureCosmosDbModule.forRoot({
      dbName: 'MS_HungerBox',
      endpoint: 'https://ms-hunger-box.documents.azure.com:443/',
      key: 'V7mPnlWUZySjELD3z9VHsbj31ylLRmOw4A09moAFfRqsrADiLHzQQUMNT6KxM18dcLgDgXwC99x3ACDbYdzI0w==',
    }),
    MenuModule
  ],
  providers: [CorrelationIdService]
  
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
