export function header(d) {
    return `
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Rend - the no framework framework</title>
  
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  
    <link rel="stylesheet" href="/css/styles.css" />

</head>

<body>
<div class="nav">

</div>
    `
}

export function footer(d) {
    return `
    <div class="footer">
        <div class="container">
            Footer
        </div>
    </div>
    </body>
</html>`
}