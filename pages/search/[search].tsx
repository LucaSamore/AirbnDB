import type { NextPage } from 'next'
import type { GetServerSideProps } from 'next'
import type { AnnuncioCard, LoggedUser } from '../../util/types'
import { prisma } from '../../util/db'
import Head from "next/head"
import Header from "../../components/Header"
import Card from '../../components/Card'
import { loggedUser } from '../../util/loggedUser'
import { getImages } from '../../util/fetchers'

interface PageProps {
  loggedUser: LoggedUser,
  annunci: AnnuncioCard[]
}

const Search: NextPage<PageProps> = (props: PageProps) => {
  return (
    <>
      <Head>
        <title> AirbnDB - Home </title>
        <link rel="icon" href="/airbnDB.ico" />
      </Head>
      <Header userId={props.loggedUser.Codice} />
      <section className="flex flex-col items-center gap-5 mt-12 text-white font-quicksand">
        <h1 className="font-bold text-6xl">Risultati ricerca</h1>

      </section>
      <section className="flex flex-col gap-5 mx-auto mt-12 bg-dark-mode-2 rounded-xl w-3/4">
        <section className="grid lg:grid-cols-3 md:grid-cols-1 justify-items-center gap-6 md:justify-between py-8">
          {
            props.annunci.map((a, key) => {
              return (
                <Card key={key} 
                      CodiceAlloggio={a.CodiceAlloggio}
                      Titolo={a.Titolo} 
                      PrezzoPerNotte={a.PrezzoPerNotte} 
                      MediaRecensioni={a.MediaRecensioni} 
                      Immagine={a.Immagine} />
              )
            })
          }
        </section>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search } = context.query
  const user = await loggedUser()
  const stays = await prisma.annunci.findMany({
    where: {
      Disponibile: 1,
    },
    include: {
      recensioni: true,
    }
  })

  const staysWithAvgReview: AnnuncioCard[] =
    (await Promise.all(stays
         .map(
            async s => ({
              CodiceAlloggio: s.CodiceAlloggio,
              Titolo: s.Titolo,
              PrezzoPerNotte: s.PrezzoPerNotte.toNumber(),
              MediaRecensioni: s.recensioni
                .map(r => ((r.VotoPrecisione +
                            r.VotoComunicazione +
                            r.VotoPosizione +
                            r.VotoQualitaPrezzo +
                            r.VotoCheckIn +
                            r.VotoPulizia)/6))
                .reduce((x,y) => x + y, 0) / s.recensioni.length || 0,
              Immagine: (await getImages(s.CodiceAlloggio)).map(i => i.Percorso)[0]
            })
          ))).sort((s1,s2) => s1.MediaRecensioni < s2.MediaRecensioni ? 1 : -1)

  return {
      props: {
          loggedUser: {
            Codice: user?.Codice,
            Nome: user?.Nome,
            Cognome: user?.Cognome,
            Email: user?.Email,
            CodiceHost: user?.CodiceHost
          },
          annunci: staysWithAvgReview
      }
  }
}

export default Search