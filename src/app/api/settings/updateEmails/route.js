import postgres from 'postgres';

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

export async function PUT(req) {
    try {
        const { email, newEmail } = await req.json();

        if (!email || !newEmail) {
            return new Response(JSON.stringify({ error: 'E-Mail erforderlich' }), { status: 400 });
        }

        //update email by email
        const result = await sql`
            UPDATE "LoginDaten"
            SET email = ${newEmail}
            WHERE nutzername = ${email}
        `;

        if (result.count === 0) {
            console.error('Benutzer nicht gefunden:', email); //user not found
            return new Response(JSON.stringify({ error: 'Benutzer nicht gefunden' }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: 'E-Mail erfolgreich aktualisiert' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Serverfehler' }), { status: 500 });
    }
}
