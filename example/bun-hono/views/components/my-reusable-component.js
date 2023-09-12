import { html } from 'rend'

export class MyReusableComponent {
    constructor(d) {
        this.d = d
    }

    render(d) {
        return html`
        <div style="border: 1px solid blue; border-radius: 8px; padding: 10px;">
            <div class="mb-3">
                I am a reusable server-side component. <span class="blue">Hello ${this.d.name}.</span>
            </div>
            <div class="">
                <!-- This is a client-side web component: -->
                <script type="module">
                    import '/components/hello-world.js'
                </script>
                <hello-world name="${this.d.name}" car="${this.d.car}"></hello-world>
            </div>
        </div>
        `
    }
}
