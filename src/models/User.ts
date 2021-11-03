import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import DayAvailability from './DayAvailability';

import Role from './Role';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Role, { cascade: true, nullable: true })
  @JoinColumn()
  role: Role;

  @OneToMany(() => DayAvailability, (dayAvailability) => dayAvailability.user, {
    nullable: true,
  })
  @JoinColumn()
  availabilitySchedule: DayAvailability[];
}

export default User;
