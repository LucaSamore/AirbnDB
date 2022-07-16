import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { LoggedUser, DisplayPrenotazione } from '../../../util/types';
import SideMenu from '../../../components/SideMenu'
import { getUserReservations } from '../../../util/fetchers'

interface PageProps {
    loggedUser: LoggedUser,
    reservations: DisplayPrenotazione[]
}

const isEditable = (checkInDate: string, paymentState: string) => {
    return (new Date(checkInDate).getTime() > new Date().getTime()) || paymentState !== "Completato"
}

const showEdit = (reservationId: number) => {
    return (
        <>
            <label htmlFor={`modify-review-${reservationId}`} className="btn modal-button rounded-full bg-transparent hover:bg-red-500 text-xl border-none">✏</label>

            <input type="checkbox" id={`modify-review-${reservationId}`} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box no-scrollbar overflow-y-auto bg-dark-mode-3">
                    <label htmlFor={`modify-review-${reservationId}`} className="btn btn-sm btn-circle absolute right-5 top-5 bg-dark-mode-2 border-none">✕</label>
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
                        <label htmlFor={`modify-review-${reservationId}`} className="btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white font-quicksand">Modifica</label>
                    </div>
                </div>
            </div>
        </>
    )
}

const Reservations: NextPage<PageProps> = (props: PageProps) => {
  return (
    <>
        <Head>
            <title> AirbnDB - Dashboard </title>
            <link rel="icon" href="/airbnDB.ico" />
        </Head>
        <section className="flex flex-row justify-end">
            <SideMenu loggedUser={props.loggedUser}/>
            <section className="basis-3/4 px-12">
                <h1 className="text-white font-bold font-quicksand text-7xl mt-16">Prenotazioni e pagamenti</h1>
                <div className="w-3/4 mt-8">
                    <p className="font-quicksand text-white text-xl">In questa sezione vengono mostrate tutte le prenotazioni effettuate e i relativi pagamenti. </p>
                </div>
                <div className="overflow-x-auto mt-8">
                    <table className="table no-scrollbar overflow-x-auto w-full">
                    <thead>
                        <tr>
                            <th className="bg-dark-mode-2">Modifica</th>
                            <th className="bg-dark-mode-2">Data inizio soggiorno</th>
                            <th className="bg-dark-mode-2">Data fine soggiorno</th>
                            <th className="bg-dark-mode-2">Numero adulti</th>
                            <th className="bg-dark-mode-2">Numero bambini</th>
                            <th className="bg-dark-mode-2">Numero neonati</th>
                            <th className="bg-dark-mode-2">Numero animali</th>
                            <th className="bg-dark-mode-2">Prezzo finale</th>
                            <th className="bg-dark-mode-2">Stato</th>
                            <th className="bg-dark-mode-2">Metodo pagamento</th>
                            <th className="bg-dark-mode-2">Codice sconto</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                props.reservations.map((r, key) => {
                                    return(
                                        <tr key={key} className="text-center">
                                            <th className="bg-dark-mode-3">{!isEditable(r.DataInizioSoggiorno, r.Transazione[0].Stato) ? showEdit(r.Codice) : <p>❌</p>}</th>
                                            <td className="bg-dark-mode-3">{r.DataInizioSoggiorno}</td>
                                            <td className="bg-dark-mode-3">{r.DataFineSoggiorno}</td>
                                            <td className="bg-dark-mode-3">{r.NumeroAdulti}</td>
                                            <td className="bg-dark-mode-3">{r.NumeroBambini}</td>
                                            <td className="bg-dark-mode-3">{r.NumeroNeonati}</td>
                                            <td className="bg-dark-mode-3">{r.NumeroAnimali}</td>
                                            <td className="bg-dark-mode-3">€ {r.Transazione[0].PrezzoFinale}</td>
                                            <td className="bg-dark-mode-3">{r.Transazione[0].Stato}</td>
                                            <td className="bg-dark-mode-3">{r.Transazione[0].MetodoPagamento}</td>
                                            <td className="bg-dark-mode-3">{r.Transazione[0].CodiceSconto ? "SI" : "NO"}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
    const user = await loggedUser()
    const reservations = await getUserReservations(user?.Codice)

    return {
        props: {
            loggedUser: {
                Codice: user?.Codice,
                Nome: user?.Nome,
                Cognome: user?.Cognome,
                Email: user?.Email,
                CodiceHost: user?.CodiceHost
            },
            reservations: reservations.map(r => ({
                Codice: r.Codice,
                DataInizioSoggiorno: r.DataInizioSoggiorno.toISOString()
                                                          .replace("T", " ")
                                                          .replace("Z", "")
                                                          .replace("00:00:00.000", ""),
                DataFineSoggiorno: r.DataFineSoggiorno.toISOString()
                                                      .replace("T", " ")
                                                      .replace("Z", "")
                                                      .replace("00:00:00.000", ""),
                NumeroAdulti: r.NumeroAdulti,
                NumeroBambini: r.NumeroBambini,
                NumeroNeonati: r.NumeroNeonati,
                NumeroAnimali: r.NumeroAnimali,
                Transazione: [{
                    PrezzoFinale: r.transazioni[0].PrezzoFinale.toNumber(),
                    Stato: r.transazioni[0].Stato,
                    MetodoPagamento: r.transazioni[0].MetodoPagamento,
                    CodiceSconto: r.transazioni[0].CodiceSconto
                }]
            }))
        }
    }
}

export default Reservations