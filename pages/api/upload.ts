import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'

const findHosts = async (emails: string[]) => {
    const users = await prisma.clienti.findMany()

    return users.filter(u => u.CodiceHost !== null)
                .filter(u => emails.includes(u.Email))
                .map(u => u.Codice)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const toBeSaved = JSON.parse(req.body)

  try {
    const savedStay = await prisma.alloggi.create({
        data: {
            Tipologia: toBeSaved.type,
            NumeroOspitabili: toBeSaved.numberOfGuests,
            NumeroBagni: toBeSaved.numberOfBathrooms,
            NumeroCamereLetto: toBeSaved.numberOfBedrooms,
            NumeroLetti: toBeSaved.numberOfBeds
        }
    })


    const saved = await prisma.annunci.create({
        data: {
            CodiceAlloggio: savedStay.Codice,
            Titolo: toBeSaved.title,
            Descrizione: toBeSaved.description,
            Disponibile: true,
            PrezzoPerNotte: toBeSaved.costPerNight,
            CostoServizio: toBeSaved.serviceCost,
            CostoPulizia: toBeSaved.cleaningCost,
            Tasse: toBeSaved.tax
        }
    });

    (await findHosts([toBeSaved.firstHost, toBeSaved.secondHost, toBeSaved.thirdHost]))
        .forEach(async h => {
            await prisma.possedimenti.create({
                data: {
                    CodiceAlloggio: saved.CodiceAlloggio,
                    CodiceHost: h
                }
            })
        })

    const savedPlace = await prisma.luoghi.create({
        data: {
            CodiceAlloggio: savedStay.Codice,
            Via: toBeSaved.street,
            Civico: toBeSaved.houseNumber,
            CAP: toBeSaved.postalCode,
            Citta: toBeSaved.city,
            Stato: toBeSaved.country
        }
    })

    toBeSaved.rules.forEach(async (r: number) => {
        await prisma.annunci_regole.create({
            data: {
                CodiceAnnuncio: saved.CodiceAlloggio,
                CodiceRegola: r
            }
        })
    })

    toBeSaved.services.forEach(async (s: string) => {
        await prisma.annunci_servizi.create({
            data: {
                CodiceAnnuncio: saved.CodiceAlloggio,
                NomeServizio: s,
                Incluso: true
            }
        })
    })

    toBeSaved.notIncludedServices.forEach(async (s: string) => {
        await prisma.annunci_servizi.create({
            data: {
                CodiceAnnuncio: saved.CodiceAlloggio,
                NomeServizio: s,
                Incluso: false
            }
        })
    })

    toBeSaved.images.forEach(async (i: string) => {
        await prisma.immagini.create({
            data: {
                Percorso: i,
                CodiceAnnuncio: saved.CodiceAlloggio
            }
        })
    })

    res.json({...saved,...savedStay})

  } catch(err) {
    console.error(err)
    res.status(500).send("Internal server error")
  }
}
