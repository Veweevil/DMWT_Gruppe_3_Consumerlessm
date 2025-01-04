'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Um HTTP-Anfragen zu senden

//const fetcher = (url) => fetch(url).then((res) => res.json());

function CommentForm() {
    const [name, setName] = useState(''); // Speichert den Namen des Nutzers
    const [content, setContent] = useState(''); // Speichert den Kommentartext
    const [message, setMessage] = useState(''); // Zeigt eine Nachricht nach dem Absenden an

    const handleSubmit = async (e) => {
        e.preventDefault(); // Verhindert das Standardverhalten des Formulars

        try {
            // Sende die POST-Anfrage an den Backend-Endpunkt
            await axios.post('/API', {
                name: name,        // Der Name des Nutzers
                content: content  // Der Kommentar des Nutzers
            });
            // Erfolgreiche Antwort
            setMessage('Kommentar erfolgreich gespeichert!');
            setName('');  // Löscht das Name-Feld
            setContent(''); // Löscht das Kommentar-Feld
        } catch (error) {
            // Fehlerbehandlung
            setMessage('Fehler beim Speichern des Kommentars');
            console.error('Fehler:', error);
        }
    };

    return (
        <div>
            <h2>Kommentar abgeben</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Dein Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Setzt den Namen aus dem Eingabefeld
                        required
                    />
                </div>
                <div>
                    <label>Kommentar:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)} // Setzt den Kommentartext aus dem Textbereich
                        required
                    />
                </div>
                <button type="submit">Kommentar absenden</button>
            </form>
            {message && <p>{message}</p>} {/* Zeigt eine Erfolgsmeldung oder Fehlermeldung */}
        </div>
    );
}

export default CommentForm;