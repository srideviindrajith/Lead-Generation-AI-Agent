import { useEffect, useRef, useState } from 'react';
import { Check, Zap, Building2, ArrowRight, Server, Workflow, Mail, Bot, BarChart3, Calendar } from 'lucide-react';

const PACKAGES = [
  {
    tier: 'Business',
    tagline: 'For teams capturing and qualifying leads',
    icon: Building2,
    color: 'signal-cyan',
    bgColor: 'bg-signal-cyan/5',
    borderColor: 'border-signal-cyan/30',
    glowColor: 'glow-cyan',
    features: [
      { icon: Bot, label: 'AI Lead Qualification Engine' },
      { icon: Calendar, label: 'Automated Appointment Scheduling' },
      { icon: BarChart3, label: 'Conversion Analytics Dashboard' },
      { icon: Zap, label: 'Real-time Signal Detection' },
    ],
  },
  {
    tier: 'Enterprise',
    tagline: 'For organizations with custom AI workflows',
    icon: Server,
    color: 'signal-lime',
    bgColor: 'bg-signal-lime/5',
    borderColor: 'border-signal-lime/30',
    glowColor: 'glow-lime',
    featured: true,
    features: [
      { icon: Workflow, label: 'Advanced Custom AI Workflows' },
      { icon: Mail, label: 'CRM & Email Integration' },
      { icon: Bot, label: 'Multiple Specialized Agents' },
      { icon: BarChart3, label: 'Everything in Business, scaled' },
    ],
  },
];

export function Packages() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="packages" ref={sectionRef} className="relative py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-signal-cyan/40" />
            <span className="text-xs font-mono text-signal-cyan tracking-widest uppercase">Deployment Packages</span>
            <div className="w-8 h-px bg-signal-cyan/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gradient-white mb-4">
            Choose Your Intelligence Tier
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From single-agent lead qualification to multi-agent enterprise workflows.
            Scale your detection grid as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.tier}
              className={`relative glass-panel rounded-2xl p-8 clip-corner transition-all duration-700 ${
                pkg.featured ? `${pkg.borderColor} ${pkg.glowColor}` : ''
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-signal-lime/20 border border-signal-lime/40">
                  <span className="text-xs font-mono text-signal-lime tracking-wider">RECOMMENDED</span>
                </div>
              )}

              <div className={`flex items-center gap-3 mb-2 ${pkg.bgColor} w-14 h-14 rounded-xl border ${pkg.borderColor} flex items-center justify-center`}>
                <pkg.icon className={`w-7 h-7 text-${pkg.color}`} />
              </div>

              <h3 className="text-2xl font-bold text-white mt-4 mb-1">{pkg.tier}</h3>
              <p className="text-sm text-gray-400 mb-6">{pkg.tagline}</p>

              <div className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${pkg.bgColor} border ${pkg.borderColor} flex items-center justify-center`}>
                      <feature.icon className={`w-4 h-4 text-${pkg.color}`} />
                    </div>
                    <span className="text-sm text-gray-300">{feature.label}</span>
                    <Check className={`w-4 h-4 text-${pkg.color} ml-auto`} />
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold transition-all clip-corner-sm ${
                  pkg.featured
                    ? `bg-signal-lime text-graphite-900 hover:bg-signal-lime-bright hover:shadow-lg hover:shadow-signal-lime/30`
                    : `glass-panel-light text-white hover:border-${pkg.color}/40 hover:bg-${pkg.color}/5`
                }`}
              >
                Activate {pkg.tier}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-panel-light rounded-xl p-5 clip-corner-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-phoenix-orange/10 border border-phoenix-orange/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-phoenix-orange" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Custom Deployment</div>
              <div className="text-xs text-gray-500">Need a tailored signal detection grid? We build custom.</div>
            </div>
          </div>
          <a href="#cta" className="text-sm text-phoenix-orange hover:text-phoenix-orange-bright transition-colors font-medium flex items-center gap-1">
            Talk to us <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
