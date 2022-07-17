import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const reservation = JSON.parse(req.body)

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

        const transaction = await prisma.transazioni.create({
            data: {
                CodicePrenotazione: savedReservation.Codice,
                CodiceHost: reservation.hostId,
                Stato: "Non completato",
                PrezzoFinale: reservation.totalCost,
                MetodoPagamento: reservation.paymentMethod,
                CodiceSconto: reservation.discountCode
            }
        })

        res.status(200).json({msg: "Prenotazione salvata con successo!", saved: {...savedReservation, ...transaction}})

    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}
