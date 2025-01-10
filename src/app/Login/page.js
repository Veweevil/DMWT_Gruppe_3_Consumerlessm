// src/app/Kaufreue/page.js
'use client';
import Header from "../components/Header";

// Registrierung der Chart-Komponenten

export default function Testseite() {
    return (
        <div>
            {/* Header-Komponente */}
            <Header />
            <div className="flex flex-col items-center justify-center  min-h-screen p-6">
                {/* Login-Formular mit Rahmen */}
                <div
                    className="relative bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/Rahmen.svg')",
                        width: "400px", // Breite des Rahmens
                        height: "600px", // Höhe des Rahmens
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingTop: "120px", // Platz für die Überschrift oben
                    }}
                >
                    {/* Überschrift */}
                    <h1 className="text-5xl font-trash-hand text-black mb-6">Einloggen</h1>

                    {/* Login-Formular */}
                    <form
                        className="px-6 pt-4 pb-6"
                        style={{
                            width: "70%", // Breite des Formulars
                            height: "60%", // Höhe des Formulars
                        }}
                    >
                        <div className="mb-4 w-full">
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
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="mb-6 w-full">
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
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <button
                                type="submit"
                                className="bg-[#A9D09A] hover:bg-[#90B883] text-black font py-2 px-4 rounded focus:outline-none"
                            >
                                Einloggen
                            </button>
                        </div>
                    </form>

                    {/* Registrierungs-Link */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            Noch keinen Account?{' '}
                            <button
                                className="text-[#A9D09A] hover:underline font-bold"
                                onClick={() => window.location.href = '/Register'} // Beispiel-Redirect
                            >
                                Registrieren
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
