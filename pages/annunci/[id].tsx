import type { NextPage } from 'next'
import Head from 'next/head'
import Header from "../../components/Header"
import type { GetServerSideProps } from 'next'
import { prisma } from '../../util/db'
import Review from '../../components/Review'
import { loggedUser } from '../../util/loggedUser'
import { useState } from 'react'
import { 
    AnnuncioAlloggio, 
    AnnuncioRegola, 
    AnnuncioServizio,
    LoggedUser,
    DisplayHost, 
    Luogo, 
    Recensione, 
    MetodoPagamento,
    Sconto
} from '../../util/types'
import {
    getAccommodation,
    getAccommodationHosts,
    getReviews,
    getPosition,
    getServices,
    getRules,
    getImages,
    getPaymentMethods
} from '../../util/fetchers'
import { generateDiscountCode } from '../../util/discount'
import { AdvancedImage } from '@cloudinary/react'
import {Cloudinary} from "@cloudinary/url-gen"
interface PageProps {
    loggedUser: LoggedUser
    accommodation: AnnuncioAlloggio,
    hosts: DisplayHost[],
    reviews: Recensione[],
    position: Luogo,
    services: AnnuncioServizio[],
    rules: AnnuncioRegola[],
    images: string[],
    paymentMethods: MetodoPagamento[]
}

