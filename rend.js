export class Rend {
    constructor(options) {
        this.options = options
    }

    render(bodyFunc, d) {
        let o = this.options
        let s = `
            ${o.header(d)}
            ${bodyFunc(d)}
            ${o.footer(d)} 
            `
        return s
    }

    send(reply, bodyFunc, d) {
        reply.header('Content-Type', 'text/html')
        return reply.send(this.render(bodyFunc, d))
    }

}
