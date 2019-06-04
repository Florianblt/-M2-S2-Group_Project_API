import { EntityRepository, Repository } from 'typeorm';
import { Optional } from 'typescript-optional';
import { CourseStudent } from './course-student.entity';

@EntityRepository(CourseStudent)
export class CourseStudentRepository extends Repository<CourseStudent> {
  async findOneById(id: number): Promise<Optional<CourseStudent>> {
    return Optional.ofNullable(
      await this.findOne(id, {
        relations: ['user'],
      }),
    );
  }

  async findAllAbsencesByUser(
    idUser: number,
  ): Promise<Optional<CourseStudent[]>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('courseStudent')
        .leftJoinAndSelect('courseStudent.student', 'student')
        .andWhere('app.student = idUser', { id: idUser })
        .andWhere('app.clockInHour is null')
        .getMany(),
    );
  }
}
