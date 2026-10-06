import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export function SignalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let signalLines: { y: number; progress: number; speed: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#22d3ee', '#2dd4bf', '#a3e635', '#06b6d4'];

    const spawnParticle = (x?: number, y?: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: 0,
        color,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      });
    };

    for (let i = 0; i < 80; i++) spawnParticle();

    for (let i = 0; i < 3; i++) {
      signalLines.push({
        y: (canvas.height / 4) * (i + 1),
        progress: 0,
        speed: 0.002 + Math.random() * 0.003,
        alpha: 0.1 + Math.random() * 0.1,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 7, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      signalLines.forEach((line) => {
        line.progress += line.speed;
        if (line.progress > 1) {
          line.progress = 0;
          line.y = Math.random() * canvas.height;
        }
        const x = line.progress * canvas.width;
        const gradient = ctx.createLinearGradient(x - 200, line.y, x + 50, line.y);
        gradient.addColorStop(0, 'rgba(34, 211, 238, 0)');
        gradient.addColorStop(0.5, `rgba(34, 211, 238, ${line.alpha})`);
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 200, line.y);
        ctx.lineTo(x + 50, line.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, line.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${line.alpha * 2})`;
        ctx.fill();
      });

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life < 30) p.alpha = p.life / 30;
        else if (p.life > p.maxLife - 30) p.alpha = (p.maxLife - p.life) / 30;
        else p.alpha = 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 80).toString(16).padStart(2, '0');
        ctx.fill();

        const glowRadius = p.size * 4;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glow.addColorStop(0, p.color + '20');
        glow.addColorStop(1, p.color + '00');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        if (p.life > p.maxLife || p.x < -50 || p.x > canvas.width + 50 || p.y < -50 || p.y > canvas.height + 50) {
          particles.splice(i, 1);
          spawnParticle();
        }
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-graphite-900" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-signal-cyan/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-signal-lime/3 blur-[100px] rounded-full" />
    </div>
  );
}
