'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
    const [activeItem, setActiveItem] = useState(null); // Zustand für das aktive Element ('iphone', 'chocolate', 'bottle')
    const [discardingItem, setDiscardingItem] = useState(null); // Zustand für das Objekt, das verworfen wird
    const [infoVisible, setInfoVisible] = useState(false); // Zustand für das Info-Textfeld

    const handleItemClick = (item) => {
        setActiveItem(activeItem === item ? null : item);
    };

    const handleDiscard = (item) => {
        setDiscardingItem(item);
        setTimeout(() => {
            setActiveItem(null);
            setDiscardingItem(null);
        }, 1000);
    };

    const toggleInfo = (e) => {
        e.stopPropagation(); // Verhindert, dass das Klick-Event zum globalen Listener durchläuft
        setInfoVisible((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (infoVisible) {
                setInfoVisible(false); // Blendet das Textfeld aus, wenn irgendwo anders geklickt wird
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [infoVisible]);

    return (
        <div className="hero-container flex flex-col lg:flex-row items-center justify-between bg-[#F0F7EC] p-20 relative">
            <div className="hero-text-container text-center lg:text-left">
                <h1 className="text-[8rem] font-trash-hand text-black mb-6 leading-none">
                    CONSUMER<span className="text-[#A9D09A]">LESSM</span>
                </h1>
                <p className="text-2xl font-anonymous-pro text-gray-600 mb-8 text-center leading-snug">
                    RAUS AUS DEM WARENKORB!
                </p>

                <div className="flex flex-col items-center">
                    <p className="hero-text text-lg font-anonymous-pro text-gray-700 mb-3">
                        Werde Teil unserer Community!
                    </p>
                    <Link href="Register">
                    <button className="hero-button bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded shadow text-lg">
                        Jetzt anmelden
                    </button>
                    </Link>
                </div>
                <Link href="#kaufreue-section">
                    <img src="/pfeil.svg" alt="Pfeil" className="hidden lg:block mt-20 max-w-none lg:w-[60px] lg:h[60px]" />
                </Link>
            </div>

            <div className="hero-image-container relative">
                {/* Info-Icon */}
                <div className="relative" onClick={toggleInfo}>
                    <img
                        src="/info.svg"
                        alt="Info"
                        className="info w-12 h-12 absolute top-0 right-0 mt-4 mr-4 cursor-pointer"
                    />
                    {infoVisible && (
                        <div className="absolute top-0 right-16 mt-4 bg-white border border-gray-300 p-4 rounded shadow-lg text-gray-800 w-60 overflow-hidden transform transition-all duration-500">
                            <p className="text-sm font-anonymous-pro">
                                Klicke auf die Artikel, um den Warenkorb zu leeren.
                            </p>
                        </div>
                    )}
                </div>

                {/* Einkaufswagen-Bild */}
                <img
                    src="/cart.svg"
                    alt="Einkaufswagen"
                    className="wagen w-full max-w-none lg:w-[700px] lg:h-[700px]"
                />

                {/* iPhone-Bild */}
                <img
                    src="/iphone.svg"
                    alt="iPhone"
                    className={`absolute transition-all duration-500 animate-float ${
                        discardingItem === 'iphone'
                            ? 'animate-discard'
                            : activeItem === 'iphone'
                            ? 'top-[-30px] left-[23%] transform -translate-x-[50%]'
                            : 'top-[28%] left-[23%] transform -translate-x-[50%] -translate-y-[50%]'
                    } lg:w-[120px] lg:h-[240px] cursor-pointer`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick('iphone');
                    }}
                />

                {/* Textfeld für iPhone */}
                {activeItem === 'iphone' && (
                    <div className="absolute top-[-10px] left-[36%] bg-white border border-[#A9D09A] p-4 rounded shadow-lg text-gray-800">
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

                {/* Schokolade-Bild */}
                <img
                    src="/schokolade.svg"
                    alt="Dubai-Schokolade"
                    className={`absolute transition-all duration-500 animate-float-slow ${
                        discardingItem === 'chocolate'
                            ? 'animate-discard'
                            : activeItem === 'chocolate'
                            ? 'top-[-50px] left-[32%] transform -translate-x-[50%]'
                            : 'top-[18%] left-[32%] transform -translate-x-[50%] -translate-y-[50%]'
                    } lg:w-[120px] lg:h-[240px] cursor-pointer`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick('chocolate');
                    }}
                />

                {/* Textfeld für Schokolade */}
                {activeItem === 'chocolate' && (
                    <div className="absolute top-[0px] left-[50%] bg-white border border-[#A9D09A] p-4 rounded shadow-lg text-gray-800">
                        <p className="text-sm font-anonymous-pro mb-4">
                            Noch ein Essenstrend? Überleg dir ob du wirklich so viel Geld für Schokolade ausgeben möchtest!
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

                {/* Flasche-Bild */}
                <div
                    className={`absolute ${
                        discardingItem === 'bottle'
                            ? 'animate-discard'
                            : activeItem === 'bottle'
                            ? 'top-[-10px] left-[43%]'
                            : 'top-[30%] left-[43%] transform rotate-[75deg]'
                    } transition-all duration-500`}
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

                {/* Textfeld für Flasche */}
                {activeItem === 'bottle' && (
                    <div className="absolute top-[0px] left-[56%] bg-white border border-[#A9D09A] p-4 rounded shadow-lg text-gray-800">
                        <p className="text-sm font-anonymous-pro mb-4">
                            Überleg dir, ob du wirklich jedes Mal Flaschen kaufen musst, oder ob du nicht lieber eine wiederverwendbare Flasche benutzen möchtest!
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
            </div>
        </div>
    );
}
