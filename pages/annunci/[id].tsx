import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from "../../components/Header"
import type { GetServerSideProps } from 'next'
import { prisma } from '../../util/db'
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

}

const Accommodation: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
        <Head>
            <title> AirbnDB - Home </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <Header />

        <section className="flex flex-col gap-5 mx-auto mt-12 bg-dark-mode-2 rounded-xl w-3/4">
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
    
    console.log(hosts)

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