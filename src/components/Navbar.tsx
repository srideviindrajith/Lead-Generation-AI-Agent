import { useEffect, useState } from 'react';
import { Radar, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Live Signals', href: '#signals' },
    { label: 'Qualification', href: '#qualification' },
    { label: 'Lead Profile', href: '#lead-profile' },
    { label: 'Packages', href: '#packages' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-graphite-900/80 backdrop-blur-xl border-b border-signal-cyan/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-signal-cyan/20 rounded-lg blur-md group-hover:bg-signal-cyan/30 transition-all" />
              <Radar className="relative w-7 h-7 text-signal-cyan group-hover:rotate-90 transition-transform duration-700" strokeWidth={1.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Phoenix<span className="text-phoenix-orange">AI</span>
            </span>
            <span className="hidden sm:block text-[10px] font-mono text-signal-cyan/60 tracking-widest uppercase ml-1">
              Studio
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-signal-cyan transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-signal-cyan group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-signal-lime/10 border border-signal-lime/20">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-lime animate-blink" />
              <span className="text-xs font-mono text-signal-lime">SYSTEM ACTIVE</span>
            </div>
            <a
              href="#cta"
              className="px-5 py-2 text-sm font-semibold text-graphite-900 bg-signal-cyan hover:bg-signal-cyan-bright rounded-lg transition-all hover:shadow-lg hover:shadow-signal-cyan/30 clip-corner-sm"
            >
              Activate Intelligence
            </a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-graphite-900/95 backdrop-blur-xl border-b border-signal-cyan/10 animate-fade-in-down">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-signal-cyan transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2.5 text-sm font-semibold text-graphite-900 bg-signal-cyan rounded-lg text-center"
            >
              Activate Intelligence
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
