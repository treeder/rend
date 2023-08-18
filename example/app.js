import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static'
import { Rend } from '../rend.js'
import { addLocale, msg } from 'loco'
import { header, footer } from './views/layout.js'

import { sharedStyles } from './public/components/styles.js'
let rend = new Rend({ header, footer, css: sharedStyles })
// For Localization (remove if you don't want it, but it's no extra effort to keep it and it might come in handy when you need it)
await addLocale('es', './public/locales/es.js')


export default async function plugin(fastify, options) {

    const __dirname = dirname(fileURLToPath(import.meta.url));
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, 'public'),
        prefix: '/',
    })

    // SHARED STYLES:
    // Add a link in head to whatever path you put here, eg: <link rel="stylesheet" href="/css/shared.css" />
    // TODO: Support a merge of regular stylesheet + these JS ones so client only fetches one file.
    //       Component only need the things related to components, not the whole page so they get the smaller file.
    //       Then can also mix and match other ones like nostrap.js for instance. 
    fastify.get('/css/shared.css', async (request, reply) => {
        return rend.sendCSS(reply, sharedStyles)
    })
    // SHARED STYLES: for Lit client side components
    fastify.get('/css/lit.js', async (request, reply) => {
        return rend.sendCSSLit(reply, sharedStyles)
    })

    // home page
    fastify.get('/', async (request, reply) => {
        return rend.send(reply, './views/index.js', {
            name: "John Wick",
            car: "Mustang Boss 429",
            greeting: msg('Hello, how are you?', {
                id: 'greeting', // This is the localization ID to lookup in the es.js file
                locale: 'es', // Snag the user's locale from a cookie, or 'Accept-Language' or something instead of hardcoding here.
            })
        })
    })

    // about page
    fastify.get('/about', async (request, reply) => {
        return rend.send(reply, './views/about.js', {})
    })


    fastify.get('/test', async (request, reply) => {
        return rend.send(reply, './views/test.js', {})
    })

}
