
/**
 *
 * litCSS wraps the output in the Lit specific css tag function so it works in Lit components.
 * 
 * 
 */
export function litCSS(s) {
    return new Response(`
    import { css } from 'lit'

    export const styles = css\`
        ${s}
    \``, { headers: { 'Content-Type': 'text/javascript' } })

}