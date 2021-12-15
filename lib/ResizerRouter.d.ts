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
    regex: string;
    title: string;
    docs?: string;
    example: string;
    section?: string;
    sectionLink?: string;
    note?: string;
}>;
export declare class ResizerRouter {
    handle: (request: Request, ...extra: any) => any;
    static transformationsGroupRegex: RegExp;
    static transformationsGroupOldRegex: RegExp;
    static transformationsGroupNoDomainRegex: RegExp;
    constructor(options: RouterOptions<Request> & Partial<EnvWithBindings>);
    /**
     * Process route params in order to extract transformations as an Object
     * to pass to the next handler
     * Shorthand syntax for output formats is translated to its canonical form (output=<format>)
     * Shorthand syntax for fit types is translated to its canonical form (fit=<fit type>)
    *
    * Searchparams, if they are among the supported transformations, will be merged into the Object, overriding route params
    * When they aren't a recognizable transformation, they are stored (and passed to the next handler) as a separate object
    * That object will be ultimately added to the request to WeServe, but won't be part of the canonical nice URL we use as
    * cache-key.
     * @returns
     */
    static handleMatchingRoute(debugFn?: {
        (...attrs: any[]): void;
    }, defaultSearchParams?: {
        fit: string;
        n: string;
        maxage: string;
    }): {
        (req: RequestWithParams, ctx: Context): Promise<Response>;
    };
    static normalizeRequestParams(req: RequestWithParams, pathSearchParams: URLSearchParams): TImageParameters;
}
export declare function fallbackSvg(): string;
export {};
