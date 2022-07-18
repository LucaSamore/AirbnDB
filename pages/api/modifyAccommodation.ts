import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const data = JSON.parse(req.body)

    try {
      const updatedStay = await prisma.alloggi.update({
        where:{
          Codice: data.id
        },
        data: {
          Tipologia: data.type,
          NumeroOspitabili: data.numberOfGuests,
          NumeroBagni: data.numberOfBathrooms,
          NumeroCamereLetto: data.numberOfBedrooms,
          NumeroLetti: data.numberOfBeds
        }
      })

      const updatedAccommodation = await prisma.annunci.update({
        where: {
          CodiceAlloggio: data.id
        },
        data: {
          Titolo: data.title,
          Descrizione: data.description,
          Disponibile: data.available,
          PrezzoPerNotte: data.costPerNight,
          CostoServizio: data.serviceCost,
          CostoPulizia: data.cleaningCost,
          Tasse: data.tax
        }
      })

      const updatedPlace = await prisma.luoghi.update({
        where: {
          CodiceAlloggio: data.id
        },
        data: {
          Via: data.street,
          Civico: data.houseNumber,
          CAP: data.postalCode,
          Citta: data.city,
          Stato: data.country
        }
      })

      data.services.forEach(async (s: string) => {
        await prisma.$queryRaw`UPDATE annunci_servizi SET Incluso = ${true} WHERE CodiceAnnuncio = ${data.id} AND NomeServizio = ${s}`
      })

      data.notIncludedServices.forEach(async (s: string) => {
        await prisma.$queryRaw`UPDATE annunci_servizi SET Incluso = ${false} WHERE CodiceAnnuncio = ${data.id} AND NomeServizio = ${s}`
      })

      await prisma.$queryRaw`DELETE FROM annunci_regole WHERE CodiceAnnuncio = ${data.id}`

      data.rules.forEach(async (r: number) => {
        await prisma.annunci_regole.create({
          data: {
            CodiceAnnuncio: data.id,
            CodiceRegola: r
          }
        })
      })

      if(!data.images.every((i: any) => i === null)) {
        data.images.forEach(async (i: string) => {
          await prisma.$queryRaw`UPDATE immagini SET Percorso = ${i} WHERE CodiceAnnuncio = ${data.id}`
        })
      }

      res.status(200).json({...updatedStay, ...updatedAccommodation, ...updatedPlace})

    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}
