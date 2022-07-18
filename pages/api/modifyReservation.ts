import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const data = JSON.parse(req.body)

    if((new Date(data.checkIn).getTime() <= new Date().getTime() || 
        new Date(data.checkOut).getTime() <= new Date().getTime() || 
        new Date(data.checkIn).getTime() >= new Date(data.checkOut).getTime()) || 
        data.adults <= 0) {
            res.status(400).json({ message: 'Bad Request' })
    }

    try {
        const saved = await prisma.prenotazioni.update({
            where: {
                Codice: data.id
            },
            data: {
                DataInizioSoggiorno: data.checkIn,
                DataFineSoggiorno: data.checkOut,
                NumeroAdulti: data.adults,
                NumeroBambini: data.children,
                NumeroNeonati: data.infants,
                NumeroAnimali: data.animals
            }
        })

        res.status(200).json({saved: saved})
         
    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}
