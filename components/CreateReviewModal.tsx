import React from "react";
import { useState } from 'react';

interface ComponentProps {
    reservationId: number,
    accommodationId: number
}

const sendReview = async (data: any) => {
    const res = await fetch('/api/review', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

const displaySlider = (setState: any) => {
    return (
        <>
            <input type="range" min="1" max="5" className="range" step="1" onChange={(e) => setState(parseInt(e.target.value))} />
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

const CreateReviewModal: React.FC<ComponentProps> = (props: ComponentProps) => {
    const [textReview, setTextReview] = useState<string>("")
    const [precisionVote, setPrecisionVote] = useState<number>(3)
    const [communicationVote, setCommunicationVote] = useState<number>(3)
    const [positionVote, setPositionVote] = useState<number>(3)
    const [qualityCostVote, setQualityCostVote] = useState<number>(3)
    const [checkInVote, setCheckInVote] = useState<number>(3)
    const [cleaningVote, setCleaningVote] = useState<number>(3)

    return (
        <>
            <label htmlFor={`modify-review-${props.reservationId}`} className="btn modal-button rounded-full bg-transparent hover:bg-red-500 text-xl border-none">✍</label>

            <input type="checkbox" id={`modify-review-${props.reservationId}`} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box no-scrollbar overflow-y-auto bg-dark-mode-3">
                    <label htmlFor={`modify-review-${props.reservationId}`} className="btn btn-sm btn-circle absolute right-5 top-5 bg-dark-mode-2 border-none">✕</label>
                    <h3 className="font-bold text-2xl py-2 text-white font-quicksand">Scrivi una recensione</h3>
                    <div className="form-control mt-4">
                        <div className="flex flex-col gap-6 items-start">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Descrizione</span>
                            <textarea required className="textarea textarea-bordered w-full h-32 bg-dark-mode-3" placeholder="Libera i tuoi pensieri" onChange={(e) => setTextReview(e.target.value)} ></textarea>

                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto precisione</span>
                            {displaySlider(setPrecisionVote)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto comunicazione</span>
                            {displaySlider(setCommunicationVote)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto posizione</span>
                            {displaySlider(setPositionVote)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto qualità/prezzo</span>
                            {displaySlider(setQualityCostVote)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto check-in</span>
                            {displaySlider(setCheckInVote)}
                        
                        
                            <span className="label-text text-white text-lg py-2 font-quicksand">Voto pulizia</span>
                            {displaySlider(setCleaningVote)}
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor={`modify-review-${props.reservationId}`} className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand"
                            onClick={async () => {
                                try {
                                    const res = await sendReview({
                                        reservationId: props.reservationId,
                                        textReview: textReview,
                                        precisionVote: precisionVote,
                                        communicationVote: communicationVote,
                                        positionVote: positionVote,
                                        qualityCostVote: qualityCostVote,
                                        checkInVote: checkInVote,
                                        cleaningVote: cleaningVote,
                                        accommodationId: props.accommodationId
                                    })

                                    if(res) {
                                        alert("Recensione inviata con successo!")
                                    }
                                } catch(err) {
                                    console.error(err)
                                }
                            }}>INVIA</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateReviewModal