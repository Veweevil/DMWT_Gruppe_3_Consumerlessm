export default function WhatYouCanDo() {
    return (
        <div className="hintergrund hintergrund-relative">
            <h1 className="ueberschrift">Was du tun kannst</h1>
            <div className="container container-relative">

                {/*Second Hand Section*/}
                <div className="secondHand">
                    <div className="relative bg-cover bg-center"
                         style={{
                             backgroundImage: "url('/Rahmen_3.svg')",
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
                        <img src="iphone.svg" alt="Illustration 1" className="illustration" />
                        <p className="font-bold text-3xl">Second Hand</p>
                        <p className={"body body-centred"}>Kaufe Second-Hand-Produkte und verkaufe deine alten Sachen</p>
                    </div>
                </div>


                {/*DIY Section*/}
                <div className="diy">
                    <div className="relative bg-cover bg-center"
                         style={{
                             backgroundImage: "url('/Rahmen_2.svg')",
                             backgroundRepeat: "no-repeat",
                             width: "500px",
                             height: "500px",
                             backgroundSize: "500px 500px",
                             overflow: "visible",
                             alignItems: "center",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                         }}>
                        <img src="illustration2.svg" alt="Illustration 2" className="illustration" />
                        <p className="font-bold text-3xl">DIY</p>
                        <p className={"body body-centred"}>Mache deine eigenen Produkte und repariere kaputte Dinge</p>
                    </div>
                </div>


                {/*Konsumpausen Section*/}
                <div className="konsumpausen">
                    <div className="relative bg-cover bg-center"
                         style={{
                             backgroundImage: "url('/Rahmen_1.svg')",
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
                        <img src="illustration3.svg" alt="Illustration 3" className="illustration" />
                        <p className="font-bold text-3xl">Konsumpausen</p>
                        <p className={"body body-centred"}>Gönne dir bewusste Pausen vom Konsum</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
