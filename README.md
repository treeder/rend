# rend

A JavaScript based renderer using template literals. The beauty of this is that it's so simple and you just use standard JavaScript interpolation
and do any kind of JavaScript tricks you want.

* No builds
* No lock-in
* No proprietary syntax like with other template engines
* Super simple
* Server side rendering
* Client side rendering with standard web components (built into the browser)

The philosophy behind this is based on islands architecture or components architecture where you server side render all the static
things for super fast first contentful paint then you hydrate the dynamic areas with JavaScript to make them usable. 

We use rend for server side and Lit web components for client side.

[DEMO](https://rend-giosppuxqq-uc.a.run.app/)

## Install

```sh
npm install treeder/rend
```

## Usage

First make a `views/layout.js` file with two functions, `header()` and `footer()`:

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

Then make a new JavaScript file for each view, we'll start with `views/index.js`:

```js
export function render(d) {
  return `
    <h2>Hello ${d.name}!</h2>
  `
}
```

Now we can use rend to render our responses.

This is a fastify example, but you can do the same with Express or whatever you like to use. 
Copy the following into a file called `app.js`.

```js
import { Rend } from 'rend'
import { header, footer } from './views/layout.js'

// Initialize Rend with header and footer render functions:
let rend = new Rend({ header, footer })

fastify.get('/', async (request, reply) => {
  // The following will write the response using the template at index.js and the data object with a name key:
  return rend.send(reply, './views/index.js', {name: 'John Wick'})
})
```

To see the full example of this, see [example/app.js](example/app.js).

Start it up with `node app.js` and surf to https://localhost:3000. That's it!

## Server Side Rendering - SSR

The example above is all server side code. If you run it and view it, you'll see it render insanely fast.

Because this is all JavaScript based you can do everything as you normally would in JavaScript. Here's some examples:

#### Loops

Here's how to loop and output:

```js
export function render(d) {
  return `
    <h2>Hello ${d.name}!</h2>
    These are your tasks for today:
    <ul>
      ${d.tasks.map(t) => `<li>${t.name}</li>`}
    </ul>
  `
}
```

#### Conditionals

```js
export function render(d) {
  return `
    <h2>Hello ${d.name ? d.name : 'World'}!</h2>
  `
}
```

## Client Side - Web Components

Web components are standard technology that is now supported in every major browser. This eliminates the need
to use things like React that were created before web components were a thing. Because it's part of the browser 
you'll get better performance and no need for slow build pipelines!

And most of the JavaScript stuff you can do on the server side above, you can do inside your components. 

### Quick example

Copy the following into a file called `hello-world.js`, make sure it's in a publicly accessible folder. 

```js
import {html, css, LitElement} from 'lit'

export class HelloWorld extends LitElement {
  static styles = css`p { color: blue }`

  static properties = {
    name: {type: String},
  }

  constructor() {
    super()
    this.name = 'Somebody'
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`
  }
}
customElements.define('hello-world', HelloWorld)
```

Then in your `render()` function for your view, just need to import and use it:

```js
<script type="module">
    import '/components/hello-world.js'
</script>
<hello-world name="${d.name}"></hello-world>
```

It's that simple! See the [example](example/) app for full example.

### 
I recommend using [Lit](https://lit.dev/), a popular web component library, that makes building web components easy.

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
      this.code = options.code
    }

    get status() {
        return this.code
    }

    toString() {
        return `${this.code} ${this.message}`;
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
