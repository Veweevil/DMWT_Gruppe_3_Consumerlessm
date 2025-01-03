import Link from 'next/link';

export default function Home() { 
    return (
    <div className="navbar"> 
            <Link href="/"> 
                <img className='logo' src="/logo.ico" alt="logo" />
            </Link>
            <ul className="menu"> 
                <li>Home</li> 
                <li>Kaufreue</li>
                <li>Community</li>
                <li>
                <Link href="/comments" className="navLink">
                    Diskussion
                </Link> 
                </li>
            </ul>
            <div className="auth-buttons">
                <Link href="/login">
                <button className="login-button">Login</button>
                </Link>
                <Link href="/register">
                <button className="register-button">Registrieren</button>
                </Link>
            </div>
        </div>
    );
}
