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
        const { id } = await req.json();

        if (!id) {
            throw new Error('Die ID des Events fehlt.');
        }

        await sql`
            DELETE FROM "Veranstaltungen"
            WHERE id = ${id}
        `;

        return new Response(
            JSON.stringify({ message: 'Veranstaltung erfolgreich gelöscht' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Fehler beim Löschen der Veranstaltung', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
