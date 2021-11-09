import { IdefaultSearchParams } from './thirdParty';
interface IWaitableObject {
    waitUntil: (promise: Promise<any>) => void;
}
export declare type RequestWithParams = Request & {
    color?: string;
    params: {
        transforms: Record<string & keyof IdefaultSearchParams, string>;
    } & {
        [s: string]: string;
    };
};
export interface EnvWithBindings {
    PNG_QUALITY: number;
    JPG_QUALITY: number;
    WORKER_ENV: string;
}
export declare type Context = {
    request: Request;
} & IWaitableObject;
export {};
