import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class CorrelationIdService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getCorrelationId(): string {
    return this.request.headers['x-correlation-id'] as string;
  }
}
