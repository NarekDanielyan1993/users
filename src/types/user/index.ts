import { Prisma } from '@prisma/client';
import { UppercaseKeys } from 'types/common';
import { Keys } from 'types/database';
import { IFile } from 'types/file';

export type IUserModelFields = UppercaseKeys<Keys<'User'>>;

export interface IUser {
    name: string;
    surname: string;
    gender: string;
    fileId: number;
    email: string;
    password: string;
}

export interface IUserCreate {
    id: string;
    password: string;
}

export interface IUserResponse extends IUser {
    id: number;
    createdAt: Date;
    file: IFile;
}

export interface IUserService {
    createUser(userData: Prisma.UserCreateInput): Promise<IUserResponse>;
    updateUser(
        id: number,
        userData: Prisma.UserUpdateInput,
    ): Promise<IUserResponse | null>;
    getPaginatedUsers(
        limit: number,
        skip: number,
    ): Promise<IUserResponse[] | null>;
    isExists(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<IUserResponse | null>;
    findById(id: number): Promise<IUserResponse | null>;
    encryptPassword(password: string): Promise<string>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
}
