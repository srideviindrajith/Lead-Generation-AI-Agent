import { useEffect, useState } from 'react';
import { ArrowRight, Radar, Check, Radio } from 'lucide-react';

export function CTASection() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    const el = document.getElementById('cta');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section id="cta" className="relative py-32 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-signal-cyan/5 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-signal-lime/3 blur-[100px] rounded-full" />

      <div className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8">
          <Radio className="w-4 h-4 text-signal-cyan animate-pulse" />
          <span className="text-xs font-mono text-signal-cyan tracking-wider">READY FOR DEPLOYMENT</span>
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-6">
          <span className="text-gradient-white">ACTIVATE</span>
          <br />
          <span className="text-gradient-cyan glow-text-cyan">LEAD INTELLIGENCE</span>
        </h2>

        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
          Deploy PhoenixAI and start detecting buying intent before your visitors
          ever fill out a form. Your signal grid goes live in minutes.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              className="w-full sm:flex-1 px-5 py-3.5 bg-graphite-800/60 border border-signal-cyan/15 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-signal-cyan/40 focus:bg-graphite-800 transition-all font-mono text-sm"
            />
            <button
              type="submit"
              className="group flex items-center gap-2 px-7 py-3.5 bg-signal-cyan text-graphite-900 font-semibold rounded-xl hover:bg-signal-cyan-bright transition-all hover:shadow-xl hover:shadow-signal-cyan/30 clip-corner whitespace-nowrap"
            >
              Activate Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-signal-lime/10 border border-signal-lime/30 max-w-md mx-auto animate-bounce-in">
            <Check className="w-5 h-5 text-signal-lime" />
            <span className="text-signal-lime font-mono text-sm">Signal grid activated — check your inbox</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs font-mono text-gray-600">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-signal-cyan" />
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-signal-lime" />
            Deploy in under 5 minutes
          </span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-signal-teal" />
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-signal-cyan/10 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-signal-cyan/20 rounded-lg blur-md" />
                <Radar className="relative w-7 h-7 text-signal-cyan" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Phoenix<span className="text-phoenix-orange">AI</span>
                <span className="text-[10px] font-mono text-signal-cyan/60 tracking-widest uppercase ml-1">Studio</span>
              </span>
            </a>
            <p className="text-sm text-gray-500 max-w-xs">
              Conversion Intelligence Lab — detecting buying intent before they ask.
              Signal intelligence for modern revenue teams.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">Platform</h4>
            <ul className="space-y-2">
              {['Live Signals', 'Qualification', 'Analytics', 'Packages'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-500 hover:text-signal-cyan transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">System</h4>
            <ul className="space-y-2">
              {['Status: Operational', 'Uptime: 99.98%', 'Latency: 42ms', 'Version: 3.2.1'].map((item) => (
                <li key={item} className="text-sm text-gray-500 font-mono flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-signal-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-mono">
            © 2026 PhoenixAI Studio — Conversion Intelligence Laboratory
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-signal-lime animate-blink" />
            <span className="text-xs font-mono text-signal-lime/60">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
