import { EntityRepository, Repository } from 'typeorm';
import { Optional } from 'typescript-optional';
import { Course } from './course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async findOneById(id: number): Promise<Optional<Course>> {
    return Optional.ofNullable(
      await this.findOne(id, {
        relations: ['classroom', 'teacher', 'promo'],
      }),
    );
  }

  async findActualCourseByClassroom(
    idClassroom: number,
  ): Promise<Optional<Course>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('course')
        .innerJoin(
          'course.classroom',
          'classroom',
          'classroom.id = :idClassroom',
          { idClassroom },
        )
        .leftJoinAndSelect('course.teacher', 'teacher')
        .leftJoinAndSelect('course.promo', 'promo')
        .andWhere('now() >= course.hourBeginning')
        .andWhere('now() <= course.hourEnding')
        .getOne(),
    );
  }
}
