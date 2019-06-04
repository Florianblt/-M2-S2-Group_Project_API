import { Module, forwardRef } from '@nestjs/common';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoRepository } from './promo.repository';
import { Promo } from './promo.entity';
import { UserController } from '../users/users.controller';

@Module({
  controllers: [PromoController],
  providers: [PromoService],
  imports: [
    TypeOrmModule.forFeature([Promo, PromoRepository]),
    forwardRef(() => UserController),
  ],
})
export class PromoModule {}
