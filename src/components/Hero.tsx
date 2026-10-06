import { useEffect, useState } from 'react';
import { Activity, ArrowRight, Satellite, Zap } from 'lucide-react';

export function Hero() {
  const [activeCount, setActiveCount] = useState(347);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount((prev) => prev + Math.floor(Math.random() * 3));
      setScanning(true);
      setTimeout(() => setScanning(false), 600);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-signal-cyan/5 blur-[100px] rounded-full animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-signal-lime/3 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 animate-fade-in-down">
          <Satellite className="w-4 h-4 text-signal-cyan animate-pulse" />
          <span className="text-xs font-mono text-signal-cyan tracking-wider">CONVERSION INTELLIGENCE LAB</span>
          <div className="w-px h-3 bg-signal-cyan/30" />
          <span className="text-xs font-mono text-gray-500">v3.2.1</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 animate-fade-in-up">
          <span className="text-gradient-white">DETECT</span>
          <br />
          <span className="text-gradient-cyan glow-text-cyan">BUYING INTENT</span>
          <br />
          <span className="text-gradient-white">BEFORE THEY ASK.</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          PhoenixAI monitors visitor behavior in real time — transforming anonymous signals into
          qualified, sales-ready leads through autonomous AI qualification.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="#cta"
            className="group flex items-center gap-2 px-7 py-3.5 bg-signal-cyan text-graphite-900 font-semibold rounded-xl hover:bg-signal-cyan-bright transition-all hover:shadow-xl hover:shadow-signal-cyan/30 clip-corner"
          >
            Activate Lead Intelligence
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#signals"
            className="group flex items-center gap-2 px-7 py-3.5 glass-panel text-white font-medium rounded-xl hover:border-signal-cyan/30 transition-all"
          >
            <Activity className="w-4 h-4 text-signal-cyan" />
            View Live Signals
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          {[
            { label: 'Active Signals', value: activeCount, color: 'text-signal-cyan', icon: Activity },
            { label: 'Intent Detected', value: '23', color: 'text-signal-lime', icon: Zap },
            { label: 'Leads Captured', value: '8', color: 'text-signal-teal', icon: Satellite },
            { label: 'Avg. Score', value: '87', color: 'text-signal-cyan', icon: Activity },
          ].map((stat, i) => (
            <div key={i} className="glass-panel-light rounded-xl p-4 text-left clip-corner-sm group hover:border-signal-cyan/20 transition-all">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <div className={`w-2 h-2 rounded-full bg-current ${stat.color} ${scanning ? 'animate-blink' : ''}`} />
              </div>
              <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
        <span className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">Scroll to Monitor</span>
        <div className="w-px h-12 bg-gradient-to-b from-signal-cyan/40 to-transparent" />
      </div>
    </section>
  );
}
