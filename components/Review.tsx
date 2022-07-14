import React from "react";
import { Recensione } from "../util/types";

interface PageProps {
    review: Recensione
}

const calculateAverage = (review: Recensione): string => {
    return ((review.VotoPrecisione +
        review.VotoComunicazione +
        review.VotoPosizione +
        review.VotoQualitaPrezzo +
        review.VotoCheckIn +
        review.VotoPulizia)/6).toFixed(1)
}

const displayStars = (howMany: number) => {
    return (
        <div className="rating">
            {
                [...Array(howMany)].map((n, key) => <input key={key} 
                                                           type="radio" 
                                                           name="rating-2" 
                                                           className="mask mask-star-2 bg-orange-400" 
                                                           disabled/>)
            }
        </div>
    )
}

const Review: React.FC<PageProps> = (props: PageProps) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl font-quicksand text-white">
            <div className="card-body">
                <h2 className="card-title">{props.review.NomeCliente}</h2>
                <p>{props.review.Descrizione}</p>
                <div className="flex flex-col justify-between">
                    <div className="flex justify-between">
                        <p>Votazione media</p>
                        {calculateAverage(props.review)}
                    </div>

                    <div className="flex justify-between">
                        <p>Pulizia</p>
                        {displayStars(props.review.VotoPulizia)}
                    </div>

                    <div className="flex justify-between">
                        <p>Comunicazione</p>
                        {displayStars(props.review.VotoComunicazione)}
                    </div>

                    <div className="flex justify-between">
                        <p>Check-in</p>
                        {displayStars(props.review.VotoCheckIn)}
                    </div>

                    <div className="flex justify-between">
                        <p>Precisione</p>
                        {displayStars(props.review.VotoPrecisione)}
                    </div>

                    <div className="flex justify-between">
                        <p>Posizione</p>
                        {displayStars(props.review.VotoPosizione)}
                    </div>

                    <div className="flex justify-between">
                        <p>Qualità/prezzo</p>
                        {displayStars(props.review.VotoQualitaPrezzo)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review