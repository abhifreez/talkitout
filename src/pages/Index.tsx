import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MedicineSection } from '@/components/MedicineSection';
import { ServicesSection } from '@/components/ServicesSection';
import { FoundersSection } from '@/components/FoundersSection';
import { DecathlonSection } from '@/components/DecathlonSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative">
      <Header />
      <main>
        <HeroSection />
        <MedicineSection />
        <ServicesSection />
        <FoundersSection />
        <DecathlonSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
