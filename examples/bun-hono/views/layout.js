import { slot } from 'rend'
import { head } from 'rend/head.js'

export async function layout(d) {
    return `
    ${header(d)}

    <div class="container">
        <div class="flex" style="gap: 12px;">
            <div>${await slot('rail', d)}</div>
            <div>${await slot('main', d)}</div>
        </div>
    </div>

    ${footer(d)}
    `
}

export function header(d) {
    return `${head({
        ...d,
        title: d.title || 'Just rend it!',
        description: d.description || 'The best server side rendered web framework ever.',
        fonts: [
            'Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
            'Roboto+Flex:wght@400;500;700&display=swap',
        ],
        styles: ['/css/styles.css'],
        importmap: {
            imports: {
                "lit": "https://cdn.jsdelivr.net/npm/lit@2/index.js",
                "lit/": "https://cdn.jsdelivr.net/npm/lit@2/",
                "@lit/localize": "https://cdn.jsdelivr.net/npm/@lit/localize/lit-localize.js",
                "@lit/reactive-element": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@1/reactive-element.js",
                "@lit/reactive-element/": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@1/",
                "lit-element/lit-element.js": "https://cdn.jsdelivr.net/npm/lit-element@3/lit-element.js",
                "lit-html": "https://cdn.jsdelivr.net/npm/lit-html@2/lit-html.js",
                "lit-html/": "https://cdn.jsdelivr.net/npm/lit-html@2/",
                "tslib": "https://cdn.jsdelivr.net/npm/tslib@2/tslib.es6.mjs",
                "@material/web/": "https://cdn.jsdelivr.net/npm/@material/web@1.0.0-pre.17/",
            },
        }
    })}

    <script type="module">
    // import { apiInit } from '/js/api.js'
    // apiInit({ apiURL: '${d.apiURL}', isProd: ${d.isProd} })
    </script>

    ${nav(d)}
      `
}

function nav(d) {
    return `
    <div style="background-color: #eee; padding: 20px 0; margin-bottom: 20px;">
        <div class="container nav">
            <div style="display: flex; gap: 20px; align-items: center;">
                <div style="font-weight: bold; font-size: larger;">
                    <a href="https://github.com/treeder/rend">Rend</a>
                </div>
            </div>
            <div>
                <!-- Right stuff -->
                <script type="module">
                import '/components/current-car.js'
                </script>
                <current-car></current-car>
            </div>
        </div>
    </div>
    `
}

export function footer(d) {
    return `
    <div class="container" style="border-top: 1px solid silver; margin-top: 20px; padding-top: 20px;>
        <div class="flex" style="flex-direction: column; gap: 12px;">
        <a href="https://github.com/treeder/rend">Rend</a>
        <div>Just rend it!</div>
    </div>
  </body>
  </html>
      `
}

export function layout1(d) {
    return `
    <div class="container">
        <div class="flex" style="gap: 12px;">
            <div>${d.slots.drawer}</div>
            <div>${d.slots.main}</div>
        </div>
    </div>
    `
}

