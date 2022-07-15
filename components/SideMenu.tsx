import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LoggedUser } from '../util/types'

interface ComponentProps {
    loggedUser: LoggedUser
}

const SideMenu: React.FC<ComponentProps> = (props: ComponentProps) => {
    return (
        <div className="drawer drawer-mobile basis-1/4 fixed">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side bg-dark-mode-3">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 pt-16 overflow-y-auto w-80 text-white font-quicksand text-lg bg-dark-mode-3 min-h-full">
                    <Image 
                            src="/logo.svg" 
                            width={100} 
                            height={50} 
                            alt="logo"
                    />
                    <li className="mt-24"><a>Diventa Host 🦸‍♂️🦸‍♀️</a></li>
                    <li><a>Modifica i tuoi dati ✍</a></li>
                    <li><Link href={`/dashboard/${props.loggedUser.Codice}/upload`}>Crea un annuncio 🔧</Link></li>
                    <li><a>Modifica annunci ✍</a></li>
                    <li><a>Prenotazioni e pagamenti 🤑</a></li>
                    <li><a>Messaggi 📫</a></li>
                    <li><Link href="/">Torna alla home 🏠</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default SideMenu