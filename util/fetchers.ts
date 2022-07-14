import { prisma } from './db'

export async function getAccommodation(id: number) {
    return await prisma.annunci.findUnique({
        where: {
            CodiceAlloggio: id
        },
        include: {
            alloggi: true
        }
    }) 
}

export async function getAccommodationHosts(id: number) {
    return await prisma.alloggi.findMany({
        where: {
            Codice: id
        },
        include: {
            possedimenti: {
                include: {
                    host: {
                        include: {
                            host_lingue: true
                        }
                    }
                }
            }
        }
    })
}

export async function getReviews(id: number) {
    return await prisma.recensioni.findMany({
        where: {
            CodiceAnnuncio: id
        }
    })
}

export async function getPosition(id: number) {
    return await prisma.luoghi.findUnique({
        where: {
            CodiceAlloggio: id
        }
    })
}

export async function getServices(id: number) {
    return await prisma.annunci_servizi.findMany({
        where: {
            CodiceAnnuncio: id
        }
    })
}

export async function getRules(id: number) {
    return await prisma.annunci_regole.findMany({
        where: {
            CodiceAnnuncio: id
        },
        include: {
            regole: true
        },
    })
}

export async function getImages(id:number) {
    return await prisma.immagini.findMany({
        where: {
            CodiceAnnuncio: id
        }
    })
}