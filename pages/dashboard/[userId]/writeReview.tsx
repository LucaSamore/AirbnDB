import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { LoggedUser, Recensibile } from '../../../util/types';
import SideMenu from '../../../components/SideMenu'
import { getReviewables, getTitleById } from '../../../util/fetchers'
import CreateReviewModal from '../../../components/CreateReviewModal';

interface PageProps {
    loggedUser: LoggedUser,
    reviewables: Recensibile[]
}

const WriteReview: NextPage<PageProps> = (props: PageProps) => {
  return (
    <>
        <Head>
            <title> AirbnDB - Dashboard </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 px-12">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-16">Scrivi recensioni</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">Lascia una recensione per i soggiorni effettuati. </p>
                </div>
                <div className="overflow-x-auto mt-8">
                    <table className="table no-scrollbar overflow-x-auto w-3/4">
                    <thead>
                        <tr className="text-center">
                            <th className="bg-dark-mode-2">Recensione</th>
                            <th className="bg-dark-mode-2">Soggiorno</th>
                            <th className="bg-dark-mode-2">Data inizio soggiorno</th>
                            <th className="bg-dark-mode-2">Data fine soggiorno</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                props.reviewables.map((r, key) => {
                                    return (
                                        <tr key={key} className="text-center">
                                            <th className="bg-dark-mode-3"><CreateReviewModal reservationId={r.CodicePrenotazione} accommodationId={r.CodiceAnnuncio}/></th>
                                            <td className="bg-dark-mode-3">{r.Titolo}</td>
                                            <td className="bg-dark-mode-3">{r.DataInizioSoggiorno}</td>
                                            <td className="bg-dark-mode-3">{r.DataFineSoggiorno}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
    const user = await loggedUser()
    const reviewables = await Promise.all((await getReviewables(user?.Codice)).map(async r => ({
        CodicePrenotazione: r.Codice,
        CodiceAnnuncio: r.CodiceAnnuncio,
        DataInizioSoggiorno: r.DataInizioSoggiorno.toISOString()
                                                  .replace("T", "")
                                                  .replace("Z", "")
                                                  .replace("00:00:00.000", ""),
        DataFineSoggiorno: r.DataFineSoggiorno.toISOString()
                                              .replace("T", " ")
                                              .replace("Z", "")
                                              .replace("00:00:00.000", ""),
        Titolo: (await getTitleById(r.CodiceAnnuncio))?.Titolo
    })))

    console.log(reviewables)

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            reviewables: reviewables
        }
    }
}

export default WriteReview