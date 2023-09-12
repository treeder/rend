import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
// import { cors } from 'hono/cors'
// import { getCookie } from 'hono/cookie'
// import { api, ApiError, apiInit } from './public/js/api.js'
import { Rend } from 'rend'
import { addLocale, msg } from 'loco' // For localization
import { header, footer } from './views/layout.js'

const isProd = process.env.ENV == 'prod'
const apiURL = process.env.API_URL?.replace(/\/$/, '') || 'http://localhost:8080'
console.log("isProd:", isProd)
console.log("apiURL:", apiURL)
// apiInit({ apiURL, isProd })

let rend = new Rend({
    prod: isProd,
    header, footer, data: {
        apiURL,
    }
})

await addLocale('es', './public/locales/es.js')

const app = new Hono()

app.use('/*', serveStatic({ root: './public' })) // https://github.com/honojs/node-server#serve-static-middleware

// app.get('/styles.css', async (c) => {
//     return css({
//         imports: ['https://cdn.jsdelivr.net/gh/treeder/web-components@0/css/nostrap.css',
//             '/css/styles.css',]
//     })
// })

app.get('/', async (c) => {
    let d = {
        name: "John Wick",
        car: "Mustang Boss 429",
        greeting: msg('Hello, how are you?', {
            id: 'greeting', // This is the localization ID to lookup in the es.js file
            locale: 'es', // Snag the user's locale from a cookie, or 'Accept-Language' or something instead of hardcoding here.
        })
    }
    // // fetch data from api:
    // let r = await api(`/v1/totals`)
    // d.totals = r.data
    return rend.html('./views/index.js', d)
})

app.notFound(async function (c) {
    console.log("not found handler", c.req.path)
    let parts = c.req.path.split('/')
    let last = parts.pop()
    let extension = last.split('.')
    if (extension.length > 1) {
        extension = extension.pop()
    } else {
        extension = ''
    }
    // console.log("extension", extension)
    if (extension == '' || extension == 'html') {
        console.log("in html")
        return rend.html('./views/404.js', {
            status: 404,
        })
    }
    return rend.text('Not Found', {
        status: 404,
    })
})

app.onError(async function (err, c) {
    console.log("error handler", err)
    let statusCode = err.status
    console.log(statusCode)
    if (!statusCode) {
        statusCode = 500
    }
    if (statusCode === 404) {
        return rend.html('./views/404.js', {
            status: statusCode,
        })
    }
    return rend.html(
        './views/error.js', {
        error: err,
        status: statusCode,
    })
})

export default app