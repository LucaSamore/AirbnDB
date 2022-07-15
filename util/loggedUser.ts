import { prisma } from './db'

export const loggedUser = async () => {
    return await prisma.clienti.findUnique({
        where: {
            Codice: "565b09f5-d735-4c0a-a213-642573f904f0"
        }
    })
}
