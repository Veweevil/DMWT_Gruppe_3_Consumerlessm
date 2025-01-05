import Header from './components/Header';
import Hero from './components/Hero';
import Community from './components/Community';

export default function Home() {
  return (
    <div className="body">
        <div className="Header"> <Header/> </div>
        <Hero/>
        <Community/>
    </div>
  )
}
