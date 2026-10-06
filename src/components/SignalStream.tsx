import { useEffect, useState, useRef } from 'react';
import { Radar, Eye, DollarSign, Target, Check, Radio, Clock, MapPin, Monitor } from 'lucide-react';
import { SIGNAL_EVENTS, type SignalEvent, type SignalType } from '@/data/signals';

const ICON_MAP: Record<SignalType, typeof Radar> = {
  visitor_detected: Radar,
  high_intent_page: Eye,
  pricing_interaction: DollarSign,
  requirement_identified: Target,
  lead_captured: Check,
};

const COLOR_MAP: Record<SignalType, { text: string; bg: string; border: string; glow: string }> = {
  visitor_detected: { text: 'text-signal-cyan', bg: 'bg-signal-cyan/10', border: 'border-signal-cyan/30', glow: 'shadow-signal-cyan/20' },
  high_intent_page: { text: 'text-signal-cyan', bg: 'bg-signal-cyan/10', border: 'border-signal-cyan/30', glow: 'shadow-signal-cyan/20' },
  pricing_interaction: { text: 'text-signal-lime', bg: 'bg-signal-lime/10', border: 'border-signal-lime/30', glow: 'shadow-signal-lime/20' },
  requirement_identified: { text: 'text-signal-lime', bg: 'bg-signal-lime/10', border: 'border-signal-lime/30', glow: 'shadow-signal-lime/20' },
  lead_captured: { text: 'text-signal-lime', bg: 'bg-signal-lime/10', border: 'border-signal-lime/30', glow: 'shadow-signal-lime/20' },
};

const STAGES = ['Signal', 'Engagement', 'Intent', 'Capture', 'Qualification', 'Sales Ready'];

