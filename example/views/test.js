import { html } from '../../rend.js'
import { TestComponent } from './components/test-component.js'

export function render(d) {
    return html`
    <div class="container">

        <h1>Rend - the modern JavaScript server-side rendering framework</h1>

        <p>
            Literally use literals for your templates.
        </p>

        <div class="mt-3">
            ${new TestComponent(d)}
        </div>

       
    </div>
`
}
