import React from "react";
import type { AnnuncioCard } from "../util/types";
import Link from 'next/link'

const Card: React.FC<AnnuncioCard> = (props: AnnuncioCard) => {
    return (
        <div className="card w-96 bg-dark-mode-3 shadow-xl">
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.Titolo}</h2>
                <p><b>Voto medio:</b> {props.MediaRecensioni.toFixed(1)}</p>
                <p><b>{props.PrezzoPerNotte}€</b> /notte</p>
                <div className="card-actions justify-end">
                    <Link href={`/annunci/${encodeURIComponent(props.CodiceAlloggio)}`}>
                        <button className="btn btn-primary">Esplora</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card