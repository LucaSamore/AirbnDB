import React from "react";
import type { AnnuncioCard } from "../util/types";

const Card: React.FC<AnnuncioCard> = (props: AnnuncioCard) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.Titolo}</h2>
                <p><b>Voto medio:</b> {props.MediaRecensioni.toFixed(1)}</p>
                <p><b>{props.PrezzoPerNotte}€</b> /notte</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Esplora</button>
                </div>
            </div>
        </div>
    )
}

export default Card