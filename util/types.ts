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

export type PartialUser = Partial<Host>

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

export interface Servizio {
    Nome: string
}

export interface Lingua {
    Nome: string
}

export interface DisplayMessaggio {
    Codice: number,
    Contenuto: string,
    DataOra: string,
    Cliente: string,
    Host: string,
    Nome: string,
    Cognome: string,
    Email: string
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

export interface DisplayTransazione {
    PrezzoFinale: number,
    Stato: string,
    MetodoPagamento: string,
    CodiceSconto: string | null | undefined
}

export interface DisplayPrenotazione {
    Codice: number,
    DataInizioSoggiorno: string,
    DataFineSoggiorno: string,
    NumeroAdulti: number,
    NumeroBambini: number,
    NumeroNeonati: number,
    NumeroAnimali: number,
    Transazione: DisplayTransazione[]
}

export interface MetodoPagamento {
    Metodo: string
}