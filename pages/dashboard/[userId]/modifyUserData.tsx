import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { Lingua, LoggedUser, PartialUser } from '../../../util/types';
import SideMenu from '../../../components/SideMenu'
import { useState } from 'react'
import { getLanguages } from '../../../util/fetchers'

interface PageProps {
    loggedUser: LoggedUser,
    languages: Lingua[]
}

const sendData = async (data: any) => {
    const res = await fetch('/api/modifyUserData', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

const ModifyData: NextPage<PageProps> = (props: PageProps) => {
  const [name, setName] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [birthDate, setBirthDate] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [Iban, setIBAN] = useState<string>("")
  const [typeOfDocument, setTypeOfDocument] = useState<string>("")
  const [documentId, setDocumentId] = useState<string>("")
  const [documentExpirationDate, setDocumentExpirationDate] = useState<string>("")
  const [selectedLanguages, setSelectedLanguages] = useState<Set<Lingua>>(new Set())

  return (
    <>
        <Head>
            <title> AirbnDB - Dashboard </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 py-16 text-white font-quicksand">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-6">Dati personali</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">Utilizza la tabella sottostante per modificare i tuoi dati. </p>
                </div>
                <div className="overflow-x-auto mt-8">
                    <table className="table w-11/12">
                        <thead>
                            <tr>
                                <th className="bg-dark-mode-2"></th>
                                <th className="bg-dark-mode-2">Informazione</th>
                                <th className="bg-dark-mode-2">Valore inserito</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className="bg-dark-mode-3">1</th>
                            <td className="bg-dark-mode-3">Nome</td>
                            <td className="bg-dark-mode-3">
                                <input type="text" placeholder="Il tuo nome" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setName(e.target.value)} />
                            </td>
                        </tr>
                        <tr className="bg-dark-mode-3">
                            <th className="bg-dark-mode-3">2</th>
                            <td className="bg-dark-mode-3">Cognome</td>
                            <td className="bg-dark-mode-3">
                            <input type="text" placeholder="Il tuo cognome" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setSurname(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">3</th>
                            <td className="bg-dark-mode-3">Data di nascita</td>
                            <td className="bg-dark-mode-3">
                                <input type="date" name="birthDate" min="1900-01-01" max="2022-06-21" className="pl-5 border-white bg-transparent text-gray-400 outline-none rounded-full text-sm" onChange={(e) => setBirthDate(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">4</th>
                            <td className="bg-dark-mode-3">Email</td>
                            <td className="bg-dark-mode-3">
                                <input type="email" placeholder="la tua email" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setEmail(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">5</th>
                            <td className="bg-dark-mode-3">Nuova password</td>
                            <td className="bg-dark-mode-3">
                                <input type="password" placeholder="nuova password" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setPassword(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">6</th>
                            <td className="bg-dark-mode-3">Numero di telefono</td>
                            <td className="bg-dark-mode-3">
                                <input type="text" placeholder="es. +391234567890" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setPhoneNumber(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">7</th>
                            <td className="bg-dark-mode-3">Biografia</td>
                            <td className="bg-dark-mode-3">
                                <textarea className="textarea textarea-bordered w-full bg-dark-mode-3" placeholder="Biografia" onChange={(e) => setBio(e.target.value)} ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">8</th>
                            <td className="bg-dark-mode-3">Coordinate bancarie</td>
                            <td className="bg-dark-mode-3">
                                <input type="text" placeholder="il tuo IBAN" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setIBAN(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">9</th>
                            <td className="bg-dark-mode-3">Tipologia documento</td>
                            <td className="bg-dark-mode-3">
                                <select required className="select select-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setTypeOfDocument(e.target.value)}>
                                    <option disabled selected>Seleziona</option>
                                    <option>Carta di identità</option>
                                    <option>Patente</option>
                                    <option>Passaporto</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">10</th>
                            <td className="bg-dark-mode-3">Codice documento</td>
                            <td className="bg-dark-mode-3">
                                <input required type="text" placeholder="Codice documento" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" onChange={(e) => setDocumentId(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">11</th>
                            <td className="bg-dark-mode-3">Data scadenza documento</td>
                            <td className="bg-dark-mode-3">
                                <input type="date" name="documentExpire" min="1900-01-01" max="2050-12-31" className="pl-5 border-white bg-transparent text-gray-400 outline-none rounded-full text-sm" onChange={(e) => setDocumentExpirationDate(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">12</th>
                            <td className="bg-dark-mode-3">Lingue parlate</td>
                            <td className="bg-dark-mode-3">
                                <label htmlFor="languages" className="btn modal-button w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none font-quicksand text-white">Seleziona lingue</label>
                                <input type="checkbox" id="languages" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box w-full no-scrollbar overflow-y-auto bg-dark-mode-3">
                                        <label htmlFor="languages" className="btn btn-sm btn-circle absolute right-5 top-5 bg-dark-mode-2 border-none">✕</label>
                                        <h3 className="font-bold text-xl py-2">Seleziona le lingue che conosci</h3>
                                        {
                                            props.languages.map((l, key) => {
                                                return (
                                                    <div key={key} className="form-control">
                                                        <label className="cursor-pointer label w-auto max-h-full">
                                                            <span className="label-text text-white text-lg">{l.Nome}</span>
                                                            <input type="checkbox" className="toggle" onClick={() => {
                                                                        const old = selectedLanguages

                                                                        if (old.has(l)) {
                                                                            old.delete(l)
                                                                        } else {
                                                                            old.add(l)
                                                                        }

                                                                        setSelectedLanguages(old)
                                                                    }
                                                                } />
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="modal-action">
                                            <label htmlFor="languages" className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Conferma</label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">13</th>
                            <td className="bg-dark-mode-3">Salva le modifiche apportate</td>
                            <td className="bg-dark-mode-3">
                            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg 
                            w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none 
                            text-white font-quicksand" onClick={async () => {
                                try {
                                    const data = {
                                        Codice: props.loggedUser.Codice,
                                        Nome: name,
                                        Cognome: surname,
                                        DataNascita: new Date(birthDate),
                                        Email: email,
                                        Password: password,
                                        Telefono: phoneNumber,
                                        Biografia: bio,
                                        CoordinateBancarie: Iban,
                                        TipologiaDocumento: typeOfDocument,
                                        CodiceDocumento: documentId,
                                        DataScadenzaDocumento: new Date(documentExpirationDate),
                                        LingueParlate: Array.from(selectedLanguages).map(l => l.Nome)
                                    }

                                    const res = await sendData(data)

                                    if (res) {
                                        alert("Modifiche salvate con successo!")
                                    }

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

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { id } = context.query
    const user = await loggedUser()
    const languages = await getLanguages()

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            languages: languages,
        }
    }
}

export default ModifyData