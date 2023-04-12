import { litter } from '../litter.js'

export default async function plugin(fastify, options) {
    fastify.get('/', async (request, reply) => {
        reply.type('text/html; charset=utf-8')
        return litter('./index.html', {
            fruits: ['apple', 'orange', 'carrot'],
            sports: true,
        })
    })
}
