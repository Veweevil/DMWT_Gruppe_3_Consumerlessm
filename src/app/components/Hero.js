import Link from 'next/link';

export default function Hero() {
    return (
        <div className="hero-container flex flex-col lg:flex-row items-center justify-between bg-[#F0F7EC] p-20">
            <div className="hero-text-container text-center lg:text-left">
                {/* Logo als Text */}
                <h1 className="text-[12rem] font-trash-hand text-black mb-6 leading-none">
                    CONSUMER<span className="text-[#A9D09A]">LESSM</span>
                </h1>
                <p className="text-5xl font-anonymous-pro text-gray-600 mb-10 text-center leading-snug">
                    RAUS AUS DEM WARENKORB!
                </p>

                {/* Community-Text */}
                <div className="flex flex-col items-center">
                    <p className="hero-text text-2xl font-anonymous-pro text-gray-700 mb-4">
                        Werde Teil unserer Community!
                    </p>

                    {/* Button */}
                    <button className="hero-button bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded shadow text-xl">
                        Jetzt anmelden
                    </button>
                </div>
            </div>
            <div className="hero-image-container">
                {/* Einkaufswagen-Bild */}
                <img src="/einkaufswagen.png" alt="Einkaufswagen" className="wagen w-full max-w-7xl lg:max-w-[200rem]" />
            </div>
        </div>
    );
}