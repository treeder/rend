// This is for hosting the final app (ie: outside fastify cli)

console.log("Starting up server")

import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})

import appService from './app.js'
fastify.register(appService)

// Run the server!
let port = process.env.PORT || 3000;

fastify.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})
