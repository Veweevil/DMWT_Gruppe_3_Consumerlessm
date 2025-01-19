'use client';
import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from "../../context/AuthContext";

function CommentForm() {
    const [name, setName] = useState(''); //Name des Nutzers
    const [content, setContent] = useState(''); //Erfolgstext
    const [message, setMessage] = useState(''); //Erfolg/Fehler-Nachricht
    const [comments, setComments] = useState([]); //Liste der Erfolge (intern)
    const {isLoggedIn, logout} = useAuth();
    const [nutzername, setNutzername] = useState('');
    const { user } = useAuth();
    const [visibleComments, setVisibleComments] = useState(5); // Anzahl der sichtbaren Kommentare

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
    //Erfolge laden
    const fetchComments = async () => {
        try {
            const response = await axios.get('/api/comments');
            setComments(response.data.comments); //Erfolge speichern
        } catch (error) {
            console.error('Fehler beim Laden der Erfolge:', error);
        }
    };

    // Mehr Erfolge laden
    const loadMoreComments = () => {
        setVisibleComments(visibleComments + 5); // Weitere 5 Kommentare laden
    };

    // Nur 5 Erfolge anzeigen
    const loadLessComments = () => {
        setVisibleComments(5); // Auf 5 Kommentare zurücksetzen
    };


    //Erfolge beim ersten Laden abrufen
    useEffect(() => {
        fetchComments();
    }, []);

    //Formular absenden
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const commentName = isLoggedIn ? nutzername : name;
            //Erfolg absenden
            await axios.post('/api/comments', {
                name: commentName,
                content: content,
            });

            setMessage('Erfolg erfolgreich geteilt!');
            setName('');
            setContent('');

            //Erfolge erneut abrufen
            fetchComments();
        } catch (error) {
            setMessage('Fehler beim Teilen des Erfolgs.');
            console.error('Fehler:', error);
        }
    };

    return (
        <div className="bg-[#F0F7EC] min-h-screen">
            {/* Header */}
            <Header/>

            {/* Erfolg teilen Formular */}
            <div className="flex flex-col items-center pt-24">
                <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
                    {/* Überschrift */}
                    <h2 className="text-[5rem] font-trash-hand text-black text-center mb-5">
                        Kleine Erfolge teilen
                    </h2>
                    <p className="mb-10">Erzähle uns von deinem Weg zu weniger Konsum und inspiriere andere. Gib deinen Namen ein und schreibe, was du erreicht hast oder was dich motiviert. Erfahre außerdem, wie Personen durch Consumerlessm ihren Konsum reduziert haben. Gemeinsam schaffen wir Veränderung!</p>

                    {/* Formular */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name */}
                        {isLoggedIn && (<div>
                            <label className="block text-xl font-anonymous-pro text-gray-700 mb-3">
                                Dein Name:
                            </label>
                            <input
                                type="text"
                                value={nutzername}
                                readOnly
                                className="w-full px-4 py-3 bg-[#A9D09A] text-gray-800 rounded focus:outline-none focus:ring focus:ring-[#90B883] shadow"
                            />
                        </div>
                        )}
                        {!isLoggedIn && (
                        <div>
                            <label className="block text-xl font-anonymous-pro text-gray-700 mb-3">
                                Dein Name:
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-[#A9D09A] text-gray-800 rounded focus:outline-none focus:ring focus:ring-[#90B883] shadow"
                            />
                        </div>
                        )}
                        {/* Erfolg */}
                        <div>
                            <label className="block text-xl font-anonymous-pro text-gray-700 mb-3">
                                Auf welchen Erfolg bist du stolz?
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-[#A9D09A] text-gray-800 rounded focus:outline-none focus:ring focus:ring-[#90B883] shadow"
                            />
                        </div>

                        {/* Absenden-Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#A9D09A] hover:bg-[#90B883] text-gray-800 py-3 rounded-lg text-xl font-bold shadow-lg"
                        >
                            Erfolg teilen
                        </button>
                    </form>

                    {/* Nachricht */}
                    {message && (
                        <p className="text-center text-lg font-anonymous-pro text-gray-700 mt-6">
                            {message}
                        </p>
                    )}
                </div>

                {/* Erfolge anzeigen */}
                <div className="max-w-3xl w-full mt-12">
                    <h3 className="text-3xl font-anonymous-pro text-gray-800 mb-6">
                        Geteilte Erfolge:
                    </h3>

                    {/* Erfolgsliste */}
                    {comments.length > 0 ? (
                        <ul className="space-y-6 mb-6">
                            {comments.slice(0, visibleComments).map((comment, index) => (
                                <li
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow flex flex-col"
                                >
                                    <p className="font-bold text-lg text-gray-900 mb-2">
                                        {comment.name}
                                    </p>
                                    <p className="text-gray-700">{comment.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-700">Noch keine Erfolge geteilt.</p>
                    )}

    {/* Mehr anzeigen Button */}
{comments.length > visibleComments && (
    <div className="flex justify-center mt-6 mb-6">
        <button
            onClick={loadMoreComments}
            className="mt-2 bg-white text-black border-2 border-[#A9D09A] px-6 py-2 rounded hover:bg-[#A9D09A] hover:text-white"
        >
            Mehr anzeigen
        </button>
    </div>
)}

                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CommentForm;
