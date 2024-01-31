import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { Rend } from 'rend'
import { addLocale, msg } from 'loco' // For localization
import { header, footer, layout } from './views/layout.js'
import { HomePage } from './views/components/home-page.js'

const isProd = process.env.ENV == 'prod'
const apiURL = process.env.API_URL?.replace(/\/$/, '') || 'http://localhost:8080'
console.log("isProd:", isProd)
console.log("apiURL:", apiURL)


let rend = new Rend({
    header, footer,
    data: {
        apiURL,
    }
})

let rend2 = new Rend({
    layout: layout,
    data: {
        apiURL,
    },
})

await addLocale('es', './public/locales/es.js')

const app = new Hono()

app.use('/*', serveStatic({ root: './public' }))

app.get('/', async (c) => {
    let d = {
        name: "John Wick",
        car: "Mustang Boss 429",
        greeting: msg('Hello, how are you?', {
            id: 'greeting', // This is the localization ID to lookup in the es.js file
            locale: 'es', // Snag the user's locale from a cookie, or 'Accept-Language' or something instead of hardcoding here.
        })
    }
    return rend.html('./views/index.js', d)
})

// implementing a layout like this: https://thingster.app/things/qsXjgXN2TD6CsL5gpmVRd
app.get('/islands', async (c) => {
    let d = {
        name: "John Wick",
        car: "Mustang Boss 429",
        greeting: msg('Hello, how are you?', {
            id: 'greeting', // This is the localization ID to lookup in the es.js file
            locale: 'es', // Snag the user's locale from a cookie, or 'Accept-Language' or something instead of hardcoding here.
        })
    }
    return rend.html({ layout: layout1, slots: { drawer: './views/drawer.js', main: './views/index.js' } }, d)
})

// implementing a layout like this: https://thingster.app/things/qsXjgXN2TD6CsL5gpmVRd
// trying a different way, more like normal components
app.get('/islands2', async (c) => {
    let d = {
        name: "John Wick",
        car: "Mustang Boss 429",
        greeting: msg('Hello, how are you?', {
            id: 'greeting', // This is the localization ID to lookup in the es.js file
            locale: 'es', // Snag the user's locale from a cookie, or 'Accept-Language' or something instead of hardcoding here.
        }),
        // slotted content:
        rail: await import('./views/drawer.js'),
        main: new HomePage(),
    }
    return rend2.html(d)
})

// implementing a layout like this: https://thingster.app/things/qsXjgXN2TD6CsL5gpmVRd
// trying a different way, more like normal components
app.get('/defaultSlot', async (c) => {
    let d = {
        name: "John Wick",
        car: "Mustang Boss 429",
        greeting: msg('Hello, how are you?', {
            id: 'greeting', // This is the localization ID to lookup in the es.js file
            locale: 'es', // Snag the user's locale from a cookie, or 'Accept-Language' or something instead of hardcoding here.
        }),
        // slotted content:
        rail: await import('./views/drawer.js'),
    }
    return rend2.html(new HomePage(), d)
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
