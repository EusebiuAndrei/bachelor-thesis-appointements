import { IocSetup } from '@eusebiu_gagea/mem';
import AppointmentRepository from '../infrastructure/repos/AppointmentRepository';
import AppointmentStatusRepository from '../infrastructure/repos/AppointmentStatusRepository';
import { Connection } from 'typeorm';

const iocSetup: IocSetup = (container) => {
  container
    .bind<AppointmentRepository>(AppointmentRepository)
    .toDynamicValue(() => container.get(Connection).getCustomRepository(AppointmentRepository));
  container
    .bind<AppointmentStatusRepository>(AppointmentStatusRepository)
    .toDynamicValue(() =>
      container.get(Connection).getCustomRepository(AppointmentStatusRepository),
    );
};

export default iocSetup;
