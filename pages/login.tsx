import type { NextPage } from 'next'
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title> AirbnDB - Login </title>
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

      <section className="flex flex-col justify-center items-center gap-8 w-1/2 mx-auto mt-16 py-12 bg-dark-mode-2 rounded-2xl">
        <h1 className='text-white font-bold font-quicksand lg:text-4xl md:text-xl'>Accedi a AirbnDB</h1>
        <form action="/api/login" method="post" className="flex flex-col gap-4">

          <label htmlFor="email" className="pl-2 text-white font-quicksand text-lg font-bold">Email</label>
          <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
            <input type="email" placeholder="Inserisci la email" name="email" required className="flex-grow px-5 bg-transparent 
            outline-none text-sm text-white 
            placeolder-gray-400" />
          </div>
          
          <label htmlFor="psw" className="pl-2 text-white font-quicksand text-lg font-bold">Password</label>
          <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
            <input type="password" placeholder="Inserisci la password" name="psw" required className="flex-grow px-5 bg-transparent 
            outline-none text-sm text-white 
            placeolder-gray-400" />
          </div>

          <button type="submit" className="mt-4 px-4 py-2 border-none rounded-full font-bold 
            text-white font-quicksand bg-gradient-to-r 
            from-red-500 to-pink-500 text-lg 
            transition ease-in-out delay-250 
            hover:scale-110">Login</button>
        </form>
      </section>
    </>
  )
}

export default Login
