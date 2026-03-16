import { useState } from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

const Landing = ({ onLogin }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLoginSuccess = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen">
      <Hero onLogin={handleLoginClick} />
      <HowItWorks />
      <Features />
      <Stats />
      <Footer />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
};

export default Landing;
