/**
 * @param d - a map of data to include, such as title, description, etc.
 * 
 * * title
 * * description
 * * icon
 * * styles
 * * scripts
 * * fonts
 * * importmap
 * * baseURL
 */
export function head(d) {
    // console.log(d)
    return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <title>${d.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="${d.description}">
  
      <link rel="icon" type="image/png" href="${d.icon || "/images/icon-512x512.png"}">
  
      ${opengraph(d)}
  
      ${googleFonts(d)}
      
      ${styles(d)}
  
      ${importmap(d)}
  
      ${scripts(d)}
  
      <script>
          const baseURL = '${d.baseURL}'
      </script>
  </head>
  
  <body>`
}

function googleFonts(d) {
    if (!d.fonts) {
        return ''
    }
    return `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      ${d.fonts.map(f => `<link rel="preload" href="https://fonts.googleapis.com/css2?family=${f}" as="style" onload="this.onload=null;this.rel='stylesheet'">`).join('\n')}
      `
    /* 
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"  as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    */
}

function styles(d) {
    if (!d.styles) {
        return ''
    }
    return d.styles.map(s => `<link rel="stylesheet" href="${s}">`).join('\n')
}

function opengraph(d) {
    if (!d.title) {
        return ''
    }
    return `
              <meta property="og:type" content="website" />
              <meta property="og:title" content="${d.title}" />
              ${d.description
            ? `<meta property="og:description" content="${d.description}" />`
            : ''
        }
              ${d.image ? `<meta property="og:image" content="${d.image}" />` : ''}       
              ${d.url ? `<meta property="og:url" content="${d.url}" />` : ''}
        
                <!-- Twitter -->
                <meta name="twitter:card" content="summary">
                ${d.title ? `<meta name="twitter:title" content="${d.title}">` : ''}
                ${d.domain ? `<meta name="twitter:domain" content="${d.domain}">` : ''}
                ${d.url ? `<meta property="twitter:url" content="${d.url}">` : ''}
              ${d.description ? `<meta name="twitter:description" content="${d.description}">` : ''}
              ${d.image ? `<meta name="twitter:image" content="${d.image}">` : ''}
              `

}

function importmap(d) {
    if (!d.importmap) {
        return ''
    }
    return `<script type="importmap">
      {
        "imports": {
          ${Object.entries(d.importmap.imports).map(i => `"${i[0]}": "${i[1]}"`).join(',\n')}        
        }${d.scopes ? `,
        "scopes": {
          ${Object.entries(d.importmap.scopes).map(i => `"${i[0]}": {
              ${Object.entries(i[1]).map(j => `"${j[0]}": "${j[1]}"`).join(',\n')}
          }`).join(',\n')}
        }` : ''}
      }
      </script>
    
    <!-- ES Module Shims: Import maps polyfill for older browsers without import maps support (eg Safari 16.3) -->
    <script async src="https://ga.jspm.io/npm:es-module-shims@1.7.3/dist/es-module-shims.js" crossorigin="anonymous"></script>
  `
    /*
    example:
    "imports": {
            "lit": "https://cdn.jsdelivr.net/npm/lit@2/index.js",
            "lit/": "https://cdn.jsdelivr.net/npm/lit@2/",
            "@material/web/": "https://cdn.jsdelivr.net/npm/@material/web@1.0.0-pre.16/",
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
          */
}

function scripts(d) {
    if (!d.scripts) {
        return ''
    }
    let s = '<script type="module">\n'
    for (let script of d.scripts) {
        s += `import "${script}";\n`
    }
    s += '</script>'
    return s
}