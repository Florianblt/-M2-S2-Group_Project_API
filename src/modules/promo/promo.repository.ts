import { EntityRepository, Repository } from 'typeorm';
import { Optional } from 'typescript-optional';
import { Promo } from './promo.entity';

@EntityRepository(Promo)
export class PromoRepository extends Repository<Promo> {
  async findOneById(id: number): Promise<Optional<Promo>> {
    return Optional.ofNullable(
      await this.findOne(id, {
        relations: ['students'],
      }),
    );
  }
}
