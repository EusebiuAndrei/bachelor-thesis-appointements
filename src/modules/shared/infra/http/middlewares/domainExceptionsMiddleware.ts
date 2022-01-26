import DomainException from '../../../domain/DomainException';
import { ErrorRequestHandler } from 'express';
import { HttpException, HttpStatus } from '@eusebiu_gagea/mem';

const domainExceptionsMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof DomainException) {
    console.log('DOMAIN EXCEPTION');
    return new HttpException(HttpStatus.OK, err.message).send(res);
  }

  next(err);
};

export default domainExceptionsMiddleware;
