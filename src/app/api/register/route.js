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
        const { nutzername, email, passwort } = await req.json(); 

        if (!nutzername || !email || !passwort) {
            return new Response(
                JSON.stringify({ message: 'Alle Felder sind erforderlich.' }),
                { status: 400 }
            );
        }

        try {
            //add new user to database
            await sql`
                INSERT INTO "LoginDaten" (nutzername, email, passwort, created_at)
                VALUES (${nutzername}, ${email}, ${passwort}, NOW())
            `;

            return new Response(
                JSON.stringify({ message: 'Benutzer erfolgreich registriert.' }),
                { status: 201 }
            );
        } catch (dbError) {
            if (dbError.code === '23505') { //unique constraint violation
                const field = dbError.detail.includes('email') ? 'E-Mail-Adresse' : 'Nutzername';
                return new Response(
                    JSON.stringify({ message: `${field} ist bereits registriert.` }),
                    { status: 400 }
                );
            }
            if (dbError.code === '23514') { //check constraint violation
                return new Response(
                    JSON.stringify({
                        message: 'Das Passwort erfüllt nicht die Sicherheitsanforderungen.',
                    }),
                    { status: 400 }
                );
            }

            return new Response( //general db error
                JSON.stringify({ message: 'Fehler beim Speichern in der Datenbank.', error: dbError.detail }),
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Fehler bei der Registrierung:', error);
        return new Response(
            JSON.stringify({ message: 'Fehler bei der Registrierung.', error: error.message }),
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        //get all users from db
        const users = await sql`
            SELECT id, nutzername, email, created_at
            FROM "LoginDaten"
            ORDER BY id DESC
        `;

        return new Response(
            JSON.stringify({ users }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
        return new Response(
            JSON.stringify({
                message: 'Fehler beim Abrufen der Benutzer.',
                error: error.message,
            }),
            { status: 500 }
        );
    }
}

export async function OPTIONS(req) {
    return new Response(
        JSON.stringify({ message: `Methode ${req.method} nicht erlaubt` }),
        {
            status: 405,
            headers: { Allow: 'GET, POST' }, 
        }
    );
}
