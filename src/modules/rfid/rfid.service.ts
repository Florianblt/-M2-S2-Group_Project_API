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
  ) {}

  async submitRfid(rfidDto: RfidDto) {
    this.logger.log(`On y est`);
    const raspberryFound = await this.raspberryService.getOneByUID(
      rfidDto.raspberryUID,
    );
    this.logger.log(`Raspberry found`);

    const userFound = (await this.userService.getOneWithKey(
      rfidDto.userKey,
    )).orElseThrow(() => new NotFoundException(`User not found`));
    this.logger.log(`User found`);

    const classRoomFound = await this.classroomService.getOneById(
      raspberryFound.classroom.id,
    );
    this.logger.log(classRoomFound);

    this.logger.log(`/getActualCourseByClassroom/${classRoomFound.id}`);
    const courseFound = await this.courseService.getActualCourseByClassroom(
      classRoomFound.id,
    );

    switch (userFound.role) {
      case ROLES.TEACHER_USER:
        if (courseFound.teacher.id === userFound.id) {
          this.logger.log(`C'est le bon enseignant`);
          if (courseFound.clockInBeginning === courseFound.hourEnding) {
            this.logger.log(`Starting course`);
            await this.courseService.startCourse(courseFound.id);
          }
        } else {
          throw new BadRequestException(
            `this teacher isn't affected to this course`,
          );
        }
        break;

      case ROLES.STUDENT_USER:
        this.logger.log(`Etudiant`);
        break;

      default:
        this.logger.log(userFound);
        break;
    }
  }
}
