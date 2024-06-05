// import passport from 'passport';
import jwt, { Jwt, VerifyErrors } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import { NotAuthorized } from 'lib/error';
import Config from 'utils/config';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return next(new NotAuthorized());
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        Config.getEnv('ACCESS_TOKEN_KEY'),
        { complete: true },
        function (err: VerifyErrors | null, jwt: Jwt | undefined) {
            if (err) {
                return next(new NotAuthorized());
            }
            if (jwt && typeof jwt.payload === 'object') {
                req.userId = jwt.payload.id;
            }
            next();
        },
    );
};
