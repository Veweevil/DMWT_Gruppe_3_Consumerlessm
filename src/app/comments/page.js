import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CommentsPage() {
    return (
        <div>
            <h1>Hallo</h1>
        </div>
        /*<div>
            <div className="navbar">
                <Link href="/">
                    <img className='logo' src="/logo.ico" alt="logo"/>
                </Link>
                <ul>
                    <li>
                        <Link href="/" className="navLink">
                            Home
                        </Link>
                    </li>
                    <li>Punkt</li>
                    <li>Punkt</li>
                    <li>Punkt</li>
                    <li>
                        <Link href="/comments" className="navLink">
                            Diskussion
                        </Link>
                    </li>
                </ul>
            </div>
            <hr className="navbarLine" />
            <h1>Kommentare</h1>
            <ul>
                {data.slice(0, 10).map((comment) => ( //"Schneidet" die ersten 10 Kommentare aus dem Array aus und mappt sie auf eine Liste
                    <li key={comment.id}>
                        <h3>{comment.name}</h3>
                        <p>{comment.body}</p>
                        <small>{comment.email}</small>
                    </li>
                ))}
            </ul>
        </div>*/
    );
}
