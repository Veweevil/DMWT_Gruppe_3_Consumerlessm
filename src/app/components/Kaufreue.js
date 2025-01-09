import Link from 'next/link';

export default function Kaufreue() {
    return (
        <div className="flex flex-col items-center justify-center bg-white min-h-screen p-10">
            {/* Prozentanzeige */}
            <div className="flex items-baseline mb-4">
            <h1 className="text-[8rem] font-trash-hand text-black leading-none">82</h1>
            <h1 className="text-[5rem] text-black ml-2" style={{ fontFamily: 'Arial, bold-serif' }}>
                %
            </h1>


            </div>
            <hr className="hr-mitte" />

            {/* Haupttext */}
            <p className="text-3xl font-anonymous-pro text-center text-black mb-6">
                der Verbraucher:innen erleben negative Gefühle nach unnötigen Käufen.
            </p>

            {/* Beschreibungstext */}
            <p className="text-lg font-anonymous-pro text-center text-gray-600 max-w-3xl mb-8">
            Der übermäßige Konsum kann nicht nur unsere Finanzen belasten, sondern auch unser Wohlbefinden beeinträchtigen. Viele Menschen fühlen sich nach unnötigen Käufen leer oder schuldig – ein Zustand, der langfristig zu Stress und Unzufriedenheit führen kann.
            </p>

            {/* Button */}
            <Link href="/Kaufreue">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded shadow text-xl">
                Mehr dazu
            </button>
            </Link>
        </div>
    );
}