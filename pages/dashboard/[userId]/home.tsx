import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../../components/Header'
import Image from 'next/image'
import { loggedUser } from '../../../util/loggedUser'
import { LoggedUser } from '../../../util/types'

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
        <section className="flex flex-row">
            <div className="drawer drawer-mobile basis-1/4">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div> 
                <div className="drawer-side bg-dark-mode-3">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                    <ul className="menu p-4 overflow-y-auto w-80 text-white font-quicksand text-lg bg-dark-mode-3">
                        <li><a>Diventa Host 🦸‍♂️🦸‍♀️</a></li>
                        <li><a>Modifica i tuoi dati ✍</a></li>
                        <li><a>Crea un annuncio 🔧</a></li>
                        <li><a>Modifica annunci ✍</a></li>
                        <li><a>Prenotazioni e pagamenti 🤑</a></li>
                        <li><a>Messaggi 📫</a></li>
                        <li><Link href="/">Torna alla home 🏠</Link></li>
                    </ul>
                </div>
            </div>
            <section className="basis-3/4 px-12">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-16">Ciao {props.loggedUser.Nome}!</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">In questa sezione dell&apos;applicazione potrai modificare i tuoi dati personali, visualizzare le prenotazioni e i pagamenti che hai effettuato e tutti i messaggi scambiati con i nostri host.
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