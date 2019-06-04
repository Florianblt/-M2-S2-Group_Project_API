import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseStudentRepository } from './course-student.repository';
import { CourseService } from '../course/course.service';
import { UserService } from '../users/users.service';
import { CourseStudent } from './course-student.entity';
import { PromoService } from '../promo/promo.service';

@Injectable()
export class CourseStudentService {
  private readonly logger = new Logger(CourseStudentService.name);

  constructor(
    @InjectRepository(CourseStudentRepository)
    private readonly courseStudentRepository: CourseStudentRepository,
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getAll(): Promise<CourseStudent[]> {
    return this.courseStudentRepository.find({
      relations: ['student'],
    });
  }

  async getOneById(id: number): Promise<CourseStudent> {
    return (await this.courseStudentRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  async create(idCourse: number, idStudent: number) {
    let courseStudent = new CourseStudent();

    const courseFound = await this.courseService.getOneById(idCourse);
    courseStudent.course = courseFound;

    const studentFound = (await this.userService.getOneById(
      idStudent,
    )).orElseThrow(() => new NotFoundException());
    courseStudent.student = studentFound;

    courseStudent.clockInHour = null;
    courseStudent = await this.courseStudentRepository.save(courseStudent);
  }
}
