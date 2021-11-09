import { RequestWithParams } from '.';
import { EnvWithBindings } from './index';
import { Context } from './index';
export declare const thirdParty: (request: RequestWithParams, env: EnvWithBindings, ctx: Context) => Promise<Response>;
export interface IdefaultSearchParams {
    cbg: string;
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
    cx?: number;
    ch?: number;
}
export declare const AvailableTransforms: Record<keyof IdefaultSearchParams, string>;
