import { html, css, LitElement } from 'lit'
// import { styles } from '/css/lit.js' // TODO: reimplement this
import '@material/web/button/filled-button.js'

export class HelloWorld extends LitElement {
  static styles = [
    // styles,
    css`:host { 
      display: block;
       border: 1px solid salmon;
       border-radius: 8px;
       padding: 10px;
     }`
  ]

  static cars = ['Pinto', 'Tesla', 'Ford', 'Chevy']

  static properties = {
    name: { type: String },
    car: { type: String },
  }

  constructor() {
    super()
    this.name = 'World'
    this.car = 'Pinto'
  }

  render() {
    return html`
    <div>
       <div class="blue mb-3">
            I am a reusable client-side component.
        </div>
        <div class="mb-3">
          Hello ${this.name}!<br>
          I drive a ${this.car}
        </div>
        <md-filled-button @click=${this.increment}>Click me</md-filled-button>
    </div>
      `
  }
  increment() {
    this.car = HelloWorld.cars[(HelloWorld.cars.indexOf(this.car) + 1) % HelloWorld.cars.length]
  }
}
customElements.define('hello-world', HelloWorld)
