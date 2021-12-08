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
    page?: number;
    bg: string;
    fit: string;
    af: string;
    l?: string;
    w?: string | null;
    h?: string | null;
    output?: string;
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
    flip?: string;
    flop?: string;
    ro: number;
    we?: string;
    trim?: string;
    blur?: number;
    filt?: string;
    con?: number;
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
export declare function defaultRoutes<Q extends Request | RequestWithParams, R extends Router<Q>>(router: R): R;
export declare function fallbackSvg(): string;
export declare class ResizerRouter {
    handle: (request: Request, ...extra: any) => any;
    constructor(options: RouterOptions<Request> & Partial<EnvWithBindings>);
}
export {};
