import { Type } from '../dtos/transaction-create.dto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * @class
 * @description Middleware that checks for large transactions and logs them.
 */
@Injectable()
export class TransactionMiddleware implements NestMiddleware {

  /**
   * Middleware's method to be executed on each request. 
   * Checks if the transaction amount is greater than or equal to 10,000 and if it's of type 'DEPOSIT'.
   * Logs a message if the conditions are met.
   *
   * @param {Request} req Express request object.
   * @param {Response} res Express response object.
   * @param {NextFunction} next Callback to invoke the next middleware.
   */
  use(req: Request, res: Response, next: NextFunction): void {
    
    if (req.body.amount >= 10000 && req.body.type === Type.DEPOSIT) {
      console.log('!!!!! Important Transaction: deposit of more than 10,000 US$ detected !!!!');
    }
    
    next();
  }
}
