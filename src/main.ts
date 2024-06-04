import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as appInsights from 'applicationinsights';
import dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    // Initialize Application Insights
    appInsights.setup(
        'InstrumentationKey=0d2d556a-c7d6-4107-9e98-4925b9939b78;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=f1a07d49-2641-432b-a8aa-0c100ad05c5a'
    ).start();

    // Get the initialized TelemetryClient
    const client = appInsights.defaultClient;

    try {
        // Your code here...
    } catch (error) {
        // Use the TelemetryClient to track exceptions
        client.trackException({ exception: error });
    }

    await app.listen(3000);
}
bootstrap();
