import postgres from 'postgres';

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

export async function DELETE(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'E-Mail erforderlich' }), { status: 400 });
        }

        //delete user by email
        const result = await sql`
            DELETE FROM "LoginDaten"
            WHERE email = ${email}
        `;

        if (result.count === 0) {
            return new Response(JSON.stringify({ error: 'Benutzer nicht gefunden' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Konto erfolgreich gelöscht' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Serverfehler' }), { status: 500 });
    }
}
