import { EntityRepository, Repository } from 'typeorm';
import { Raspberry } from './raspberry.entity';
import { Optional } from 'typescript-optional';

@EntityRepository(Raspberry)
export class RaspberryRepository extends Repository<Raspberry> {
  async findOneByUID(uid: string): Promise<Optional<Raspberry>> {
    return Optional.ofNullable(
      await this.findOne(
        {
          uid,
        },
        { relations: ['classroom'] },
      ),
    );
  }

  async findOneById(id: number): Promise<Optional<Raspberry>> {
    return Optional.ofNullable(
      await this.findOne(id, {
        relations: ['classroom'],
      }),
    );
  }
}
