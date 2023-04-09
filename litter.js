import * as fs from 'fs';

class LitterBox {
    constructor(data) {
        this.data = data
    }
    include(filename) {
        console.log('INCLUDE', filename)
        return litter(filename, this.data)
    }
}

function compile(templateStr) {
    return new Function(
        'd',
        'i', // internal functions and vars that templates can use
        'return `' + templateStr + '`'
    )
}

export function litter(filename, data) {
    let code = fs.readFileSync(filename, 'utf8')
    let runTemplate = compile(code) // todo cache these in production
    let s = runTemplate(data, new LitterBox(data))
    return s
}