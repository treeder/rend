var templates = {}

export async function renderBody(bodyFunc, d) {
    let b
    console.log("typeof bodyFunc", typeof bodyFunc, bodyFunc)
    if (!bodyFunc) {
        b = 'no render'
    } else if (typeof bodyFunc === 'function') {
        b = bodyFunc(d)
    } else if (typeof bodyFunc === 'string') {
        if (probablyIsTemplate(bodyFunc)) {
            // then it's a template path
            b = await renderTemplate(bodyFunc, d)
        } else {
            // then just render regular string
            b = bodyFunc
        }
    } else if (typeof bodyFunc === 'object') {
        if ('render' in bodyFunc) {
            // an object with render function
            b = bodyFunc.render(d)
        } else if ('layout' in bodyFunc) {
            let slots = bodyFunc.slots
            if (slots) {
                for (const slot in slots) {
                    let slotContent = await renderBody(slots[slot], d)
                    d.slots = d.slots || {}
                    d.slots[slot] = slotContent
                }
            }
            b = await renderBody(bodyFunc.layout, d)
        } else {
            throw new Error("bodyFunc object must have a render function or slots")
        }
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
    return b
}

function probablyIsTemplate(s) {
    let i = s.lastIndexOf('.')
    if (i === -1) return false
    if (s.length - i > 4) return false
    return true
}

async function renderTemplate(templatePath, d) {
    // console.log("renderTemplate", templatePath)
    let template = templates[templatePath]
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
        // if (this.options.prod) {
        //     this.templates[templatePath] = template
        // }
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