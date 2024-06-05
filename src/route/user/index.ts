import { USER_API } from 'constant/api';
import UserController from 'controller/user';
import express, { Router } from 'express';
import { fileUploadMiddleware } from 'middleware/fileUpload';
import FileRepository from 'repository/file';
import UserRepository from 'repository/user';
import FileService from 'service/file';
import UserService from 'service/user';
import { validateRequest } from 'utils/helper';
import { isAuth } from 'utils/middleware';
import {
    userLogInValidationSchema,
    userSignUpValidationSchema,
    userUpdateValidationSchema,
} from 'utils/validation/user';

const fileRepository = new FileRepository();
const fileService = new FileService(fileRepository);
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService, fileService);

const userRoutes: Router = express.Router();

userRoutes.get(USER_API.PROFILE, isAuth, userController.getUser);

userRoutes.get(USER_API.PROFILES, isAuth, userController.getPaginatedUsers);

userRoutes.post(
    USER_API.SIGN_UP,
    validateRequest(userSignUpValidationSchema),
    userController.createUser,
);

userRoutes.post(
    USER_API.LOGIN,
    validateRequest(userLogInValidationSchema),
    userController.login,
);

userRoutes.post(USER_API.PROFILE, isAuth, userController.getUser);

userRoutes.put(
    USER_API.PROFILE,
    isAuth,
    fileUploadMiddleware,
    validateRequest(userUpdateValidationSchema),
    userController.updateUser,
);

export default userRoutes;
