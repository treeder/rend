import { html, slot } from '../../rend.js'

export function render(d) {
    return html`
    <div class="container">

        <div style="display: flex; gap: 15px;">

            <div>
                This is an island/slot called "left"<br>
                ${slot('left', d)}
            </div>
            <div>
                This is an island/slot called "right"<br>
                ${slot('right', d)}
            </div>

        </div>

    </div>
`
}
