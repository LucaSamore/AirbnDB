import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { LoggedUser, EditAnnuncio, Citta, Stato, Regola } from '../../../util/types';
import SideMenu from '../../../components/SideMenu'
import { getAccommodationsByUserId, getAllRules, getCities, getCountries } from '../../../util/fetchers'
import EditAccommodationModal from '../../../components/EditAccommodationModal';

interface PageProps {
    loggedUser: LoggedUser,
    accommodations: EditAnnuncio[],
    cities: Citta[],
    countries: Stato[],
    allRules: Regola[]
}

const ModifyAccommodation: NextPage<PageProps> = (props: PageProps) => {
  return (
    <>
        <Head>
            <title> AirbnDB - Modifica Annuncio </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 px-12">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-16">Modifica annunci</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">In questa sezione puoi modificare gli annunci che hai pubblicato.</p>
                </div>
                <div className="overflow-x-auto mt-8">
                    <table className="table no-scrollbar overflow-x-auto w-3/4">
                        <thead>
                            <tr className="text-center">
                                <th className="bg-dark-mode-2">Modifica</th>
                                <th className="bg-dark-mode-2">Titolo</th>
                                <th className="bg-dark-mode-2">Tipologia</th>
                                <th className="bg-dark-mode-2">Numero ospitabili</th>
                                <th className="bg-dark-mode-2">Prezzo per notte</th>
                                <th className="bg-dark-mode-2">Disponibile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.accommodations.map((a, key) => {
                                    return (
                                        <tr key={key} className="text-center">
                                            <th className="bg-dark-mode-3"><EditAccommodationModal loggedUser={props.loggedUser} 
                                                                                                     accommodation={a} 
                                                                                                     cities={props.cities} 
                                                                                                     countries={props.countries}
                                                                                                     allRules={props.allRules} /></th>
                                            <td className="bg-dark-mode-3">{a.Titolo}</td>
                                            <td className="bg-dark-mode-3">{a.Tipologia}</td>
                                            <td className="bg-dark-mode-3">{a.NumeroOspitabili}</td>
                                            <td className="bg-dark-mode-3">€ {a.PrezzoPerNotte}</td>
                                            <td className="bg-dark-mode-3">{a.Disponibile ? "SI" : "NO"}</td>
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
    const accommodations = await Promise.all(await getAccommodationsByUserId(user?.Codice))
    const cities = await getCities()
    const countries = await getCountries()
    const allRules = await getAllRules()

    console.log(allRules)

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            accommodations: accommodations,
            cities: cities,
            countries: countries,
            allRules: allRules
        }
    }
}

export default ModifyAccommodation