import { renderBody } from './render.js'
export async function slot(name, d) {
    console.log("slot", name, d)
    if (d[name]) {
        return await renderBody(d[name], d)
    }
    return ''
}
