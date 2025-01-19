'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import Header from '../components/Header';
import Link from 'next/link';

export default function Profile() {
    const { user } = useAuth(); //actual user
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        isPublic: false,
    });
    const fetchUserData = async () => {
        if (!user || !user.email) {
            console.warn('Kein Benutzer angemeldet');
            return;
        }
    
        try {
            const response = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`, //if user is logged in, token is passed
                },
            });
    
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Benutzerdaten');
            }
    
            const data = await response.json();
            setUserData({
                name: data.name || 'Nutzer', //if no name is provided, default is 'Nutzer'
                email: data.email || 'Nicht verfügbar',
                isPublic: data.isPublic || false,
            });
        } catch (error) {
            console.error('Fehler beim Abrufen der Benutzerdaten:', error);
        }
    };
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!user || !user.email) {
                    console.warn('Kein Benutzer angemeldet');
                    return;
                }

                const response = await fetch(`/api/profile?email=${user.email}`);
                const data = await response.json();

                if (response.ok) {
                    setUserData({
                        name: data.name || 'Nutzer',
                        email: data.email || 'Nicht verfügbar',
                        isPublic: data.isPublic || false,
                    });
                } else {
                    console.error('Fehler beim Abrufen der Benutzerdaten:', data.error);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', error);
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <div>
            <Header />
            

            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F7EC]"> 
                <a href="/Dashboard" className="absolute top-4 left-4 mt-28 ml-20">
                    <img src="/pfeil2.svg" alt="Zurück" style={{ width: '50px', height: '50px' }} />
                </a>

            <h1 className="text-[6rem] font-trash-hand text-black text-center mb-6"> {/*Profile title*/}
                    DEIN PROFIL
                </h1>

                <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
                    <div className="flex items-center space-x-6">
                        <img
                            src="/profile.png"
                            alt="Profilbild"
                            className="w-24 h-24 rounded-full border border-gray-300"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {userData.name || 'Nutzer'}
                            </h1>
                            <p className="text-gray-600"> {/*Welcome message*/}
                                Willkommen auf deinem Profil!
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-800">Deine Informationen</h2> {/*User information*/}
                        <ul className="mt-4 text-gray-600 space-y-2">
                            <li>
                                <strong>E-Mail:</strong> {userData.email}
                            </li>
                            <li>
                                <strong>Profil öffentlich:</strong>{' '}
                                {userData.isPublic ? 'Ja' : 'Nein'}
                            </li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-800">Aktionen</h2>
                        <p className="mt-4 text-gray-600">
                            Möchtest du dein Profil aktualisieren? {/*Update profile message*/}
                        </p>
                        <Link href="/Settings">
                        <button className="mt-4 px-4 py-2 bg-[#A9D09A] text-white font-bold rounded hover:bg-[#a5d393]">
                            Profil bearbeiten {/*Edit profile button*/}
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
