import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const review = JSON.parse(req.body)

    try {
        const saved = await prisma.recensioni.create({
            data: {
                CodicePrenotazione: review.reservationId,
                Descrizione: review.textReview,
                VotoPrecisione: review.precisionVote,
                VotoComunicazione: review.communicationVote,
                VotoPosizione: review.positionVote,
                VotoQualitaPrezzo: review.qualityCostVote,
                VotoCheckIn: review.checkInVote,
                VotoPulizia: review.cleaningVote,
                CodiceAnnuncio: review.accommodationId
            }
        })

        res.status(200).json({msg: "Recensione salvata con successo!", data: saved})

    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}
