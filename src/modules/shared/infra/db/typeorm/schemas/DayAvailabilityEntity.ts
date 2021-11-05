import { DayOfWeek } from '../../../../../appointments/domain/DayAvailability';
import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import UserEntity from './UserEntity';
import User from '../../../../../users/domain/User';
import DayAvailabilityModel from '../../../../../appointments/domain/DayAvailability';

@Entity()
class DayAvailability implements DayAvailabilityModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  day: DayOfWeek;

  @Column()
  hours: number;

  @Column()
  minutes: number;

  @Column()
  duration: number;

  @ManyToOne(() => UserEntity, { cascade: true })
  @JoinColumn()
  user: User;
}

export default DayAvailability;
