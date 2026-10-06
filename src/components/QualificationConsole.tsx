import { useState, useEffect, useRef } from 'react';
import { Bot, User, ArrowRight, RotateCcw, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { QUALIFICATION_QUESTIONS, FINAL_LEAD, type QualificationAnswer } from '@/data/signals';
import { LeadProfileReveal } from './LeadProfileReveal';

const VISITOR_MESSAGE = 'I need a website and AI chatbot.';

export function QualificationConsole() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QualificationAnswer[]>([]);
  const [intentScore, setIntentScore] = useState(35);
  const [confidence, setConfidence] = useState(20);
  const [leadQuality, setLeadQuality] = useState<'Cold' | 'Warm' | 'Hot' | 'Qualified'>('Cold');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [step, isTyping, answers]);

  const handleAnswer = (questionId: number, question: string, answer: string, intentDelta: number, confidenceDelta: number) => {
    setAnswers((prev) => [...prev, { questionId, question, answer, intentDelta, confidenceDelta }]);
    setIntentScore((prev) => Math.min(100, Math.max(0, prev + intentDelta)));
    setConfidence((prev) => Math.min(100, Math.max(0, prev + confidenceDelta)));

    if (step < QUALIFICATION_QUESTIONS.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setIsTyping(false);
      }, 1200);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsComplete(true);
        setIsTyping(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (intentScore >= 80) setLeadQuality('Qualified');
    else if (intentScore >= 60) setLeadQuality('Hot');
    else if (intentScore >= 40) setLeadQuality('Warm');
    else setLeadQuality('Cold');
  }, [intentScore]);

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setIntentScore(35);
    setConfidence(20);
    setLeadQuality('Cold');
    setIsComplete(false);
  };

  const qualityColor = {
    Cold: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
    Warm: 'text-signal-cyan bg-signal-cyan/10 border-signal-cyan/20',
    Hot: 'text-signal-teal bg-signal-teal/10 border-signal-teal/20',
    Qualified: 'text-signal-lime bg-signal-lime/10 border-signal-lime/20',
  };

  const currentQuestion = QUALIFICATION_QUESTIONS[step];

  return (
    <section id="qualification" ref={sectionRef} className="relative py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-signal-cyan/40" />
            <span className="text-xs font-mono text-signal-cyan tracking-widest uppercase">AI Qualification Engine</span>
            <div className="w-8 h-px bg-signal-cyan/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white mb-4">
            From Signal to Profile
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Watch the AI qualify a visitor in real time. Every answer updates intent score,
            requirement confidence, and lead quality — live.
          </p>
        </div>

        {isComplete ? (
          <LeadProfileReveal
            intentScore={intentScore}
            confidence={confidence}
            leadQuality={leadQuality}
            answers={answers}
            onReset={reset}
          />
        ) : (
          <div className={`grid lg:grid-cols-5 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="lg:col-span-3 glass-panel rounded-2xl overflow-hidden clip-corner">
              <div className="flex items-center justify-between px-5 py-3 border-b border-signal-cyan/10 bg-graphite-800/50">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-signal-cyan" />
                  <span className="text-xs font-mono text-gray-400">ai_qualifier --session=active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-signal-lime animate-blink" />
                  <span className="text-[10px] font-mono text-signal-lime">QUALIFYING</span>
                </div>
              </div>

              <div ref={chatRef} className="p-5 space-y-4 max-h-[440px] overflow-y-auto scrollbar-thin">
                <div className="flex items-start gap-3 animate-fade-in-up">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-signal-cyan/10 border border-signal-cyan/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-signal-cyan" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-gray-600 mb-1 block">VISITOR</span>
                    <div className="glass-panel-light rounded-lg rounded-tl-none p-3">
                      <p className="text-sm text-gray-200">{VISITOR_MESSAGE}</p>
                    </div>
                  </div>
                </div>

                {answers.map((answer, i) => (
                  <div key={i} className="space-y-3 animate-fade-in-up">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-phoenix-orange/10 border border-phoenix-orange/30 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-phoenix-orange" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-mono text-gray-600 mb-1 block">PHOENIX AI</span>
                        <div className="glass-panel-light rounded-lg rounded-tl-none p-3">
                          <p className="text-sm text-gray-200">{QUALIFICATION_QUESTIONS[i].question}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 justify-end">
                      <div className="flex-1 flex flex-col items-end">
                        <span className="text-[10px] font-mono text-gray-600 mb-1 block">VISITOR</span>
                        <div className="bg-signal-cyan/10 border border-signal-cyan/20 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                          <p className="text-sm text-signal-cyan">{answer.answer}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-signal-cyan/10 border border-signal-cyan/30 flex items-center justify-center">
                        <User className="w-4 h-4 text-signal-cyan" />
                      </div>
                    </div>
                  </div>
                ))}

                {!isTyping && !isComplete && (
                  <div className="flex items-start gap-3 animate-fade-in-up">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-phoenix-orange/10 border border-phoenix-orange/30 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-phoenix-orange" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-gray-600 mb-1 block">PHOENIX AI</span>
                      <div className="glass-panel-light rounded-lg rounded-tl-none p-3">
                        <p className="text-sm text-gray-200 mb-3">{currentQuestion.question}</p>
                        <div className="space-y-2">
                          {currentQuestion.options.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleAnswer(currentQuestion.id, currentQuestion.question, option.label, option.intentDelta, option.confidenceDelta)}
                              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-graphite-800/50 border border-gray-800 hover:border-signal-cyan/40 hover:bg-signal-cyan/5 transition-all group text-left"
                            >
                              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{option.label}</span>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {option.intentDelta > 0 && (
                                  <span className="text-[10px] font-mono text-signal-lime flex items-center gap-0.5">
                                    <TrendingUp className="w-2.5 h-2.5" />+{option.intentDelta}
                                  </span>
                                )}
                                {option.intentDelta < 0 && (
                                  <span className="text-[10px] font-mono text-phoenix-orange flex items-center gap-0.5">
                                    <TrendingDown className="w-2.5 h-2.5" />{option.intentDelta}
                                  </span>
                                )}
                                {option.intentDelta === 0 && (
                                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-0.5">
                                    <Minus className="w-2.5 h-2.5" />0
                                  </span>
                                )}
                                <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-signal-cyan transition-colors" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isTyping && (
                  <div className="flex items-start gap-3 animate-fade-in">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-phoenix-orange/10 border border-phoenix-orange/30 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-phoenix-orange" />
                    </div>
                    <div className="glass-panel-light rounded-lg rounded-tl-none p-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-signal-cyan animate-blink" />
                        <div className="w-1.5 h-1.5 rounded-full bg-signal-cyan animate-blink" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-signal-cyan animate-blink" style={{ animationDelay: '0.4s' }} />
                        <span className="text-xs text-gray-500 ml-1">analyzing response...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-5 py-3 border-t border-signal-cyan/10 bg-graphite-800/30 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-600">
                  Question {step + 1} / {QUALIFICATION_QUESTIONS.length}
                </span>
                <div className="flex-1 mx-4 h-px bg-graphite-700 relative overflow-hidden rounded-full">
                  <div
                    className="absolute left-0 top-0 h-full bg-signal-cyan rounded-full transition-all duration-500"
                    style={{ width: `${((step) / QUALIFICATION_QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-signal-cyan">{Math.round((step / QUALIFICATION_QUESTIONS.length) * 100)}%</span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="glass-panel rounded-2xl p-5 clip-corner">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-white">Live Metrics</span>
                  <Sparkles className="w-4 h-4 text-signal-cyan animate-pulse" />
                </div>

                <div className="relative flex items-center justify-center mb-4">
                  <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#1a1f28" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke={intentScore >= 80 ? '#a3e635' : intentScore >= 60 ? '#2dd4bf' : '#22d3ee'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * intentScore) / 100}
                      style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black font-mono text-white">{intentScore}</span>
                    <span className="text-[10px] font-mono text-gray-500 tracking-widest">INTENT SCORE</span>
                  </div>
                </div>

                <div className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${qualityColor[leadQuality]} mb-4`}>
                  <span className="text-xs font-mono">LEAD QUALITY: {leadQuality.toUpperCase()}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Intent Score</span>
                      <span className="font-mono text-signal-cyan">{intentScore}%</span>
                    </div>
                    <div className="h-2 bg-graphite-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-signal-cyan to-signal-teal rounded-full transition-all duration-700"
                        style={{ width: `${intentScore}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Req. Confidence</span>
                      <span className="font-mono text-signal-lime">{confidence}%</span>
                    </div>
                    <div className="h-2 bg-graphite-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-signal-lime-dim to-signal-lime rounded-full transition-all duration-700"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel-light rounded-xl p-4 clip-corner-sm">
                <div className="text-xs font-mono text-gray-500 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-signal-cyan" />
                  Score Transitions
                </div>
                <div className="flex items-center gap-1 h-12">
                  {[35, ...answers.map((a) => Math.min(100, Math.max(0, 35 + answers.slice(0, answers.indexOf(a) + 1).reduce((sum, ans) => sum + ans.intentDelta, 0))))].map((score, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t transition-all duration-500"
                        style={{
                          height: `${score * 0.4}px`,
                          backgroundColor: score >= 80 ? '#a3e635' : score >= 60 ? '#2dd4bf' : '#22d3ee',
                          opacity: i === 0 ? 0.4 : 1,
                        }}
                      />
                      <span className="text-[8px] font-mono text-gray-600">{i === 0 ? 'init' : `Q${i}`}</span>
                    </div>
                  ))}
                  {Array.from({ length: Math.max(0, 6 - answers.length - 1) }).map((_, i) => (
                    <div key={`empty-${i}`} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t bg-graphite-800" style={{ height: '2px' }} />
                      <span className="text-[8px] font-mono text-gray-700">Q{answers.length + i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel-light rounded-xl p-4 clip-corner-sm">
                <div className="text-xs font-mono text-gray-500 mb-2">Requirement Detection</div>
                <div className="flex flex-wrap gap-2">
                  {['Website', 'AI Chatbot'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-signal-cyan/10 border border-signal-cyan/20 text-xs text-signal-cyan font-mono animate-scale-in">
                      {tag}
                    </span>
                  ))}
                  {answers.length >= 2 && (
                    <span className="px-2.5 py-1 rounded-md bg-signal-lime/10 border border-signal-lime/20 text-xs text-signal-lime font-mono animate-scale-in">
                      High Intent
                    </span>
                  )}
                  {answers.length >= 4 && (
                    <span className="px-2.5 py-1 rounded-md bg-signal-teal/10 border border-signal-teal/20 text-xs text-signal-teal font-mono animate-scale-in">
                      Budget: $15k-$50k
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
