import { IocSetup } from '@eusebiu_gagea/mem';
import { Connection } from 'typeorm';

import AppointmentRepository from './repos/AppointmentRepository';
import AppointmentStatusRepository from './repos/AppointmentStatusRepository';
import DayAvailabilityRepository from './repos/DayAvailabilityRepository';

const iocSetup: IocSetup = (container) => {
  container
    .bind<AppointmentRepository>(AppointmentRepository)
    .toDynamicValue(() => container.get(Connection).getCustomRepository(AppointmentRepository));
  container
    .bind<AppointmentStatusRepository>(AppointmentStatusRepository)
    .toDynamicValue(() =>
      container.get(Connection).getCustomRepository(AppointmentStatusRepository),
    );
  container
    .bind<DayAvailabilityRepository>(DayAvailabilityRepository)
    .toDynamicValue(() => container.get(Connection).getCustomRepository(DayAvailabilityRepository));
};

export default iocSetup;
