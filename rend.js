import path from 'path'
import { html } from './src/html.js'
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
        if (!d) d = {}
        if (this.options.data) {
            d = { ...this.options.data, ...d }
        }
        let o = this.options
        let b
        if (typeof v === 'function') {
            b = bodyFunc(d)
        } else {
            b = await this.renderTemplate(bodyFunc, d)
        }
        let s = `
            ${o.header(d)}
            ${b}
            ${o.footer(d)} 
            `
        return s
    }

    async renderTemplate(templatePath, d) {
        let template = this.templates[templatePath]
        if (!template) {
            template = await import(path.join(process.cwd(), templatePath))
            if (this.options.prod) {
                this.templates[templatePath] = template
            }
        } else {
            // console.log("got cached template!")
        }
        return template.render(d)
    }

    // send 
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

// stringify is for passing objects as html atttributes. 
// JSON.stringify doesn't work if your object has double and single quotes as it will end the string early.
export function stringify(ob) {
    return JSON.stringify(ob).replaceAll(
        '"',
        '&quot;'
    )
}

export { html }
