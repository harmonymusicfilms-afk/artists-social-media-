
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
