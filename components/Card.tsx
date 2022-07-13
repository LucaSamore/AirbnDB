import React from "react";

interface CardProps {
    title: string,
    price: number
}

const Card: React.FC<CardProps> = (props: CardProps) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.title}</h2>
                <p><b>{props.price}€</b> /notte</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Card