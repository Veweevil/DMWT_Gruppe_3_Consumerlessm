'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Hero() {
    const [activeItem, setActiveItem] = useState(null); //Zustand aktives Element
    const [discardingItem, setDiscardingItem] = useState(null); //Zustand verworfenes Objekt
    const [infoVisible, setInfoVisible] = useState(false); //Zustand Info-Feld
    const [cartItems, setCartItems] = useState(['iphone', 'chocolate', 'bottle', 'jacket']); //Liste Objekte im Warenkorb
    const { isLoggedIn, logout } = useAuth(); //Zugriff auf Login-Status und Logout-Funktion


    const handleItemClick = (item) => {
        setActiveItem(activeItem === item ? null : item);
    };

    const handleDiscard = (item) => {
        setDiscardingItem(item);
        setTimeout(() => {
            setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem !== item)); //Objekt entfernen
            setDiscardingItem(null);
        }, 1000); //Animationsdauer
    };

    const handleRestart = () => {
        setCartItems(['iphone', 'chocolate', 'bottle', 'jacket']); //Objekte wiederherstellen
    };

    const toggleInfo = (e) => {
        e.stopPropagation(); //Stoppt Eventweitergabe
        setInfoVisible((prev) => !prev);
    };

    const handleInfoClick = (e) => {
        e.stopPropagation(); //Stoppt Eventweitergabe
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (activeItem) setActiveItem(null); //Deaktiviert aktives Element
            if (infoVisible) setInfoVisible(false); //Blendet Info aus
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [activeItem, infoVisible]);

    return (
        <div className="hero-container flex flex-col lg:flex-row items-center justify-between bg-[#F0F7EC] p-20 relative">
            <div className="hero-text-container text-center lg:text-left">
                <h1 className="text-[8rem] font-trash-hand text-black mb-6 leading-none">
                    CONSUMER<span className="text-[#A9D09A]">LESS</span>M
                </h1>
                <p className="text-2xl font-anonymous-pro text-gray-600 mb-8 text-center leading-snug">
                    RAUS AUS DEM WARENKORB!
                </p>

                {!isLoggedIn ? (
                    //Wenn der Nutzer NICHT eingeloggt ist
                    <>
                       <div className="flex flex-col items-center">
                            <p className="hero-text text-lg font-anonymous-pro text-gray-700 mb-3">
                                Werde Teil unserer Community!
                            </p>
                            <Link href="Register">
                                <button 
                                    className="mt-2 bg-white text-black border-2 border-[#A9D09A] px-4 py-2 rounded hover:bg-[#A9D09A] hover:text-white"
                                >
                                    Jetzt registrieren
                                </button>
                            </Link>
                        </div>
                    </>
                ) : (
                    //Wenn der Nutzer EINGELOGGT ist
                    <>
                        <div className="flex flex-col items-center">
                            <p className="hero-text text-lg font-anonymous-pro text-gray-700 mb-3">
                                Willkommen zurück!
                            </p>
                            <Link href="/Dashboard">
                                <button 
                                    className="mt-2 bg-white text-black border-2 border-[#A9D09A] px-4 py-2 rounded hover:bg-[#A9D09A] hover:text-white"
                                >
                                    Zum Dashboard
                                </button>
                            </Link>
                        </div>
                    </>
                    
                )}
                 <div className="relative group">
          <a href="#kaufreue-section">
            <img
              src="/pfeil.svg"
              alt="Pfeil"
              className="hidden lg:block mt-20 max-w-none lg:w-[60px] lg:h[60px]"
            />
          </a>
          {/* Tooltip */}
          <div
            className="absolute left-[70px] top-[10px] opacity-0 group-hover:opacity-100 bg-white text-black border-2 border-[#A9D09A] text-sm font-anonymous-pro px-3 py-1 rounded-md shadow-lg transform scale-95 group-hover:scale-100 transition-all duration-300"
          >
            Scrolle dich durch die Seite!
          </div>
          </div>
            </div>

            <div className="hero-image-container relative">
                {/*Info und Restart*/}
                <div className="absolute top-4 right-4 flex space-x-4">
                    <img
                        src="/info.svg"
                        alt="Info"
                        className="w-12 h-12 cursor-pointer hover:scale-110 transition-transform duration-200"
                        onClick={toggleInfo}
                    />
                    <img
                        src="/restart.svg"
                        alt="Einkaufswagen zurücksetzen"
                        className="w-11 h-11 cursor-pointer hover:scale-110 transition-transform duration-200"
                        onClick={handleRestart}
                    />
                </div>
                {infoVisible && (
                    <div
                        className="absolute top-16 right-4 bg-white border border-gray-300 p-4 rounded shadow-lg text-gray-800 w-60 transform transition-all duration-500"
                        onClick={handleInfoClick} //Verhindert Schließen des Info-Feldes
                    >
                        <p className="text-sm font-anonymous-pro">
                            Klicke auf die Artikel, um den Warenkorb zu leeren.
                        </p>
                    </div>
                )}

                {/*Einkaufswagen*/}
                <img
                    src="/cart.svg"
                    alt="Einkaufswagen"
                    className="wagen w-full max-w-none lg:w-[700px] lg:h-[700px]"
                />
{cartItems.includes('jacket') && (
    <img
        src="/jacke.png"
        alt="Jacke"
        className={`absolute transition-all duration-500 animate-float-slow ${
            discardingItem === 'jacket'
                ? 'animate-discard-jacket'
                : activeItem === 'jacket'
                ? 'top-[-10px] left-[20%] transform -translate-x-[50%]'
                : 'top-[28%] left-[20%] transform -translate-x-[50%] -translate-y-[50%]'
        } cursor-pointer`}
        style={{
            width: 'auto', // Behalte die Breite dynamisch
            height: 'auto', // Behalte die Höhe dynamisch
            maxWidth: '150px', // Begrenze die maximale Breite
            maxHeight: '300px', // Begrenze die maximale Höhe
            filter: 'drop-shadow(0 0 5px #A9D09A)', // Schatten hinzufügen
        }}
        onClick={(e) => {
            e.stopPropagation();
            handleItemClick('jacket');
        }}
    />
)}
{/*Textfeld Jacke*/}
{activeItem === 'jacket' && (
    <div className="absolute top-[-10px] left-[42%] bg-white border border-[#A9D09A] p-4 rounded shadow-lg text-gray-800">
        <p className="text-sm font-anonymous-pro mb-4">
            Bei Kleidungsstücken wie Jacken lohnt sich ein Blick in Second-Hand-Läden. Brauchst du wirklich eine neue Jacke?
        </p>
        <div className="flex justify-end space-x-2">
            <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setActiveItem(null)}
            >
                Behalten
            </button>
            <button
                className="bg-[#A9D09A] text-white px-3 py-1 rounded"
                onClick={() => handleDiscard('jacket')}
            >
                Verwerfen
            </button>
        </div>
    </div>
)}

                {/*Schokolade*/}
                {cartItems.includes('chocolate') && (
                    <img
                        src="/schokolade.svg"
                        alt="Dubai-Schokolade"
                        className={`absolute transition-all duration-500 animate-float-slow ${
                            discardingItem === 'chocolate'
                                ? 'animate-discard-chocolate'
                                : activeItem === 'chocolate'
                                ? 'top-[-50px] left-[38%] transform -translate-x-[50%]'
                                : 'top-[15%] left-[38%] transform -translate-x-[50%] -translate-y-[50%]'
                        } lg:w-[120px] lg:h-[240px] cursor-pointer`}
                        style={{
                            filter: 'drop-shadow(0 0 5px #A9D09A)',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick('chocolate');
                        }}
                    />
                )}

               {/*Textfeld Schokolade*/}
{activeItem === 'chocolate' && (
    <div
        className="absolute top-[0px] left-[38%] bg-white border border-[#A9D09A] p-4 rounded shadow-lg text-gray-800"
        style={{
            transform: 'translateX(-100%)', // Positioniert das Textfeld links von der Schokolade
        }}
    >
        <p className="text-sm font-anonymous-pro mb-4">
            Noch ein Essenstrend? Überleg dir, ob du wirklich so viel Geld für Schokolade ausgeben möchtest!
        </p>
        <div className="flex justify-end space-x-2">
            <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setActiveItem(null)}
            >
                Behalten
            </button>
            <button
                className="bg-[#A9D09A] text-white px-3 py-1 rounded"
                onClick={() => handleDiscard('chocolate')}
            >
                Verwerfen
            </button>
        </div>
    </div>
)}

                {/*Flasche*/}
                {cartItems.includes('bottle') && (
                    <div
                        className={`absolute ${
                            discardingItem === 'bottle'
                                ? 'animate-discard-bottle'
                                : activeItem === 'bottle'
                                ? 'top-[-10px] left-[43%]'
                                : 'top-[30%] left-[43%] transform rotate-[75deg]'
                        } transition-all duration-500`}
                        style={{
                            filter: 'drop-shadow(0 0 5px #A9D09A)',
                        }}
                    >
                        <img
                            src="/flasche.svg"
                            alt="Wasserflasche"
                            className="animate-float-slower lg:w-[80px] lg:h-[160px] cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick('bottle');
                            }}
                        />
                    </div>
                )}

                {/*Textfeld Flasche*/}
{activeItem === 'bottle' && (
    <div
        className="absolute top-[-12px] left-[43%] bg-white border border-[#A9D09A] p-4 rounded shadow-lg text-gray-800"
        style={{
            transform: 'translateX(-100%)', // Positioniert das Textfeld links von der Flasche
        }}
    >
        <p className="text-sm font-anonymous-pro mb-4">
            Überleg dir, ob du wirklich jedes Mal Flaschen kaufen musst, oder ob du nicht lieber eine
            wiederverwendbare Flasche benutzen möchtest!
        </p>
        <div className="flex justify-end space-x-2">
            <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setActiveItem(null)}
            >
                Behalten
            </button>
            <button
                className="bg-[#A9D09A] text-white px-3 py-1 rounded"
                onClick={() => handleDiscard('bottle')}
            >
                Verwerfen
            </button>
        </div>
    </div>
)}

                
           {/*iPhone*/}
{cartItems.includes('iphone') && (
    <img
        src="/iphone.svg"
        alt="iPhone"
        className={`absolute transition-all duration-500 animate-float ${
            discardingItem === 'iphone'
                ? 'animate-discard-iphone'
                : activeItem === 'iphone'
                ? 'top-[0px] left-[52%] transform -translate-x-[50%]'
                : 'top-[20%] left-[52%]'
        } cursor-pointer`}
        style={{
            width: 'auto', // Behalte die Proportionen bei
            height: 'auto',
            maxWidth: '90px', // Maximale Breite
            maxHeight: '210px', // Maximale Höhe
            filter: 'drop-shadow(0 0 5px #A9D09A)',
        }}
        onClick={(e) => {
            e.stopPropagation();
            handleItemClick('iphone');
        }}
    />
)}

{/*Textfeld iPhone*/}
{activeItem === 'iphone' && (
    <div className="absolute top-[0px] left-[64%] bg-white border border-[#A9D09A] p-4 rounded shadow-lg text-gray-800">
        <p className="text-sm font-anonymous-pro mb-4">
            Auch kaputte Smartphones lassen sich noch reparieren. Überleg dir ob du wirklich ein neues brauchst!
        </p>
        <div className="flex justify-end space-x-2">
            <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setActiveItem(null)}
            >
                Behalten
            </button>
            <button
                className="bg-[#A9D09A] text-white px-3 py-1 rounded"
                onClick={() => handleDiscard('iphone')}
            >
                Verwerfen
            </button>
        </div>
    </div>
)}

            </div>
        </div>
    );
}

