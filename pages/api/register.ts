import type { NextApiRequest, NextApiResponse } from 'next'
import { validateEmail, validatePassword, validatePhoneNumber } from '../../util/validate'
import { hashPassword } from '../../util/pws'
import { prisma } from '../../util/db';
import { v4 as uuid } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method !== 'POST') {
        res.status(401).send("Unauthorized")
    }

    if(validateEmail(req.body.email) === null || 
       validatePassword(req.body.password) === null) {
        res.status(403).send("Email o password non valida!")
    }

    try {
        await prisma.clienti.create({
            data: {
                Codice: uuid(),
                Nome: req.body.name,
                Cognome: req.body.surname,
                DataNascita: new Date(req.body.birthDate),
                DataCreazione: new Date(),
                Email: req.body.email,
                Password: await hashPassword(req.body.password),
                Telefono: req.body.phoneNumber && validatePhoneNumber(req.body.phoneNumber) ? req.body.phoneNumber : null,
                CodiceHost: null
            }
        })

        res.redirect('/')
        
    } catch(err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}
