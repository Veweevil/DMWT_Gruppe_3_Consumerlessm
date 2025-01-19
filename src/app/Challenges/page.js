'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Confetti from 'react-confetti';

export default function Challenges() {
    const defaultChallenges = [
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
            title: 'Ein Monat ohne Klammoten', 
            description: 'Gehe für einen Monat nicht shoppen',
            notes: '', 
            completed: false,
            saved: false 
        },
    ];

    const [challenges, setChallenges] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false); 
    const [confettiDimensions, setConfettiDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [animateAward, setAnimateAward] = useState(false); // State für die Animation

    // Lade Daten aus localStorage oder initialisiere mit Standardwerten
    useEffect(() => {
        const savedChallenges = JSON.parse(localStorage.getItem('challenges'));
        if (savedChallenges && savedChallenges.length > 0) {
            setChallenges(savedChallenges);
        } else {
            setChallenges(defaultChallenges);
            localStorage.setItem('challenges', JSON.stringify(defaultChallenges));
        }
    }, []);

    // Synchronisiere Änderungen an Herausforderungen mit localStorage
    useEffect(() => {
        if (challenges.length > 0) {
            localStorage.setItem('challenges', JSON.stringify(challenges));
        }
    }, [challenges]);

    // Aktualisiere die Dimensionen für Konfetti
    useEffect(() => {
        const updateConfettiDimensions = () => {
            setConfettiDimensions({
                width: window.innerWidth,
                height: document.body.scrollHeight,
            });
        };

        updateConfettiDimensions(); // Initiale Dimensionen setzen
        window.addEventListener('resize', updateConfettiDimensions);
        return () => window.removeEventListener('resize', updateConfettiDimensions);
    }, []);

    const toggleChallengeCompletion = (id) => {
        const challenge = challenges.find((c) => c.id === id);

        if (challenge && !challenge.completed) {
            // Wenn die Challenge abgeschlossen wird
            setChallenges((prevChallenges) =>
                prevChallenges.map((c) =>
                    c.id === id ? { ...c, completed: true } : c
                )
            );

            // Hochscrollen und Konfetti anzeigen
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                setShowConfetti(true);
                setAnimateAward(true); // Animation starten
                setTimeout(() => {
                    setShowConfetti(false);
                    setAnimateAward(false); // Animation zurücksetzen
                    // Weiterleitung zu #challengeSite
                    window.location.href = '#challengeSite';
                }, 3000);
            }, 500); // Zeit für das Scrollen (anpassbar)
        } else if (challenge && challenge.completed) {
            // Wenn die Challenge zurückgesetzt wird
            setChallenges((prevChallenges) =>
                prevChallenges.map((c) =>
                    c.id === id ? { ...c, completed: false } : c
                )
            );
        }
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
        <div id="challengeSite">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F0F7EC]">
                {/* Konfetti-Effekt */}
                {showConfetti && <Confetti width={confettiDimensions.width} height={confettiDimensions.height} />}

                {/* Award-Bild mit Animation */}
                <div className={`mb-[-14] mt-14 ${animateAward ? 'animate-award' : ''}`}>
                    <img src="/award.png" alt="Award" className="w-32 h-auto" />
                </div>

                <h1 className="text-[8rem] font-trash-hand text-black mb-0 text-center">
                    CHALLENGES
                </h1>

                {/* Zwischenüberschrift für die vorgeschlagenen Herausforderungen */}
                <p className="text-xl text-gray-700 mb-6 text-center">
                    Entdecke eine Auswahl an Herausforderungen, die du für einen minimalistischen Lebensstil ausprobieren kannst.
                </p>

                {/* Vorgeschlagene Challenges */}
                <div className="w-full max-w-4xl mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Vorgeschlagene Herausforderungen</h2>
                    <ul className="space-y-4">
                        {challenges.filter((challenge) => !challenge.saved).map((challenge) => (
                            <li
                                key={challenge.id}
                                className={`p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-start space-y-4 ${
                                    challenge.completed ? 'bg-[#A9D09A]' : 'bg-white'
                                }`}
                            >
                                <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                                <p className="text-gray-600">{challenge.description}</p>

                                <textarea
                                    value={challenge.notes}
                                    onChange={(e) => handleNotesChange(challenge.id, e.target.value)}
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                                    rows="4"
                                    placeholder="Deine Notizen hier..."
                                    maxLength={200}
                                />
                                <p className="mt-2 text-gray-500">Maximale Zeichenzahl: 200</p>

                                <button
                                    onClick={() => toggleSavedStatus(challenge.id)}
                                    className={`py-2 px-4 rounded font-bold text-white ${
                                        challenge.saved ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#A9D09A] hover:bg-[#90B883]'
                                    }`}
                                >
                                    {challenge.saved ? 'Vormerkung aufheben' : 'Vormerken'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Vorgemerkte Challenges */}
                <div className="w-full max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Vormerkungen</h2>
                    <ul className="space-y-4">
                        {challenges.filter((challenge) => challenge.saved).map((challenge) => (
                            <li
                                key={challenge.id}
                                className={`p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-start space-y-4 ${
                                    challenge.completed ? 'bg-[#A9D09A]' : 'bg-white'
                                }`}
                            >
                                <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                                <p className="text-gray-600">{challenge.description}</p>

                                <textarea
                                    value={challenge.notes}
                                    onChange={(e) => handleNotesChange(challenge.id, e.target.value)}
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                                    rows="4"
                                    placeholder="Deine Notizen hier..."
                                    maxLength={200}
                                />
                                <p className="mt-2 text-gray-500">Maximale Zeichenzahl: 200</p>

                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => toggleChallengeCompletion(challenge.id)}
                                        className={`py-2 px-4 rounded font-bold text-white ${
                                            challenge.completed ? 'bg-red-500 hover:bg-red-600' : 'bg-[#A9D09A] hover:bg-[#90B883]'
                                        }`}
                                    >
                                        {challenge.completed ? 'Zurücksetzen' : 'Abschließen'}
                                    </button>
                                    <button
                                        onClick={() => toggleSavedStatus(challenge.id)}
                                        className={`py-2 px-4 rounded font-bold text-white ${
                                            challenge.saved ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#A9D09A] hover:bg-[#90B883]'
                                        }`}
                                    >
                                        {challenge.saved ? 'Vormerkung aufheben' : 'Vormerken'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <style jsx>{`
                .animate-award {
                    animation: scaleAward 1s ease-in-out;
                }

                @keyframes scaleAward {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.5);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>  
    );
}
