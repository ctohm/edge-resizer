import { IdefaultSearchParams } from './thirdParty';
export declare type RequestWithParams = Request & {
    params: {
        transforms: Record<string & keyof IdefaultSearchParams, string>;
    } & {
        [s: string]: string;
    };
};
