import { IocSetup } from '@eusebiu_gagea/mem';
import HelloRepo from './infrastructure/repos/HelloRepo';

const iocSetup: IocSetup = (container) => {
  container.bind<HelloRepo>(HelloRepo).toSelf();
};

export default iocSetup;
