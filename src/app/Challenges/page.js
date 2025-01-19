'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function Challenges() {
    const [challenges, setChallenges] = useState([]);

    // Lade die Challenges aus localStorage oder verwende Standard-Challenges
    useEffect(() => {
        const savedChallenges = JSON.parse(localStorage.getItem('challenges')) || [
            { 
                id: 1, 
                title: 'Eine Woche plastikfrei', 
                description: 'Versuche, eine Woche lang auf Plastik zu verzichten.',
            },
            { 
                id: 2, 
                title: 'Minimalismus-Challenge: 1 Gegenstand pro Tag loswerden', 
                description: 'Entrümpele deinen Haushalt, indem du jeden Tag einen unnötigen Gegenstand aus deinem Leben entfernst.',
            },
            { 
                id: 3, 
                title: 'Autofreier Tag', 
                description: 'Verzichte einen Tag lang auf dein Auto.',
            },
        ];

        setChallenges(savedChallenges);
    }, []);

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F0F7EC]">
                <h1 className="text-[8rem] font-trash-hand text-black mb-0 text-center">
                    CHALLENGES
                </h1>

                {/* Anzeige der Challenges */}
                <div className="w-full max-w-4xl mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Herausforderungen</h2>
                    <ul className="space-y-4">
                        {challenges.map((challenge) => (
                            <li
                                key={challenge.id}
                                className="p-4 rounded-lg shadow-md border border-gray-200 bg-white"
                            >
                                <div className="w-full">
                                    <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                                    <p className="text-gray-600">{challenge.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
