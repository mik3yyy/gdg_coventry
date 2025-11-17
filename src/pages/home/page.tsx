
import { Header } from '../../components/feature/Header';
import { Footer } from '../../components/feature/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturedEvents } from './components/FeaturedEvents';
import { CommunityStats } from './components/CommunityStats';
import { TechFocus } from './components/TechFocus';
import { UpcomingEvents } from './components/UpcomingEvents';
import { JoinCommunity } from './components/JoinCommunity';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CommunityStats />
        {/* <UpcomingEvents /> */}
        {/* <FeaturedEvents /> */}
        <JoinCommunity />
        <TechFocus />

      </main>
      <Footer />
    </div>
  );
}
