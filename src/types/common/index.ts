export type UppercaseKeys<T> = {
    [K in T as Uppercase<K & string>]: K;
};
