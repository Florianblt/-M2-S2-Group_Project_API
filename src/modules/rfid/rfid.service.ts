import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { UserService } from '../users/users.service';
import { RaspberryService } from '../raspberry/raspberry.service';
import { ClassroomService } from '../classroom/classroom.service';
import { RfidDto } from './rfid.dto';
import { ROLES } from '../users/roles.constants';
import { CourseStudentService } from '../course-student/course-student.service';

@Injectable()
export class RfidService {
  private readonly logger = new Logger(RfidService.name);

  constructor(
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => RaspberryService))
    private readonly raspberryService: RaspberryService,
    @Inject(forwardRef(() => ClassroomService))
    private readonly classroomService: ClassroomService,
    @Inject(forwardRef(() => CourseStudentService))
    private readonly courseStudentService: CourseStudentService,
  ) {}

  async submitRfid(rfidDto: RfidDto) {
    const raspberryFound = await this.raspberryService.getOneByUID(
      rfidDto.raspberryUID,
    );

    const userFound = (await this.userService.getOneWithKey(
      rfidDto.userKey,
    )).orElseThrow(() => new NotFoundException(`User not found`));

    const classRoomFound = await this.classroomService.getOneById(
      raspberryFound.classroom.id,
    );

    const courseFound = await this.courseService.getActualCourseByClassroom(
      classRoomFound.id,
    );

    switch (userFound.role) {
      case ROLES.TEACHER_USER:
        if (courseFound.teacher.id === userFound.id) {
          if (
            courseFound.clockInBeginning.getTime() -
              courseFound.hourEnding.getTime() ===
            0
          ) {
            await this.courseService.startCourse(courseFound.id);
          }
        } else {
          throw new BadRequestException(
            `this teacher isn't affected to this course`,
          );
        }
        break;

      case ROLES.STUDENT_USER:
        const courseStudentFound = await this.courseStudentService.getOneByStudent(
          courseFound.id,
          userFound.id,
        );
        if (courseStudentFound.clockInHour === null) {
          return this.courseStudentService.clockIn(
            courseStudentFound,
            new Date(),
          );
        } else {
          throw new BadRequestException(`Already clocked In`);
        }
        break;

      default:
        this.logger.log(userFound);
        break;
    }
  }
}
