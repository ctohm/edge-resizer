declare module "itty-router-extras" {
    import { Router, Route, RouterOptions } from 'itty-router'

    function ThrowableRouter<TRequest>(options?: RouterOptions<TRequest> & { stack?: boolean }): Router<TRequest>

    type ThrowableRouter<TRequest> = {
        handle: (request: Request & TRequest, ...extra: any) => any
    } & {
        [any: string]: Route
    }
    function withParams(req: Request): void;
    function json(body: unknown, responseType?: unknown): Response
    function missing(message?: string): Response
    function error(header?: number, body?: unknown): Response
}
