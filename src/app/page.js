import Header from './components/Header';
import Hero from './components/Hero';
import Community from './components/Community';
import Kaufreue from './components/Kaufreue';

export default function Home() {
  return (
    <div className="body">
        <div className="Header"> <Header/> </div>
        <div> <Hero/> </div>
        <div id="kaufreue-section"> <Kaufreue/> </div>
        <div> <Community/> </div>
    </div>
  );
}
