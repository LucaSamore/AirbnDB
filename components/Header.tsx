import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon } from "@heroicons/react/solid"

interface ComponentProps {
    userId: string
}

const Header: React.FC<ComponentProps> = (props: ComponentProps) => {
    const [search, setSearch] = useState<string>("all")

    return (
        <header className="flex justify-between items-center py-5 px-10 bg-dark-mode-2">
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
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input type="text" placeholder="Inserisci una località" className="flex-grow pl-5 bg-transparent outline-none text-sm text-white placeolder-gray-400" onChange={(e) => setSearch(e.target.value)}/>
                <Link href={`/search/${search}`}>
                    <a>
                        <SearchIcon className="hidden md:inline-flex h-8 text-white rounded-full bg-red-500 p-2 cursor-pointer md:mx-2" />
                    </a>
                </Link>
            </div>
            <div className="flex items-center space-x-2 p-2">
                <Link href="/register">
                    <button className="px-4 py-2 border-none rounded-full font-bold text-white font-quicksand bg-gradient-to-r from-red-500 to-pink-500 text-sm transition ease-in-out delay-250 hover:scale-110">
                        Registrati
                    </button>
                </Link>

                <Link href="/login">
                    <button className="px-4 py-2 border-none rounded-full font-bold text-white font-quicksand bg-gradient-to-r from-red-500 to-pink-500 text-sm transition ease-in-out delay-250 hover:scale-110">
                        Accedi
                    </button>
                </Link>
            </div>
        </header>
    )
}

export default Header