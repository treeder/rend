import { html } from './src/html.js'
import { stringify } from './src/stringify.js'
import { slot } from './src/slots.js'
import { renderBody } from './src/render.js'

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

        // if single param, then it's new slotted way, so just single input
        // console.log("typeof d", typeof d,d)
        let d2 = d

        let o = this.options
        if (!d) d = {}
        if (!d.__rend__) d.__rend__ = {}
        if (this.options.data) {
            d = { ...o.data, ...d }
        }

        if (o.layout) {
            // new slotted style
            d.__rend__.slotted = true
            if (typeof d2 === 'undefined') {
                // console.log("d is undefined")
                d = { ...d, ...bodyFunc } // the single param is the data map
            } else {
                d.__default__ = bodyFunc
            }
            if (d.rend?.nowrap) {
                return await renderBody(async () => `${await slot('', d)}`, d)
            }
            let b = await renderBody(o.layout, d)
            return b
        } else {
            let b = await renderBody(bodyFunc, d)
            if (d.rend?.nowrap) {
                return b
            }

            let s = `${o.header ? o.header(d) : ''}
${b}
${o.footer ? o.footer(d) : ''}
`
            return s
        }
    }

    // these are used in your HTTP handlers to return a rend rendered response
    async html(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, d), {
            status: this.options.layout ? d?.status || bodyFunc.status || 200 : d?.status || 200,
            headers: {
                'Content-Type': 'text/html',
            },
        })
    }

    nowrap(d) {
        d = d || {}
        d.rend = d.rend ?? {}
        d.rend.nowrap = true
        return d
    }

    async text(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, this.nowrap(d)), {
            status: this.options.layout ? d?.status || bodyFunc.status || 200 : d?.status || 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        })
    }

    async json(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, this.nowrap(d)), {
            status: this.options.layout ? d?.status || bodyFunc.status || 200 : d?.status || 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    async css(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, this.nowrap(d)), {
            status: this.options.layout ? d?.status || bodyFunc.status || 200 : d?.status || 200,
            headers: {
                'Content-Type': 'text/css',
            },
        })
    }

    async js(bodyFunc, d) {
        return new Response(await this.render(bodyFunc, this.nowrap(d)), {
            status: this.options.layout ? d?.status || bodyFunc.status || 200 : d?.status || 200,
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

export { html, stringify, slot }
