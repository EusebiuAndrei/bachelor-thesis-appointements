import { ErrorRequestHandler } from 'express';

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.log('== HERE ==');
  console.log(err);
  next(err);
};

export default logErrors;
