import type { NextPage } from 'next'
import Head from "next/head"
import Header from "../components/Header"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title> AirbnDB - Home </title>
        <link rel="icon" href="/airbnDB.ico" />
      </Head>
      <Header />
      <section className="flex flex-col items-center gap-5 mt-12 text-white font-quicksand">
        <h1 className="font-bold text-6xl">Benvenuto su AirbnDB</h1>
        <p className="text-xl">Questa applicazione è stata realizzata come progetto per il corso di Basi di Dati.</p>
        <p className="text-xl"> Per favore, non usarla seriamente! :)</p>
      </section>
      <section className="flex flex-col gap-5 mx-auto mt-12 bg-dark-mode-2 rounded-xl w-3/4">
        <h2 className="px-16 pt-12 font-quicksand font-bold text-4xl text-white">Travel like a human</h2>
        <p className="px-16 pb-12 font-quicksand text-xl text-white">Ecco gli alloggi maggiormente apprezzati dai nostri utenti</p>
      </section>
    </>
  )
}

export default Home
