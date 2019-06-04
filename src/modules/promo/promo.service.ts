import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoRepository } from './promo.repository';
import { UserService } from '../users/users.service';
import { Promo } from './promo.entity';
import { NewPromoDto } from './promo.dto';
import { ROLES } from '../users/roles.constants';
import { User } from '../users/users.entity';

@Injectable()
export class PromoService {
  private readonly logger = new Logger(PromoService.name);

  constructor(
    @InjectRepository(PromoRepository)
    private readonly promoRepository: PromoRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getAll(): Promise<Promo[]> {
    return this.promoRepository.find({
      relations: ['students'],
    });
  }

  async getOneById(id: number): Promise<Promo> {
    return (await this.promoRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  async create(newPromoDto: NewPromoDto): Promise<Promo> {
    let promo = new Promo();
    promo.name = newPromoDto.name;
    promo.students = [];
    promo = await this.promoRepository.save(promo);
    return promo;
  }

  async update(id: number, newPromoDto: NewPromoDto): Promise<Promo> {
    let promoFound = (await this.promoRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
    promoFound.name = newPromoDto.name;
    promoFound = await this.promoRepository.save(promoFound);
    return promoFound;
  }

  async deleteById(id: number): Promise<void> {
    const promoFound = (await this.promoRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
    await this.promoRepository.remove(promoFound);
  }

  async addStudent(idStudent: number, idPromo: number): Promise<Promo> {
    let promoFound = (await this.promoRepository.findOneById(
      idPromo,
    )).orElseThrow(() => new NotFoundException(`Promo not found`));

    const studentFound = (await this.userService.getOneById(
      idStudent,
    )).orElseThrow(() => new NotFoundException(`User not found`));
    if (studentFound.role === ROLES.STUDENT_USER) {
      promoFound.students.push(studentFound);
      promoFound = await this.promoRepository.save(promoFound);
      return promoFound;
    } else {
      throw new BadRequestException(`User ${idStudent} is not a student`);
    }
  }

  async removeStudent(idStudent: number, idPromo: number): Promise<Promo> {
    let promoFound = (await this.promoRepository.findOneById(
      idPromo,
    )).orElseThrow(() => new NotFoundException(`Promo not found`));

    const studentFound = (await this.userService.getOneById(
      idStudent,
    )).orElseThrow(() => new NotFoundException(`User not found`));

    if (promoFound.students.find(user => user.id === studentFound.id)) {
      promoFound.students = this.removeUser(
        promoFound.students,
        studentFound.id,
      );
      promoFound = await this.promoRepository.save(promoFound);
      return promoFound;
    } else {
      throw new BadRequestException(
        `User ${idStudent} is affected in this promo`,
      );
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(ele => {
      return ele !== value;
    });
  }

  removeUser(arrayUser: User[], userId: number): User[] {
    return arrayUser.filter(user => {
      return user.id !== userId;
    });
  }
}
