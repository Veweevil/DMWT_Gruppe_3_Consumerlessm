'use client';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function Header() {
    const { isLoggedIn, logout } = useAuth(); // Zugriff auf Login-Status und Logout-Funktion
    const [isPublic, setIsPublic] = useState(true); // Zustand für den Öffentlich/Nicht-öffentlich-Switch

    const toggleVisibility = () => {
        setIsPublic((prev) => !prev);
        // Optional: Hier kannst du eine API oder Funktion hinzufügen, um den Status zu speichern.
    };

    return (
        <div className="navbar flex items-center justify-between bg-white px-6 py-2 border-b border-gray-200 fixed top-0 left-0 w-full z-50">
            {/* Logo */}
            <Link href="/">
                <img className="logo h-6 w-auto" src="/logo.ico" alt="logo" />
            </Link>

            {/* Navigation */}
            <ul className="menu flex space-x-6">
                <li>
                    <Link href="/" className="text-gray-700 hover:text-black">Home</Link>
                </li>
                <li>
                    <Link href="/#kaufreue-section" className="text-gray-700 hover:text-black">Kaufreue</Link>
                </li>
                <li>
                    <Link href="/#what-you-can-do-section" className="text-gray-700 hover:text-black">Mitwirken</Link>
                </li>
                <li>
                    <Link href="/#calendar-section" className="text-gray-700 hover:text-black">Termine</Link>       
                </li>
                {!isLoggedIn ? (
                    <li>
                        <Link href="/#community-section" className="text-gray-700 hover:text-black">Community</Link>
                    </li>
                ) : (
                    <li>
                        <Link href="/Dashboard" className="text-gray-700 hover:text-black">Dashboard</Link>
                    </li>
                )}
                <li>
                    <Link href="/comments" className="text-gray-700 hover:text-black">Kleine Erfolge</Link>
                </li>
            </ul>

            {/* Auth-Bereich */}
            <div className="auth-buttons flex items-center space-x-4">
                {isLoggedIn && (
                    <>
                       <div className="flex items-center space-x-4">
    {/* Öffentlich/Nicht öffentlich Switch */}
    <div className="flex items-center">
        <label
            htmlFor="visibility-switch"
            className="relative inline-flex items-center cursor-pointer"
        >
            <input
                type="checkbox"
                id="visibility-switch"
                className="sr-only peer"
                checked={isPublic}
                onChange={toggleVisibility}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#A9D09A] peer-checked:bg-[#A9D09A] transition-all duration-300"></div>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform duration-300"></div>
        </label>
        <span className="ml-3 text-sm font-anonymous-pro text-gray-800">
            {isPublic ? 'Öffentlich' : 'Privat'}
        </span>
    </div>
    {/* Logout-Button */}
    <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
        Logout
    </button>
</div>
                    </>
                )}
                {!isLoggedIn && (
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
                )}
            </div>
        </div>
    );
}
