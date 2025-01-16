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
                // Überprüfe, ob ein Benutzer angemeldet ist
                if (!user || !user.email) {
                    console.warn('Kein Benutzer angemeldet');
                    setNutzername('Gast');
                    return; // Beende die Funktion frühzeitig
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
    
        // Nur ausführen, wenn user nicht null ist
        if (user) {
            fetchNutzername();
        }
    }, [user]);
    
    
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <h1 className="text-7xl font-trash-hand text-black absolute top-20">
                    Hallo {nutzername}!
                </h1>
            </div>
        </div>
    );
}
