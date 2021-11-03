import { IocSetup } from '@eusebiu_gagea/mem';
import UserRepository from '../infrastructure/repos/UserRepository';
import { Connection } from 'typeorm';

const iocSetup: IocSetup = (container) => {
  container
    .bind<UserRepository>(UserRepository)
    .toDynamicValue(() => container.get(Connection).getCustomRepository(UserRepository));
};

export default iocSetup;
