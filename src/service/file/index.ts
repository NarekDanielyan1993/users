import { Prisma } from '@prisma/client';
import FileRepository from 'repository/file';
import { IFileCreate, IFileResponse, IFileService } from 'types/file';

export class FileService implements IFileService {
    private fileRepository: FileRepository;

    constructor(fileRepository: FileRepository) {
        this.fileRepository = fileRepository;
    }

    async createFile(taskData: IFileCreate): Promise<IFileResponse> {
        return await this.fileRepository.create(taskData);
    }

    async getFile(id: number) {
        return await this.fileRepository.findById(id);
    }

    async getFileByUserId(userId: number) {
        return await this.fileRepository.findByUserId(userId);
    }

    async updateFile(
        id: number,
        fileData: Prisma.FileUpdateInput,
    ): Promise<IFileResponse | null> {
        return this.fileRepository.updateById(id, fileData);
    }

    async deleteFile(id: number): Promise<IFileResponse | null> {
        return await this.fileRepository.delete(id);
    }
}

export default FileService;
