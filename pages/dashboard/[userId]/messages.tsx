import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { DisplayMessaggio, LoggedUser } from '../../../util/types'
import SideMenu from '../../../components/SideMenu'
import { getUserById, getUserMessages } from '../../../util/fetchers'

interface PageProps {
    loggedUser: LoggedUser,
    messages: DisplayMessaggio[]
}

const Messages: NextPage<PageProps> = (props: PageProps) => {
  return (
    <>
        <Head>
            <title> AirbnDB - Messaggi </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 px-12">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-16">Messaggi inviati e ricevuti</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">In questa sezione vengono mostrati tutti i messaggi scambiati con in nostri host. </p>
                </div>

                <div className="flex flex-col w-3/4 mt-8">
                    {
                        props.messages.map((m, key) => {
                            return (
                                <>
                                    <div key={key} className="grid h-auto card bg-dark-mode-2 rounded-box place-items-start pl-8 py-4 mb-6 text-xl">
                                        <div className="flex flex-col font-quicksand text-white gap-2">
                                           <span className="flex gap-4"><p className="font-bold">Contenuto: </p>{m.Contenuto}</span>
                                           <span className="flex gap-4"><p className="font-bold">Inviato/Ricevuto il: </p>{m.DataOra}</span>
                                           <span className="flex gap-4"><p className="font-bold">Host: </p>{m.Nome} {m.Cognome} {`(${m.Email})`}</span>
                                        </div>
                                    </div> 
                                    
                                </>
                            )
                        })
                    }
                </div>


            </section>
        </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
    const user = await loggedUser()
    const messages = (await Promise.all((await getUserMessages(user?.Codice))
        .map(async m => ({
            ...m,
            ...await getUserById(m.Host)
        }))))
        .map(m => ({
            Codice: m.Codice,
            Contenuto: m.Contenuto,
            DataOra: m.DataOra.toISOString()
                            .replace("T", " ")
                            .replace("Z", "")
                            .replace(".000", ""),
            Cliente: m.Cliente,
            Host: m.Host,
            Nome: m.Nome,
            Cognome: m.Cognome,
            Email: m.Email
        }))

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            messages: messages
        }
    }
}

export default Messages