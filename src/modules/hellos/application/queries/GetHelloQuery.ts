import { Handler, QueryHandler, Query } from '@eusebiu_gagea/mem';
import { injectable } from 'inversify';

@Query()
export class GetHelloQuery {}

@injectable()
@QueryHandler(GetHelloQuery)
class GetHelloQueryHandler implements Handler<GetHelloQuery, any> {
  async handle(query: GetHelloQuery) {
    return {};
  }
}

export default GetHelloQueryHandler;
