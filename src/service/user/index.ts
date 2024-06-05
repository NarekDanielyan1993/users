import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { USER_ERROR_MESSAGES } from 'constant/error';
import { InternalServerError } from 'lib/error';
import UserRepository from 'repository/user';
import { IUserResponse, IUserService } from 'types/user';
import Config from 'utils/config';

class UserService implements IUserService {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public createUser = async (
        userData: Prisma.UserCreateInput,
    ): Promise<IUserResponse> => {
        const createdUser: IUserResponse = await this.repository.create({
            ...userData,
        });
        return createdUser;
    };

    public updateUser = async (
        id: number,
        userData: Prisma.UserUpdateInput,
    ): Promise<IUserResponse | null> => {
        const updatedUser: IUserResponse | null =
            await this.repository.updateById(id, {
                ...userData,
            });
        return updatedUser;
    };

    async isExists(id: string): Promise<boolean> {
        const user = await this.repository.findOne({ email: id });
        return !!user;
    }

    async findByEmail(email: string): Promise<IUserResponse | null> {
        const updatedUser = await this.repository.findByEmail({ email });
        return updatedUser;
    }

    async findById(id: number): Promise<IUserResponse | null> {
        const updatedUser = await this.repository.findOne({ id });
        return updatedUser;
    }

    async getPaginatedUsers(
        limit: number,
        skip: number,
    ): Promise<IUserResponse[] | null> {
        return await this.repository.find({
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async encryptPassword(password: string): Promise<string> {
        try {
            const hashedPassword = await bcrypt.hash(
                password,
                Number(Config.getEnv('HASH_SAULT')),
            );
            return hashedPassword;
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.ENCRYPT_PASSWORD);
        }
    }

    async verifyPassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword);
            return isMatch;
        } catch (error) {
            throw new InternalServerError(USER_ERROR_MESSAGES.VERIFY_PASSWORD);
        }
    }
}

export default UserService;
