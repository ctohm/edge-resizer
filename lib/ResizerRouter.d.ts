import { RouterOptions } from 'itty-router';
interface IWaitableObject {
    waitUntil: (promise: Promise<any>) => void;
}
export declare type TImageParameters = {
    transforms: Record<string & keyof IdefaultSearchParams, string>;
    defaults: {
        fit: string;
        n: string;
        maxage: string;
    };
    discarded: Record<string, string>;
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
    RELEASE: string;
    TIMESTAMP?: number;
    MAX_AGE?: string;
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
    mod?: string;
    sat?: string;
    gam?: number;
    tint?: string;
}
export interface IOutputFormats {
    jpg?: string;
    png?: string;
    gif?: string;
    tiff?: string;
    webp?: string;
    jpeg?: string;
    auto?: string;
}
interface IFitModes {
    contain?: string;
    cover?: string;
    fill?: string;
    inside?: string;
    outside?: string;
}
export declare const AlignmentAliases: {
    'top-left': string;
    top: string;
    'top-right': string;
    left: string;
    center: string;
    right: string;
    'bottom-left': string;
    bottom: string;
    'bottom-right': string;
};
export declare const FitAliases: Record<keyof IFitModes, string>;
export declare const FormatAliases: Record<keyof IOutputFormats, string>;
export declare const AvailableTransforms: Record<keyof IdefaultSearchParams, {
    title: string;
    docs?: string;
}>;
export declare class ResizerRouter {
    handle: (request: Request, ...extra: any) => any;
    constructor(options: RouterOptions<Request> & Partial<EnvWithBindings>);
}
export declare function fallbackSvg(): string;
export {};
