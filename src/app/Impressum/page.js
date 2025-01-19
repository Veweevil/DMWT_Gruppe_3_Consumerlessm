'use client';
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Impressum() {
  return (
    <div>
    <div className="pt-24 min-h-screen bg-gray-50 flex flex-col text-center items-center justify-center px-4">
        <Header />
      <div className="w-[800px] bg-white shadow-md rounded-lg p-6 mb-12">
        <h1 className="ueberschrift">
          Impressum
        </h1>
        <div className="text-gray-800 space-y-4">
          <div>
            <h2 className="font-semibold text-lg">Verantwortlich für den Inhalt:</h2>
            <p className = "mb-10">Dieses Projekt wurde im Rahmen einer universitären Lehrveranstaltung an der Hochschule Reutlingen, Fakultät Informatik entwickelt.</p>
            <p className="mb-10">
              Verantwortlich gemäß §5 TMG:<br />
              Verena Schelling, Babur Berivan, Efe Özkan und Aaron Ahammed<br />
              Hochschule Reutlingen<br />
              Alteburgstraße 150<br />
              72762 Reutlingen<br />
              Deutschland
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Hinweis:</h2>
            <p className="mb-5">
            Diese Website dient ausschließlich zu Studien- und Lernzwecken und verfolgt keine kommerziellen Interessen.
            </p>
          </div>
          
        
          <div>
            <h2 className="font-semibold text-lg">Urheberrecht:</h2>
            <p>
              Alle Inhalte und Grafiken auf dieser Website unterliegen dem deutschen Urheberrecht oder sind selber erstellt von Verena Schelling. Die unautorisierte
              Nutzung, Reproduktion oder Weitergabe ist untersagt.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
