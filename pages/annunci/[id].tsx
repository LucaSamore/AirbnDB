import type { NextPage } from 'next'
import { useRouter } from 'next/router'

interface PageProps {

}

const Annuncio: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
        <h1>Bella bro {id}</h1>
    </>
  )
}

export default Annuncio