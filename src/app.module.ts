import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TelemetryClient } from 'applicationinsights';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { MenuModule } from './menu/menu.module';
import { CorrelationIdService } from './correlation/correlation-id.service';
import { CorrelationIdMiddleware } from './correlation/correlation-id.middleware';
import { Test1Controller } from './test1/test1.controller';

@Module({
  imports: [
    AzureCosmosDbModule.forRoot({
      dbName: 'MS_HungerBox',
      endpoint: 'https://ms-hunger-box.documents.azure.com:443/',
      key: 'V7mPnlWUZySjELD3z9VHsbj31ylLRmOw4A09moAFfRqsrADiLHzQQUMNT6KxM18dcLgDgXwC99x3ACDbYdzI0w==',
    }),
    MenuModule,
  ],
  providers: [
    CorrelationIdService,
    {
      provide: TelemetryClient,
      useValue: new TelemetryClient(
        'InstrumentationKey=0d2d556a-c7d6-4107-9e98-4925b9939b78;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=f1a07d49-2641-432b-a8aa-0c100ad05c5a',
      ),
    },
  ],
  controllers: [Test1Controller],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}

//9Bw8Q~lvkJ8pXw~qJbu4MWcKYalZsvuzqX8U2bc.
