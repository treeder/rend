# litter

A Node.js renderer using template literals.

## Install

```sh
npm install treeder/litter
```

## Usage

This is a fastify example, but you can do the same with Express or whatever you like to use.

Make an `index.html` file:

```html
<h2>${d.name}</h2>
```

Then make your server:

```js
import Fastify from 'fastify'
import {litter} from 'litter'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
    reply.type('text/html; charset=utf-8')
    return litter('./index.html', {
        name: 'John Wick'
    })
})

/**
 * Run the server!
 */
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

That's it!

### Includes

To include other files, you can use the special include function in your HTML file:

```html
${i.include('header.html')}
```

For a working example, see [example/](example/).

## Development

To run the example, first install fastify:

```sh
npm i -g fastify-cli
```

then:

```sh
make run
```
