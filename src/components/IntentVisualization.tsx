import { useEffect, useState, useRef } from 'react';
import { Activity, Gauge, Waves, BarChart3, TrendingUp } from 'lucide-react';

const ACTIVITY_TYPES = [
  { label: 'Page scroll depth', color: 'signal-cyan' },
  { label: 'Time on page', color: 'signal-teal' },
  { label: 'Click velocity', color: 'signal-cyan' },
  { label: 'Pricing hover', color: 'signal-lime' },
  { label: 'Form focus', color: 'signal-lime' },
  { label: 'Navigation pattern', color: 'signal-teal' },
  { label: 'Return visit', color: 'signal-cyan' },
  { label: 'Demo request', color: 'signal-lime' },
];

export function IntentVisualization() {
  const [intentLevel, setIntentLevel] = useState(45);
  const [waveform, setWaveform] = useState<number[]>(Array(40).fill(20));
  const [activityLog, setActivityLog] = useState<{ id: string; label: string; value: number; color: string }[]>([]);
  const [barData, setBarData] = useState<number[]>(Array(12).fill(0).map(() => Math.random() * 60 + 20));
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const idCounter = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const waveformInterval = setInterval(() => {
      setWaveform((prev) => {
        const next = [...prev.slice(1)];
        const base = intentLevel * 0.6;
        const variance = (Math.random() - 0.5) * 30;
        next.push(Math.max(5, Math.min(95, base + variance)));
        return next;
      });
    }, 150);

    const activityInterval = setInterval(() => {
      const type = ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
      const value = Math.floor(Math.random() * 100);
      idCounter.current++;
      setActivityLog((prev) => [
        { id: `act-${idCounter.current}`, label: type.label, value, color: type.color },
        ...prev,
      ].slice(0, 10));

      setIntentLevel((prev) => {
        const delta = (Math.random() - 0.3) * 8;
        return Math.max(20, Math.min(98, prev + delta));
      });

      setBarData((prev) => [...prev.slice(1), Math.random() * 80 + 15]);
    }, 1800);

    for (let i = 0; i < 6; i++) {
      const type = ACTIVITY_TYPES[i % ACTIVITY_TYPES.length];
      idCounter.current++;
      setActivityLog((prev) => [
        { id: `act-init-${i}`, label: type.label, value: Math.floor(Math.random() * 100), color: type.color },
        ...prev,
      ].slice(0, 10));
    }

    return () => {
      clearInterval(waveformInterval);
      clearInterval(activityInterval);
    };
  }, [intentLevel]);

  const intentColor = intentLevel >= 75 ? 'text-signal-lime' : intentLevel >= 50 ? 'text-signal-teal' : 'text-signal-cyan';
  const intentBg = intentLevel >= 75 ? 'bg-signal-lime' : intentLevel >= 50 ? 'bg-signal-teal' : 'bg-signal-cyan';

  return (
    <section ref={sectionRef} className="relative py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-signal-cyan/40" />
            <span className="text-xs font-mono text-signal-cyan tracking-widest uppercase">Behavioral Analytics</span>
            <div className="w-8 h-px bg-signal-cyan/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white mb-4">
            Intent Detection Array
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Multiple sensors monitor visitor behavior simultaneously. The system correlates
            signals to compute a real-time intent level.
          </p>
        </div>

        <div className={`grid lg:grid-cols-12 gap-6 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="lg:col-span-4 glass-panel rounded-2xl p-6 clip-corner">
            <div className="flex items-center gap-2 mb-5">
              <Gauge className="w-5 h-5 text-signal-cyan" />
              <span className="text-sm font-semibold text-white">Intent Meter</span>
            </div>

            <div className="relative w-full aspect-square mb-5 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="intentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#1a1f28" strokeWidth="12" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#intentGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="502"
                  strokeDashoffset={502 - (502 * intentLevel) / 100}
                  style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 100 + Math.cos(rad) * 72;
                  const y1 = 100 + Math.sin(rad) * 72;
                  const x2 = 100 + Math.cos(rad) * 88;
                  const y2 = 100 + Math.sin(rad) * 88;
                  return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2a3340" strokeWidth="2" />;
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-black font-mono ${intentColor}`}>{Math.round(intentLevel)}</span>
                <span className="text-[10px] font-mono text-gray-500 tracking-widest mt-1">INTENT LEVEL</span>
                <div className={`mt-2 px-2 py-0.5 rounded-full ${intentBg}/10 border ${intentBg}/20`}>
                  <span className={`text-[10px] font-mono ${intentColor}`}>
                    {intentLevel >= 75 ? 'HIGH INTENT' : intentLevel >= 50 ? 'MEDIUM INTENT' : 'LOW INTENT'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Engagement Velocity', value: Math.min(100, intentLevel * 1.1), color: 'bg-signal-cyan' },
                { label: 'Content Depth', value: Math.min(100, intentLevel * 0.9), color: 'bg-signal-teal' },
                { label: 'Buying Signals', value: Math.min(100, intentLevel * 1.05), color: 'bg-signal-lime' },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span className="text-gray-500">{metric.label}</span>
                    <span className="text-gray-400">{Math.round(metric.value)}%</span>
                  </div>
                  <div className="h-1 bg-graphite-800 rounded-full overflow-hidden">
                    <div className={`h-full ${metric.color} rounded-full transition-all duration-700`} style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 clip-corner">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-signal-cyan" />
                <span className="text-sm font-semibold text-white">Signal Waveform</span>
              </div>
              <span className="text-[10px] font-mono text-signal-cyan/60">real-time</span>
            </div>

            <div className="relative h-48 flex items-end gap-0.5 mb-4">
              {waveform.map((value, i) => {
                const height = value * 1.5;
                const isRecent = i > waveform.length - 5;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all duration-150"
                    style={{
                      height: `${height}%`,
                      background: isRecent
                        ? `linear-gradient(to top, rgba(34, 211, 238, 0.8), rgba(163, 230, 53, 0.8))`
                        : `rgba(34, 211, 238, ${0.15 + (i / waveform.length) * 0.4})`,
                    }}
                  />
                );
              })}
              <div className="absolute inset-x-0 top-1/2 h-px bg-signal-cyan/10" />
              <div className="absolute inset-x-0 top-1/4 h-px bg-signal-cyan/5" />
              <div className="absolute inset-x-0 top-3/4 h-px bg-signal-cyan/5" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Freq', value: '2.4Hz', color: 'text-signal-cyan' },
                { label: 'Amp', value: '0.87', color: 'text-signal-teal' },
                { label: 'Phase', value: '42°', color: 'text-signal-cyan' },
                { label: 'Noise', value: '0.03', color: 'text-signal-lime' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2 rounded-lg bg-graphite-800/30">
                  <div className={`text-sm font-bold font-mono ${stat.color}`}>{stat.value}</div>
                  <div className="text-[9px] font-mono text-gray-600 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 glass-panel rounded-2xl p-6 clip-corner">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-signal-cyan" />
                <span className="text-sm font-semibold text-white">Activity Stream</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-signal-lime animate-blink" />
            </div>

            <div className="space-y-2 max-h-[340px] overflow-hidden">
              {activityLog.map((activity, i) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-graphite-800/30 animate-slide-in-right"
                  style={{ opacity: Math.max(0.3, 1 - i * 0.1) }}
                >
                  <div className={`w-1 h-8 rounded-full bg-${activity.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-300 truncate">{activity.label}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 h-1 bg-graphite-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${activity.color} rounded-full transition-all duration-500`}
                          style={{ width: `${activity.value}%` }}
                        />
                      </div>
                      <span className={`text-[9px] font-mono text-${activity.color}`}>{activity.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-12 glass-panel rounded-2xl p-6 clip-corner">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-signal-cyan" />
                <span className="text-sm font-semibold text-white">Score Transition Matrix</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-signal-lime" />
                  <span className="text-[10px] font-mono text-gray-500">trending up</span>
                </div>
                <span className="text-[10px] font-mono text-signal-cyan/60">rolling 12h window</span>
              </div>
            </div>

            <div className="flex items-end gap-2 h-32">
              {barData.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-md transition-all duration-500 relative group"
                      style={{
                        height: `${value}%`,
                        background: value > 60
                          ? 'linear-gradient(to top, rgba(163, 230, 53, 0.2), rgba(163, 230, 53, 0.7))'
                          : value > 30
                            ? 'linear-gradient(to top, rgba(45, 212, 191, 0.2), rgba(45, 212, 191, 0.6))'
                            : 'linear-gradient(to top, rgba(34, 211, 238, 0.2), rgba(34, 211, 238, 0.5))',
                      }}
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {Math.round(value)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-gray-700">{i + 1}h</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-800">
              {[
                { label: 'Peak Intent', value: '94%', color: 'text-signal-lime' },
                { label: 'Avg. Session', value: '4m 12s', color: 'text-signal-cyan' },
                { label: 'Signal Count', value: '847', color: 'text-signal-teal' },
                { label: 'Trend', value: '+18.3%', color: 'text-signal-lime' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] font-mono text-gray-600 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
