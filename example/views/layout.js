// import { slot } from '../../rend.js'
// ${slot('main', d)}


export function header(d) {
    return `
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Rend - the anti-framework framework</title>
  
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  
    <link rel="stylesheet" href="/css/styles.css" />
    <link rel="stylesheet" href="/css/shared.css" />

    <script type="importmap">
    {
        "imports": {
            "lit": "https://cdn.jsdelivr.net/npm/lit@2/index.js",
            "lit/": "https://cdn.jsdelivr.net/npm/lit@2/",
            "@material/web/": "https://cdn.jsdelivr.net/npm/@material/web@1.0.0-pre.15/",
            "@lit/localize": "https://cdn.jsdelivr.net/npm/@lit/localize/lit-localize.js"
        },
        "scopes": {
            "https://cdn.jsdelivr.net/": {
                "@lit/reactive-element": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@1/reactive-element.js",
                "@lit/reactive-element/": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@1/",
                "lit-element/lit-element.js": "https://cdn.jsdelivr.net/npm/lit-element@3/lit-element.js",
                "lit-html": "https://cdn.jsdelivr.net/npm/lit-html@2/lit-html.js",
                "lit-html/": "https://cdn.jsdelivr.net/npm/lit-html@2/",
                "tslib": "https://cdn.jsdelivr.net/npm/tslib@2/tslib.es6.mjs"
            }
        }
    }
    </script>


</head>

<body>
<div class="nav">
    <div><span style="font-weight: 700; font-size: 18px;">Rend</span></div>
</div>

<!-- This is where we can put a sublayout, for example a side nav and main content area -->

    `
}

export function footer(d) {
    return `
    <div class="footer">
        <div class="container">
            <a href="https://github.com/treeder/rend">Rend</a>
        </div>
    </div>
    </body>
</html>`
}