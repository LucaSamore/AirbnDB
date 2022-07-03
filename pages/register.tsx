import type { NextPage } from 'next'
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title> AirbnDB - Crea Account </title>
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

      <section className="flex flex-col justify-center items-center gap-6 w-1/2 mx-auto mt-16 py-12 bg-dark-mode-2 rounded-2xl">
        <h1 className='text-white font-bold font-quicksand lg:text-4xl md:text-xl'>Crea un nuovo account</h1>
        <p className="text-lg font-quicksand text-white">Compila i seguenti campi per creare un nuovo account</p>
        <form action="/api/register" method="post" className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 place-content-evenly">

            <div className="flex flex-col gap-4">
                <label htmlFor="name" className="pl-2 text-white font-quicksand text-lg font-bold">Nome</label>
                <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                    <input type="text" placeholder="Inserisci il nome" name="name" required className="flex-grow px-5 bg-transparent 
                    outline-none text-sm text-white 
                    placeolder-gray-400" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <label htmlFor="email" className="pl-2 text-white font-quicksand text-lg font-bold">Email</label>
                <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                    <input type="email" placeholder="Inserisci la mail" name="email" required className="flex-grow px-5 bg-transparent 
                    outline-none text-sm text-white 
                    placeolder-gray-400" />
                </div>
            </div>

            <div className="flex flex-col gap-4">  
                <label htmlFor="birthDate" className="pl-2 text-white font-quicksand text-lg font-bold">Data di nascita</label>
                <div className="md:border-2 rounded-full py-2 md:shadow-sm">
                    <input type="date" name="birthDate" min="1900-01-01" max="2022-06-21" className="pl-5 border-white bg-transparent text-gray-400 outline-none rounded-full text-sm" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <label htmlFor="surname" className="pl-2 text-white font-quicksand text-lg font-bold">Cognome</label>
                <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                    <input type="text" placeholder="Inserisci il cognome" name="surname" required className="flex-grow px-5 bg-transparent 
                    outline-none text-sm text-white 
                    placeolder-gray-400" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <label htmlFor="password" className="pl-2 text-white font-quicksand text-lg font-bold">Password</label>
                <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                    <input type="password" placeholder="Inserisci la password" name="password" required className="flex-grow px-5 bg-transparent 
                    outline-none text-sm text-white 
                    placeolder-gray-400" />
                </div>
            </div>


            <div className="flex flex-col gap-4">
                <label htmlFor="telephone" className="pl-2 text-white font-quicksand text-lg font-bold">Numero di telefono</label>
                <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                    <input type="tel" placeholder="e.g. +391234567890" name="telephone" className="flex-grow px-5 bg-transparent 
                    outline-none text-sm text-white 
                    placeolder-gray-400" />
                </div>
            </div>

            <div className="flex flex-col gap-4 ">
            </div>

            <div className="flex flex-col gap-4 mt-5">
                <button type="submit" className="px-10 py-2 border-none rounded-full font-bold 
                    text-white font-quicksand bg-gradient-to-r 
                    from-red-500 to-pink-500 text-lg 
                    transition ease-in-out delay-250 
                    hover:scale-110">Registrati</button>
            </div>
        </form>
      </section>
    </>
  )
}

export default Register
