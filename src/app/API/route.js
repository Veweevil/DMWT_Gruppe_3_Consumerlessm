import postgres from 'postgres';

// Stelle sicher, dass du mit der richtigen Verbindung zur Datenbank arbeitest
const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com', // Host der Datenbank
    port: 6543, // Port der Datenbank (PostgreSQL Standardport)
    database: 'deineDatenbank', // Dein Datenbankname (ersetze 'deineDatenbank' mit dem echten Namen)
    username: 'postgres.krgdanoctggnvlkyseyc', // Dein Benutzername
    password: 'Consumerlessm1!' // Dein Passwort
});

// API-Routenhandler f端r POST-Anfragen
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, kommentar } = req.body; // Die Daten, die vom Frontend geschickt werden

        try {
            // F端ge den Kommentar in die Datenbank ein
            const result = await sql`
                INSERT INTO Kommentare (name, kommentar)
                VALUES (${name}, ${kommentar})
            `;

            // R端ckmeldung, dass der Kommentar erfolgreich gespeichert wurde
            res.status(201).json({ message: 'Kommentar erfolgreich gespeichert' });
        } catch (error) {
            // Fehlerbehandlung
            console.error('Fehler beim Speichern des Kommentars:', error);
            res.status(500).json({ message: 'Fehler beim Speichern des Kommentars' });
        }
    } else {
        // Falls andere Methoden als POST verwendet werden, geben wir eine Fehlerantwort zur端ck
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}