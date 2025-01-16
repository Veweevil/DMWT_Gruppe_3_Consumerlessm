'use client';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { isLoggedIn, logout } = useAuth();  //gibt an ob ein Benutzer angemeldet ist oder nicht

    return (
        <div className="navbar flex items-center justify-between bg-white px-6 py-2 border-b border-gray-200 fixed top-0 left-0 w-full z-50">
            <Link href="/">
                <img className="logo h-6 w-auto" src="/logo.ico" alt="logo" />
            </Link>
            <ul className="menu flex space-x-6">
                <li>
                    <Link href="/" className="text-gray-700 hover:text-black">Home</Link>
                </li>
                <li>
                    <Link href="/#kaufreue-section" className="text-gray-700 hover:text-black">Kaufreue</Link>
                </li>
                <li>
                    <Link href="/#community-section" className="text-gray-700 hover:text-black">Community</Link>
                </li>
                <li>
                    <Link href="/comments" className="text-gray-700 hover:text-black">Erfolge</Link>
                </li>
            </ul>

            <div className="auth-buttons flex space-x-4">
                {!isLoggedIn ? (
                    <>
                        <Link href="/Login">
                            <button className="bg-[#A9D09A] hover:bg-[#90B883] text-gray-800 px-4 py-2 rounded">
                                Login
                            </button>
                        </Link>
                        <Link href="/Register">
                            <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded">
                                Registrieren
                            </button>
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}
