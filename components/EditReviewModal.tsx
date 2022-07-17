import React from "react";
import { useState } from 'react';
import { DisplayRecensione } from "../util/types";

interface ComponentProps {
    reservation: DisplayRecensione
}

const sendReview = async (data: any) => {
    const res = await fetch('/api/modifyReview', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

const displaySlider = (setState: any, oldValue: number) => {
    return (
        <>
            <input type="range" min="1" max="5" defaultValue={oldValue} contentEditable={true} className="range" step="1" onChange={(e) => setState(parseInt(e.target.value))} />
            <div className="w-full flex justify-between text-xs px-2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
        </>
    )
}

const EditReviewModal: React.FC<ComponentProps> = (props: ComponentProps) => {
    const [textReview, setTextReview] = useState<string>(props.reservation.Descrizione)
    const [precisionVote, setPrecisionVote] = useState<number>(props.reservation.VotoPrecisione)
    const [communicationVote, setCommunicationVote] = useState<number>(props.reservation.VotoComunicazione)
    const [positionVote, setPositionVote] = useState<number>(props.reservation.VotoPosizione)
    const [qualityCostVote, setQualityCostVote] = useState<number>(props.reservation.VotoQualitaPrezzo)
    const [checkInVote, setCheckInVote] = useState<number>(props.reservation.VotoCheckIn)
    const [cleaningVote, setCleaningVote] = useState<number>(props.reservation.VotoPulizia)

    return (
        <>
            <label htmlFor={`modify-review-${props.reservation.CodicePrenotazione}`} className="btn modal-button rounded-full bg-transparent hover:bg-red-500 text-xl border-none">✏</label>

            <input type="checkbox" id={`modify-review-${props.reservation.CodicePrenotazione}`} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box no-scrollbar overflow-y-auto bg-dark-mode-3">
                    <label htmlFor={`modify-review-${props.reservation.CodicePrenotazione}`} className="btn btn-sm btn-circle absolute right-5 top-5 bg-dark-mode-2 border-none">✕</label>
                    <h3 className="font-bold text-2xl py-2 text-white font-quicksand">Modifica recensione</h3>
                    <div className="form-control mt-4">
                        <div className="flex flex-col gap-6 items-start">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Descrizione</span>
                            <textarea required className="textarea textarea-bordered w-full h-32 bg-dark-mode-3" defaultValue={props.reservation.Descrizione} onChange={(e) => setTextReview(e.target.value)} ></textarea>

                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto precisione</span>
                            {displaySlider(setPrecisionVote, props.reservation.VotoPrecisione)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto comunicazione</span>
                            {displaySlider(setCommunicationVote, props.reservation.VotoComunicazione)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto posizione</span>
                            {displaySlider(setPositionVote, props.reservation.VotoPosizione)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto qualità/prezzo</span>
                            {displaySlider(setQualityCostVote, props.reservation.VotoQualitaPrezzo)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto check-in</span>
                            {displaySlider(setCheckInVote, props.reservation.VotoCheckIn)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto pulizia</span>
                            {displaySlider(setCleaningVote, props.reservation.VotoPulizia)}
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor={`modify-review-${props.reservation.CodicePrenotazione}`} className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand"
                            onClick={async () => {
                                try {
                                    const res = await sendReview({
                                        reservationId: props.reservation.CodicePrenotazione,
                                        textReview: textReview,
                                        precisionVote: precisionVote,
                                        communicationVote: communicationVote,
                                        positionVote: positionVote,
                                        qualityCostVote: qualityCostVote,
                                        checkInVote: checkInVote,
                                        cleaningVote: cleaningVote
                                    })

                                    if(res) {
                                        alert("Recensione modificata con successo!")
                                    }
                                } catch(err) {
                                    console.error(err)
                                }
                            }}>MODIFICA</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditReviewModal