import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { Role } from './roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository, Role])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
