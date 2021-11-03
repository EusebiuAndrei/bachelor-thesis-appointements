import { IocSetup } from '@eusebiu_gagea/mem';
import UserRepository from '../infrastructure/repos/UserRepository';
import { Connection } from 'typeorm';
import RoleRepository from './repos/RoleRepository';

const iocSetup: IocSetup = (container) => {
  container
    .bind<UserRepository>(UserRepository)
    .toDynamicValue(() => container.get(Connection).getCustomRepository(UserRepository));
  container
    .bind<RoleRepository>(RoleRepository)
    .toDynamicValue(() => container.get(Connection).getCustomRepository(RoleRepository));
};

export default iocSetup;
