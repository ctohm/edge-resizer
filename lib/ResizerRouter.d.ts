import { Router, RouterOptions } from 'itty-router';
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
export interface IdefaultSearchParams {
    cbg: string;
    bg: string;
    fit: string;
    af: string;
    l?: string;
    w?: string | null;
    h?: string | null;
    output?: string;
    filename?: string;
    q?: string;
    n?: string;
    il?: string;
    sharp?: string;
    cw?: number;
    cy?: number;
    a?: string;
    cx?: number;
    ch?: number;
    hue?: number;
    dpr?: number;
    precrop?: string;
}
export interface IOutputFormats {
    jpg?: string;
    png?: string;
    gif?: string;
    tiff?: string;
    webp?: string;
    auto?: string;
}
export declare const AvailableFormats: Record<keyof IOutputFormats, string>;
export declare const AvailableTransforms: Record<keyof IdefaultSearchParams, string>;
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
    static defaultRoutes<Q extends Request | RequestWithParams, R extends Router<Q>>(router: R): R;
    handleMatchingRoute(req: RequestWithParams, env: EnvWithBindings, ctx: Context): Promise<Response>;
    static fallbackSvg(): string;
}
export {};
