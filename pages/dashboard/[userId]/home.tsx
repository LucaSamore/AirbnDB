import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { LoggedUser } from '../../../util/types'
import SideMenu from '../../../components/SideMenu'

interface PageProps {
    loggedUser: LoggedUser,
}

const Dashboard: NextPage<PageProps> = (props: PageProps) => {
  return (
    <>
        <Head>
            <title> AirbnDB - Dashboard </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 px-12">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-16">Ciao {props.loggedUser.Nome}!</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">In questa sezione dell&apos;applicazione potrai modificare i tuoi dati personali, scrivere o modificare recensioni, visualizzare le prenotazioni e i pagamenti che hai effettuato e tutti i messaggi scambiati con i nostri host.
                        Potrai inoltre potenziare il tuo account come utente host e creare/modificare annunci. </p>
                </div>
            </section>
        </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { id } = context.query
    const user = await loggedUser()

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
        }
    }
}

export default Dashboard