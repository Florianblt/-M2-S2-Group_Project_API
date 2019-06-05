import { EntityRepository, Repository } from 'typeorm';
import { Optional } from 'typescript-optional';
import { CourseStudent } from './course-student.entity';

@EntityRepository(CourseStudent)
export class CourseStudentRepository extends Repository<CourseStudent> {
  async findOneById(id: number): Promise<Optional<CourseStudent>> {
    return Optional.ofNullable(
      await this.findOne(id, {
        relations: ['user', 'course'],
      }),
    );
  }

  // async findCourseForStudent(idStudent: number, idCourse: number): Promise<Optional<CourseStudent>> {
  //   return Optional.ofNullable(
  //     await this.findOne({})
  //   )
  // }

  async findAllAbsencesByUser(
    idUser: number,
  ): Promise<Optional<CourseStudent[]>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('courseStudent')
        .leftJoinAndSelect('courseStudent.student', 'student')
        .leftJoinAndSelect('courseStudent.course', 'course')
        .andWhere('courseStudent.student = idUser', { id: idUser })
        .andWhere('courseStudent.clockInHour is null')
        .getMany(),
    );
  }
}
