# rend

A Node.js renderer using template literals. The beauty of this is that it's so simple and you can just use standard JavaScript interpolation
and do any kind of JavaScript tricks you want.

## Install

```sh
npm install treeder/rend
```

## Usage

First make a `layout.js` file with two functions, `header()` and `footer()`:

```js
export function header(d) {
  return `<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>My Rad Site</title>
</head>
<body>
    `
}

export function footer(d) {
  return `
    </body>
    </html>
    `
}
```

Then make an `index.js` file with your body content:

```html
<h2>Hello ${d.name}!</h2>
```

Now we send that back in a request.

This is a fastify example, but you can do the same with Express or whatever you like to use. Put the following in `app.js`.

```js
import Fastify from 'fastify'
import { Rend } from 'rend'
import { header, footer } from './views/layout.js'

const fastify = Fastify({
  logger: true
})


let rend = new Rend({ header, footer })

fastify.get('/', async (request, reply) => {
    return rend.send(reply, './views/index.js', {name: 'John Wick'})
})


// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
```

Start it up with `node app.js` and surf to https://localhost:3000. That's it!

## Other functions

### stringify

A little enhancement to JSON.stringify so that it works with HTML attributes. Use this if you want to pass objects into a web or Lit component.

```js
import { stringify } from 'rend'
<my-component something="${stringify(obj)}"></my-component>
```

## Development

To run the example, first install fastify:

```sh
npm i -g fastify-cli
```

then:

```sh
make run
```
