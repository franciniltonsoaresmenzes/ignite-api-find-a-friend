import fastify from 'fastify'
import { prisma } from './lib/prisma'

export const app = fastify()

app.get('/orgs', async () => {
  const org = await prisma.orgs.create({
    data: {
      name: 'Francinilton',
      email: 'fran@gmail.com',
      password_hash: 'dafdsfasdfasdfsdf',
      address: 'address',
      cep: '888-00000',
      whatsap_number: '94986568656985',
    },
  })
  return { org }
})

app.get('/pets', async () => {
  const pets = await prisma.pet.create({
    data: {
      orgs_id: 'a2acc577-602e-4450-8058-c74e5f3a5ce1',
      name: 'Bilu',
      description:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      city: 'Seu Cãopanheiro',
      age: 'filhote',
      size: 'pequenino',
      energy: 4,
      levelDependency: 'Baixo (precisa de companhia sempre)',
      habitatProperty: 'Ambiente amplo',
      AdoptionRequirements: {
        create: {
          description: 'Defina um requisito|',
        },
      },
    },
  })

  return { pets }
})
