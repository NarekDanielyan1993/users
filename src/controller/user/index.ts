/* eslint-disable max-lines */
import { USER_ERROR_MESSAGES } from 'constant/error';
import { NextFunction, Request, Response } from 'express';
import { InternalServerError, NotFound } from 'lib/error';
import { IPaginatedQueryParams } from 'types/database';
import { IFileResponse, IFileService } from 'types/file';
import { IUser, IUserService } from 'types/user';
import {
    deleteFile,
    generateJwtToken,
    isExist,
    openFile,
    parsePaginationParams,
    saveFile,
} from 'utils/helper';
export default class UserController {
    private userService: IUserService;
    private fileService: IFileService;

    constructor(userService: IUserService, fileService: IFileService) {
        this.userService = userService;
        this.fileService = fileService;
    }

    public getUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const id = req.params.id;
            const user = await this.userService.findById(Number(id));
            if (!user) {
                throw new NotFound(USER_ERROR_MESSAGES.NOT_FOUND_USER);
            }
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    };

    public getPaginatedUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { list_size, page } = req.query as IPaginatedQueryParams;
        const { pageSize, skip } = parsePaginationParams(page, list_size);

        try {
            const users = await this.userService.getPaginatedUsers(
                pageSize,
                skip,
            );
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const userData: IUser = req.body;
            const isUserWithEmailExists = await this.userService.isExists(
                userData.email,
            );

            if (isUserWithEmailExists) {
                throw new InternalServerError(USER_ERROR_MESSAGES.EXIST_USER);
            }

            const hashedPassword = await this.userService.encryptPassword(
                userData.password,
            );

            await this.userService.createUser({
                email: userData.email,
                password: hashedPassword,
                name: userData.name,
            });

            res.status(200).json({ msg: 'success' });
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const user = await this.userService.findByEmail(email);

            if (!isExist(user)) {
                throw new NotFound(USER_ERROR_MESSAGES.NOT_FOUND_USER);
            }

            const isPasswordValid = await this.userService.verifyPassword(
                password,
                user.password,
            );

            if (!isPasswordValid) {
                throw new InternalServerError(
                    USER_ERROR_MESSAGES.INCORRECT_PASSWORD,
                );
            }

            const accessToken = generateJwtToken({
                id: user.id,
            });

            res.status(200).json({ accessToken });
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { file } = req.fileData;
            const fields = req.body;
            if (fields.email) {
                const isUserWithEmailExists = await this.userService.isExists(
                    fields.email,
                );

                if (isUserWithEmailExists) {
                    throw new InternalServerError(
                        USER_ERROR_MESSAGES.EXIST_USER,
                    );
                }
            }

            const id = req.params.id;

            let newFile: IFileResponse | null = null;
            if (file) {
                const user = await this.userService.findById(Number(id));
                if (!user) {
                    throw new NotFound(USER_ERROR_MESSAGES.NOT_FOUND_USER);
                }
                if (user.fileId) {
                    await deleteFile(user.file.name);
                    newFile = (await this.fileService.updateFile(user.fileId, {
                        name: file.newFilename,
                    })) as IFileResponse;
                } else {
                    newFile = await this.fileService.createFile({
                        name: file.newFilename,
                    });
                }

                const fileToStore = await openFile(file.filepath);
                await saveFile(fileToStore, newFile.name);
            }
            const updatedUser = await this.userService.updateUser(Number(id), {
                ...(fields.surname && { surname: fields.surname }),
                ...(fields.gender && { gender: fields.gender }),
                ...(fields.name && { name: fields.name }),
                ...(fields.email && { email: fields.email }),
                ...(file &&
                    newFile && {
                        fileId: newFile.id,
                    }),
            });

            res.status(201).json(updatedUser);
        } catch (error) {
            next(error);
        }
    };
}
