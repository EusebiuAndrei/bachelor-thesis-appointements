import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import AppointmentStatusModel from '../../../../../appointments/domain/entities/AppointmentStatus';

@Entity({ name: 'appointment_status' })
class AppointmentStatus implements AppointmentStatusModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;
}

export default AppointmentStatus;
