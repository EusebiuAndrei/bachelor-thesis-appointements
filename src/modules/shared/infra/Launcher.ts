import { BaseLauncher, expressProfiler, memProfiler, typeormDbProfiler } from '@eusebiu_gagea/mem';
import Server from './Server';
import HelloIocSetup from '../../hello/IocSetup';
import UsersIocSetup from '../../users/infrastructure/IocSetup';
import AppointmentsIocSetup from '../../appointments/infrastructure/IocSetup';
import path from 'path';
import { getConnectionOptions } from 'typeorm';
import models from '../../../models';

class Launcher extends BaseLauncher {
  public async setup(): Promise<void> {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, { entities: models });
    await typeormDbProfiler(this, connectionOptions);

    await HelloIocSetup(this.container);
    await UsersIocSetup(this.container);
    await AppointmentsIocSetup(this.container);

    await memProfiler(this, { rootDirectory: path.join(__dirname, '..', '..', '..', 'modules') });
    await expressProfiler(this, Server, { rootDirectory: path.join(__dirname, '..', '..', '..') });
  }
}

export default Launcher;
