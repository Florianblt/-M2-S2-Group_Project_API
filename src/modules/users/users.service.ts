import { User } from './users.entity';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
// import {  } from './user.constants';
import {
  UserDtoRegister,
  UserDtoUpdateInfo,
  UserDtoUpdatePassword,
} from './users.dto';
import { Optional } from 'typescript-optional';
import { compare, genSalt, hash } from 'bcryptjs';
import { ROLES } from './roles.constants';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async getOneById(id: number): Promise<Optional<User>> {
    return this.userRepository.findOneById(id);
  }

  async getOnWithEmail(email: string): Promise<Optional<User>> {
    return await this.userRepository.findOneWithEmail(email);
  }

  async doPasswordMatch(user: User, password: string): Promise<boolean> {
    return await compare(password, user.password);
  }

  async saveNew(userRegister: UserDtoRegister): Promise<User> {
    if (
      await this.userRepository.hasUserWithMatchingEmail(
        userRegister.email.toLowerCase(),
      )
    ) {
      throw new ConflictException('Email already taken');
    }

    let userNew = new User();

    const salt = await genSalt(10);
    userNew.password = await hash(userRegister.password, salt);
    userNew.email = userRegister.email.toLowerCase();
    userNew.lastName = userRegister.lastName;
    userNew.firstName = userRegister.firstName;
    let roles = [];
    roles = await Promise.all(
      [ROLES.DEFAULT_USER, ROLES.ADMIN_USER].map(key =>
        this.findRoleWithKey(key),
      ),
    );
    userNew.roles = roles;

    userNew = await this.userRepository.save(userNew);

    return userNew;
  }

  async findRoleWithKey(key: string): Promise<Role> {
    return await this.roleRepository.findOne({ where: { key } });
  }

  async update(id: number, body: UserDtoUpdateInfo): Promise<User> {
    let userFound = (await this.userRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );

    userFound.firstName = body.firstName;
    userFound.lastName = body.lastName;

    userFound = await this.userRepository.save(userFound);

    return userFound;
  }

  async updatePassword(id: number, body: UserDtoUpdatePassword): Promise<User> {
    let userFound = (await this.userRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );

    if (!this.doPasswordMatch(userFound, body.oldPassword)) {
      throw new BadRequestException('Old password do not match');
    }

    if (body.newPassword !== body.newPasswordBis) {
      throw new BadRequestException('New passwords are not the same');
    }

    const salt = await genSalt(10);

    userFound.password = await hash(body.newPassword, salt);
    userFound = await this.userRepository.save(userFound);

    return userFound;
  }

  async deleteById(id: number): Promise<void> {
    const userFound = (await this.userRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
    await this.userRepository.remove(userFound);
  }
}
