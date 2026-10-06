import { useEffect, useState } from 'react';
import { Check, RotateCcw, Zap, Target, Award, Clock, DollarSign, Users, Globe, Mail, Building, Trophy } from 'lucide-react';
import { FINAL_LEAD, type QualificationAnswer } from '@/data/signals';

interface Props {
  intentScore: number;
  confidence: number;
  leadQuality: string;
  answers: QualificationAnswer[];
  onReset: () => void;
}

export function LeadProfileReveal({ intentScore, confidence, leadQuality, answers, onReset }: Props) {
  const [phase, setPhase] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(1), 200));
    timers.push(window.setTimeout(() => setPhase(2), 800));

    const scoreTimer = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev >= intentScore) {
          clearInterval(scoreTimer);
          return intentScore;
        }
        return prev + 2;
      });
    }, 20);

    timers.push(window.setTimeout(() => setPhase(3), 1600));
    timers.push(window.setTimeout(() => setPhase(4), 2400));
    timers.push(window.setTimeout(() => setPhase(5), 3000));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(scoreTimer);
    };
  }, [intentScore]);

  const profileFields = [
    { icon: Trophy, label: 'Score', value: displayScore, suffix: '', color: 'text-signal-lime' },
    { icon: Zap, label: 'Intent', value: FINAL_LEAD.intent, color: 'text-signal-cyan' },
    { icon: Target, label: 'Requirement', value: FINAL_LEAD.requirement, color: 'text-signal-teal' },
    { icon: Check, label: 'Status', value: FINAL_LEAD.status, color: 'text-signal-lime' },
  ];

  const detailFields = [
    { icon: Building, label: 'Company', value: FINAL_LEAD.company },
    { icon: Mail, label: 'Email', value: FINAL_LEAD.email },
    { icon: Clock, label: 'Timeline', value: FINAL_LEAD.timeline },
    { icon: DollarSign, label: 'Budget', value: FINAL_LEAD.budget },
    { icon: Users, label: 'Audience', value: '1,000+ active users' },
    { icon: Globe, label: 'Source', value: FINAL_LEAD.source },
  ];

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute inset-0 bg-signal-lime/5 blur-[100px] rounded-full animate-glow-pulse" />

      <div className="relative">
        <div className={`flex items-center justify-center mb-8 transition-all duration-500 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-signal-lime/10 border border-signal-lime/30 glow-lime">
            <div className="w-2 h-2 rounded-full bg-signal-lime animate-blink" />
            <span className="text-sm font-mono text-signal-lime tracking-wider">LEAD DETECTED — PROFILE ASSEMBLED</span>
            <Award className="w-4 h-4 text-signal-lime" />
          </div>
        </div>

        <div className={`glass-panel rounded-2xl overflow-hidden clip-corner transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-signal-lime/20 bg-gradient-to-r from-signal-lime/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-signal-lime/20 rounded-xl blur-md animate-pulse" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-signal-lime/20 to-signal-cyan/10 border border-signal-lime/30 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-signal-lime" />
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{FINAL_LEAD.name}</div>
                <div className="text-xs font-mono text-gray-500">captured {FINAL_LEAD.captured}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-signal-lime/10 border border-signal-lime/30">
              <Check className="w-3.5 h-3.5 text-signal-lime" />
              <span className="text-xs font-mono text-signal-lime">{FINAL_LEAD.status.toUpperCase()}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {profileFields.map((field, i) => (
                <div
                  key={field.label}
                  className={`relative p-4 rounded-xl glass-panel-light border border-gray-800 transition-all duration-500 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <field.icon className={`w-4 h-4 ${field.color}`} />
                    <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">{field.label}</span>
                  </div>
                  <div className={`text-2xl font-black ${field.color}`}>
                    {typeof field.value === 'number' ? field.value : field.value}
                  </div>
                  {field.label === 'Score' && (
                    <div className="mt-2 h-1 bg-graphite-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-signal-lime rounded-full transition-all duration-1000"
                        style={{ width: `${displayScore}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 transition-all duration-500 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
              {detailFields.map((field, i) => (
                <div
                  key={field.label}
                  className={`flex items-center gap-3 p-3 rounded-lg bg-graphite-800/30 border border-gray-800/50 transition-all duration-400 ${phase >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <field.icon className="w-4 h-4 text-signal-cyan/60 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-gray-600">{field.label}</div>
                    <div className="text-sm text-gray-200 truncate">{field.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`transition-all duration-500 ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="border-t border-gray-800 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-gray-500">Qualification Transcript</span>
                  <span className="text-xs font-mono text-signal-cyan">{answers.length} responses analyzed</span>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
                  {answers.map((answer, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                      <span className="font-mono text-gray-600 flex-shrink-0">Q{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-400">{answer.question}</span>
                        <span className="text-signal-cyan ml-2">→ {answer.answer}</span>
                      </div>
                      <span className={`font-mono flex-shrink-0 ${answer.intentDelta > 0 ? 'text-signal-lime' : answer.intentDelta < 0 ? 'text-phoenix-orange' : 'text-gray-500'}`}>
                        {answer.intentDelta > 0 ? '+' : ''}{answer.intentDelta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-gray-800 transition-all duration-500 ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black font-mono text-signal-lime">{intentScore}</div>
                  <div className="text-[10px] font-mono text-gray-500">FINAL SCORE</div>
                </div>
                <div className="w-px h-10 bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-black font-mono text-signal-cyan">{confidence}%</div>
                  <div className="text-[10px] font-mono text-gray-500">CONFIDENCE</div>
                </div>
                <div className="w-px h-10 bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-black font-mono text-signal-teal">{leadQuality}</div>
                  <div className="text-[10px] font-mono text-gray-500">QUALITY</div>
                </div>
              </div>
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-5 py-2.5 glass-panel-light text-gray-300 hover:text-signal-cyan rounded-lg transition-all hover:border-signal-cyan/30 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Run New Qualification
              </button>
            </div>
          </div>
        </div>

        <div className={`mt-4 text-center transition-all duration-500 ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs font-mono text-gray-600">
            Signal transformed into structured lead profile — ready for CRM sync and sales handoff
          </p>
        </div>
      </div>
    </div>
  );
}
