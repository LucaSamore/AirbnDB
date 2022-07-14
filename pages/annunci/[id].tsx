import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from "../../components/Header"
import type { GetServerSideProps } from 'next'
import { prisma } from '../../util/db'
import { DisplayHost } from '../../util/types';

interface PageProps {

}

const Annuncio: NextPage<PageProps> = (props: PageProps) => {
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

    const accommodation = await prisma.annunci.findUnique({
        where: {
            CodiceAlloggio: parseInt(id as string)
        },
        include: {
            alloggi: true
        }
    })

    const accomodationHosts = await prisma.alloggi.findMany({
        where: {
            Codice: parseInt(id as string)
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

    const hosts: any[] = await Promise.all(accomodationHosts
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
                }
        })
    })))

    console.log(hosts)

    const reviews = await prisma.recensioni.findMany({
        where: {
            CodiceAnnuncio: parseInt(id as string)
        }
    })

    const position = await prisma.luoghi.findUnique({
        where: {
            CodiceAlloggio: parseInt(id as string)
        }
    })

    const services = await prisma.annunci_servizi.findMany({
        where: {
            CodiceAnnuncio: parseInt(id as string)
        }
    })

    const rules = await prisma.annunci_regole.findMany({
        where: {
            CodiceAnnuncio: parseInt(id as string)
        },
        include: {
            regole: true
        },
    })

    const images = await prisma.immagini.findMany({
        where: {
            CodiceAnnuncio: parseInt(id as string)
        }
    })

    return {
        props: {
            test: null
        }
    }
}

export default Annuncio