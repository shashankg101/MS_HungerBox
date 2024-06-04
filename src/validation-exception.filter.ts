/*import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { TelemetryClient } from 'applicationinsights';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly appInsights: TelemetryClient) {}

  catch(exception: ValidationError, host: ArgumentsHost) {
    // Log the validation error to Application Insights
    this.appInsights.trackException({ exception });

    // You can also customize the HTTP response here if you want
  }
}
*/