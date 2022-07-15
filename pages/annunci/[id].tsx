import type { NextPage } from 'next'
import Head from 'next/head'
import Header from "../../components/Header"
import type { GetServerSideProps } from 'next'
import { prisma } from '../../util/db'
import Review from '../../components/Review'
import { loggedUser } from '../../util/loggedUser';
import { useState } from 'react'
import { 
    AnnuncioAlloggio, 
    AnnuncioRegola, 
    AnnuncioServizio,
    LoggedUser,
    DisplayHost, 
    Luogo, 
    Recensione 
} from '../../util/types'
import {
    getAccommodation,
    getAccommodationHosts,
    getReviews,
    getPosition,
    getServices,
    getRules,
    getImages
} from '../../util/fetchers'

interface PageProps {
    loggedUser: LoggedUser
    accommodation: AnnuncioAlloggio,
    hosts: DisplayHost[],
    reviews: Recensione[],
    position: Luogo,
    services: AnnuncioServizio[],
    rules: AnnuncioRegola[],
    images: string[]
}

const sendMessage = async (message: string, clientId: string, hostId: string) => {
    const res = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
            message: message,
            client: clientId,
            host: hostId
        })
    })

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

const Accommodation: NextPage<PageProps> = (props: PageProps) => {
  const [message, setMessage] = useState<string>("")

  return (
    <>
        <Head>
            <title> AirbnDB - Annuncio </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <Header />

        <section className="flex flex-col gap-4 mx-auto mt-12 w-3/4 items-center">
            <h1 className="text-6xl font-bold text-white font-quicksand p-5">{props.accommodation.Titolo}</h1>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://placeimg.com/800/200/arch" className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn btn-circle">❮</a> 
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://placeimg.com/800/200/arch" className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle">❮</a> 
                                <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://placeimg.com/800/200/arch" className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle">❮</a> 
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                </div> 
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://placeimg.com/800/200/arch" className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-circle">❮</a> 
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                </div>
            </div>

            <div className="grid card bg-dark-mode-2 rounded-box place-items-center w-full p-8">
                <h2 className="text-4xl font-bold text-white font-quicksand">Descrizione</h2>
                <p className="text-xl text-white font-quicksand mt-6">{props.accommodation.Descrizione}</p>
            </div>

            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow h-auto card bg-dark-mode-2 rounded-box place-items-center pb-4">
                    <h3 className="text-2xl text-white font-quicksand font-bold pt-4 pb-2">Info alloggio</h3>
                    <div className="flex flex-col justify-between gap-2 p-2 font-quicksand">
                        <div className="flex gap-4 text-xl">
                            <p className="font-bold">Tipologia alloggio:</p>
                            <p>{props.accommodation.alloggi.Tipologia}</p>
                        </div>
                        <div className="flex gap-4 text-lg">
                            <p className="font-bold">Numero persone ospitabili:</p>
                            <p>{props.accommodation.alloggi.NumeroOspitabili}</p>
                        </div>
                        <div className="flex gap-4 text-lg">
                            <p className="font-bold">Numero bagni:</p>
                            <p>{props.accommodation.alloggi.NumeroBagni}</p>
                        </div>
                        <div className="flex gap-4 text-lg">
                            <p className="font-bold">Numero camere da letto:</p>
                            <p>{props.accommodation.alloggi.NumeroCamereLetto}</p>
                        </div>
                        <div className="flex gap-4 text-lg">
                            <p className="font-bold">Numero letti:</p>
                            <p>{props.accommodation.alloggi.NumeroLetti}</p>
                        </div>
                    </div>
                </div> 
                <div className="divider lg:divider-horizontal"></div> 
                <div className="grid flex-grow h-32 card bg-dark-mode-2 rounded-box place-items-center">content</div>
            </div>

            <div className="flex w-full">
                <div className="grid h-auto flex-grow card bg-dark-mode-2 rounded-box place-items-center p-5">
                    <h3 className="text-2xl text-white font-quicksand font-bold">Servizi</h3>
                    <div className="overflow-x-auto w-3/4 mt-4 h-5/6">
                        <table className="table w-full">
                            <thead>
                            <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Incluso</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    props.services.map((s, key) => {
                                        return (<tr key={key}>
                                            <th>{key+1}</th>
                                            <td>{s.NomeServizio}</td>
                                            <td>{s.Incluso ? "SI" : "NO"}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-auto flex-grow card bg-dark-mode-2 rounded-box place-items-center p-5">
                    <h3 className="text-2xl text-white font-quicksand font-bold">Regole</h3>
                    <div className="overflow-x-auto w-5/6 mt-4">
                        <table className="table w-full">
                            <thead>
                            <tr>
                            <th></th>
                            <th>Descrizione</th>
                            <th>Tipologia</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    props.rules
                                        .map(r => r.regole)
                                        .map((r,key) => {
                                            return (
                                                <tr key={key}>
                                                <th>{key+1}</th>
                                                <td>{r.Descrizione}</td>
                                                <td>{r.Tipologia}</td>
                                                </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid card bg-dark-mode-2 rounded-box place-items-center w-full p-8">
                <h2 className="text-4xl font-bold text-white font-quicksand">Riguardo agli host</h2>

                <div className="flex lg:flex-row sm:flex-col justify-around gap-6 mt-6">
                    {props.hosts.map((h,key) => {
                        return (
                            <div key={key} className="card w-auto bg-dark-mode-3 shadow-xl font-quicksand text-white p-4">
                                <div className="card-body">
                                    <h2 className="card-title">{h.Nome} {h.Cognome}</h2>
                                    <p>{h.Biografia}</p>
                                    <p><b>Contatto:</b> {h.Email}</p>
                                    <p><b>Lingue parlate:</b></p>
                                    <ul>
                                        {h.LingueParlate.map((l,key) => {
                                            return (<li key={key}>{l}</li>)
                                        })}
                                    </ul>
                                </div>
                                <label htmlFor={`${h.CodiceCliente}`} className="btn modal-button bg-gradient-to-r from-red-500 to-pink-500 border-none
                                 transition ease-in-out delay-250 hover:scale-105 text-white font-bold">Contatta</label>
                                <input type="checkbox" id={`${h.CodiceCliente}`} className="modal-toggle" />
                                <div className="modal">
                                <div className="modal-box h-1/2 bg-dark-mode-2">
                                    <label htmlFor={`${h.CodiceCliente}`} className="btn btn-sm btn-circle absolute right-2 top-2 bg-dark-mode-2 border-none">✕</label>
                                    <h3 className="font-bold text-lg">Invia un messagio a {h.Nome} {h.Cognome}</h3>
                                    <textarea className="textarea textarea-bordered p-5 w-full mt-6 h-2/3 bg-dark-mode-2" 
                                              placeholder="Messaggio"
                                              onChange={e => setMessage(e.target.value)}>
                                    </textarea>
                                    <div className="modal-action">

                                    <button className="px-6 py-3 mt-3 border-none rounded-lg font-bold text-white font-quicksand bg-gradient-to-r from-red-500 to-pink-500 text-sm transition ease-in-out delay-250 hover:scale-110"
                                            onClick={
                                                async () => {
                                                    try {
                                                        const res = await sendMessage(message, props.loggedUser.Codice, h.CodiceCliente)

                                                        if(res) {
                                                            alert("Messaggio inviato con successo!")
                                                        }

                                                    } catch(err) {
                                                        console.error(err)
                                                    }  
                                                }                                   
                                            }>
                                        INVIA
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="grid card bg-dark-mode-2 rounded-box place-items-center w-full p-8">
                <h2 className="text-4xl font-bold text-white font-quicksand">Recensioni</h2>
                <section className="flex lg:flex-row md:flex-col sm: flex-col gap-10 mt-6">
                    {
                        props.reviews.map((r,key) => {
                            return(
                                <Review key={key} review={r}/>
                            )
                        })
                    }
                </section>
            </div>
        </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { id } = context.query
    const user = await loggedUser()
    const accommodation = await getAccommodation(parseInt(id as string))
    const accommodationHosts = await getAccommodationHosts(parseInt(id as string))
    const reviews = await getReviews(parseInt(id as string))
    const position = await getPosition(parseInt(id as string))
    const services = await getServices(parseInt(id as string))
    const rules = await getRules(parseInt(id as string))
    const images = await getImages(parseInt(id as string))

    const hosts: any[] = await Promise.all(accommodationHosts
        .flatMap(ah => ah.possedimenti)
        .flatMap(p => p.host)
        .map(h => ({
            CodiceCliente: h.CodiceCliente,
            Biografia: h.Biografia,
            LingueParlate: h.host_lingue.map(l => l.Lingua)
        }))
        .map(async (h) => ({
            ...h,
            ...await prisma.clienti.findUnique({
                where: {
                    Codice: h.CodiceCliente
                },
                select: {
                    Nome: true,
                    Cognome: true,
                    Email: true
                }
        })
    })))

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            accommodation: {
                CodiceAlloggio: accommodation?.CodiceAlloggio,
                PrezzoPerNotte: accommodation?.PrezzoPerNotte.toNumber(),
                CostoPulizia: accommodation?.CostoPulizia.toNumber(),
                CostoServizio: accommodation?.CostoServizio.toNumber(),
                Descrizione: accommodation?.Descrizione,
                Disponibile: accommodation?.Disponibile,
                Titolo: accommodation?.Titolo,
                Tasse: accommodation?.Tasse.toNumber(),
                alloggi: accommodation?.alloggi
            },
            hosts: hosts,
            reviews: reviews,
            position: position,
            services: services,
            rules: rules,
            images: images
        }
    }
}

export default Accommodation