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

        const { name, content } = await req.json(); //read comment-data from Request-Body
        
        //insert new comment into database
        await sql`
            INSERT INTO "Kommentare" (name, kommentar)
            VALUES (${name}, ${content})
        `;

        return new Response(
            JSON.stringify({ message: 'Kommentar erfolgreich gespeichert' }),
            { status: 201 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Fehler beim Speichern des Kommentars', error: error.message }),
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        //read all comments from database and sort them by id
        const comments = await sql`
            SELECT name, kommentar AS content
            FROM "Kommentare"
            ORDER BY id DESC
        `;

        return new Response(
            JSON.stringify({ comments }),
            { status: 200 }
        );
    } catch (error) {
        //error handling fetching comments
        return new Response(
            JSON.stringify({ message: 'Fehler beim Abrufen der Kommentare', error: error.message }),
            { status: 500 }
        );
    }
}

//only allow GET and POST requests
export async function OPTIONS(req) {
    return new Response(
        JSON.stringify({ message: `Methode ${req.method} nicht erlaubt` }),
        {
            status: 405,
            headers: { Allow: 'GET, POST' },
        }
    );
}