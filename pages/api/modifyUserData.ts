import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../util/db'
import { hashPassword } from '../../util/pws'

const updateName = async (id: string, name: string) => {
    if(name !== "") {
        await prisma.clienti.update({
            where: {
                Codice: id
            },
            data: {
                Nome: name
            }
        })
    }
}

const updateSurname = async (id: string, surname: string) => {
    if(surname !== "") {
        await prisma.clienti.update({
            where: {
                Codice: id
            },
            data: {
                Cognome: surname
            }
        })
    }
}

const updateBirthDate = async (id: string, birthDate: Date) => {
    if(birthDate !== null) {
        await prisma.clienti.update({
            where: {
                Codice: id
            },
            data: {
                DataNascita: birthDate
            }
        })
    }
}

const updateEmail = async (id: string, email: string) => {
    if(email !== "") {
        await prisma.clienti.update({
            where: {
                Codice: id
            },
            data: {
                Email: email
            }
        })
    }
}

const updatePassword= async (id: string, password: string) => {
    if(password !== "") {
        await prisma.clienti.update({
            where: {
                Codice: id
            },
            data: {
                Password: await hashPassword(password)
            }
        })
    }
}

const updatePhoneNumber = async (id: string, phoneNumber: string) => {
    if(phoneNumber !== "") {
        await prisma.clienti.update({
            where: {
                Codice: id
            },
            data: {
                Telefono: phoneNumber
            }
        })
    }
}

const updateBio = async (id: string, bio: string) => {
    if(bio !== "") {
        await prisma.host.update({
            where: {
                CodiceCliente: id
            },
            data: {
                Biografia: bio
            }
        })
    }
}

const updateIban = async (id: string, iban: string) => {
    if(iban !== "") {
        await prisma.host.update({
            where: {
                CodiceCliente: id
            },
            data: {
                CoordinateBancarie: iban
            }
        })
    }
}

const updateTypeOfDocument = async (id: string, typeOfDocument: string) => {
    if(typeOfDocument !== "") {
        await prisma.host.update({
            where: {
                CodiceCliente: id
            },
            data: {
                TipologiaDocumento: typeOfDocument
            }
        })
    }
}

const updateDocumentId = async (id: string, documentId: string) => {
    if(documentId !== "") {
        await prisma.host.update({
            where: {
                CodiceCliente: id
            },
            data: {
                CodiceDocumento: documentId
            }
        })
    }
}

const updateDocumentExpirationDate = async (id: string, documentExpirationDate: Date) => {
    if(documentExpirationDate !== null) {
        await prisma.host.update({
            where: {
                CodiceCliente: id
            },
            data: {
                DataScadenzaDocumento: documentExpirationDate
            }
        })
    }
}

const updateLanguages= async (id: string, languages: string[]) => {
    if(typeof languages !== 'undefined' && languages.length > 0) {
        await prisma.host_lingue.deleteMany({
            where: {
                CodiceHost: id
            }
        })

        languages.forEach(async l => {
            await prisma.host_lingue.create({
                data: {
                    CodiceHost: id,
                    Lingua: l
                }
            })
        })
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body)

  try {

    //HUGE porcata ma hey, ho poco tempo e prisma non è dalla mia parte (¬_¬")

    await updateName(data.Codice, data.Nome)
    await updateSurname(data.Codice, data.Cognome)
    await updateBirthDate(data.Codice, data.DataNascita)
    await updateEmail(data.Codice, data.Email)
    await updatePassword(data.Codice, data.Password)
    await updatePhoneNumber(data.Codice, data.Telefono)
    await updateBio(data.Codice, data.Biografia)
    await updateIban(data.Codice, data.CoordinateBancarie)
    await updateTypeOfDocument(data.Codice, data.TipologiaDocumento)
    await updateDocumentId(data.Codice, data.CodiceDocumento)
    await updateDocumentExpirationDate(data.Codice, data.DataScadenzaDocumento)
    await updateLanguages(data.Codice, data.Lingue)

    res.json({msg: "t'appost fraté"})

  } catch(err) {
    console.error(err)
    res.status(500).send("Internal server error")
  }
}
