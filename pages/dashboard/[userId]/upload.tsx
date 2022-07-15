import type { GetServerSideProps, NextPage } from 'next'
import Head from "next/head"
import { prisma } from '../../../util/db'
import { Citta, LoggedUser, Regola, Servizio, Stato } from '../../../util/types'
import SideMenu from '../../../components/SideMenu'
import { loggedUser } from '../../../util/loggedUser'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface PageProps {
    loggedUser: LoggedUser,
    stati: Stato[],
    citta: Citta[],
    servizi: Servizio[],
    regole: Regola[]
}

const sendData = async (data: any) => {
    const res = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

const Upload: NextPage<PageProps> = (props: PageProps) => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [houseNumber, setHouseNumber] = useState<number>(0)
  const [postalCode, setPostalCode] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1)
  const [numberOfBathrooms, setNumberOfBathrooms] = useState<number>(0)
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<number>(0)
  const [numberOfBeds, setNumberOfBeds] = useState<number>(0)
  const [costPerNight, setCostPerNight] = useState<number>(0.0)
  const [serviceCost, setServiceCost] = useState<number>(0.0)
  const [cleaningCost, setCleaningCost] = useState<number>(0.0)
  const [tax, setTax] = useState<number>(0.0)
  const [selectedServices, setSelectedServices] = useState<Set<Servizio>>(new Set())
  const [notIncludedServices, setNotIncludedServices] = useState<Set<Servizio>>(new Set(props.servizi))
  const [selectedRules, setSelectedRules] = useState<Set<Regola>>(new Set())
  const [firstHost, setFirstHost] = useState<string>("")
  const [secondHost, setSecondHost] = useState<string>("")
  const [thirdHost, setThirdHost] = useState<string>("")
  const [uploadedImages, setUploadedImages] = useState<any[]>([])

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

        setUploadedImages((old: any) => [...old, data])
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, multiple: true})

  return (
    <>
        <Head>
            <title> AirbnDB - Crea Annuncio </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>

        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 py-16 text-white font-quicksand">
                <div className="overflow-x-auto">
                    <table className="table w-11/12">
                        <thead>
                            <tr>
                                <th className="bg-dark-mode-2"></th>
                                <th className="bg-dark-mode-2">Componente</th>
                                <th className="bg-dark-mode-2">Valore inserito</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className="bg-dark-mode-3">1</th>
                            <td className="bg-dark-mode-3">Titolo Annuncio</td>
                            <td className="bg-dark-mode-3">
                                <input type="text" required placeholder="Titolo annuncio" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setTitle(e.target.value)} />
                            </td>
                        </tr>
                        <tr className="bg-dark-mode-3">
                            <th className="bg-dark-mode-3">2</th>
                            <td className="bg-dark-mode-3">Descrizione</td>
                            <td className="bg-dark-mode-3">
                                <textarea required className="textarea textarea-bordered w-full bg-dark-mode-3" placeholder="Descrizione" onChange={(e) => setDescription(e.target.value)} ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">3</th>
                            <td className="bg-dark-mode-3">Tipologia Alloggio</td>
                            <td className="bg-dark-mode-3">
                                <select required className="select select-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setType(e.target.value)}>
                                    <option disabled selected>Seleziona</option>
                                    <option>Casa</option>
                                    <option>Stanza privata</option>
                                    <option>Stanza condivisa</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">4</th>
                            <td className="bg-dark-mode-3">Via</td>
                            <td className="bg-dark-mode-3">
                                <input required type="text" placeholder="Via" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setStreet(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">5</th>
                            <td className="bg-dark-mode-3">N. Civico</td>
                            <td className="bg-dark-mode-3">
                                <input required type="number" placeholder="Numero Civico" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setHouseNumber(parseInt(e.target.value))} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">6</th>
                            <td className="bg-dark-mode-3">CAP</td>
                            <td className="bg-dark-mode-3">
                                <input required type="text" placeholder="CAP" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setPostalCode(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">7</th>
                            <td className="bg-dark-mode-3">Città</td>
                            <td className="bg-dark-mode-3">
                                <select required className="select select-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setCity(e.target.value)}>
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
                            <th className="bg-dark-mode-3">8</th>
                            <td className="bg-dark-mode-3">Stato</td>
                            <td className="bg-dark-mode-3">
                                <select required className="select select-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setCountry(e.target.value)}>
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
                            <th className="bg-dark-mode-3">9</th>
                            <td className="bg-dark-mode-3">Numero Persone Ospitabili</td>
                            <td className="bg-dark-mode-3">
                                <input required type="number" placeholder="Numero Ospiti" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" onChange={(e) => setNumberOfGuests(parseInt(e.target.value))} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">10</th>
                            <td className="bg-dark-mode-3">Numero Bagni</td>
                            <td className="bg-dark-mode-3">
                                <input required type="number" placeholder="Numero Bagni" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" onChange={(e) => setNumberOfBathrooms(parseInt(e.target.value))} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">11</th>
                            <td className="bg-dark-mode-3">Numero Camere Da Letto</td>
                            <td className="bg-dark-mode-3">
                                <input required type="number" placeholder="Numero Camere Letto" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" onChange={(e) => setNumberOfBedrooms(parseInt(e.target.value))} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">12</th>
                            <td className="bg-dark-mode-3">Numero Letti</td>
                            <td className="bg-dark-mode-3">
                                <input required type="number" placeholder="Numero Letti" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" onChange={(e) => setNumberOfBeds(parseInt(e.target.value))} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">13</th>
                            <td className="bg-dark-mode-3">Prezzo per notte</td>
                            <td className="bg-dark-mode-3">
                                <input required type="text" placeholder="Prezzo per notte" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setCostPerNight(parseFloat(e.target.value) | 0.0)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">14</th>
                            <td className="bg-dark-mode-3">Costo Servizio</td>
                            <td className="bg-dark-mode-3">
                                <input required type="text" placeholder="Costo servizio" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setServiceCost(parseFloat(e.target.value) | 0.0)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">15</th>
                            <td className="bg-dark-mode-3">Costo Pulizia</td>
                            <td className="bg-dark-mode-3">
                                <input required type="text" placeholder="Costo pulizia" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setCleaningCost(parseFloat(e.target.value) | 0.0)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">16</th>
                            <td className="bg-dark-mode-3">Tasse e costi di soggiorno</td>
                            <td className="bg-dark-mode-3">
                                <input required type="text" placeholder="Tasse e costi di soggiorno" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setTax(parseFloat(e.target.value) | 0.0)} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-dark-mode-3">17</th>
                            <td className="bg-dark-mode-3">Immagini</td>
                            <td className="bg-dark-mode-3">
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
                            <th className="bg-dark-mode-3">18</th>
                            <td className="bg-dark-mode-3">Servizi</td>
                            <td className="bg-dark-mode-3">
                                <label htmlFor="services" className="btn modal-button w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Seleziona Servizi</label>
                                <input type="checkbox" id="services" className="modal-toggle" />
                                <div className="modal w-auto">
                                    <div className="modal-box w-full no-scrollbar overflow-y-auto bg-dark-mode-3">
                                        <label htmlFor="services" className="btn btn-sm btn-circle absolute right-5 top-5 bg-dark-mode-2 border-none">✕</label>
                                        <h3 className="font-bold text-xl py-2">Seleziona i servizi offerti</h3>
                                        {
                                            props.servizi.map((s, key) => {
                                                return (
                                                    <div key={key} className="form-control">
                                                        <label className="cursor-pointer label">
                                                            <span className="label-text text-white text-lg py-2">{s.Nome}</span>
                                                            <input type="checkbox" className="toggle" onClick={() => {
                                                                const old = selectedServices
                                                                const oldNotIncluded = notIncludedServices

                                                                if(old.has(s)) {
                                                                    old.delete(s)
                                                                    oldNotIncluded.add(s)
                                                                } else {
                                                                    old.add(s)
                                                                    oldNotIncluded.delete(s)
                                                                }

                                                                setSelectedServices(old)
                                                                setNotIncludedServices(oldNotIncluded)
                                                            }}/>
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="modal-action">
                                            <label htmlFor="services" className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Conferma</label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th className="bg-dark-mode-3">19</th>
                            <td className="bg-dark-mode-3">Regole</td>
                            <td className="bg-dark-mode-3">
                                <label htmlFor="rules" className="btn modal-button w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none font-quicksand text-white">Seleziona Regole</label>
                                <input type="checkbox" id="rules" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl bg-dark-mode-3">
                                        <label htmlFor="rules" className="btn btn-sm btn-circle absolute right-5 top-5 bg-dark-mode-2 border-none">✕</label>
                                        <h3 className="font-bold text-xl py-2">Seleziona le regole da rispettare</h3>
                                        {
                                            props.regole.map((r, key) => {
                                                return (
                                                    <div key={key} className="form-control">
                                                        <label className="cursor-pointer label w-auto max-h-full">
                                                            <span className="label-text text-white text-lg">{r.Descrizione}</span>
                                                            <input type="checkbox" className="toggle" onClick={() => {
                                                                        const old = selectedRules

                                                                        if (old.has(r)) {
                                                                            old.delete(r)
                                                                        } else {
                                                                            old.add(r)
                                                                        }

                                                                        setSelectedRules(old)
                                                                    }
                                                                } />
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="modal-action">
                                            <label htmlFor="rules" className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Conferma</label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <th className="bg-dark-mode-3">20</th>
                            <td className="bg-dark-mode-3">Host e co-host</td>
                            <td className="flex flex-col gap-4 bg-dark-mode-3">
                                <input type="email" required placeholder="Email host 1" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setFirstHost(e.target.value)} />
                                <input type="email" placeholder="Email host 2" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setSecondHost(e.target.value)} />
                                <input type="email" placeholder="Email host 3" className="input input-bordered w-full max-w-xs bg-dark-mode-3" onChange={(e) => setThirdHost(e.target.value)} />
                            </td>
                        <tr>
                            <th className="bg-dark-mode-3"></th>
                            <td className="bg-dark-mode-3"></td>
                            <td className="bg-dark-mode-3">
                            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg 
                            w-1/2 bg-gradient-to-r from-red-500 to-pink-500 border-none 
                            text-white font-quicksand" onClick={async () => {
                                try {
                                    const res = await sendData({
                                        title: title,
                                        description: description,
                                        type: type,
                                        street: street,
                                        houseNumber: houseNumber,
                                        postalCode: postalCode,
                                        city: city,
                                        country: country,
                                        numberOfGuests: numberOfGuests,
                                        numberOfBathrooms: numberOfBathrooms,
                                        numberOfBedrooms: numberOfBedrooms,
                                        numberOfBeds: numberOfBeds,
                                        costPerNight: costPerNight,
                                        serviceCost: serviceCost,
                                        cleaningCost: cleaningCost,
                                        tax: tax,
                                        images: uploadedImages.map(i => i.public_id),
                                        services: Array.from(selectedServices).map(s => s.Nome),
                                        notIncludedServices: Array.from(notIncludedServices).map(s => s.Nome),
                                        rules: Array.from(selectedRules).map(r => r.Codice),
                                        firstHost: firstHost,
                                        secondHost: secondHost,
                                        thirdHost: thirdHost
                                    })

                                    if(res) {
                                        alert("Annuncio creato con successo!")
                                    }
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
    const services = await prisma.servizi.findMany()
    const rules = await prisma.regole.findMany()

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
            citta: cities,
            servizi: services,
            regole: rules
        }
    }
}

export default Upload