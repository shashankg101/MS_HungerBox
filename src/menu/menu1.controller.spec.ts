import { Test, TestingModule } from '@nestjs/testing';
import { Menu1Controller } from './menu1.controller';

describe('Menu1Controller', () => {
  let controller: Menu1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Menu1Controller],
    }).compile();

    controller = module.get<Menu1Controller>(Menu1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
