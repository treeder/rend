import { html } from 'rend'
import { MyReusableComponent } from './components/my-reusable-component.js'

export function render(d) {
    return html`
    <div class="container">

        <h1>Rend - the modern JavaScript server-side rendering framework</h1>

        <p>
            Literally use literals for your templates.
        </p>
        <p>
            I am ${d.name}
        </p>

        <h2>Reusable components</h2>

        <h3>Server-side components</h3>
        <div class="mt-3">
            ${new MyReusableComponent(d)}
        </div>

        <h3>Client-side components</h3>
        <div class="mt-3">
            This is a client-side web component:
        </div>
        <div class="mt-3">
            <script type="module">
                import '/components/hello-world.js'
            </script>
            <hello-world name="${d.name}"></hello-world>
        </div>

        <h2>Localization</h2>
        <p>
            This is using the loco library to localize to spanish: ${d.greeting}
        </p>

    </div>
`
}
