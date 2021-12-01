import type { EnvWithBindings, RequestWithParams } from "./ResizerRouter";
import { Context } from './ResizerRouter';
export declare const thirdParty: (request: RequestWithParams, ctx: Context, env?: EnvWithBindings | undefined) => Promise<Response>;
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
