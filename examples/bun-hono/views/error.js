import { html } from 'rend'

export function render(d) {
    return html`
    <div class="container">
        doh, error, ${d.error}
    </div>
    `
}