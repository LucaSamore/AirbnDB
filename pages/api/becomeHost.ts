import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const data = JSON.parse(req.body)

    try {

        if((await prisma.host.findFirst({
            where: {
                CodiceCliente: data.id
            }
        })) !== null) {
            res.status(401).send({msg: "Host già presente!"})
        }

        const newHost = await prisma.host.create({
            data: {
                CodiceCliente: data.id,
                Biografia: data.bio,
                CoordinateBancarie: data.iban,
                CodiceDocumento: data.documentId,
                TipologiaDocumento: data.documentType,
                DataScadenzaDocumento: data.documentExpirationDate
            }
        })

        const updatedClient = await prisma.clienti.update({
            where: {
                Codice: data.id
            },
            data: {
                CodiceHost: data.id
            }
        })

        data.languages.forEach(async (l: string) => {
            await prisma.host_lingue.create({
                data: {
                    CodiceHost: data.id,
                    Lingua: l
                }
            })
        })

        res.json({msg: "Host registrato con successo!", data: {...newHost, ...updatedClient}})

    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}
