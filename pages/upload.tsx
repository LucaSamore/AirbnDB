import type { NextPage } from 'next'
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const Upload: NextPage = () => {
  return (
    <>
        <Head>
            <title> AirbnDB - Crea Annuncio </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>

        <header className="flex justify-start py-5 px-10">
            <Link href="/">
            <div className="relative flex items-center h-10 cursor-pointer my-auto transition ease-in-out delay-250 hover:scale-110">
                <Image 
                    src="/logo.svg" 
                    width={100} 
                    height={50} 
                    alt="logo"
                />
            </div>
            </Link>
        </header>

        <section className="flex flex-col gap-8 w-1/2 mx-auto mt-16 py-12">
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Componente</th>
                        <th>Valore inserito</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                    <td>Titolo Annuncio</td>
                    <td>
                        <input type="text" placeholder="Titolo annuncio" className="input input-bordered w-full max-w-xs" />
                    </td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Descrizione</td>
                    <td>
                        <textarea className="textarea textarea-bordered w-4/5" placeholder="Descrizione"></textarea>
                    </td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Tipologia Alloggio</td>
                    <td>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Seleziona</option>
                            <option>Casa</option>
                            <option>Stanza privata</option>
                            <option>Stanza condivisa</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>4</th>
                    <td>Via</td>
                    <td>
                        <input type="text" placeholder="Via" className="input input-bordered w-full max-w-xs" />
                    </td>
                </tr>
                <tr>
                    <th>5</th>
                    <td>N. Civico</td>
                    <td>
                        <input type="text" placeholder="Numero Civico" className="input input-bordered w-full max-w-xs" />
                    </td>
                </tr>
                <tr>
                    <th>6</th>
                    <td>CAP</td>
                    <td>
                        <input type="text" placeholder="CAP" className="input input-bordered w-full max-w-xs" />
                    </td>
                </tr>
                <tr>
                    <th>7</th>
                    <td>Città</td>
                    <td>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Seleziona</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>8</th>
                    <td>Stato</td>
                    <td>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Seleziona</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>9</th>
                    <td>Numero Persone Ospitabili</td>
                    <td>
                        <input type="number" placeholder="Numero Ospiti" className="input input-bordered w-full max-w-xs" min="0" max="16" />
                    </td>
                </tr>
                <tr>
                    <th>10</th>
                    <td>Numero Bagni</td>
                    <td>
                        <input type="number" placeholder="Numero Bagni" className="input input-bordered w-full max-w-xs" min="0" max="16" />
                    </td>
                </tr>
                <tr>
                    <th>11</th>
                    <td>Numero Camere Da Letto</td>
                    <td>
                        <input type="number" placeholder="Numero Camere Letto" className="input input-bordered w-full max-w-xs" min="0" max="16" />
                    </td>
                </tr>
                <tr>
                    <th>12</th>
                    <td>Numero Letti</td>
                    <td>
                        <input type="number" placeholder="Numero Letti" className="input input-bordered w-full max-w-xs" min="0" max="16" />
                    </td>
                </tr>
                <tr>
                    <th>13</th>
                    <td>Prezzo per notte</td>
                    <td>
                        <input type="text" placeholder="Prezzo per notte" className="input input-bordered w-full max-w-xs" />
                    </td>
                </tr>
                <tr>
                    <th>14</th>
                    <td>Costo Servizio</td>
                    <td>
                        <input type="text" placeholder="Costo servizio" className="input input-bordered w-full max-w-xs" />
                    </td>
                </tr>
                <tr>
                    <th>15</th>
                    <td>Costo Pulizia</td>
                    <td>
                        <input type="text" placeholder="Costo pulizia" className="input input-bordered w-full max-w-xs" />
                    </td>
                </tr>
                <tr>
                    <th>16</th>
                    <td>Tasse e costi di soggiorno</td>
                    <td>
                        <input type="text" placeholder="Tasse e costi di soggiorno" className="input input-bordered w-full max-w-xs" />
                    </td>
                </tr>
                <tr>
                    <th>17</th>
                    <td>Immagini</td>
                    <td>

                        <label htmlFor="images" className="btn modal-button w-full">Carica</label>

                        <input type="checkbox" id="images" className="modal-toggle" />
                        <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Carica alcune foto del tuo alloggio</h3>
                            <div className="modal-action">
                                <label htmlFor="images" className="btn">Conferma</label>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th>18</th>
                    <td>Servizi</td>
                    <td>
                        <label htmlFor="services" className="btn modal-button w-full">Seleziona Servizi</label>
                        <input type="checkbox" id="services" className="modal-toggle" />
                        <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Seleziona i servizi offerti</h3>
                            <div className="modal-action">
                                <label htmlFor="services" className="btn">Conferma</label>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th>19</th>
                    <td>Regole</td>
                    <td>
                        <label htmlFor="rules" className="btn modal-button w-full">Seleziona Regole</label>
                        <input type="checkbox" id="rules" className="modal-toggle" />
                        <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Seleziona le regole da rispettare</h3>
                            <div className="modal-action">
                                <label htmlFor="rules" className="btn">Conferma</label>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td></td>
                    <td>
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-full">Crea Annuncio</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        </section>
    </>
  )
}

export default Upload