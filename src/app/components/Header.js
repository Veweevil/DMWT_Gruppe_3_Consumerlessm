import Link from 'next/link';

export default function Header() {
    return (
        <div className="navbar flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200">
            <Link href="/"> 
                <img className="logo h-8 w-auto" src="/logo.ico" alt="logo" />
            </Link>
            <ul className="menu flex space-x-6">
                <li>
                    <Link href="/" className="text-gray-700 hover:text-black">Home
                    </Link>
                </li>
                <li className="text-gray-700 hover:text-black">
                    <Link href = "/#kaufreue-section">
                    Kaufreue
                    </Link>
                </li>
                <li className="text-gray-700 hover:text-black">Community</li>
                <li>
                    <Link href="/comments" className="navLink text-gray-700 hover:text-black">
                        Kommentare
                    </Link>
                </li>
            </ul>
            <div className="auth-buttons flex space-x-4">
                <Link href="/login">
                    <button className="login-button bg-[#A9D09A] hover:bg-[#90B883] text-gray-800 px-4 py-2 rounded">
                        Login
                    </button>
                </Link>
                <Link href="/register">
                    <button className="register-button bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded">
                        Registrieren
                    </button>
                </Link>
            </div>
        </div>
    );
}