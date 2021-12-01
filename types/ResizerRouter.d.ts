import { Router, RouterOptions } from 'itty-router';
import { ThrowableRouter } from 'itty-router-extras';
import { IdefaultSearchParams } from './thirdParty';
export declare class ResizerRouter {
    readonly validKeys: string[];
    debug: {
        (...data: any[]): void;
    };
    readonly domainGroup = "(?<domain>([a-z0-9._-]+))";
    readonly pathNameGroup = "(?<pathname>(.*))";
    /**
    *
    */
    get transformationsGroup(): string;
    /**
 *
 */
    get groupRegex(): string;
    handle: {
        (req: Request, env: EnvWithBindings, ctx: Context): Promise<any>;
    };
    /**
     * The constructor expects the environment to avoid reading globals,
     * which might not exist when using module format
     *
     * @param {EnvWithBindings} env
     */
    constructor(options: RouterOptions<Request> & Partial<EnvWithBindings>);
    static defaultRoutes<Q extends Request | RequestWithParams, R extends Router<Q> | ThrowableRouter<Q>>(router: R): R;
    handleMatchingRoute(req: RequestWithParams, env: EnvWithBindings, ctx: Context): Promise<Response>;
    static fallbackSvg(): string;
}
interface IWaitableObject {
    waitUntil: (promise: Promise<any>) => void;
}
export declare type TImageParameters = {
    transforms: Record<string & keyof IdefaultSearchParams, string>;
} & {
    [s: string]: string;
};
export declare type RequestWithParams = Request & {
    params?: TImageParameters;
};
export declare type Context = {
    request: Request;
} & IWaitableObject;
export interface EnvWithBindings {
    DEBUG: boolean;
    WORKER_ENV: string;
    ROUTE_PREFIX: string;
}
export {};
