import React from "react";

interface ComponentProps {
    reservationId: number
}

const EditReservationModal: React.FC<ComponentProps> = (props: ComponentProps) => {
    return (
        <>
            <label htmlFor={`modify-review-${props.reservationId}`} className="btn modal-button rounded-full bg-transparent hover:bg-red-500 text-xl border-none">✏</label>

            <input type="checkbox" id={`modify-review-${props.reservationId}`} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box no-scrollbar overflow-y-auto bg-dark-mode-3">
                    <label htmlFor={`modify-review-${props.reservationId}`} className="btn btn-sm btn-circle absolute right-5 top-5 bg-dark-mode-2 border-none">✕</label>
                    <h3 className="font-bold text-xl py-2 text-white font-quicksand">Modifica prenotazione</h3>
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Data inizio soggiorno</span>
                            <input type="date" name="check-in" min="1900-01-01" max="2050-12-31" className="pl-5 border-white bg-transparent text-gray-400 outline-none rounded-full text-sm w-1/2" />
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Data fine soggiorno</span>
                            <input type="date" name="check-out" min="1900-01-01" max="2050-12-31" className="pl-5 border-white bg-transparent text-gray-400 outline-none rounded-full text-sm w-1/2" />
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Numero adulti</span>
                            <input type="number" placeholder="Numero adulti" className="input input-bordered w-1/2 bg-dark-mode-3" min="0" max="16" />
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Numero bambini</span>
                            <input type="number" placeholder="Numero bambini" className="input input-bordered w-1/2 bg-dark-mode-3" min="0" max="16" />
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Numero neonati</span>
                            <input type="number" placeholder="Numero neonati" className="input input-bordered w-1/2 bg-dark-mode-3" min="0" max="16" />
                        </label>
                        <label className="label">
                            <span className="label-text text-white text-lg py-2 font-quicksand">Numero animali</span>
                            <input type="number" placeholder="Numero animali" className="input input-bordered w-1/2 bg-dark-mode-3" min="0" max="16" />
                        </label>
                    </div>
                    <div className="modal-action">
                        <label htmlFor={`modify-review-${props.reservationId}`} className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Modifica</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditReservationModal