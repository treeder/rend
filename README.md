# rend

A Node.js renderer using template literals. The beauty of this is that it's so simple and you can just use standard JavaScript interpolation
and do any kind of JavaScript tricks you want.

* No builds
* No lock-in
* Super simple
* Server side rendering
* Client side rendering with standard web components (built into the browser)

The philosophy behind this is based on islands architecture or components architecture where you server side render all the static
things for super fast first contentful paint then you hydrate the dynamic areas with JavaScript to make them usable. 

We use rend for server side and Lit web components for client side.

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

```js
export function render(d) {
  return `
    <h2>Hello ${d.name}!</h2>
  `
}
```

Now we send that back in a request.

This is a fastify example, but you can do the same with Express or whatever you like to use. Put the following in `app.js`.

```js
import Fastify from 'fastify'
import { Rend } from 'rend'
import { header, footer } from './views/layout.js'

const fastify = Fastify()

// Initialize Rend with header and footer render functions:
let rend = new Rend({ header, footer })

fastify.get('/', async (request, reply) => {
  // The following will write the response using the template at index.js and the data object with a name key:
  return rend.send(reply, './views/index.js', {name: 'John Wick'})
})

// Start the server
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

## Server Side Rendering - SSR

The example above is all server side code. If you run it and view it, you'll see it renders insanely fast. 

## Web Components

TODO:

* Lit
* Use a component library
* Add a custom component
* Import maps are your best friend for performance and zero builds


## Localization

I recommend using the [Loco](https://github.com/treeder/loco) library as it's very simple and has some really
nice convenience features. The [example](/example) app uses it to show how easy it is.

The very nice thing is that it is Lit compatible you can use @lit/localize and loco with the same language
files. 

TODO: use the same lang file in a web component and on the server.

## Other helpful functions

### stringify - a special version for web components

A little enhancement to JSON.stringify so that it works with HTML attributes. Use this if you want to pass objects into a web or Lit component.

```js
import { stringify } from 'rend'
<my-component something="${stringify(obj)}"></my-component>
```

## Good Practice Guidelines

Here's some things we find useful that make building your apps more consistent. 

### Errors

Use the standard `cause` to wrap errors: 

```js
try {
  something()
} catch (err) {
  throw new Error("New error message", { cause: err })
}
```

Then you can check the cause with `err.cause`.

### API / HTTP Errors

TODO: add this to a lib or rend.

Use the following:

```js
export class HTTPError extends Error {
    constructor(message, options) {
      super(message, options)
      this.status = options.status
    }

    get code() {
        return this.status
    }

    toString() {
        return `${this.status} ${this.message}`;
    }
}
```

## Development

### Codespaces (recommended)

To get everything setup out of the box, simply open this repo in a codespace and run: `make run`.

### Local

Clone this repo.

Setup:

```sh
make install
```

Run:

```sh
make run
```
