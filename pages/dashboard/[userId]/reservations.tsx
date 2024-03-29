import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { loggedUser } from '../../../util/loggedUser'
import { LoggedUser, DisplayPrenotazione } from '../../../util/types';
import SideMenu from '../../../components/SideMenu'
import { getUserReservations } from '../../../util/fetchers'
import EditReservationModal from '../../../components/EditReservationModal';

interface PageProps {
    loggedUser: LoggedUser,
    reservations: DisplayPrenotazione[]
}

const isEditable = (checkInDate: string, paymentState: string) => {
    return (new Date(checkInDate).getTime() > new Date().getTime()) || paymentState !== "Completato"
}

const Reservations: NextPage<PageProps> = (props: PageProps) => {
  return (
    <>
        <Head>
            <title> AirbnDB - Prenotazioni </title>
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
                                            <th className="bg-dark-mode-3">{isEditable(r.DataInizioSoggiorno, r.Transazione[0].Stato) ? <EditReservationModal reservationId={r.Codice} /> : <p>❌</p>}</th>
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