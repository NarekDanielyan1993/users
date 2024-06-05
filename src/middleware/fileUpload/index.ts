// import FormParser from 'lib/formParser';
// import CloudinaryService from 'lib/upload';

import { FILE_ERROR_MESSAGES } from 'constant/error';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from 'constant/file';
import { NextFunction, Response } from 'express';
import { IncomingMessage } from 'http';
import { FileError, InternalServerError } from 'lib/error';
import FormParser from 'lib/formParser';
import { IFileData } from 'types/global/express';

export const fileUploadMiddleware = async (
    req: IncomingMessage,
    res: Response,
    next: NextFunction,
) => {
    try {
        const formParser = new FormParser();
        const { fields, files } = await formParser.parseForm(req);
        req.fileData = {} as IFileData;
        if (Array.isArray(files.file) && files.file.length > 0) {
            if (files.file[0].size > MAX_FILE_SIZE) {
                const error = new FileError(
                    FILE_ERROR_MESSAGES.LIMIT_FILE_SIZE,
                );
                await next(error);
            }
            if (
                files.file[0].mimetype &&
                !ALLOWED_FILE_TYPES.includes(files.file[0].mimetype)
            ) {
                const error = new FileError(FILE_ERROR_MESSAGES.FILE_TYPE);
                await next(error);
            }
            req.fileData.file = files.file[0];
        }
        req.body = fields;
        await next();
    } catch (error) {
        next(new InternalServerError());
    }
};
