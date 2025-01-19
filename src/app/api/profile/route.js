import postgres from 'postgres';

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');  //get parameter 'email' from req-url

        if (!email) {
            return new Response(JSON.stringify({ error: 'E-Mail ist erforderlich' }), { status: 400 });
        }
    
        //get userdata by email
        const user = await sql`
            SELECT nutzername, email, öffentlich
            FROM "LoginDaten"
            WHERE email = ${email}
        `;

        if (user.length === 0) {
            return new Response(
                JSON.stringify({ error: 'Benutzer nicht gefunden' }),
                { status: 404 }
            );
        }
        
        return new Response(
            JSON.stringify({
                name: user[0].nutzername,
                email: user[0].email,
                isPublic: user[0].öffentlich,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Serverfehler', details: error.message }),
            { status: 500 }
        );
    }
}
