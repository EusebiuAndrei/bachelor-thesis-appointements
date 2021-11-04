import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import AppointmentStatus from './AppointmentStatus';
import User from './User';

@Entity()
class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  duration: number;

  @Column()
  description: string;

  @OneToOne(() => AppointmentStatus, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  status: AppointmentStatus;

  @OneToOne(() => User, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  professor: User;

  @OneToOne(() => User, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  student: User;
}

export default Appointment;
