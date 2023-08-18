import { html } from '../../../rend.js'

export class TestComponent {
    constructor(d) {
        this.d = d
    }

    render(d) {
        // types to test
        // let types = [{ name: "I am an object" }]
        let types = ['john', 123, true, this.func1, this.func2, { name: "I am an object" }, undefined, null, NaN, Infinity, -Infinity, 0, -0, 1, -1, 1.1, -1.1, [], [1, 2, 3], {}, { a: 1, b: 2, c: 3 }]

        console.log("TEST COMPONENT RENDER")
        return html`
        <script type="module">
            import '/components/test-client-component.js'
        </script>
        <div class="mb-3">
            <h3>Test html tag function on server and client</h3>

            ${types.map((type) => {
            return html`
            SERVER: ${type}<br>
            CLIENT:
            <test-client-component attr="${type}" attr2="${type}" attr3="${type}"></test-client-component>
            <br><br>
            `
        })}
        </div>
        `
    }

    func1() {
        return `I am from a function`
    }

    func2() {
        return { name: "I am an object from a function" }
    }
}
