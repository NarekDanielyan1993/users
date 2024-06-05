import formidable from 'formidable';

export interface IFileData {
    file: formidable.File;
    fields: any;
}

declare global {
    namespace Express {
        interface Request {
            fileData: IFileData;
            body: any;
            userId: string;
        }
    }
}

declare module 'http' {
    interface IncomingMessage {
        fileData: { file: formidable.File; fields: any };
        body: any;
    }
}
