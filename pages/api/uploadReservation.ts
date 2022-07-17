import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const reservation = JSON.parse(req.body)

    console.log(reservation.discountCode)

    try {

        const savedReservation = await prisma.prenotazioni.create({
            data: {
                DataInizioSoggiorno: reservation.checkIn,
                DataFineSoggiorno: reservation.checkOut,
                NumeroAdulti: reservation.numberOfAdults,
                NumeroBambini: reservation.numberOfChildren,
                NumeroNeonati: reservation.numberOfInfants,
                NumeroAnimali: reservation.numberOfAnimals,
                CodiceCliente: reservation.clientId,
                CodiceAnnuncio: reservation.accommodationId
            }
        })

        if(reservation.discountCode !== null || reservation.discountCode !== undefined) {
            await prisma.sconti.create({
                data: {
                    Codice: reservation.discountCode.Codice,
                    Percentuale: reservation.discountCode.Percentuale
                }
            })
        }

        const transaction = await prisma.transazioni.create({
            data: {
                CodicePrenotazione: savedReservation.Codice,
                CodiceHost: reservation.hostId,
                Stato: "In corso",
                PrezzoFinale: reservation.totalCost,
                MetodoPagamento: reservation.paymentMethod,
                CodiceSconto: reservation.discountCode.Codice
            }
        })

        res.status(200).json({msg: "Prenotazione salvata con successo!", saved: {...savedReservation, ...transaction}})

    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}
