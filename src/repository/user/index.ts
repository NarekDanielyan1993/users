import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';
import { USER_MODEL_FIELDS } from 'constant/db';
import { USER_ERROR_MESSAGES } from 'constant/error';
import prismaAdapter from 'lib/db';
import { InternalServerError } from 'lib/error';
import { prismaExclude } from 'types/database';
import { IUserResponse } from 'types/user';

class UserRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async create(queryData: Prisma.UserCreateInput): Promise<IUserResponse> {
        try {
            return (await this.prisma.user.create({
                data: {
                    ...queryData,
                },
            })) as IUserResponse;
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.CREATE_USER);
        }
    }

    async updateById(
        id: number,
        fileData: Prisma.UserUpdateInput,
    ): Promise<IUserResponse | null> {
        try {
            return await this.prisma.user.update({
                where: {
                    id,
                },
                data: {
                    ...fileData,
                },
                select: prismaExclude(Prisma.ModelName.User, [
                    USER_MODEL_FIELDS.PASSWORD,
                ]),
            });
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.UPDATE_USER);
        }
    }

    async find(
        userData: Prisma.UserFindManyArgs,
    ): Promise<IUserResponse[] | null> {
        try {
            return await this.prisma.user.findMany({
                ...userData,
                select: prismaExclude(Prisma.ModelName.User, [
                    USER_MODEL_FIELDS.PASSWORD,
                ]),
            });
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.GET_USERS);
        }
    }

    async findByEmail(
        userData: Prisma.UserWhereInput,
    ): Promise<IUserResponse | null> {
        try {
            return await this.prisma.user.findFirst({
                where: {
                    ...userData,
                },
            });
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.GET_USER);
        }
    }

    async findOne(
        userData: Prisma.UserWhereInput,
    ): Promise<IUserResponse | null> {
        try {
            return await this.prisma.user.findFirst({
                where: {
                    ...userData,
                },
                select: {
                    ...prismaExclude(Prisma.ModelName.User, [
                        USER_MODEL_FIELDS.PASSWORD,
                    ]),
                    file: true,
                },
            });
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.GET_USER);
        }
    }
}

export default UserRepository;
