// src/app/Kaufreue/page.js
'use client';
import Header from "../components/Header";

// Registrierung der Chart-Komponenten

export default function Testseite() {
    // Daten für das Kuchendiagramm
    
    return (
        <div>
            {/* Header-Komponente */}
            <Header />
            <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-6">
            {/* Überschrift */}
            <h1 className="text-5xl font-trash-hand text-black mb-8">Einloggen</h1>

            {/* Login-Formular */}
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        E-Mail-Adresse / Nutzername
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="E-Mail-Adresse / Nutzername"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Passwort
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Passwort"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Einloggen
                    </button>
                </div>
            </form>
            
            </div>
        </div>
    );
}
