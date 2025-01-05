import Header from './components/Header';
import Hero from './components/Hero';
import Kaufreue from './components/Kaufreue';

export default function Home() {
  return (
    <div className="body">
        <div className="Header"> <Header/> </div>
        <Hero/>
        <div id="kaufreue-section">
          <Kaufreue/>
        </div>
    </div>
  )
}
