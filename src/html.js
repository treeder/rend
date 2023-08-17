
export function html(strings, ...keys) {
    // I'm sure there's a more efficient way to do this...
    let strings2 = []
    let values = []
    let i = 0
    for (const key of keys) {
        if (typeof key === 'string') {
            values[i] = key
        } else if (typeof key === 'function') {
            values[i] = key()
        } else if ('render' in key) {
            values[i] = key.render()
        } else {
            values[i] = key.toString()
        }
        // if (!strings[i].endsWith('"') || !strings[i].endsWith("'")) {
        //     strings2[i] = strings[i] + '"'
        //     strings2[i + 1] = '"' + strings[i + 1]
        // } else {
        //     strings2[i]= strings[i]            
        // }
        i++
    }
    return String.raw(strings, ...values)
}