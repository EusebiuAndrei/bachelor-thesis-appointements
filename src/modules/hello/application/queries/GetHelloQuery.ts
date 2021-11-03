import { QueryHandler, Query, Handler } from '@eusebiu_gagea/mem';
import { hooks } from '@feathersjs/hooks';
import { niceHook } from '../../infrastructure/hooks';
import { inject, injectable } from 'inversify';
import { HelloRepo } from '../../infrastructure/repos';

@Query()
export class GetHelloQuery {
  public readonly type: number;
}

@injectable()
@QueryHandler(GetHelloQuery)
class GetHelloQueryHandler implements Handler<GetHelloQuery, any> {
  @inject(HelloRepo) private _helloRepo: HelloRepo;

  @hooks([niceHook])
  async handle(query: GetHelloQuery) {
    console.log('Query Callback inside');
    console.log(query);

    const result = await this._helloRepo.find();
    return result;
  }
}

export default GetHelloQueryHandler;
