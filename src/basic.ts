

import { ThrowableRouter } from 'itty-router-extras';
import { AvailableTransforms, IdefaultSearchParams, thirdParty } from './thirdParty';

export type RequestWithParams = Request & {
    params: { transforms: Record<string & keyof IdefaultSearchParams, string> } & {
        [s: string]: string;

    };

}


const router = ThrowableRouter<RequestWithParams>({
    stack: true,
    routes: [
        [
            'GET', new RegExp(`([^=/]+)(=?[^_/]*)\/(?<domain>([a-z0-9_.-]+))/(?<pathname>(.*))?`)
            , [
                async (
                    req: RequestWithParams,
                    event: FetchEvent
                ): Promise<Response> => {
                    const url = new URL(req.url)

                    req.params.origin = url.origin
                    const transformSegment = url.pathname.split('/')[1]
                    req.params.transforms = {} as Record<string & keyof IdefaultSearchParams, string>

                    for (let [key, value] of new URLSearchParams(transformSegment.replace(/_/g, '&')).entries()) {
                        if (['http', 'https'].includes(key)) {
                            req.params.protocol = key
                        }
                        //let [full, key, value] = match as [string, keyof IdefaultSearchParams, string];
                        //full = full + '' // TS stop nagging pls
                        if (Object.keys(AvailableTransforms).includes(key)) {
                            req.params.transforms[key as keyof IdefaultSearchParams] = value ?? true
                        }

                    }

                    req.params.protocol = req.params.protocol || 'https'
                    console.log({ params: req.params })
                    return thirdParty(req, event)


                }
            ]],
    ]
})




addEventListener('fetch', async (event: FetchEvent) => {

    event.respondWith(router.handle(event.request, event))
});




