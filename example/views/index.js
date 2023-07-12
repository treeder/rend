export function render(d) {
    return `
    <div class="container">

    <h1>Rend - the no framework framework</h1>

    <p>
        Literally use literals for your templates
    </p>

    I am ${d.name}

    <p>
        This is localized: ${d.greeting}
    </p>
    
    </div>

`
}