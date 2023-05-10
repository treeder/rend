import { Rend } from '../rend.js'
import { header, footer } from './layout.js'
import { index } from './index.js'

let rend = new Rend({ header, footer })

export default async function plugin(fastify, options) {
    fastify.get('/', async (request, reply) => {
        console.log('rend:', rend)
        return rend.send(reply, index, { name: "John Wick" })
    })
}
