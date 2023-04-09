import { litter } from './litter.js'

export default async function plugin(fastify, options) {
    fastify.get('/', async (request, reply) => {
        reply.type('text/html; charset=utf-8')
        return litter('./template.html', {
            eat: ['apple', 'orange', 'carrot'],
            sport: true,
        })
    })
}
