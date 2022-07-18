import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { LoggedUser, RandomClient } from '../../../util/types'
import SideMenu from '../../../components/SideMenu'
import { useState } from 'react'
import { getAllNonHostUsers } from '../../../util/fetchers'

interface PageProps {
    loggedUser: LoggedUser,
    randomNonHostUser: RandomClient
}

const sendData = async (data: any) => {
    const res = await fetch('/api/becomeHost', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

const BecomeHost: NextPage<PageProps> = (props: PageProps) => {
  const [bio, setBio] = useState<string>("")
  const [iban, setIban] = useState<string>("")
  const [documentType, setDocumentType] = useState<string>("")
  const [documentId, setDocumentId] = useState<string>("")
  const [documentExpirationDate, setDocumentExpirationDate] = useState<Date>(new Date())

  return (
    <>
        <Head>
            <title> AirbnDB - Diventa Host </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 px-12">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-16">Diventa un host</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">Utente: {props.randomNonHostUser.Nome} {props.randomNonHostUser.Cognome} {props.randomNonHostUser.Email}</p>
                    <p className="font-quicksand text-white text-xl">Inserisci le seguenti informazioni per potenziare il tuo account e diventare membro della host family 🥰 </p>
                </div>
                <div className="overflow-x-auto mt-8">
                    <table className="table no-scrollbar overflow-x-auto w-5/6">
                    <thead>
                        <tr>
                            <th className="bg-dark-mode-2 text-center">Informazione</th>
                            <th className="bg-dark-mode-2 text-center">Valore inserito</th>
                        </tr>
                        </thead>
                        <tbody className="text-white font-quicksand">
                        <tr className="bg-dark-mode-3">
                            <td className="bg-dark-mode-3 text-center">Biografia</td>
                            <td className="bg-dark-mode-3">
                                <textarea required className="textarea textarea-bordered w-3/4 h-28 bg-dark-mode-3" placeholder="Biografia" onChange={(e) => setBio(e.target.value)} ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-dark-mode-3 text-center">Coordinate bancarie</td>
                            <td className="bg-dark-mode-3">
                                <input type="text" required placeholder="IBAN" className="input input-bordered w-3/4 bg-dark-mode-3" onChange={(e) => setIban(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-dark-mode-3 text-center">Tipologia documento</td>
                            <td className="bg-dark-mode-3">
                                <select required className="select select-bordered w-3/4 bg-dark-mode-3" onChange={(e) => setDocumentType(e.target.value)}>
                                    <option disabled selected>Seleziona</option>
                                    <option>Carta d&apos;identità</option>
                                    <option>Patente</option>
                                    <option>Passaporto</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-dark-mode-3 text-center">Codice documento</td>
                            <td className="bg-dark-mode-3">
                                <input type="text" required placeholder="Codice documento" className="input input-bordered w-3/4 bg-dark-mode-3" onChange={(e) => setDocumentId(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-dark-mode-3 text-center">Data scadenza documento</td>
                            <td className="bg-dark-mode-3">
                            <input type="date" name="expiration-date" min="1900-01-01" max="2050-12-31" className="pl-5 border-white bg-transparent text-gray-400 outline-none rounded-full text-sm w-1/2" 
                                onChange={(e) => {
                                    setDocumentExpirationDate(new Date(e.target.value))
                                }
                            }/>
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-dark-mode-3 text-center">Invia dati</td>
                            <td className="bg-dark-mode-3">
                            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg 
                            w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none 
                            text-white font-quicksand" onClick={async () => {
                                try {
                                    await sendData({
                                        id: props.randomNonHostUser.Codice,
                                        bio: bio,
                                        iban: iban,
                                        documentType: documentType,
                                        documentId: documentId,
                                        documentExpirationDate: documentExpirationDate
                                    })

                                } catch(err) {
                                    console.error(err)
                                }  
                            }}
                            >Salva modifiche</button>
                            </td>
                        </tr>
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
    const notYetHost = await getAllNonHostUsers()

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            randomNonHostUser: notYetHost[Math.floor(Math.random() * notYetHost.length)]
        }
    }
}

export default BecomeHost