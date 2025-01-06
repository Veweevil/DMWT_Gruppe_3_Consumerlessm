import Link from "next/link";
export default function Community() {
    return (
<div id ="community-section" className=" bg-[#F0F7EC] p-20">
    <h1 className="mb-10 font-trash-hand text-center text-7xl">Community</h1>
    <hr className="trennlinie"/>
    <p className="mb-10 font-anonymous-pro text-center text-3xl italic">&bdquo;Entdecke die Community, die dich inspiriert&ldquo;</p>
    <img className="mx-auto mb-10 rounded" src="community.jpg" alt="Peoples holding each others" width="800" height="300"></img>
    <div className="container">
        <h1 className ="item">Challenges</h1>
        {/*<p>Text zu Challanges</p>*/}
        <h1 className="item">Ressourcen</h1>
        {/*<p>Text zu Ressourcen</p>*/}
        <h1 className="item">Community-Support</h1>
        {/*<p>Text zu Community-Support</p>*/}
        <h1 className="item">Events</h1>
        {/*<p>Text zu Events</p>*/}
    </div>
</div>
    );
}