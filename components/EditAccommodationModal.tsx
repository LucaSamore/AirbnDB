import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AnnuncioServizio, Citta, EditAnnuncio, LoggedUser, Regola, Servizio, Stato, Immagine } from '../util/types';

interface ComponentProps {
    loggedUser: LoggedUser,
    accommodation: EditAnnuncio,
    cities: Citta[],
    countries: Stato[],
    allRules: Regola[]
}

const sendData = async (data: any) => {
    const res = await fetch('/api/modifyAccommodation', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

const EditAccommodationModal: React.FC<ComponentProps> = (props: ComponentProps) => {
    const [available, setAvailable] = useState<boolean>(props.accommodation.Annuncio.Disponibile)
    const [title, setTitle] = useState<string>(props.accommodation.Annuncio.Titolo)
    const [description, setDescription] = useState<string>(props.accommodation.Annuncio.Descrizione)
    const [type, setType] = useState<string>(props.accommodation.Tipologia)
    const [street, setStreet] = useState<string>(props.accommodation.luogo.Via)
    const [houseNumber, setHouseNumber] = useState<number>(props.accommodation.luogo.Civico)
    const [postalCode, setPostalCode] = useState<string>(props.accommodation.luogo.CAP)
    const [city, setCity] = useState<string>(props.accommodation.luogo.Citta)
    const [country, setCountry] = useState<string>(props.accommodation.luogo.Stato)
    const [numberOfGuests, setNumberOfGuests] = useState<number>(props.accommodation.NumeroOspitabili)
    const [numberOfBathrooms, setNumberOfBathrooms] = useState<number>(props.accommodation.NumeroBagni)
    const [numberOfBedrooms, setNumberOfBedrooms] = useState<number>(props.accommodation.NumeroCamereLetto)
    const [numberOfBeds, setNumberOfBeds] = useState<number>(props.accommodation.NumeroLetti)
    const [costPerNight, setCostPerNight] = useState<number>(props.accommodation.Annuncio.PrezzoPerNotte)
    const [serviceCost, setServiceCost] = useState<number>(props.accommodation.Annuncio.CostoServizio)
    const [cleaningCost, setCleaningCost] = useState<number>(props.accommodation.Annuncio.CostoPulizia)
    const [tax, setTax] = useState<number>(props.accommodation.Annuncio.Tasse)
    const [selectedServices, setSelectedServices] = useState<Set<Omit<AnnuncioServizio, "CodiceAnnuncio">>>(new Set(props.accommodation.servizi))
    const [notIncludedServices, setNotIncludedServices] = useState<Set<Omit<AnnuncioServizio, "CodiceAnnuncio">>>(new Set(props.accommodation.serviziNonInclusi))
    const [selectedRules, setSelectedRules] = useState<Set<Regola>>(new Set(props.accommodation.regole))
    const [uploadedImages, setUploadedImages] = useState<any[]>(props.accommodation.immagini)

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
        <label htmlFor={`modify-accommodation-${props.accommodation.Annuncio.CodiceAlloggio}`} className="btn modal-button rounded-full bg-transparent hover:bg-red-500 text-xl border-none">✏</label>

        <input type="checkbox" id={`modify-accommodation-${props.accommodation.Annuncio.CodiceAlloggio}`} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box w-11/12 max-w-2xl no-scrollbar overflow-y-auto bg-dark-mode-3">
                <label htmlFor={`modify-accommodation-${props.accommodation.Annuncio.CodiceAlloggio}`} className="btn btn-sm btn-circle absolute right-5 top-5 bg-dark-mode-2 border-none">✕</label>
                <h3 className="font-bold text-xl py-2 text-white font-quicksand">Modifica annuncio</h3>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Disponibile</span>
                        <input type="checkbox" defaultChecked className="toggle" onClick={() => setAvailable(available ? false : true)}/>
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Titolo</span>
                        <input type="text" required placeholder="Titolo annuncio" className="input input-bordered w-3/4 max-w-xs bg-dark-mode-3" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Descrizione</span>
                        <textarea required className="textarea textarea-bordered w-3/4 bg-dark-mode-3" placeholder="Descrizione" defaultValue={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Tipologia alloggio</span>
                        <select required className="select select-bordered w-3/4 max-w-xs bg-dark-mode-3" defaultValue={type} onChange={(e) => setType(e.target.value)}>
                            <option disabled selected>Seleziona</option>
                            <option>Casa</option>
                            <option>Stanza privata</option>
                            <option>Stanza condivisa</option>
                        </select>
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Via</span>
                        <input required type="text" placeholder="Via" className="input input-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={street} onChange={(e) => setStreet(e.target.value)}/>
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Civico</span>
                        <input required type="number" placeholder="Numero Civico" className="input input-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={houseNumber} onChange={(e) => setHouseNumber(parseInt(e.target.value))} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">CAP</span>
                        <input required type="text" placeholder="CAP" className="input input-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Città</span>
                        <select required className="select select-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={city} onChange={(e) => setCity(e.target.value)}>
                                    <option disabled selected>Seleziona</option>
                                    {
                                        props.cities.map((c, key) => {
                                            return(
                                                <option key={key}>{c.Nome}</option>
                                            )
                                        })
                                    }
                        </select>
                        
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Stato</span>
                        <select required className="select select-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={country} onChange={(e) => setCountry(e.target.value)}>
                                    <option disabled selected>Seleziona</option>
                                    {
                                        props.countries.map((c, key) => {
                                            return(
                                                <option key={key}>{c.Nome}</option>
                                            )
                                        })
                                    }
                        </select>
                        
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Numero ospitabili</span>
                        <input required type="number" placeholder="Numero Ospiti" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" defaultValue={numberOfGuests} onChange={(e) => setNumberOfGuests(parseInt(e.target.value))} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Numero bagni</span>
                        <input required type="number" placeholder="Numero Bagni" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" defaultValue={numberOfBathrooms} onChange={(e) => setNumberOfBathrooms(parseInt(e.target.value))} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Numero camere da letto</span>
                        <input required type="number" placeholder="Numero Camere Letto" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" defaultValue={numberOfBedrooms} onChange={(e) => setNumberOfBedrooms(parseInt(e.target.value))} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Numero letti</span>
                        <input required type="number" placeholder="Numero Letti" className="input input-bordered w-full max-w-xs bg-dark-mode-3" min="0" max="16" defaultValue={numberOfBeds} onChange={(e) => setNumberOfBeds(parseInt(e.target.value))} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Prezzo per notte</span>
                        <input required type="text" placeholder="Prezzo per notte" className="input input-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={costPerNight} onChange={(e) => setCostPerNight(parseFloat(e.target.value) | 0.0)} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Costo servizio</span>
                        <input required type="text" placeholder="Costo servizio" className="input input-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={serviceCost} onChange={(e) => setServiceCost(parseFloat(e.target.value) | 0.0)} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Costo pulizia</span>
                        <input required type="text" placeholder="Costo pulizia" className="input input-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={cleaningCost} onChange={(e) => setCleaningCost(parseFloat(e.target.value) | 0.0)} />
                    </label>
                    <label className="label">
                        <span className="label-text text-white text-lg py-2 font-quicksand">Tasse</span>
                        <input required type="text" placeholder="Tasse e costi di soggiorno" className="input input-bordered w-full max-w-xs bg-dark-mode-3" defaultValue={tax} onChange={(e) => setTax(parseFloat(e.target.value) | 0.0)} />
                    </label>
                    <label className="label">
                        <div className="w-full flex flex-col">
                        {
                            props.accommodation.servizi.map((s, key) => {
                                return(
                                    <label key={key} className="label">
                                        <span className="label-text text-white text-sm py-2 font-quicksand pr-2">{s.NomeServizio}</span>
                                        <input type="checkbox" defaultChecked className="toggle" onClick={() => {
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
                                )
                            })
                        }
                        {
                            props.accommodation.serviziNonInclusi.map((s, key) => {
                                return(
                                    <label key={key} className="label">
                                        <span className=" label-text text-white text-sm py-2 font-quicksand pr-2">{s.NomeServizio}</span>
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
                                )
                            })
                        }
                        </div>
                    </label>
                    <label className="label">
                        <div className="w-full flex flex-col">
                            {
                                props.allRules.map((r, key) => {
                                    return(
                                        <label key={key} className="label">
                                            <span className="label-text text-white text-sm py-2 font-quicksand pr-2">{r.Descrizione}</span>
                                            <input type="checkbox" defaultChecked={props.accommodation.regole.map(r => r.Codice).includes(r.Codice)} className="toggle" onClick={() => {
                                                const old = selectedRules

                                                if (old.has(r)) {
                                                    old.delete(r)
                                                } else {
                                                    old.add(r)
                                                }

                                                setSelectedRules(old)
                                            }}/>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </label>
                    <label className="label">
                        <div {...getRootProps()} className="w-full border-white border-2 border-dashed rounded-xl py-12 px-6">
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                        <p>Rilascia i file qui...</p> :
                                        <p>Trascina le immagini o clicca per caricarle</p>
                                    }
                        </div>
                    </label>
                    
                </div>
                <div className="modal-action">
                    <label htmlFor={`modify-accommodation-${props.accommodation.Annuncio.CodiceAlloggio}`} className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand"
                        onClick={async () => {
                            try {
                                const res = await sendData({
                                    id: props.accommodation.Annuncio.CodiceAlloggio,
                                    available: available,
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
                                    services: Array.from(selectedServices).map(s => s.NomeServizio),
                                    notIncludedServices: Array.from(notIncludedServices).map(s => s.NomeServizio),
                                    rules: Array.from(selectedRules).map(r => r.Codice)
                                })

                                if(res) {
                                    alert("Annuncio modificato con successo!")
                                }

                            } catch(err) {
                                console.error(err)
                            }
                        }}>Modifica</label>
                </div>
            </div>
        </div>
    </>
    )
}

export default EditAccommodationModal

