import type { GetServerSideProps, NextPage } from 'next'
import Head from "next/head"
import { prisma } from '../../../util/db'
import { Citta, LoggedUser, Stato } from '../../../util/types'
import SideMenu from '../../../components/SideMenu'
import { loggedUser } from '../../../util/loggedUser'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface PageProps {
    loggedUser: LoggedUser,
    stati: Stato[],
    citta: Citta[]
}

const Upload: NextPage<PageProps> = (props: PageProps) => {
  const [uploadedImages, setUploadedImages] = useState([])

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
    
    acceptedFiles.forEach(async (af: any) => {
        const formData = new FormData()
        formData.append("file", af)
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
        )

        const response = await fetch(url, {
            method: "post",
            body: formData
        })

        const data = await response.json()
        console.log(data)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, multiple: true})

  return (
    <>
        <Head>
            <title> AirbnDB - Crea Annuncio </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>

        <section className="flex flex-row">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-full py-16 px-12 text-white font-quicksand">
                <div className="overflow-x-auto">
                    <table className="table w-11/12">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Componente</th>
                                <th>Valore inserito</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>1</th>
                            <td>Titolo Annuncio</td>
                            <td>
                                <input type="text" placeholder="Titolo annuncio" className="input input-bordered w-full max-w-xs" />
                            </td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Descrizione</td>
                            <td>
                                <textarea className="textarea textarea-bordered w-full" placeholder="Descrizione"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Tipologia Alloggio</td>
                            <td>
                                <select className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>Seleziona</option>
                                    <option>Casa</option>
                                    <option>Stanza privata</option>
                                    <option>Stanza condivisa</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>Via</td>
                            <td>
                                <input type="text" placeholder="Via" className="input input-bordered w-full max-w-xs" />
                            </td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>N. Civico</td>
                            <td>
                                <input type="text" placeholder="Numero Civico" className="input input-bordered w-full max-w-xs" />
                            </td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>CAP</td>
                            <td>
                                <input type="text" placeholder="CAP" className="input input-bordered w-full max-w-xs" />
                            </td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>Città</td>
                            <td>
                                <select className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>Seleziona</option>
                                    {
                                        props.citta.map((citta, key) => {
                                            return(
                                                <option key={key}>{citta.Nome}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>Stato</td>
                            <td>
                                <select className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>Seleziona</option>
                                    {
                                        props.stati.map((stato, key) => {
                                            return(
                                                <option key={key}>{stato.Nome}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>Numero Persone Ospitabili</td>
                            <td>
                                <input type="number" placeholder="Numero Ospiti" className="input input-bordered w-full max-w-xs" min="0" max="16" />
                            </td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>Numero Bagni</td>
                            <td>
                                <input type="number" placeholder="Numero Bagni" className="input input-bordered w-full max-w-xs" min="0" max="16" />
                            </td>
                        </tr>
                        <tr>
                            <th>11</th>
                            <td>Numero Camere Da Letto</td>
                            <td>
                                <input type="number" placeholder="Numero Camere Letto" className="input input-bordered w-full max-w-xs" min="0" max="16" />
                            </td>
                        </tr>
                        <tr>
                            <th>12</th>
                            <td>Numero Letti</td>
                            <td>
                                <input type="number" placeholder="Numero Letti" className="input input-bordered w-full max-w-xs" min="0" max="16" />
                            </td>
                        </tr>
                        <tr>
                            <th>13</th>
                            <td>Prezzo per notte</td>
                            <td>
                                <input type="text" placeholder="Prezzo per notte" className="input input-bordered w-full max-w-xs" />
                            </td>
                        </tr>
                        <tr>
                            <th>14</th>
                            <td>Costo Servizio</td>
                            <td>
                                <input type="text" placeholder="Costo servizio" className="input input-bordered w-full max-w-xs" />
                            </td>
                        </tr>
                        <tr>
                            <th>15</th>
                            <td>Costo Pulizia</td>
                            <td>
                                <input type="text" placeholder="Costo pulizia" className="input input-bordered w-full max-w-xs" />
                            </td>
                        </tr>
                        <tr>
                            <th>16</th>
                            <td>Tasse e costi di soggiorno</td>
                            <td>
                                <input type="text" placeholder="Tasse e costi di soggiorno" className="input input-bordered w-full max-w-xs" />
                            </td>
                        </tr>
                        <tr>
                            <th>17</th>
                            <td>Immagini</td>
                            <td>
                                <div {...getRootProps()} className="w-full border-white border-2 border-dashed rounded-xl py-12 px-6">
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                        <p>Rilascia i file qui...</p> :
                                        <p>Trascina i file o clicca per caricarli</p>
                                    }
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th>18</th>
                            <td>Servizi</td>
                            <td>
                                <label htmlFor="services" className="btn modal-button w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Seleziona Servizi</label>
                                <input type="checkbox" id="services" className="modal-toggle" />
                                <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Seleziona i servizi offerti</h3>
                                    <div className="modal-action">
                                        <label htmlFor="services" className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Conferma</label>
                                    </div>
                                </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th>19</th>
                            <td>Regole</td>
                            <td>
                                <label htmlFor="rules" className="btn modal-button w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none font-quicksand text-white">Seleziona Regole</label>
                                <input type="checkbox" id="rules" className="modal-toggle" />
                                <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Seleziona le regole da rispettare</h3>
                                    <div className="modal-action">
                                        <label htmlFor="rules" className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Conferma</label>
                                    </div>
                                </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td></td>
                            <td>
                            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg 
                            w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none 
                            text-white font-quicksand" onClick={async () => {
                                try {
                                    //const res = await sendData(images)

                                    // if(res) {
                                    //     alert("Immagini inviate con successo!")
                                    // }

                                } catch(err) {
                                    console.error(err)
                                }  
                            }}
                            >Crea Annuncio</button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await loggedUser()
    const countries = await prisma.stati.findMany()
    const cities = await prisma.citta.findMany()

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            stati: countries,
            citta: cities
        }
    }
}

export default Upload