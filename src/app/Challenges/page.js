'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Confetti from 'react-confetti';

export default function Challenges() {
    const [challenges, setChallenges] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false); // Zustand für Konfetti
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Lade den Zustand der Herausforderungen aus localStorage, falls vorhanden
    useEffect(() => {
        const savedChallenges = JSON.parse(localStorage.getItem('challenges')) || [
            { 
                id: 1, 
                title: 'Eine Woche plastikfrei', 
                description: 'Versuche, eine Woche lang auf Plastik zu verzichten.',
                notes: '', 
                completed: false,
                saved: false 
            },
            { 
                id: 2, 
                title: 'Minimalismus-Challenge: 1 Gegenstand pro Tag loswerden', 
                description: 'Entrümpele deinen Haushalt, indem du jeden Tag einen unnötigen Gegenstand aus deinem Leben entfernst.',
                notes: '', 
                completed: false,
                saved: false 
            },
            { 
                id: 3, 
                title: 'Autofreier Tag', 
                description: 'Verzichte einen Tag lang auf dein Auto.',
                notes: '', 
                completed: false,
                saved: false 
            },
        ];

        setChallenges(savedChallenges);

        // Dimensionen für die gesamte Seite setzen
        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    // Funktion zur Aktualisierung der Breite und Höhe
    const updateDimensions = () => {
        setDimensions({
            width: window.innerWidth,
            height: Math.max(document.body.scrollHeight, window.innerHeight),
        });
    };

    // Speichern des Zustands in localStorage, wenn sich die Herausforderungen ändern
    useEffect(() => {
        if (challenges.length > 0) {
            localStorage.setItem('challenges', JSON.stringify(challenges));
        }
    }, [challenges]);

    const toggleChallengeCompletion = (id) => {
        setChallenges((prevChallenges) =>
            prevChallenges.map((challenge) =>
                challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
            )
        );
        
        // Konfetti anzeigen, wenn die Herausforderung abgeschlossen wird
        setShowConfetti(true);

        // Konfetti nach 3 Sekunden wieder ausblenden
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const handleNotesChange = (id, value) => {
        setChallenges((prevChallenges) =>
            prevChallenges.map((challenge) =>
                challenge.id === id ? { ...challenge, notes: value } : challenge
            )
        );
    };

    const toggleSavedStatus = (id) => {
        setChallenges((prevChallenges) =>
            prevChallenges.map((challenge) =>
                challenge.id === id ? { ...challenge, saved: !challenge.saved } : challenge
            )
        );
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F0F7EC]">
                {/* Konfetti anzeigen, wenn abgeschlossen */}
                {showConfetti && (
                    <Confetti
                        width={dimensions.width}
                        height={dimensions.height}
                        numberOfPieces={500} // Anzahl der Konfetti
                        recycle={false} // Konfetti wiederholen? Nein
                        gravity={0.2} // Langsames Fallen
                    />
                )}

                {/* Award PNG-Bild */}
                <div className="mb-5 mt-8">
                    <img src="/award.png" alt="Award" className="w-32 h-auto mb-[-60]" />
                </div>

                <h1 className="text-[8rem] font-trash-hand text-black mb-0 text-center">
                    CHALLENGES
                </h1>

                {/* Vorgeschlagene Challenges */}
                <div className="w-full max-w-4xl mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Vorgeschlagene Herausforderungen</h2>
                    <ul className="space-y-4">
                        {challenges.filter(challenge => !challenge.saved).map((challenge) => (
                            <li
                                key={challenge.id}
                                className={`p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-start space-y-4 ${challenge.completed ? 'bg-[#A9D09A]' : 'bg-white'}`}
                            >
                                <div className="w-full">
                                    <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                                    <p className="text-gray-600">{challenge.description}</p>
                                </div>

                                {/* Notizenbereich */}
                                <div className="w-full">
                                    <label htmlFor={`notes-${challenge.id}`} className="text-lg font-semibold text-gray-700">
                                        Notizen:
                                    </label>
                                    <textarea
                                        id={`notes-${challenge.id}`}
                                        value={challenge.notes}
                                        onChange={(e) => handleNotesChange(challenge.id, e.target.value)}
                                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                                        rows="4"
                                        placeholder="Deine Notizen hier..."
                                        maxLength={200}
                                    />
                                    <p className="mt-2 text-gray-500">Maximale Zeichenzahl: 200</p>
                                </div>

                                {/* Button zum Vormerken */}
                                <button
                                    onClick={() => toggleSavedStatus(challenge.id)}
                                    className={`py-2 px-4 rounded font-bold text-white ${challenge.saved ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#A9D09A] hover:bg-[#90B883]'}`}
                                >
                                    {challenge.saved ? 'Vormerkung aufheben' : 'Vormerken'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}