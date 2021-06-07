import { Request, Response, NextFunction } from 'express';
import { ServiceResponse } from '../helpers/ServiceResponse';
const sayHello = async (req: Request, res: Response, next: NextFunction) => {
    res.json(new ServiceResponse({ status: true, statusCode: 200 }));
};
export default {
    sayHello,
};
