// stringify is for passing objects as html atttributes. 
// JSON.stringify doesn't work if your object has double and single quotes as it will end the string early.
export function stringifyAttribute(ob) {
    if(!ob) return ''
    let s = ''
    if (typeof ob === 'string') {
        s = ob
    } else {
        s = JSON.stringify(ob)
    }
    s = s.replaceAll(
        '"',
        '&quot;'
    )
    return s
}
