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
    </>
  )
}

export default Home
