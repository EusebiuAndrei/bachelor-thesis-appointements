import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

@Entity()
class DayAvailability {
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

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
}

export default DayAvailability;
