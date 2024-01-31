import { renderBody } from './render.js'

export async function slot(name, d) {
    console.log("slot:", name)
    if (!name && d.__default__) {
        console.log("using default slot", d)
        return await renderBody(d.__default__, d)
    } else if (d[name]) {
        console.log("using named slot")
        return await renderBody(d[name], d)
    }
    return ''
}
