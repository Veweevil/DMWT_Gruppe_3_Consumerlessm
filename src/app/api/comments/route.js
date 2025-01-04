import postgres from 'postgres';

// Stelle sicher, dass du mit der richtigen Verbindung zur Datenbank arbeitest
const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

// API-Handler für POST-Anfragen
export async function POST(req) {
    try {
        // Parse die Anfrage-Daten
        const { name, content } = await req.json();
        console.log('Daten empfangen:', { name, content }); // Prüfen, ob die Daten richtig empfangen wurden

        // Füge den Kommentar in die Datenbank ein
        await sql`
            INSERT INTO Kommentare (name, kommentar)
            VALUES (${name}, ${content})
        `;

        return new Response(
            JSON.stringify({ message: 'Kommentar erfolgreich gespeichert' }),
            { status: 201 }
        );
    } catch (error) {
        // Detaillierte Fehlerprotokollierung
        console.error('Fehler beim Speichern des Kommentars:', error);
        return new Response(
            JSON.stringify({ message: 'Fehler beim Speichern des Kommentars', error: error.message }),
            { status: 500 }
        );
    }
}