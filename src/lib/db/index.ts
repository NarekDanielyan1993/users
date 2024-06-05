import { PrismaClient } from '@prisma/client';

let prismaAdapter: PrismaClient;

if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
}
// eslint-disable-next-line prefer-const
prismaAdapter = (global as any).prisma;

export default prismaAdapter;
