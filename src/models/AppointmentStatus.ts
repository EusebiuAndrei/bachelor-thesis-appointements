import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum AppointmentStatusEnum {
  PROPOSED = 1,
  APPROVED,
  REJECTED,
  CANCELED,
}

@Entity()
class AppointmentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;
}

export default AppointmentStatus;
