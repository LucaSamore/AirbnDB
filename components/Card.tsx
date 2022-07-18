import React from "react";
import type { AnnuncioCard } from "../util/types";
import Link from 'next/link'
import { AdvancedImage } from '@cloudinary/react'
import {Cloudinary} from "@cloudinary/url-gen";

const Card: React.FC<AnnuncioCard> = (props: AnnuncioCard) => {

    const cld = new Cloudinary({
        cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        }
    })

    const image = cld.image(props.Immagine)

    return (
        <div className="card w-96 bg-dark-mode-3 shadow-xl">
            <figure><AdvancedImage cldImg={image} /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.Titolo}</h2>
                <p><b>Voto medio:</b> {props.MediaRecensioni?.toFixed(1)}</p>
                <p><b>{props.PrezzoPerNotte}€</b> /notte</p>
                <div className="card-actions justify-end">
                    <Link href={`/annunci/${encodeURIComponent(props.CodiceAlloggio)}`}>
                        <button className="btn btn-primary bg-gradient-to-r from-red-500 to-pink-500 border-none transition ease-in-out delay-250 hover:scale-110">Esplora</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card