import fastify from 'fastify'
import { orgRouter } from './http/controller/orgs/routes'

export const app = fastify()

app.register(orgRouter)
