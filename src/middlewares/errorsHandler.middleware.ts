import { NextFunction, Request, Response } from 'express';
import { ResponseData } from '../interfaces';
import { HttpException } from '../utils/';
// import config from "../../config.ts";


class ErrorsHandlerMiddleware {

    notFound(req: Request, res: Response, next: NextFunction) {
        const error = new Error(`Not found - ${req.originalUrl}`);
        res.status(404);
        next(error);
    }

    errorHandle(error: HttpException, req: Request, res: Response, next: NextFunction) {
        if (error.name === 'UnauthorizedError') {
            res.status(401);
        }
        const status = error.status ? error.status : res.statusCode === 200 ? 500 : res.statusCode;
        const message = error.message || 'Something went wrong';
        // const stack = config.name === 'production' ? '' : error.stack;
        console.error('[ERROR] ', status, message, error.stack);
        const responseData: ResponseData = {
            success: false,
            message,
        };
        // if (stack) {
        //     responseData.stack = stack
        // }
        res.status(status).json(responseData);
    }
}

export default new ErrorsHandlerMiddleware();
