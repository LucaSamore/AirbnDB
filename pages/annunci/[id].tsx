import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from "../../components/Header"
import type { GetServerSideProps } from 'next'
import { prisma } from '../../util/db'
import { AnnuncioAlloggio, AnnuncioRegola, AnnuncioServizio, DisplayHost, Luogo, Recensione } from '../../util/types'
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
    accommodation: AnnuncioAlloggio,
    hosts: DisplayHost[],
    reviews: Recensione[],
    position: Luogo,
    services: AnnuncioServizio[],
    rules: AnnuncioRegola[],
    images: string[]
}

const Accommodation: NextPage<PageProps> = (props: PageProps) => {
    console.log(props.rules)
    console.log(props.rules.flatMap(r => r.CodiceRegola))
  return (
    <>
        <Head>
            <title> AirbnDB - Home </title>
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

            <div className="grid card bg-base-300 rounded-box place-items-center w-full p-8">
                <h2 className="text-4xl font-bold text-white font-quicksand">Descrizione</h2>
                <p className="text-xl text-white font-quicksand mt-6">{props.accommodation.Descrizione}</p>
            </div>

            <div className="flex w-full">
                <div className="grid h-auto flex-grow card bg-base-300 rounded-box place-items-center p-5">
                    <h3 className="text-2xl text-white font-quicksand">Servizi</h3>
                    <div className="overflow-x-auto w-3/4 mt-4">
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
                <div className="grid h-auto flex-grow card bg-base-300 rounded-box place-items-center p-5">
                    <h3 className="text-2xl text-white font-quicksand">Regole</h3>
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
        </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { id } = context.query

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