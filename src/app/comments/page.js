'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function CommentForm() {
    const [name, setName] = useState(''); // Name des Nutzers
    const [content, setContent] = useState(''); // Kommentartext
    const [message, setMessage] = useState(''); // Erfolg/Fehler-Nachricht
    const [comments, setComments] = useState([]); // Liste der Kommentare

    // Funktion zum Laden der Kommentare
    const fetchComments = async () => {
        try {
            const response = await axios.get('/api/comments');
            setComments(response.data.comments); // Kommentare in den Zustand speichern
        } catch (error) {
            console.error('Fehler beim Laden der Kommentare:', error);
        }
    };

    // Kommentare beim ersten Laden abrufen
    useEffect(() => {
        fetchComments();
    }, []);

    // Formular absenden
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Kommentar absenden
            await axios.post('/api/comments', {
                name: name,
                content: content,
            });

            setMessage('Kommentar erfolgreich hinzugefügt!');
            setName('');
            setContent('');

            // Kommentare nach dem Absenden erneut abrufen
            fetchComments();
        } catch (error) {
            setMessage('Fehler beim Hinzufügen des Kommentars.');
            console.error('Fehler:', error);
        }
    };

    return (
        <div className="bg-[#F0F7EC] min-h-screen">
            {/* Header */}
            <Header />

            {/* Kommentarformular */}
            <div className="flex flex-col items-center mt-12">
                <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
                    {/* Überschrift */}
                    <h2 className="text-[5rem] font-trash-hand text-black text-center mb-10">
                        Kommentar abgeben
                    </h2>

                    {/* Formular */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name */}
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

                        {/* Kommentar */}
                        <div>
                            <label className="block text-xl font-anonymous-pro text-gray-700 mb-3">
                                Kommentar:
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
                            Kommentar absenden
                        </button>
                    </form>

                    {/* Nachricht */}
                    {message && (
                        <p className="text-center text-lg font-anonymous-pro text-gray-700 mt-6">
                            {message}
                        </p>
                    )}
                </div>

                {/* Kommentare anzeigen */}
                <div className="max-w-3xl w-full mt-12">
                    <h3 className="text-3xl font-anonymous-pro text-gray-800 mb-6">
                        Kommentare:
                    </h3>

                    {/* Kommentar-Liste */}
                    {comments.length > 0 ? (
                        <ul className="space-y-6">
                            {comments.map((comment, index) => (
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
                        <p className="text-gray-700">Noch keine Kommentare vorhanden.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommentForm;