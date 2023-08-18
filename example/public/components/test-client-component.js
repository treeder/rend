import { html, css, LitElement } from 'lit'
import { styles } from '/css/lit.js'

export class TestClientComponent extends LitElement {
  static styles = [
    styles,
    css`.wrapper { 
       border: 1px solid salmon;
       border-radius: 8px;
       padding: 10px;
     }`
  ]

  static properties = {
    attr: { type: Object },
    attr2: { type: String },
    attr3: { type: Number },

  }

  constructor() {
    super()
    this.attr = null
    this.attr2 = 'World'
  }
  connectedCallback() {
    super.connectedCallback()
    console.log("TEST CLIENT COMPONENT CONNECTED", this.attr2)

  }

  render() {
    return html`
    <div class="wrapper">
        TEST CLIENT COMPONENT: 1: ${this.attr} 2: ${this.attr2} 3: ${this.attr3}
    </div>
      `
  }
}
customElements.define('test-client-component', TestClientComponent)
