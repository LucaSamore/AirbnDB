import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { LoggedUser, EditAnnuncio } from '../../../util/types';
import SideMenu from '../../../components/SideMenu'
import { getAccommodationsByUserId } from '../../../util/fetchers'

interface PageProps {
    loggedUser: LoggedUser,
    accommodations: EditAnnuncio[]
}

const ModifyAccommodation: NextPage<PageProps> = (props: PageProps) => {
  return (
    <>
        <Head>
            <title> AirbnDB - Dashboard </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 px-12">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-16">Modifica annunci</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">In questa sezione puoi modificare gli annunci che hai pubblicato.</p>
                </div>
            </section>
        </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
    const user = await loggedUser()
    const accommodations = await Promise.all(await getAccommodationsByUserId(user?.Codice))
    console.log(accommodations[0])

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            accommodations: accommodations
        }
    }
}

export default ModifyAccommodation