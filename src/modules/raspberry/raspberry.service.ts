import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RaspberryRepository } from './raspberry.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomService } from '../classroom/classroom.service';
import { Raspberry } from './raspberry.entity';
import { Optional } from 'typescript-optional';
import { NewRaspberryDto } from './raspberry.dto';

@Injectable()
export class RaspberryService {
  constructor(
    @InjectRepository(RaspberryRepository)
    private readonly raspberryRepository: RaspberryRepository,
    @Inject(forwardRef(() => ClassroomService))
    private readonly classroomService: ClassroomService,
  ) {}

  async getAll(): Promise<Raspberry[]> {
    return this.raspberryRepository.find({});
  }

  async getOneById(id: number): Promise<Raspberry> {
    const raspberry = await this.raspberryRepository.findOneById(id);
    return raspberry.orElseThrow(() => new NotFoundException());
  }

  async getOneByUID(uid: string): Promise<Optional<Raspberry>> {
    return this.raspberryRepository.findOneByUID(uid);
  }

  async create(newRapsberryDto: NewRaspberryDto): Promise<Raspberry> {
    const raspberyFound = await this.raspberryRepository.findOneByUID(
      newRapsberryDto.uid,
    );
    if (raspberyFound) {
      return raspberyFound.get();
    }
    const classroom = await this.classroomService.getOneById(
      newRapsberryDto.idClassroom,
    );
    let raspberry = new Raspberry();
    raspberry.uid = newRapsberryDto.uid;
    raspberry.classroom = classroom;
    raspberry.alive = false;
    raspberry = await this.raspberryRepository.save(raspberry);
    return raspberry;
  }

  async update(
    id: number,
    newRapsberryDto: NewRaspberryDto,
  ): Promise<Raspberry> {
    let raspberryFound = (await this.raspberryRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    raspberryFound.uid = newRapsberryDto.uid;
    raspberryFound.classroom = await this.classroomService.getOneById(
      newRapsberryDto.idClassroom,
    );
    if (raspberryFound.classroom.raspberry) {
      throw new BadRequestException('This classroom already have a Raspberry');
    }
    raspberryFound = await this.raspberryRepository.save(raspberryFound);
    return raspberryFound;
  }

  async deleteById(id: number): Promise<void> {
    const raspberryFound = (await this.raspberryRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    await this.raspberryRepository.remove(raspberryFound);
  }

  async updateState(id: number, state: boolean): Promise<Raspberry> {
    let raspberryFound = (await this.raspberryRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    raspberryFound.alive = state;
    raspberryFound = await this.raspberryRepository.save(raspberryFound);
    return raspberryFound;
  }
}
