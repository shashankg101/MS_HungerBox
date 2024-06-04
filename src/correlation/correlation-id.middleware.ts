import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TelemetryClient } from 'applicationinsights';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly appInsights: TelemetryClient) {}

  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.headers['x-correlation-id'] || uuidv4();
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);

    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const logMessage = {
        correlationId: correlationId,
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString(),
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      };

      // Log the message to Application Insights
      this.appInsights.trackTrace({ message: JSON.stringify(logMessage) });
    });

    next();
  }
}
