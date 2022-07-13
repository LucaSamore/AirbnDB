import { Prisma } from '@prisma/client'

export interface Stato {
    Nome: string
}

export interface Citta {
    Nome: string
}

const n = new Prisma.Decimal(10)
export interface Annuncio {
    CodiceAlloggio: number,
    Titolo: string,
    Descrizione: string,
    Disponibile: boolean,
    PrezzoPerNotte: number,
    CostoServizio: number,
    CostoPulizia: number,
    Tasse: number
}

export type AnnuncioCard = Pick<Annuncio, "Titolo" | "PrezzoPerNotte">