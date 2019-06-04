import {
  Injectable,
  Logger,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';
import { Course } from './course.entity';
import { NewCourseDto } from './course.dto';
import { PromoService } from '../promo/promo.service';
import { ClassroomService } from '../classroom/classroom.service';
import { UserService } from '../users/users.service';

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);

  constructor(
    @InjectRepository(CourseRepository)
    private readonly courseRepository: CourseRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => PromoService))
    private readonly promoService: PromoService,
    @Inject(forwardRef(() => ClassroomService))
    private readonly classroomService: ClassroomService,
  ) {}

  async getAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: ['classroom', 'teacher', 'promo'],
    });
  }

  async getOneById(id: number): Promise<Course> {
    return (await this.courseRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  async create(newCourseDto: NewCourseDto): Promise<Course> {
    let course = new Course();
    course.name = newCourseDto.name;

    const classroomFound = await this.classroomService.getOneById(
      newCourseDto.idClassroom,
    );
    course.classroom = classroomFound;

    const teacherFound = (await this.userService.getOneById(
      newCourseDto.idTeacher,
    )).orElseThrow(() => new NotFoundException());
    course.teacher = teacherFound;

    const promoFound = await this.promoService.getOneById(newCourseDto.idPromo);
    course.promo = promoFound;

    course.hourBeginning = newCourseDto.hourBeginning;
    course.hourEnding = newCourseDto.hourEnding;

    course.clockInBeginning = newCourseDto.hourEnding;
    course.clockInEnding = newCourseDto.hourEnding;
    course = await this.courseRepository.save(course);
    return course;
  }
}
