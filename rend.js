import path from 'path'
export class Rend {
    constructor(options={}) {
        this.options = options

        // production cache of templates. default disabled. Set options.prod = true to enable.
        this.templates = {}
    }


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
