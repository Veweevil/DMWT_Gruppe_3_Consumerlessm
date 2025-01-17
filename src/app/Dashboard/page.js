'use client';
import { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import Header from "../components/Header";

export default function Dashboard() {
    const [nutzername, setNutzername] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchNutzername = async () => {
            try {
                if (!user || !user.email) {
                    console.warn('Kein Benutzer angemeldet');
                    setNutzername('Gast');
                    return;
                }

                const email = user.email;
                const response = await fetch(`/api/getUserInfo?email=${email}`);
                const data = await response.json();

                if (response.ok) {
                    setNutzername(data.nutzername || 'Gast');
                } else {
                    console.error(data.error || 'Fehler beim Abrufen des Benutzers');
                    setNutzername('Gast');
                }
            } catch (error) {
                console.error('Fehler beim Abrufen des Benutzers:', error);
                setNutzername('Gast');
            }
        };

        if (user) {
            fetchNutzername();
        }
    }, [user]);

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F0F7EC]">
                {/* Begrüßung */}
                <h1
                    className="text-7xl font-trash-hand text-black"
                    style={{
                        display: "inline-block",
                        boxShadow: "0px -5px 0px 0px #000 inset",
                    }}
                >
                    Hallo {nutzername}!
                </h1>
                <p className="text-center font-anonymous-pro text-lg text-gray-600 mt-4">
                    Willkommen in deinem Dashboard! Entdecke alle Tools, um bewusster zu leben.
                </p>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full max-w-6xl">
                    {/* Card 1 */}
                    <div className="bg-[#DFF2E1] rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
                        <img src="/icons/profile.svg" alt="Profil" className="w-16 h-16 mb-4" />
                        <h2 className="font-anonymous-pro text-xl text-gray-800">Dein Profil</h2>
                        <p className="text-gray-600 text-center mt-2">
                            Verwalte deine Daten und Einstellungen.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#DFF2E1] rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
                        <img src="/icons/challenges.svg" alt="Challenges" className="w-16 h-16 mb-4" />
                        <h2 className="font-anonymous-pro text-xl text-gray-800">Challenges</h2>
                        <p className="text-gray-600 text-center mt-2">
                            Stelle dich spannenden Aufgaben und reduziere deinen Konsum.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#DFF2E1] rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
                        <img src="/icons/tracker.svg" alt="Konsumtracker" className="w-16 h-16 mb-4" />
                        <h2 className="font-anonymous-pro text-xl text-gray-800">Konsumtracker</h2>
                        <p className="text-gray-600 text-center mt-2">
                            Behalte deine Fortschritte im Blick.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-[#DFF2E1] rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform">
                        <img src="/icons/community.svg" alt="Community" className="w-16 h-16 mb-4" />
                        <h2 className="font-anonymous-pro text-xl text-gray-800">Community</h2>
                        <p className="text-gray-600 text-center mt-2">
                            Vernetze dich mit Gleichgesinnten und teile Erfolge.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