const getTotalCost = (checkIn: Date, checkOut: Date, costPerNight: number) => {

    if(checkIn.getTime() < new Date().getTime() || 
        checkOut.getTime() < new Date().getTime() || 
        checkIn.getTime() >= checkOut.getTime()) {
            return 0
        }

    return ((checkOut.getTime() - checkIn.getTime())/(1000 * 3600 * 24)) * costPerNight
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

const sendReservation = async (data: any) => {
    if(data.totalCost === 0) return false

    const res = await fetch('/api/uploadReservation', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

const Accommodation: NextPage<PageProps> = (props: PageProps) => {
  const [message, setMessage] = useState<string>("")
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(new Date())
  const [numberOfAdults, setNumberOfAdults] = useState<number>(1)
  const [numberOfChildren, setNumberOfChildren] = useState<number>(0)
  const [numberOfInfants, setNumberOfInfants] = useState<number>(0)
  const [numberOfAnimals, setNumberOfAnimals] = useState<number>(0)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [discountCode, setDiscountCode] = useState<Sconto | null>(null)
  const [codes, setCodes] = useState<Sconto[]>(generateDiscountCode(10))

  const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
  })

  const image = cld.image(props.images[0])

  return (
    <>
        <Head>
            <title> AirbnDB - Annuncio </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <Header userId={props.loggedUser.Codice} />

        <section className="flex flex-col gap-4 mx-auto mt-12 w-3/4 items-center">
            <h1 className="text-6xl font-bold text-white font-quicksand p-5">{props.accommodation.Titolo}</h1>
            <AdvancedImage cldImg={image} />

            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow h-auto card bg-dark-mode-2 rounded-box place-items-center pb-4 mr-4">
                    <h3 className="text-2xl text-white font-quicksand font-bold pt-4">Informazioni sull&apos;alloggio</h3>
                    <div className="form-control w-5/6 pb-6">
                        <label className="label">
                            <span className="label-text text-white font-bold text-xl py-2 font-quicksand">Descrizione</span>
                            <span className="label-text text-white text-lg py-2 font-quicksand">{props.accommodation.Descrizione}</span>
                        </label>
                        <label className="label">
                            <span className="label-text text-white font-bold text-xl py-2 font-quicksand">Tipologia alloggio</span>
                            <span className="label-text text-white text-lg py-2 font-quicksand">{props.accommodation.alloggi.Tipologia}</span>
                        </label>
                        <label className="label">
                            <span className="label-text text-white font-bold text-xl py-2 font-quicksand">Indirizzo</span>
                            <span className="label-text text-white text-sm py-2 font-quicksand">{props.position.Via} {props.position.Civico}, {props.position.Citta} {props.position.CAP}, {props.position.Stato}</span>
                        </label>
                        <label className="label">
                            <span className="label-text text-white font-bold text-xl py-2 font-quicksand">Numero persone ospitabili</span>
                            <span className="label-text text-white text-lg py-2 font-quicksand">{props.accommodation.alloggi.NumeroOspitabili}</span>
                        </label>
                        <label className="label">
                            <span className="label-text text-white font-bold text-xl py-2 font-quicksand">Numero bagni</span>
                            <span className="label-text text-white text-lg py-2 font-quicksand">{props.accommodation.alloggi.NumeroBagni}</span>
                        </label>
                        <label className="label">
                            <span className="label-text text-white font-bold text-xl py-2 font-quicksand">Numero camere da letto</span>
                            <span className="label-text text-white text-lg py-2 font-quicksand">{props.accommodation.alloggi.NumeroCamereLetto}</span>
                        </label>
                        <label className="label">
                            <span className="label-text text-white font-bold text-xl py-2 font-quicksand">Numero letti</span>
                            <span className="label-text text-white text-lg py-2 font-quicksand">{props.accommodation.alloggi.NumeroLetti}</span>
                        </label>
                    </div>
                </div> 
                <div className="grid flex-grow h-auto card bg-dark-mode-2 rounded-box place-items-center">
                    <h3 className="text-2xl text-white font-quicksand font-bold pt-4 pb-2">Prenota adesso</h3>
                    <div className="form-control w-5/6 pb-6">
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Check-in</span>
                            <input type="date" name="check-in" min="1900-01-01" max="2050-12-31" className="pl-5 border-white bg-transparent text-gray-400 outline-none rounded-full text-sm w-1/2"
                                onChange={(e) => {
                                    setCheckIn(new Date(e.target.value))
                                }
                            } />
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Check-out</span>
                            <input type="date" name="check-out" min="1900-01-01" max="2050-12-31" className="pl-5 border-white bg-transparent text-gray-400 outline-none rounded-full text-sm w-1/2" 
                                onChange={(e) => {
                                    setCheckOut(new Date(e.target.value))
                                }
                            }/>
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Numero adulti</span>
                            <input type="number" placeholder="Numero adulti" className="input input-bordered w-1/2 bg-dark-mode-3" min="1" max="16" 
                                onChange={(e) => setNumberOfAdults(parseInt(e.target.value))}/>
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Numero bambini</span>
                            <input type="number" placeholder="Numero bambini" className="input input-bordered w-1/2 bg-dark-mode-3" min="0" max="16" 
                                onChange={(e) => setNumberOfChildren(parseInt(e.target.value))}/>
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Numero neonati</span>
                            <input type="number" placeholder="Numero neonati" className="input input-bordered w-1/2 bg-dark-mode-3" min="0" max="16"
                                onChange={(e) => setNumberOfInfants(parseInt(e.target.value))} />
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Numero animali</span>
                            <input type="number" placeholder="Numero animali" className="input input-bordered w-1/2 bg-dark-mode-3" min="0" max="16" 
                                onChange={(e) => setNumberOfAnimals(parseInt(e.target.value))}/>
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Metodo di pagamento</span>
                            <select required className="select select-bordered w-1/2 max-w-xs bg-dark-mode-3" onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option disabled defaultValue={"Seleziona"}>Seleziona</option>
                                    {
                                        props.paymentMethods.map((pm, key) => {
                                            return(
                                                <option key={key}>{pm.Metodo}</option>
                                            )
                                        })
                                    }
                            </select>
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Codice sconto</span>
                            <div className="input-group w-1/2">
                                <input type="text" placeholder="Codice sconto" className="input input-bordered w-full bg-dark-mode-3"
                                    onChange={(e) => {
                                        const el = codes.find(code => code.Codice === e.target.value)
                                        setDiscountCode(el !== undefined ? el : null)
                                    }
                                }/>
                                <label htmlFor="codes" className="btn btn-square modal-button rounded-r-lg bg-gradient-to-r from-red-500 to-pink-500 text-lg border-none hover:border-none">
                                    🤩
                                </label>
                                <input type="checkbox" id="codes" className="modal-toggle" />
                                <label htmlFor="codes" className="modal cursor-pointer">
                                <label className="modal-box relative w-full no-scrollbar overflow-y-auto bg-dark-mode-3 font-quicksand text-white" htmlFor="codes">
                                    <h3 className="text-lg font-bold">Codici sconto DEMO</h3>
                                    {
                                        codes.map((c, key) => {
                                            return(
                                                <div key={key} className="flex">
                                                    <p className="w-3/4 my-4 cursor-text">{c.Codice}</p>
                                                    <button className="btn w-1/4 bg-transparent border-none hover:bg-transparent" onClick={() => navigator.clipboard.writeText(c.Codice)}>COPIA</button>
                                                </div>
                                            )
                                        })
                                    }
                                </label>
                                </label>
                            </div>
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Prezzo finale</span>
                            <span className="label-text text-white text-lg py-2 font-quicksand pr-4">€ {
                                getTotalCost(checkIn, checkOut, props.accommodation.PrezzoPerNotte)
                            }</span>
                        </label>
                        <button className="ml-auto w-1/2 px-6
                         py-3 mt-3 border-none 
                         rounded-lg font-bold text-white 
                         font-quicksand bg-gradient-to-r from-red-500 
                         to-pink-500 text-sm transition 
                         ease-in-out delay-250 hover:scale-110" onClick={async () => {
                            try {
                                const res = await sendReservation({
                                    checkIn: checkIn,
                                    checkOut: checkOut,
                                    numberOfAdults: numberOfAdults,
                                    numberOfChildren: numberOfChildren,
                                    numberOfInfants: numberOfInfants,
                                    numberOfAnimals: numberOfAnimals,
                                    paymentMethod: paymentMethod,
                                    discountCode: discountCode,
                                    totalCost: discountCode === null ? getTotalCost(checkIn, checkOut, props.accommodation.PrezzoPerNotte) 
                                                                    : (getTotalCost(checkIn, checkOut, props.accommodation.PrezzoPerNotte) * ((100 - discountCode.Percentuale) / 100)).toFixed(2),
                                    clientId: props.loggedUser.Codice,
                                    accommodationId: props.accommodation.CodiceAlloggio,
                                    hostId: props.hosts[0].CodiceCliente
                                })

                                if(res) {
                                    alert("Prenotazione inviata con successo!")
                                } else {
                                    alert("Seleziona correttamente le date!")
                                }

                            } catch (err) {
                                console.error(err)
                            }
                         }}>
                                Prenota
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex w-full">
                <div className="grid h-auto flex-grow card bg-dark-mode-2 rounded-box place-items-center mr-4">
                    <div className="overflow-x-auto w-5/6 h-5/6">
                        <table className="table w-full">
                            <thead>
                            <tr>
                            <th className="bg-dark-mode-3">Servizio</th>
                            <th className="bg-dark-mode-3">Incluso</th>
                            </tr>
                            </thead>
                            <tbody className="font-quicksand text-white">
                                {
                                    props.services.map((s, key) => {
                                        return (<tr key={key}>
                                            <td className="bg-dark-mode-4">{s.NomeServizio}</td>
                                            <td className="bg-dark-mode-4">{s.Incluso ? "SI" : "NO"}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid h-auto flex-grow card bg-dark-mode-2 rounded-box place-items-center p-5">
                    <div className="overflow-x-auto w-full mt-4">
                        <table className="table w-full">
                            <thead>
                            <tr>
                            <th className="bg-dark-mode-3">Regola</th>
                            <th className="bg-dark-mode-3">Tipologia</th>
                            </tr>
                            </thead>
                            <tbody className="font-quicksand text-white">
                                {
                                    props.rules
                                        .map(r => r.regole)
                                        .map((r,key) => {
                                            return (
                                                <tr key={key}>
                                                <td className="bg-dark-mode-4">{r.Descrizione}</td>
                                                <td className="bg-dark-mode-4">{r.Tipologia}</td>
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
    const paymentMethods = await getPaymentMethods()

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
            images: images.map(i => i.Percorso),
            paymentMethods: paymentMethods
        }
    }
}

export default Accommodation