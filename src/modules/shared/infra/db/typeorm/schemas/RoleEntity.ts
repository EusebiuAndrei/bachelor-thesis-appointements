import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import RoleModel from '../../../../../users/domain/entities/Role';

@Entity({ name: 'role' })
class Role implements RoleModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;
}

export default Role;
