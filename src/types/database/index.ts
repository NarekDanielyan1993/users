import { ParsedUrlQuery } from 'querystring';

import { Prisma } from '@prisma/client';

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
export type Entity = A<keyof typeof Prisma>;
export type Keys<T extends Entity> = Extract<
    keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
    string
>;

export function prismaExclude<T extends Entity, K extends Keys<T>>(
    type: T,
    omit: K[],
) {
    type Key = Exclude<Keys<T>, K>;
    type TMap = Record<Key, true>;
    const result: TMap = {} as TMap;
    for (const key in Prisma[`${type}ScalarFieldEnum`]) {
        if (!omit.includes(key as K)) {
            result[key as Key] = true;
        }
    }
    return result;
}

export function exclude<
    User extends Record<string, any>,
    Key extends keyof User,
>(user: User, keys: Key[]): Omit<User, Key> {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<User, Key>;
}

export type EnvVariableTypes =
    | 'DATABASE_URL'
    | 'ROOT_DIR'
    | 'PORT'
    | 'ACCESS_TOKEN_KEY'
    | 'AUTH_EXPIRATION_TIME'
    | 'SERVER_BASE_API'
    | 'HASH_SAULT'
    | 'UPLOAD_DIRECTORY';

export interface IParsedPaginatedQueryParams {
    pageSize: number;
    pageNumber: number;
    skip: number;
}

export type IPaginatedQueryParams = {
    list_size: string;
    page: string;
} & ParsedUrlQuery;
