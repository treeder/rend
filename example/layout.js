export function header(d) {
    return `
<!doctype html>
<html>
<head>
    <title>Literals are literally awesome!</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
</head>

<body>

    <div class="container">
    <h1>Literals Rule</h1>

    <p>
        Literally use literals for your templates
    </p>
    `
}

export function footer(d) {
    return `
    <div>
    <hr>
    Footer
    </div>
    </div>
</body>
</html>`
}