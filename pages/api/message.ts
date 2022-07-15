import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const messageObj = JSON.parse(req.body)

  try {
    const savedMessage = await prisma.messaggi.create({
        data: {
            Contenuto: messageObj.message,
            DataOra: new Date(),
            Cliente: messageObj.client,
            Host: messageObj.host
        }
      })

      res.json(savedMessage)
  } catch(err) {
    console.error(err)
    res.status(500).send("Internal server error")
  }
}
