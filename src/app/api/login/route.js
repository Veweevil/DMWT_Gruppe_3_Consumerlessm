import postgres from 'postgres';

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

export async function POST(req) {
    try {
        const { username, password } = await req.json(); //Entpackt die Anfrage-Daten aus dem Körper der Anfrage

        if (!username || !password) { ///überprüft, ob Nutzername und Passwort eingegeben sind
            return new Response(
                JSON.stringify({ message: 'Alle Felder sind erforderlich.' }),
                { status: 400 }
            );
        }

        //überprüfen, ob eingegebener Nutzername/E-Mail existiert
        const user = await sql`
            SELECT * FROM "LoginDaten"
            WHERE nutzername = ${username} OR email = ${username}
        `;

        if (user.length === 0) {
            return new Response(
                JSON.stringify({ message: 'Benutzer nicht gefunden.' }),
                { status: 404 }
            );
        }

        //Passwort überprüfen
        const isPasswordValid = password === user[0].passwort;
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ message: 'Ungültiges Passwort.' }),
                { status: 401 }
            );
        }

        return new Response(
            JSON.stringify({ message: 'Login erfolgreich.' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Fehler beim Login:', error);
        return new Response(
            JSON.stringify({ message: 'Serverfehler.', error: error.message }),
            { status: 500 }
        );
    }
}
