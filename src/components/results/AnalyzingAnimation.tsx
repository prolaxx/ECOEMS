'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { IconBrain, IconChart, IconTarget, IconSparkles } from '@/components/ui/Icons';

interface AnalyzingAnimationProps {
  onComplete: () => void;
}

export function AnalyzingAnimation({ onComplete }: AnalyzingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  
  const analysisStages = [
    { text: "Recopilando datos de la sesión...", icon: IconBrain, color: "text-[#002B7A]" },
    { text: "Evaluando precisión por materia...", icon: IconChart, color: "text-emerald-600" },
    { text: "Identificando patrones de respuesta...", icon: IconTarget, color: "text-purple-600" },
    { text: "Generando plan de estudio personalizado...", icon: IconSparkles, color: "text-[#C59D5F]" },
    { text: "Finalizando diagnóstico...", icon: IconBrain, color: "text-[#002B7A]" }
  ];

  // Keep a stable ref to onComplete so re-renders don't restart the animation
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  // Canvas ref for particle system
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Progress & Stage Logic — empty deps so this never restarts
    const totalDuration = 4500; // 4.5 seconds total animation
    const intervalTime = 50;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(newProgress);

      // Update stages based on progress thresholds
      if (newProgress < 20) setStage(0);
      else if (newProgress < 45) setStage(1);
      else if (newProgress < 70) setStage(2);
      else if (newProgress < 90) setStage(3);
      else setStage(4);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => onCompleteRef.current(), 500); // Small delay at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Particle System Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const colors = ['#002B7A', '#C59D5F', '#10b981', '#8b5cf6'];

    const createParticles = () => {
      // Create particles from center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 100
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles occasionally
      if (Math.random() > 0.5) createParticles();

      // Update and draw particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        p.size *= 0.95; // Shrink over time

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 100;
        ctx.fill();

        // Connect particles close to each other
        particles.forEach((p2, index2) => {
          if (index === index2) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        if (p.life <= 0 || p.size < 0.1) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const CurrentIcon = analysisStages[stage].icon;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Canvas for Particle Network */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        
        {/* Central Core Animation */}
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
          {/* Outer Rotating Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-slate-300 animate-[spin_8s_linear_infinite_reverse]" />
          
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#002B7A"
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Central Icon Container */}
          <div className="relative w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center z-10 animate-float">
            <div className={cn("transition-all duration-500 transform scale-110", analysisStages[stage].color)}>
              <CurrentIcon className="w-10 h-10 animate-pulse-slow" />
            </div>
          </div>

          {/* Pulsing Glow behind */}
          <div className="absolute inset-0 bg-[#002B7A]/5 rounded-full blur-2xl animate-pulse" />
        </div>

        {/* Dynamic Text */}
        <div className="text-center space-y-4 h-24">
          <h2 className="text-2xl font-serif font-bold text-[#002B7A] transition-all duration-300 animate-fade-in-up">
            Analizando Desempeño
          </h2>
          
          <div className="flex flex-col items-center">
            <p key={stage} className="text-slate-600 font-medium animate-fade-in-up">
              {analysisStages[stage].text}
            </p>
            <span className="text-sm text-slate-400 mt-2 font-mono">
              {Math.round(progress)}% Completado
            </span>
          </div>
        </div>

        {/* Technical Data Stream Decoration */}
        <div className="absolute bottom-10 w-full flex justify-between px-8 text-[10px] font-mono text-slate-300 opacity-50">
          <div className="flex flex-col gap-1">
            <span>CPU: OPTIMAL</span>
            <span>MEM: 45MB</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span>NET: CONNECTED</span>
            <span>ENC: SECURE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
