import { Prisma } from '@prisma/client';

export interface IFile {
    name: string;
}

export interface IFileCreate {
    name: string;
}

export interface IFileResponse extends IFile {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFileService {
    createFile(taskData: IFileCreate): Promise<IFileResponse>;
    getFileByUserId(id: number): Promise<IFileResponse>;
    getFile(id: number): Promise<IFileResponse>;
    getFileByUserId(userId: number): Promise<IFileResponse>;
    updateFile(
        id: number,
        fileData: Prisma.FileUpdateInput,
    ): Promise<IFileResponse | null>;
    deleteFile(id: number): Promise<IFileResponse | null>;
}