export function SignalStream() {
  const [events, setEvents] = useState<SignalEvent[]>([]);
  const [activeStage, setActiveStage] = useState(0);
  const eventIndex = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateEvent = (): SignalEvent => {
      const template = SIGNAL_EVENTS[eventIndex.current % SIGNAL_EVENTS.length];
      eventIndex.current++;
      const now = new Date();
      return {
        ...template,
        id: `sig-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: now.toLocaleTimeString('en-US', { hour12: false }) + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2),
      };
    };

    const seedEvents: SignalEvent[] = [];
    for (let i = 0; i < 5; i++) {
      const evt = generateEvent();
      seedEvents.unshift(evt);
    }
    setEvents(seedEvents);

    const interval = setInterval(() => {
      const evt = generateEvent();
      setEvents((prev) => [evt, ...prev].slice(0, 8));
      const stageMap: Record<SignalType, number> = {
        visitor_detected: 0,
        high_intent_page: 1,
        pricing_interaction: 2,
        requirement_identified: 3,
        lead_captured: 4,
      };
      setActiveStage(stageMap[evt.type]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="signals" className="relative py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-5 h-5 text-signal-cyan animate-pulse" />
              <span className="text-xs font-mono text-signal-cyan tracking-widest uppercase">Real-Time Monitoring</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white mb-4">
              Live Signal Stream
            </h2>
            <p className="text-gray-400 max-w-xl">
              Every visitor enters the system as a signal. Watch as PhoenixAI detects, classifies,
              and converts behavior into structured intelligence.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start lg:self-end">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel-light">
              <div className="w-2 h-2 rounded-full bg-signal-lime animate-blink" />
              <span className="text-xs font-mono text-signal-lime">LIVE</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel-light">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-mono text-gray-400">DEMO MODE</span>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <div
                  className={`px-3 sm:px-4 py-2 rounded-lg border transition-all duration-500 clip-corner-sm ${
                    i <= activeStage
                      ? 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan'
                      : 'border-gray-800 bg-gray-900/40 text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${i <= activeStage ? 'bg-signal-cyan animate-pulse' : 'bg-gray-700'}`} />
                    <span className="text-xs font-mono whitespace-nowrap">{stage}</span>
                  </div>
                </div>
                {i < STAGES.length - 1 && (
                  <div className={`w-4 sm:w-8 h-px ${i < activeStage ? 'bg-signal-cyan/40' : 'bg-gray-800'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden clip-corner">
            <div className="flex items-center justify-between px-5 py-3 border-b border-signal-cyan/10 bg-graphite-800/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-signal-lime/50" />
                </div>
                <span className="text-xs font-mono text-gray-500 ml-3">signal_monitor --live</span>
              </div>
              <div className="text-xs font-mono text-signal-cyan/60">
                {events.length} active signals
              </div>
            </div>
            <div ref={containerRef} className="p-4 space-y-2 max-h-[480px] overflow-y-auto scrollbar-thin">
              {events.map((event) => {
                const Icon = ICON_MAP[event.type];
                const colors = COLOR_MAP[event.type];
                return (
                  <div
                    key={event.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${colors.bg} border ${colors.border} animate-slide-in-right group hover:shadow-lg ${colors.glow} transition-all`}
                  >
                    <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-sm font-semibold ${colors.text}`}>{event.label}</span>
                        <span className="text-[10px] font-mono text-gray-600 flex-shrink-0">{event.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{event.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-gray-500">
                        <span className="flex items-center gap-1">
                          <Monitor className="w-2.5 h-2.5" /> {event.page}
                        </span>
                        {event.metadata && (
                          <>
                            {event.metadata.source && <span>src: {event.metadata.source}</span>}
                            {event.metadata.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5" /> {event.metadata.location}
                              </span>
                            )}
                            {event.metadata.timeOnPage && <span>time: {event.metadata.timeOnPage}</span>}
                            {event.metadata.scrollDepth && <span>scroll: {event.metadata.scrollDepth}</span>}
                            {event.metadata.planViewed && <span>plan: {event.metadata.planViewed}</span>}
                            {event.metadata.confidence && <span className={colors.text}>conf: {event.metadata.confidence}</span>}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 clip-corner">
            <div className="flex items-center gap-2 mb-5">
              <Radar className="w-5 h-5 text-signal-cyan animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-sm font-semibold text-white">Detection Radar</span>
            </div>

            <div className="relative w-full aspect-square mb-5">
              <div className="absolute inset-0 rounded-full border border-signal-cyan/10" />
              <div className="absolute inset-[12%] rounded-full border border-signal-cyan/15" />
              <div className="absolute inset-[25%] rounded-full border border-signal-cyan/20" />
              <div className="absolute inset-[40%] rounded-full border border-signal-cyan/25" />
              <div className="absolute inset-[55%] rounded-full border border-signal-cyan/30" />

              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute top-0 left-1/2 origin-bottom h-1/2 w-px bg-gradient-to-b from-signal-cyan/60 to-transparent animate-pulse-signal" style={{ animationDuration: '3s' }} />
              </div>

              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1/2 h-px origin-left bg-gradient-to-r from-signal-cyan/0 via-signal-cyan/20 to-signal-cyan/0"
                  style={{ transform: `rotate(${deg}deg)` }}
                />
              ))}

              {[
                { top: '20%', left: '30%', color: 'bg-signal-cyan', delay: '0s' },
                { top: '60%', left: '70%', color: 'bg-signal-lime', delay: '0.5s' },
                { top: '75%', left: '25%', color: 'bg-signal-cyan', delay: '1s' },
                { top: '35%', left: '75%', color: 'bg-signal-lime', delay: '1.5s' },
                { top: '50%', left: '50%', color: 'bg-signal-cyan', delay: '2s' },
              ].map((dot, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full ${dot.color} animate-pulse-signal`}
                  style={{ top: dot.top, left: dot.left, animationDelay: dot.delay }}
                />
              ))}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-signal-cyan glow-cyan" />
            </div>

            <div className="space-y-3">
              {[
                { label: 'Signal Strength', value: '94%', color: 'bg-signal-cyan', width: '94%' },
                { label: 'Detection Rate', value: '87%', color: 'bg-signal-teal', width: '87%' },
                { label: 'Capture Rate', value: '72%', color: 'bg-signal-lime', width: '72%' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{bar.label}</span>
                    <span className="font-mono text-gray-300">{bar.value}</span>
                  </div>
                  <div className="h-1.5 bg-graphite-800 rounded-full overflow-hidden">
                    <div className={`h-full ${bar.color} rounded-full animate-progress-fill`} style={{ ['--target-width' as string]: bar.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
