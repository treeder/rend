import path from 'path'
export class Rend {
    constructor(options={}) {
        this.options = options

        // production cache of templates. default disabled. Set options.prod = true to enable.
        this.templates = {}
    }

    // render returns a string of the rendered content
    async render(bodyFunc, d) {
        let o = this.options
        let b
        if (typeof v === 'function') {
            b = bodyFunc(d)
        } else {
            let template =this.templates[bodyFunc] 
            if (!template) {
                template = await import(path.join(process.cwd(), bodyFunc))
                if(this.options.prod){
                    this.templates[bodyFunc] = template
                }
            } else {
                console.log("got cached template!")
            }
            console.log('template', template)
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
    async send(reply, bodyFunc, d={}, opts={}) {
        reply.header('Content-Type', 'text/html')
        if(opts.headers){
            for (const h in opts.headers){
                reply.header(h, opts.headers[h])
            }
        }
        return reply.send(await this.render(bodyFunc, d))
    }

}

// stringify is for passing objects as html atttributes. 
// JSON.stringify doesn't work if your object has double and single quotes as it will end the string early.
export function stringify(ob){
    return JSON.stringify(ob).replaceAll(
        '"',
        '&quot;'
      )
}
