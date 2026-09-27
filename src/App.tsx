import { Header } from "./components/Header";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Benefits } from "./sections/Benefits";
import { Gallery } from "./sections/Gallery";
import { HowItWorks } from "./sections/HowItWorks";
import { ServiceArea } from "./sections/ServiceArea";
import { Testimonials } from "./sections/Testimonials";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";

function App() {
  return (
    <>
      <a
        href="#servicos"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-agro-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main>
        <Hero />
        <Services />
        <Benefits />
        <Gallery />
        <HowItWorks />
        <ServiceArea />
        <Testimonials />
        <FinalCta />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
