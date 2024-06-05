import { USER_VALIDATION_ERRORS } from 'constant/error';
import z from 'zod';

export const userSignUpValidationSchema = z.object({
    name: z
        .string()
        .min(1, { message: USER_VALIDATION_ERRORS.MIN })
        .max(32, { message: USER_VALIDATION_ERRORS.MAX }),
    email: z.string({}).refine(
        (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        { message: USER_VALIDATION_ERRORS.EMAIL },
    ),
    password: z
        .string()
        .min(6, { message: USER_VALIDATION_ERRORS.PASSWORD_MIN })
        .max(32, { message: USER_VALIDATION_ERRORS.PASSWORD_MAX }),
});

export const userLogInValidationSchema = z.object({
    email: z.string({}).refine(
        (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        { message: USER_VALIDATION_ERRORS.EMAIL },
    ),
    password: z
        .string()
        .min(6, { message: USER_VALIDATION_ERRORS.PASSWORD_MIN })
        .max(32, { message: USER_VALIDATION_ERRORS.PASSWORD_MAX }),
});

export const userUpdateValidationSchema = z.object({
    name: z
        .string()
        .min(1, { message: USER_VALIDATION_ERRORS.MIN })
        .max(32, { message: USER_VALIDATION_ERRORS.MAX })
        .or(z.undefined()),
    surname: z
        .string()
        .min(1, { message: USER_VALIDATION_ERRORS.MIN })
        .max(32, { message: USER_VALIDATION_ERRORS.MAX })
        .or(z.undefined()),
    gender: z
        .string()
        .min(1, { message: USER_VALIDATION_ERRORS.MIN })
        .max(32, { message: USER_VALIDATION_ERRORS.MAX })
        .or(z.undefined()),
    email: z
        .string({})
        .refine(
            (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            { message: USER_VALIDATION_ERRORS.EMAIL },
        )
        .or(z.undefined()),
});
