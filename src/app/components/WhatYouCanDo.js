import { useState } from 'react';

export default function WhatYouCanDo() {
    const [popupInfo, setPopupInfo] = useState(null);

    const handleSectionClick = (info) => {
        setPopupInfo(info);
    };

    const closePopup = () => {
        setPopupInfo(null);
    };

    return (
        <div className="hintergrund hintergrund-relative min-h-screen">
            <h1 className="ueberschrift">Was du tun kannst</h1>
            <div className="container container-relative">

                {/* Second Hand Section */}
                <div className="secondHand" onClick={() => handleSectionClick
                    /* Popup */
                    ({ title: 'Second Hand',
                            content: 'Kaufe Second-Hand-Produkte und verkaufe Dinge, die du nicht mehr brauchst ' +
                                     '(z.B. auf Vinted, Ebay oder Kleinanzeigen). ' +
                                     'Dann finden deine alten Gegenstände ein neues Zuhause ' +
                                     'und du hast mehr Raum zum Atmen und nur Dinge, die du wirklich magst. ',
                            svg: 'iphone.svg',
                    })}>

                    <div className="relative bg-cover bg-center hover:scale-105 transition-transform cursor-pointer"
                         style={{
                             backgroundImage: "url('/Rahmen6.svg')",
                             backgroundRepeat: "no-repeat",
                             backgroundSize: "500px 500px",
                             overflow: "visible",
                             width: "500px",
                             height: "500px",
                             alignItems: "center",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                         }}>
                        <img src="iphone.svg" alt="Iphone Illustration" className="illustration" />
                        <p className="font-bold text-3xl text-[#A9D09A]">Second Hand</p>
                        <p className={"body body-centred"}>Kaufe Second-Hand-Produkte und verkaufe Dinge, die du nicht mehr brauchst.</p>
                    </div>
                </div>

                {/* DIY Section */}
                <div className="diy" onClick={() => handleSectionClick
                    /* Popup */
                    ({ title: 'DIY/Upcycling',
                            content: 'Vermeide Müll und gib alten Dingen ein neues Leben. ' +
                                     'Flicke deinen Pulli, repariere deine wackeligen Stühle oder stricke dir eine Mütze. ' +
                                     'Es gibt viele Möglichkeiten, Dinge zu reparieren oder umzugestalten. Probier es aus! ',
                            svg: 'jacke-haengend.svg',
                    })}>

                    <div className="relative bg-cover bg-center hover:scale-105 transition-transform cursor-pointer"
                         style={{
                             backgroundImage: "url('/Rahmen5.svg')",
                             backgroundRepeat: "no-repeat",
                             width: "500px",
                             height: "550px",
                             backgroundSize: "500px 500px",
                             overflow: "visible",
                             alignItems: "center",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                         }}>
                        <img src="jacke-haengend.svg" alt="Jacke Illustration" className="illustration illustration-jacke" />
                        <p className="font-bold text-3xl text-[#A9D09A]">DIY/Upcycling</p>
                        <p className={"body body-centred"}>Repariere Dinge, anstatt diese zu entsorgen oder mache etwas ganz neues daraus.</p>
                    </div>
                </div>

                {/* Mehrweg Section */}
                <div className="mehrweg" onClick={() => handleSectionClick
                    /* Popup */
                    ({ title: 'Mehrweg',
                            content: 'Verwende z.B. eine auffüllbare Trinkflasche, anstatt Einweg-Wasserflaschen zu kaufen ' +
                                     'oder nutze RECUP/REBOWL wenn du dir Takeaway kaufst ' +
                                     'und keinen eigenen Behälter dabei hast. ',
                            svg: 'flasche.svg',
                    })}>

                    <div className="relative bg-cover bg-center hover:scale-105 transition-transform cursor-pointer"
                         style={{
                             backgroundImage: "url('/Rahmen4.svg')",
                             backgroundRepeat: "no-repeat",
                             width: "400px",
                             height: "400px",
                             overflow: "visible",
                             backgroundSize: "400px 400px",
                             alignItems: "center",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                         }}>
                        <img src="flasche.svg" alt="Flasche Illustration" className="illustration" />
                        <p className="font-bold text-3xl text-[#A9D09A]">Mehrweg</p>
                        <p className={"body body-centred"}>Verwende langlebige und wiederverwendbare Produkte.</p>
                    </div>
                </div>

            </div>

            {/* Popup */}
            {popupInfo && (
                <div className="popup-container" onClick={closePopup}>
                    <div className="popup-content">
                        <p className="font-bold text-3xl text-[#A9D09A]">{popupInfo.title}</p>
                        <img src={popupInfo.svg} alt={`${popupInfo.title} Illustration`} className="illustration" />
                        <p style={{ maxWidth: '600px' }}>{popupInfo.content}</p>
                        <button onClick={closePopup} className="bg-[#A9D09A] hover:bg-[#90B883] text-gray-800 px-4 py-2 rounded mt-4">Schließen</button>
                    </div>
                </div>
            )}

            {/* Der Text ganz unten
            <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6  mt-6 text-center">
                All das und viel mehr findest du in unserer Community. Werde aktiv durch Consumerlessm!
            </p>*/}

        </div>
    );
}