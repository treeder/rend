
// stringify is for passing objects as html atttributes. 
// JSON.stringify doesn't work if your object has double and single quotes as it will end the string early.
export function stringify(ob) {
    return JSON.stringify(ob).replaceAll(
        '"',
        '&quot;'
    )
}
