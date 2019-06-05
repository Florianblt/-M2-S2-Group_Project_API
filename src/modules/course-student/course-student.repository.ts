import { EntityRepository, Repository } from 'typeorm';
import { Optional } from 'typescript-optional';
import { CourseStudent } from './course-student.entity';
import { IsDate } from 'class-validator';

@EntityRepository(CourseStudent)
export class CourseStudentRepository extends Repository<CourseStudent> {
  async findOneById(id: number): Promise<Optional<CourseStudent>> {
    return Optional.ofNullable(
      await this.findOne(id, {
        relations: ['user', 'course'],
      }),
    );
  }

  async findCourseForStudent(
    idStudent: number,
    idCourse: number,
  ): Promise<Optional<CourseStudent>> {
    return Optional.ofNullable(
      await this.createQueryBuilder('courseStudent')
        .andWhere('courseStudent.student = :idStudent', {
          idStudent,
        })
        .andWhere('courseStudent.course = :idCourse', { idCourse })
        .getOne(),
    );
  }

  async findAllForCourse(idCourse: number): Promise<CourseStudent[]> {
    return await this.createQueryBuilder('courseStudent')
      .where('courseStudent.course = :idCourse', { idCourse })
      .getMany();
  }

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
