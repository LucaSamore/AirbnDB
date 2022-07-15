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

export type LoggedUser = Omit<Cliente, "DataCreazione" | "DataNascita" | "Password" | "Telefono">

export type DisplayHost = Pick<Host, "CodiceCliente" | "Biografia" | "LingueParlate" | "Nome" | "Cognome" | "Email">
export interface Recensione {
    CodicePrenotazione: number,
    Descrizione: string,
    VotoPrecisione: number,
    VotoComunicazione: number,
    VotoPosizione: number,
    VotoQualitaPrezzo: number,
    VotoCheckIn: number,
    VotoPulizia: number,
    CodiceAnnuncio: number,
    NomeCliente: string
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

export interface Regola {
    Codice: number,
    Descrizione: string,
    Tipologia: string
}
export interface AnnuncioRegola {
    CodiceAnnuncio: number,
    CodiceRegola: number,
    regole: Regola
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

export interface Alloggio {
    Codice: number,
    Tipologia: string,
    NumeroOspitabili: number,
    NumeroBagni: number,
    NumeroCamereLetto: number,
    NumeroLetti: number
}

export interface AnnuncioAlloggio extends Annuncio {
    alloggi: Alloggio
}

interface AnnuncioConVotoMedio extends Annuncio {
    MediaRecensioni: number
}

export type AnnuncioCard = Pick<AnnuncioConVotoMedio, "CodiceAlloggio" | "Titolo" | "PrezzoPerNotte" | "MediaRecensioni">