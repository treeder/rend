import path from 'path'

export class Rend {
    constructor(options={}) {
        this.options = options

        // production cache of templates. default disabled. Set options.prod = true to enable.
        this.templates = {}
    }

    // render returns a string of the rendered content
    async render(bodyFunc, d, opts={}) {
        console.log('rendering', bodyFunc, d, opts)
        if (d == null) d = {}
        let o = this.options
        let msgFunc = (s, opts2={}) => {
            if(!o.localizer)return s
            return o.localizer.msg(s, {...{locale: opts.locale }, ...opts2})
        }
        let b
        if (typeof v === 'function') {
            b = bodyFunc(d, msgFunc)
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
            b = template.render(d, msgFunc)
        }
        let s = `
            ${o.header(d, msgFunc)}
            ${b}
            ${o.footer(d, msgFunc)} 
            `
        return s
    }

    // send 
    // reply is a fastify reply object
    // bodyFund can be a function or a string path to a module that exports a render function
    async send(reply, bodyFunc, d={}, opts={}) {
        console.log("send")
        if (opts.status) {
            reply.status(opts.status)
        }
        reply.header('Content-Type', 'text/html')
        if(opts.headers){
            for (const h in opts.headers){
                reply.header(h, opts.headers[h])
            }
        }
        return reply.send(await this.render(bodyFunc, d, opts))
    }
}
