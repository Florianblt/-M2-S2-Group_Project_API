import { EntityRepository, Repository } from 'typeorm';
import { Classroom } from './classroom.entity';
import { Optional } from 'typescript-optional';

@EntityRepository(Classroom)
export class ClassroomRepository extends Repository<Classroom> {
  async findOneById(id: number): Promise<Optional<Classroom>> {
    return Optional.ofNullable(
      await this.findOne(id, { relations: ['raspberry'] }),
    );
  }
}
