import { html } from './src/html.js'
import { stringify } from './src/stringify.js'

export class Rend {

    // options:
    //   - header, footer: template functions that will wrap around the content
    //   - prod (boolean): enable for performance enhancements such as cached templates
    constructor(options = {}) {
        this.options = options

        // production cache of templates. default disabled. Set options.prod = true to enable.
        this.templates = {}
    }

    // render returns a string of the rendered content
    async render(bodyFunc, d) {
        // console.log("render", bodyFunc)
        if (!d) d = {}
        if (this.options.data) {
            d = { ...this.options.data, ...d }
        }
        let o = this.options
        let b
        if (!bodyFunc) {
            b = 'no render'
        } else if (typeof bodyFunc === 'function') {
            b = bodyFunc(d)
        } else if (typeof bodyFunc === 'string') {
            if (bodyFunc.endsWith('.js')) {
                // then it's a template path
                b = await this.renderTemplate(bodyFunc, d)
            } else {
                // then just render regular string
                b = bodyFunc
            }
        } else if (typeof bodyFunc === 'object' && 'render' in bodyFunc) {
            // an object with render function
            b = bodyFunc.render(d)
        } else {
            throw new Error("bodyFunc must be a string, function, or object with a render function")
        }
        if (typeof b === 'undefined') {
            b = ''
        } else {
            // just in case it's a promise:
            if (b.constructor === Promise) {
                b = await b
            }
        }

        let s = `${o.header ? o.header(d) : ''}
${b}
${o.footer ? o.footer(d) : ''}
`
        return s
    }

    async renderTemplate(templatePath, d) {
        // console.log("renderTemplate", templatePath)
        let template = this.templates[templatePath]
        if (!template) {
            // had to get rid of the 'path' library here so other frameworks like cloudflare can work
            // so doing this in place of path.join
            if (templatePath.startsWith('/')) {
                // templatePath = templatePath.substring(1)
            } else if (templatePath.startsWith('./')) {
                templatePath = templatePath.substring(1)
            }
            let ipath = templatePath
            if (typeof process !== 'undefined') { // Cloudflare does not have a process object
                ipath = process.cwd() + templatePath
            }
            template = await import(ipath)
            if (this.options.prod) {
                this.templates[templatePath] = template
            }
        } else {
            // console.log("got cached template!")
        }
        if (!template) {
            throw new Error(`Template not found: ${templatePath}`)
        }
        if (!template.render) {
            throw new Error(`Template does not have a render function: ${templatePath}`)
        }
        try {
            return template.render(d)
        } catch (err) {
            console.log("error rendering template", err)
            throw err
        }
    }

    async html(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, d), {
            status: d.status || 200,
            headers: {
                'Content-Type': 'text/html',
            },
        })
    }

    async text(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, d), {
            status: d.status || 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        })
    }

    async json(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, d), {
            status: d.status || 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    async css(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, d), {
            status: d.status || 200,
            headers: {
                'Content-Type': 'text/css',
            },
        })
    }

    async js(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, d), {
            status: d.status || 200,
            headers: {
                'Content-Type': 'text/javascript',
            },
        })
    }

    // send 
    // TODO: move these into fastify folder or repo
    // reply is a fastify reply object
    // bodyFunc can be a function or a string path to a module that exports a render function
    async send(reply, bodyFunc, d = {}, opts = {}) {
        reply.header('Content-Type', 'text/html')
        this.addHeaders(reply, opts)
        return reply.send(await this.render(bodyFunc, d))
    }

    async sendCSS(reply, styles, opts = {}) {
        reply.header('Content-Type', 'text/css')
        this.addHeaders(reply, opts)
        return reply.send(styles)
    }

    async sendCSSLit(reply, styles, opts = {}) {
        reply.header('Content-Type', 'application/javascript')
        this.addHeaders(reply, opts)
        return reply.send(`import { css } from 'lit'
        
        export const styles = css\`${styles}\``)
    }

    addHeaders(reply, opts) {
        if (opts.headers) {
            for (const h in opts.headers) {
                reply.header(h, opts.headers[h])
            }
        }
    }


}

export { html, stringify }
