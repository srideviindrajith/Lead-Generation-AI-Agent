import { SignalBackground } from '@/components/SignalBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SignalStream } from '@/components/SignalStream';
import { ConversionFunnel } from '@/components/ConversionFunnel';
import { QualificationConsole } from '@/components/QualificationConsole';
import { IntentVisualization } from '@/components/IntentVisualization';
import { Packages } from '@/components/Packages';
import { CTASection, Footer } from '@/components/CTASection';

function App() {
  return (
    <div className="relative min-h-screen text-gray-200 noise-overlay">
      <SignalBackground />
      <Navbar />
      <main>
        <Hero />
        <SignalStream />
        <ConversionFunnel />
        <QualificationConsole />
        <IntentVisualization />
        <Packages />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
