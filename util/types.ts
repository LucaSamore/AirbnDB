export interface Cliente {
    Codice: string,
    Nome: string,
    Cognome: string,
    DataNascita: Date,
    DataCreazione: Date,
    Email: string,
    Password: string,
    Telefono: string | null,
    CodiceHost: string | null
}

interface Host extends Cliente {
    CodiceCliente: string,
    Biografia: string,
    CoordinateBancarie: string,
    CodiceDocumento: string,
    TipologiaDocumento: string,
    DataScadenzaDocumento: Date,
    LingueParlate: string[]
}

export type DisplayHost = Omit<Host, "Codice" | "CodiceHost" | "CoordinateBancarie" | 
                                     "CodiceDocumento" | "TipologiaDocumento" | "DataScadenzaDocumento">
export interface Recensione {
    CodicePrenotazione: number,
    Descrizione: string,
    VotoPrecisione: number,
    VotoComunicazione: number,
    VotoPosizione: number,
    VotoQualitaPrezzo: number,
    VotoCheckIn: number,
    VotoPulizia: number,
    CodiceAnnuncio: number
}

export interface Luogo {
    CodiceAlloggio: number,
    Via: string,
    Civico: number,
    CAP: string,
    Citta: string,
    Stato: string
}

export interface AnnuncioServizio {
    CodiceAnnuncio: number,
    NomeServizio: string,
    Incluso: boolean
}

export interface AnnuncioRegola {
    CodiceAnnuncio: number,
    CodiceRegola: number,
    Regola: Regola
}

export interface Regola {
    Codice: number,
    Descrizione: string,
    Tipologia: string
}
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