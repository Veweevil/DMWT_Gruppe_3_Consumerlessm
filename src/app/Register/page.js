'use client';
import Header from "../components/Header";

export default function Registrierung() {
    return (
        <div>
            {/* Header-Komponente */}
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                {/* Registrierungs-Formular mit Rahmen */}
                <div
                    className="relative bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/Rahmen.svg')",
                        width: "400px", // Breite des Rahmens
                        height: "650px", // Höhe des Rahmens
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingTop: "100px", // Platz für die Überschrift oben
                    }}
                >
                    {/* Weißer Hintergrund innerhalb des Rahmens */}
                    <div
                        style={{
                            
                            width: "85%",
                            height: "80%",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "20px",
                        }}
                    >
                        {/* Überschrift */}
                        <h1 className="text-5xl font-trash-hand text-black mb-6">Registrieren</h1>

                        {/* Registrierungs-Formular */}
                        <form className="w-full">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="username"
                                >
                                    Nutzername
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Nutzername"
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    E-Mail-Adresse
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="E-Mail-Adresse"
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                                />
                            </div>

                            <div className="mb-4">
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

                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="confirmPassword"
                                >
                                    Passwort bestätigen
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Passwort bestätigen"
                                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-[#A9D09A] hover:bg-[#90B883] text-white font-bold py-2 px-4 rounded focus:outline-none"
                                >
                                    Registrieren
                                </button>
                            </div>
                        </form>

                        {/* Link zurück zur Anmeldung */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                Bereits einen Account?{' '}
                                <button
                                    className="text-[#A9D09A] hover:underline font-bold"
                                    onClick={() => window.location.href = '/Login'}
                                >
                                    Einloggen
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
