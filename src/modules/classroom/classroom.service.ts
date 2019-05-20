import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassroomRepository } from './classroom.repository';
import { Classroom } from './classroom.entity';
import { Optional } from 'typescript-optional';
import { NewClassroomDto } from './classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(ClassroomRepository)
    private readonly classroomRepository: ClassroomRepository,
  ) {}

  async getAll(): Promise<Classroom[]> {
    return this.classroomRepository.find({});
  }

  async getOneById(id: number): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOneById(id);
    return classroom.orElseThrow(() => new NotFoundException());
  }

  async create(newClassroom: NewClassroomDto): Promise<Classroom> {
    let classroomNew = new Classroom();
    classroomNew.name = newClassroom.name;
    classroomNew.adresse = newClassroom.adresse;
    classroomNew.batiment = newClassroom.batiment;

    classroomNew = await this.classroomRepository.save(classroomNew);

    return classroomNew;
  }

  async update(id: number, newClassroom: NewClassroomDto): Promise<Classroom> {
    let classroomFound = (await this.classroomRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    classroomFound.name = newClassroom.name;
    classroomFound.adresse = newClassroom.adresse;
    classroomFound.batiment = newClassroom.batiment;

    classroomFound = await this.classroomRepository.save(classroomFound);
    return classroomFound;
  }

  async deleteById(id: number): Promise<void> {
    const classroomFound = (await this.classroomRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    await this.classroomRepository.remove(classroomFound);
  }
}
