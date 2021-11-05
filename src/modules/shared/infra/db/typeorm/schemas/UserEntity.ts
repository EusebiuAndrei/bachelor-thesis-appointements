import DayAvailability from '../../../../../appointments/domain/DayAvailability';
import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import DayAvailabilityEntity from './DayAvailabilityEntity';
import RoleEntity from './RoleEntity';
import Role from '../../../../../users/domain/Role';
import UserModel from '../../../../../users/domain/User';

@Entity()
class User implements UserModel {
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

  @OneToOne(() => RoleEntity, { cascade: true, nullable: true })
  @JoinColumn()
  role: Role;

  @OneToMany(() => DayAvailabilityEntity, (dayAvailability) => dayAvailability.user, {
    nullable: true,
  })
  @JoinColumn()
  availabilitySchedule: DayAvailability[];
}

export default User;
