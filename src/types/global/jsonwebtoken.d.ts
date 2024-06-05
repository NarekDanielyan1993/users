import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
    interface JwtPayload {
        id: string;
    }
    export interface UserJwtPayload extends jwt.JwtPayload {
        id: string;
    }
}
