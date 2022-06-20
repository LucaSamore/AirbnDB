import React from "react";
import Image from "next/image"
import Link from "next/link"

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center py-5 px-10 bg-gray-800">
            <Link href="/">
                <button>
                    <Image src="/logo.svg" width={100} height={50} alt="airbnb logo" />
                </button>
            </Link>

            <input type="text" placeholder="Cerca un alloggio" className="py-2 text-center outline-none border-none rounded-full font-quicksand placeholder:text-center"/>
            
            <div className="grid grid-cols-2 gap-4">
                <Link href="/register">
                    <button className="px-4 py-2 border-none rounded-full font-bold text-white font-quicksand bg-gradient-to-r from-red-500 to-pink-500">
                        Registrati
                    </button>
                </Link>

                <Link href="/login">
                    <button className="border-none rounded-full font-bold text-white font-quicksand bg-gradient-to-r from-red-500 to-pink-500">
                        Accedi
                    </button>
                </Link>
            </div>
            
        </header>
    )
}

export default Header