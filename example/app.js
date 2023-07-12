import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static'
import { Rend } from '../rend.js'
import {addLocale, msg} from 'loco'
import { header, footer } from './views/layout.js'

let rend = new Rend({ header, footer })
// For Localization (remove if you don't want it, but it's no extra effort to keep it and it might come in handy when you need it)
await addLocale('es', './public/locales/es.js')

export default async function plugin(fastify, options) {
    
    const __dirname = dirname(fileURLToPath(import.meta.url));
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, 'public'),
        prefix: '/', 
    })

    // home page
    fastify.get('/', async (request, reply) => {
        return rend.send(reply, './views/index.js', { 
            name: "John Wick",
            greeting: msg('Hello, how are you?', {id: 'greeting', locale: 'es'})}) // Snag the user's locale from a cookie, or 'Accept-Language' or something instead of hardcoding here.
    })
    
    // about page
    fastify.get('/about', async (request, reply) => {
        return rend.send(reply, './views/about.js', { })
    })
}
