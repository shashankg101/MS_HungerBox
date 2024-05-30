import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { Menu1Controller } from './menu1.controller';

@Module({
  controllers: [MenuController,Menu1Controller]
})
export class MenuModule {}
