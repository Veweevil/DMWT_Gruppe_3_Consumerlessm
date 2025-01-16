'use client';
import { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext"; // Importiere den AuthContext
import Header from "../components/Header";

export default function Dashboard() {
    const [nutzername, setNutzername] = useState('');
    const { user } = useAuth(); // Zugriff auf den aktuellen Benutzer

    useEffect(() => {
        const fetchNutzername = async () => {
            try {
                if (!user || !user.email) {
                    console.warn('Kein Benutzer angemeldet');
                    setNutzername('Gast');
                    return;
                }
    
                const email = user.email; // Hole die Email des angemeldeten Benutzers
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
                <h1
                    className="text-7xl font-trash-hand text-black"
                    style={{
                        display: "inline-block",
                        boxShadow: "0px -5px 0px 0px #000 inset",
                    }}
                >
                    Hallo {nutzername}!
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-6xl">
                    {/* Card 1 */}
                    <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-300 rounded-lg mb-4"></div>
                        <h2 className="font-anonymous-pro text-xl text-gray-700">Dein Profil</h2>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-300 rounded-lg mb-4"></div>
                        <h2 className="font-anonymous-pro text-xl text-gray-700">Challenges</h2>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-300 rounded-lg mb-4"></div>
                        <h2 className="font-anonymous-pro text-xl text-gray-700">Konsumtracker</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
