'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Confetti from 'react-confetti'; //Import for coneffetti animation

export default function Challenges() {
    const defaultChallenges = [  //Data for challenges
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

    const [challenges, setChallenges] = useState([]);  //state to manage list of challenges
    const [showConfetti, setShowConfetti] = useState(false); 
    const [confettiDimensions, setConfettiDimensions] = useState({
        width: 0,
        height: 0,
    });
    
    const [animateAward, setAnimateAward] = useState(false); //state for award animation

    useEffect(() => { //load saved challenges from local storage
        const savedChallenges = JSON.parse(localStorage.getItem('challenges'));
        if (savedChallenges && savedChallenges.length > 0) {
            setChallenges(savedChallenges);
        } else {
            setChallenges(defaultChallenges);
            localStorage.setItem('challenges', JSON.stringify(defaultChallenges));
        }
    }, []);

    useEffect(() => {
        //save challenges to local storage
        if (challenges.length > 0) {
            localStorage.setItem('challenges', JSON.stringify(challenges));
        }
    }, [challenges]);

    useEffect(() => {
        //update confetti dimensions
        const updateConfettiDimensions = () => {
            setConfettiDimensions({
                width: window.innerWidth,
                height: document.body.scrollHeight,
            });
        };

        updateConfettiDimensions(); 
        window.addEventListener('resize', updateConfettiDimensions);
        return () => window.removeEventListener('resize', updateConfettiDimensions); 
    }, []);
    const toggleChallengeCompletion = (id) => {
        const challenge = challenges.find((c) => c.id === id);
    
        if (challenge) {  
            setChallenges((prevChallenges) =>
                prevChallenges.map((c) =>
                    c.id === id ? { ...c, completed: !c.completed } : c //approach by ChatGPT
                )
            );
    
            if (!challenge.completed) {
                window.scrollTo({ top: 0, behavior: 'smooth' }); //scroll to top to see the confetti animation
                setTimeout(() => {
                    setShowConfetti(true);
                    setAnimateAward(true);
                    setTimeout(() => {
                        setShowConfetti(false);
                        setAnimateAward(false);
                        window.location.href = '#challengeSite';
                    }, 3000);
                }, 500);
            }
        }
    };
    

    const handleNotesChange = (id, value) => {  //update usernotes 
        setChallenges((prevChallenges) =>
            prevChallenges.map((challenge) =>
                challenge.id === id ? { ...challenge, notes: value } : challenge
            )
        );
    };

    const toggleSavedStatus = (id) => { //toggle saved status
        setChallenges((prevChallenges) =>
            prevChallenges.map((challenge) =>
                challenge.id === id ? { ...challenge, saved: !challenge.saved } : challenge
            )
        );
    };

    return (
        <div id="challengeSite"> 
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#F0F7EC]"> {/*Centered layout with a background*/}
                <a href="/Dashboard" className="absolute top-4 left-4 mt-28 ml-20">
                    <img src="/pfeil2.svg" alt="Zurück" style={{ width: '50px', height: '50px' }} /> {/*goback button*/}
                </a>
                {showConfetti && <Confetti width={confettiDimensions.width} height={confettiDimensions.height} />} {/*confetti animation*/}
                <div className={`mb-0 mt-9 ${animateAward ? 'animate-award' : ''}`}> {/*award animation*/}
                    <img src="/award.png" alt="Award" className="w-40 h-auto"/>    
                </div>

                <h1 className="text-7xl font-trash-hand text-black mb-2 text-center">CHALLENGES</h1>

                <p className="text-md text-gray-700 mb-4 text-center max-w-xl">
                    Entdecke eine Auswahl an Herausforderungen, die du für einen minimalistischen Lebensstil ausprobieren kannst.
                </p>

                <div className="w-full max-w-3xl mb-8">
                    <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Vorgeschlagene Herausforderungen</h2>
                    <ul className="space-y-4">
                        {challenges.filter((challenge) => !challenge.saved).map((challenge) => ( //filter challenges that are not saved
                            <li
                                key={challenge.id} //key for each challenge
                                className={`p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-start space-y-4 ${
                                    challenge.completed ? 'bg-white' : 'bg-white' //change background color based success status
                                }`}
                            >
                                {/*print challenges*/}
                                <h3 className="text-lg font-bold text-gray-800">{challenge.title}</h3> 
                                <p className="text-sm text-gray-600">{challenge.description}</p>
                                <textarea
                                    value={challenge.notes}
                                    onChange={(e) => handleNotesChange(challenge.id, e.target.value)} //update notes
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md text-sm" //text area notes
                                    rows="3"
                                    placeholder="Deine Notizen hier..." //placeholder notes
                                    maxLength={200}
                                />
                                <button
                                    onClick={() => toggleSavedStatus(challenge.id)} 
                                    className={`py-2 px-4 rounded text-sm font-bold text-white ${
                                        challenge.saved ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#A9D09A] hover:bg-[#90B883]' //change button color based on saved status
                                    }`}
                                >
                                    {challenge.saved ? 'Vormerkung aufheben' : 'Vormerken'}  {/*toggle saved status*/}         
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full max-w-3xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Vormerkungen</h2>
                    <ul className="space-y-4">
                        {challenges.filter((challenge) => challenge.saved).map((challenge) => ( //filter saved challenges
                            <li
                                key={challenge.id}
                                className={`p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-start space-y-4 ${ 
                                    challenge.completed ? 'bg-[#A9D09A]' : 'bg-white'
                                }`}
                            >
                                {/*print saved challenges*/}
                                <h3 className="text-lg font-bold text-gray-800">{challenge.title}</h3>
                                <p className="text-sm text-gray-600">{challenge.description}</p>
                                <textarea
                                    value={challenge.notes}
                                    onChange={(e) => handleNotesChange(challenge.id, e.target.value)} //update notes
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md text-sm"
                                    rows="3"
                                    placeholder="Deine Notizen hier..."
                                    maxLength={200}
                                />
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => toggleChallengeCompletion(challenge.id)}  //toggle challenge completion
                                        className={`py-2 px-4 rounded text-sm font-bold text-white ${  
                                            challenge.completed ? 'bg-red-500 hover:bg-red-600' : 'bg-[#A9D09A] hover:bg-[#90B883]'
                                        }`}
                                    >
                                        {challenge.completed ? 'Zurücksetzen' : 'Abschließen'}
                                    </button>
                                    <button
                                        onClick={() => toggleSavedStatus(challenge.id)}
                                        className={`py-2 px-4 rounded text-sm font-bold text-white ${
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
