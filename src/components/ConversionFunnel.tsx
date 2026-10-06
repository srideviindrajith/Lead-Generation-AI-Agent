import { useEffect, useState, useRef } from 'react';
import { Radar, Eye, DollarSign, Target, UserCheck, Trophy } from 'lucide-react';

const FUNNEL_STAGES = [
  { label: 'Signal', count: 1247, icon: Radar, color: 'signal-cyan', percentage: 100 },
  { label: 'Engagement', count: 534, icon: Eye, color: 'signal-cyan', percentage: 75 },
  { label: 'Intent', count: 287, icon: DollarSign, color: 'signal-teal', percentage: 56 },
  { label: 'Capture', count: 143, icon: Target, color: 'signal-lime', percentage: 38 },
  { label: 'Qualification', count: 67, icon: UserCheck, color: 'signal-lime', percentage: 22 },
  { label: 'Sales Ready', count: 29, icon: Trophy, color: 'signal-lime', percentage: 12 },
];

export function ConversionFunnel() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-signal-cyan/40" />
            <span className="text-xs font-mono text-signal-cyan tracking-widest uppercase">Conversion Pipeline</span>
            <div className="w-8 h-px bg-signal-cyan/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white mb-4">
            Signal to Sales Ready
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Each stage filters and enriches signals. The funnel narrows as AI qualifies intent —
            only the strongest signals reach sales readiness.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-2">
            {FUNNEL_STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const widthPercent = visible ? stage.percentage : 0;
              return (
                <div
                  key={stage.label}
                  className="relative group"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div
                    className={`relative flex items-center gap-4 p-4 rounded-xl glass-panel-light border border-${stage.color}/15 hover:border-${stage.color}/40 transition-all duration-700 clip-corner-sm`}
                    style={{
                      width: `${widthPercent}%`,
                      marginLeft: `${(100 - widthPercent) / 2}%`,
                      transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: `${i * 150}ms`,
                      opacity: visible ? 1 : 0,
                    }}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-${stage.color}/10 border border-${stage.color}/30 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${stage.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{stage.label}</span>
                        <span className={`text-lg font-bold font-mono text-${stage.color}`}>{stage.count}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-graphite-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-${stage.color} rounded-full`}
                            style={{
                              width: visible ? `${stage.percentage}%` : '0%',
                              transition: 'width 1s ease-out',
                              transitionDelay: `${i * 150 + 300}ms`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">{stage.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  {i < FUNNEL_STAGES.length - 1 && (
                    <div className="flex justify-center my-0.5">
                      <div className={`text-[10px] font-mono text-gray-600 ${visible ? 'animate-fade-in' : 'opacity-0'}`} style={{ transitionDelay: `${i * 150 + 200}ms` }}>
                        ↓ {((FUNNEL_STAGES[i + 1].count / stage.count) * 100).toFixed(0)}% pass-through
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="glass-panel rounded-2xl p-6 clip-corner">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-white">Flow Analysis</span>
              <span className="text-xs font-mono text-signal-cyan/60">last 30 days</span>
            </div>

            <div className="relative h-64 mb-4">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a3e635" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3, 4].map((i) => {
                  const startWidth = FUNNEL_STAGES[i].percentage * 1.6;
                  const endWidth = FUNNEL_STAGES[i + 1].percentage * 1.6;
                  const yStart = i * 42 + 10;
                  const yEnd = (i + 1) * 42 + 10;
                  const cx = 200;
                  return (
                    <path
                      key={i}
                      d={`M ${cx - startWidth / 2} ${yStart} L ${cx + startWidth / 2} ${yStart} L ${cx + endWidth / 2} ${yEnd} L ${cx - endWidth / 2} ${yEnd} Z`}
                      fill="url(#flowGradient)"
                      opacity={visible ? 0.15 : 0}
                      style={{ transition: `opacity 0.8s ease ${i * 200}ms` }}
                    />
                  );
                })}

                {FUNNEL_STAGES.map((stage, i) => {
                  const width = stage.percentage * 1.6;
                  const y = i * 42 + 10;
                  return (
                    <g key={stage.label} opacity={visible ? 1 : 0} style={{ transition: `opacity 0.5s ease ${i * 150}ms` }}>
                      <line x1={200 - width / 2} y1={y} x2={200 + width / 2} y2={y} stroke={`var(--color-${stage.color})`} strokeWidth="2" />
                      <circle cx={200} cy={y} r="3" fill={`var(--color-${stage.color})`} />
                    </g>
                  );
                })}

                <g className="animate-dashed-flow">
                  <line x1="200" y1="10" x2="200" y2="220" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                </g>
              </svg>

              <div className="absolute inset-0 flex flex-col justify-around py-2 pointer-events-none">
                {FUNNEL_STAGES.map((stage) => (
                  <div key={stage.label} className="flex items-center justify-center">
                    <span className="text-[10px] font-mono text-gray-600">{stage.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-800">
              <div>
                <div className="text-xs text-gray-500 mb-1">Total Inflow</div>
                <div className="text-lg font-bold font-mono text-signal-cyan">1,247</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Conversion</div>
                <div className="text-lg font-bold font-mono text-signal-lime">2.3%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Avg. Time</div>
                <div className="text-lg font-bold font-mono text-signal-teal">4.2m</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
