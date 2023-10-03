import { html, css, LitElement } from 'lit'
import '@material/web/button/filled-button.js'
import state from '/state/state.js'

export class CurrentCar extends LitElement {
  static styles = [
    css``
  ]

  static properties = {
    car: { type: String },
  }

  constructor() {
    super()
    this.car = ''
  }

  connectedCallback() {
    super.connectedCallback()
    state.addEventListener('car', (e) => {
      console.log("car change event:", e.detail)
      this.car = e.detail.value
    })
  }

  render() {
    return html`
    <div>
      ${this.car}
    </div>
      `
  }

}
customElements.define('current-car', CurrentCar)
