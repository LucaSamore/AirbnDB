export interface Stato {
    Nome: string
}

export interface Citta {
    Nome: string
}

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

interface AnnuncioConVotoMedio extends Annuncio {
    MediaRecensioni: number
}

export type AnnuncioCard = Pick<AnnuncioConVotoMedio, "CodiceAlloggio" | "Titolo" | "PrezzoPerNotte" | "MediaRecensioni">