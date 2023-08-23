// import path from 'node:path'
// import * as process from 'node:process';

import { html } from './src/html.js'
import { stringify } from './src/stringify.js'

export class RendCF {

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
        if (this.options.data) {
            d = { ...this.options.data, ...d }
        }
        let o = this.options
        let b
        if (bodyFunc instanceof Promise) {
            bodyFunc = await bodyFunc
        }
        if (typeof bodyFunc === 'string') {
            b = bodyFunc
        } else if ('render' in bodyFunc) {
            b = bodyFunc.render(d)
        } else if (typeof bodyFunc === 'function') {
            b = bodyFunc(d)
        } else {
            let template = this.templates[bodyFunc]
            if (!template) {
                template = await import(bodyFunc)
                if (o.prod) {
                    this.templates[bodyFunc] = template
                }
            } else {
                // console.log("got cached template!")
            }
            b = template.render(d)
        }
        let s = `
            ${o.header(d)}
            ${b}
            ${o.footer(d)} 
            `
        return s
    }

    // send 
    // reply is a fastify reply object
    // bodyFund can be a function or a string path to a module that exports a render function
    async send(reply, bodyFunc, d = {}, opts = {}) {
        reply.header('Content-Type', 'text/html')
        if (opts.headers) {
            for (const h in opts.headers) {
                reply.header(h, opts.headers[h])
            }
        }
        return reply.send(await this.render(bodyFunc, d))
    }

}

export { html, stringify }
