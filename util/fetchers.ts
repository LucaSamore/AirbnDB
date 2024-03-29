import { prisma } from './db'

export async function getAccommodation(id: number) {
    return { ...await prisma.annunci.findUnique({
            where: {
                CodiceAlloggio: id
            }
        }),
        ...await prisma.alloggi.findUnique({
            where: {
                Codice: id
            },
            select: {
                Tipologia: true,
                NumeroOspitabili: true,
                NumeroBagni: true,
                NumeroCamereLetto: true,
                NumeroLetti: true
            }
        })
    }
}

export async function getAccommodationHosts(id: number) {
    return await prisma.alloggi.findMany({
        where: {
            Codice: id
        },
        include: {
            possedimenti: {
                include: {
                    host: {
                        include: {
                            host_lingue: true
                        }
                    }
                }
            }
        }
    })
}

export async function getReviews(id: number) {
    const heavyReview = await prisma.recensioni.findMany({
        where: {
            CodiceAnnuncio: id
        },
        include: {
            prenotazioni: {
                include: {
                    clienti: {
                        select: {
                            Nome: true
                        }
                    }
                }
            }
        }
    })

    return heavyReview.map(r => ({
        CodicePrenotazione: r.CodicePrenotazione,
        Descrizione: r.Descrizione,
        VotoPrecisione: r.VotoPrecisione,
        VotoComunicazione: r.VotoComunicazione,
        VotoPosizione: r.VotoPosizione,
        VotoQualitaPrezzo: r.VotoQualitaPrezzo,
        VotoCheckIn: r.VotoCheckIn,
        VotoPulizia: r.VotoPulizia,
        CodiceAnnuncio: r.CodiceAnnuncio,
        NomeCliente: r.prenotazioni.clienti.Nome
    }))
}

export async function getPosition(id: number) {
    return await prisma.luoghi.findUnique({
        where: {
            CodiceAlloggio: id
        }
    })
}

export async function getServices(id: number) {
    return await prisma.annunci_servizi.findMany({
        where: {
            CodiceAnnuncio: id
        }
    })
}

export async function getRules(id: number) {
    return await prisma.annunci_regole.findMany({
        where: {
            CodiceAnnuncio: id
        },
        include: {
            regole: true
        },
    })
}

export async function getAllRules() {
    return await prisma.regole.findMany()
}

export async function getImages(id:number) {
    return await prisma.immagini.findMany({
        where: {
            CodiceAnnuncio: id
        }
    })
}

export async function getLanguages() {
    return await prisma.lingue.findMany()
}

export async function getUserMessages(userId: string | undefined) {

    return await prisma.messaggi.findMany({
        where: {
            Cliente: userId
        },
        orderBy: {
            DataOra: 'desc'
        }
    })
}

export async function getUserReservations(userId: string | undefined) {

    return await prisma.prenotazioni.findMany({
        where: {
            CodiceCliente: userId
        },
        include: {
            transazioni: {
                select: {
                    PrezzoFinale: true,
                    Stato: true,
                    MetodoPagamento: true,
                    CodiceSconto: true
                }
            }
        }
    })

}

export async function getUserById(id: string) {
    return await prisma.clienti.findUnique({
        where: {
            Codice: id,
        },
        select: {
            Nome: true,
            Cognome: true,
            Email: true
        }
    })
}

export async function getPaymentMethods() {
    return await prisma.metodi_pagamento.findMany()
}

export async function getReviewables(userId: string | undefined) {
    return (await prisma.prenotazioni.findMany({
        where: {
            AND: [
                {
                    CodiceCliente: userId
                },
                {
                    DataFineSoggiorno: {
                        lte: new Date()
                    }
                }
            ]
        },
        include: {
            recensioni: true
        }
    })).filter(p => p.recensioni === null)
}

export async function getTitleById(id: number | undefined) {
    if(id === undefined) return

    return await prisma.annunci.findUnique({
        where: {
            CodiceAlloggio: id
        },
        select: {
            Titolo: true
        }
    })
}

export async function getReviewsByUserId(id: string | undefined) {
    return (await prisma.prenotazioni.findMany({
        where: {
            CodiceCliente: id
        },
        include: {
            recensioni: true
        }
    })).filter(p => p.recensioni !== null)
       .map(r => r.recensioni)
}

export async function getAccommodationsByUserId(id: string | undefined) {
    return (await prisma.possedimenti.findMany({
        where: {
            CodiceHost: id
        },
        include: {
            alloggi: {
                select: {
                    Codice: true,
                    Tipologia: true,
                    NumeroOspitabili: true,
                    NumeroBagni: true,
                    NumeroCamereLetto: true,
                    NumeroLetti: true
                }
            }
        }
    })).map(async a => ({
        Codice: a.alloggi.Codice,
        Tipologia: a.alloggi.Tipologia,
        NumeroOspitabili: a.alloggi.NumeroOspitabili,
        NumeroBagni: a.alloggi.NumeroBagni,
        NumeroCamereLetto: a.alloggi.NumeroCamereLetto,
        NumeroLetti: a.alloggi.NumeroLetti,
        Annuncio: (await prisma.annunci.findMany({
            where: {
                CodiceAlloggio: a.CodiceAlloggio
            }
        })).map(a => ({
            CodiceAlloggio: a.CodiceAlloggio,
            Titolo: a.Titolo,
            Descrizione: a.Descrizione,
            Disponibile: a.Disponibile,
            PrezzoPerNotte: a.PrezzoPerNotte.toNumber(),
            CostoServizio: a.CostoServizio.toNumber(),
            CostoPulizia: a.CostoPulizia.toNumber(),
            Tasse: a.Tasse.toNumber()

        }))[0],
        servizi: await prisma.annunci_servizi.findMany({
            where: {
                CodiceAnnuncio: a.CodiceAlloggio
            },
            select: {
                NomeServizio: true,
                Incluso: true
            }
        }),
        serviziNonInclusi: await prisma.annunci_servizi.findMany({
            where: {
                AND: [
                    {
                        CodiceAnnuncio: a.CodiceAlloggio
                    },
                    {
                        Incluso: 0
                    }
                ]
            },
            select: {
                NomeServizio: true,
                Incluso: true
            }
        }),
        regole: (await prisma.annunci_regole.findMany({
            where: {
                CodiceAnnuncio: a.CodiceAlloggio
            },
            include: {
                regole: {
                    include: {
                        tipologie_regola: true
                    }
                }
            }
        })).map(r => ({
            Codice: r.CodiceRegola,
            Descrizione: r.regole.Descrizione,
            Tipologia: r.regole.Tipologia
        })),
        immagini: await prisma.immagini.findMany({
            where: {
                CodiceAnnuncio: a.CodiceAlloggio
            }
        }),
        luogo: await prisma.luoghi.findUnique({
            where: {
                CodiceAlloggio: a.CodiceAlloggio
            },
            select: {
                Via: true,
                Civico: true,
                CAP: true,
                Citta: true,
                Stato: true
            }
        })
    }))
}

export async function getCities() {
    return await prisma.citta.findMany()
}

export async function getCountries() {
    return await prisma.stati.findMany()
}

export async function getAllNonHostUsers() {
    return await prisma.clienti.findMany({
        where: {
            CodiceHost: null
        },
        select: {
            Codice: true,
            Nome: true,
            Cognome: true,
            Email: true
        }
    })
}