import { Module, forwardRef } from '@nestjs/common';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoRepository } from './promo.repository';
import { Promo } from './promo.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PromoController],
  providers: [PromoService],
  exports: [PromoService],
  imports: [
    TypeOrmModule.forFeature([Promo, PromoRepository]),
    forwardRef(() => UsersModule),
  ],
})
export class PromoModule {}
