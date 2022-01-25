import AppointmentStatus from '../../../../../appointments/domain/entities/AppointmentStatus';
import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import AppointmentStatusEntity from './AppointmentStatusEntity';
import UserEntity from './UserEntity';
import User from '../../../../../users/domain/entities/User';
import Appointment from '../../../../../appointments/domain/entities/Appointment';

@Entity({ name: 'appointment' })
class AppointmentEntity implements Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  duration: number;

  @Column()
  description: string;

  @OneToOne(() => AppointmentStatusEntity, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  status: AppointmentStatus;

  @OneToOne(() => UserEntity, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  professor: User;

  @OneToOne(() => UserEntity, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  student: User;
}

export default AppointmentEntity;
