/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, ArrowRight, CheckCircle2, Loader2, Play } from 'lucide-react';

type Step = 'intro' | 'name_input' | 'partner_input' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'video_break' | 'q6' | 'q7' | 'q8' | 'q9' | 'q10' | 'calculating' | 'result';

export default function App() {
  const [step, setStep] = useState<Step>('intro');
  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (
        e.key === 'F12' ||
        (isCtrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (isCtrlOrCmd && (e.key === 'u' || e.key === 's' || e.key === 'p'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextStep = (currentStep: Step, next: Step, answer?: string, key?: string) => {
    if (answer && key) {
      setAnswers(prev => ({ ...prev, [key]: answer }));
    }
    setStep(next);
  };

  useEffect(() => {
    const steps: Step[] = ['intro', 'name_input', 'partner_input', 'q1', 'q2', 'q3', 'q4', 'q5', 'video_break', 'q6', 'q7', 'q8', 'q9', 'q10', 'calculating', 'result'];
    const index = steps.indexOf(step);
    setProgress((index / (steps.length - 1)) * 100);
  }, [step]);

  return (
    <div className="min-h-screen bg-[#1a0b0b] text-[#f5e6d3] font-serif selection:bg-[#d4af37] selection:text-[#1a0b0b]">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#4a1a1a] rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2d1a4a] rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="relative max-w-md mx-auto px-6 py-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span className="text-sm uppercase tracking-[0.2em] font-sans font-semibold text-[#d4af37]">Dona Carmem</span>
          </div>
          {step !== 'intro' && step !== 'result' && (
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#d4af37]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          )}
        </header>

        <main className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 text-center"
              >
                <div className="relative inline-block">
                  <div className="w-40 h-40 mx-auto rounded-full border-4 border-[#d4af37] p-1.5 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.5)]">
                    <img 
                      src="https://picsum.photos/seed/donacarmem_mystical_v12/500/500" 
                      alt="Dona Carmem - Especialista em União de Casais" 
                      className="w-full h-full object-cover rounded-full scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute -bottom-1 -right-1 bg-[#d4af37] p-2.5 rounded-full text-[#1a0b0b] shadow-lg"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                    Simpatia <span className="text-[#d4af37] italic">Cigana</span> do Amor
                  </h1>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Dona Carmem vai revelar o que as cartas e os astros reservam para o seu coração. Você está pronta para a verdade?
                  </p>
                </div>

                <button
                  onClick={() => nextStep('intro', 'name_input')}
                  className="w-full py-5 bg-[#d4af37] text-[#1a0b0b] font-sans font-bold text-lg rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
                >
                  COMEÇAR MINHA CONSULTA
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-xs text-white/40 font-sans uppercase tracking-widest">
                  Consulta 100% Gratuita e Sigilosa
                </p>
              </motion.div>
            )}

            {step === 'name_input' && (
              <motion.div
                key="name_input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Para começar, qual o <span className="text-[#d4af37]">seu nome</span>?
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-lg focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                  <button
                    disabled={!userName.trim()}
                    onClick={() => nextStep('name_input', 'partner_input')}
                    className="w-full py-5 bg-[#d4af37] text-[#1a0b0b] font-sans font-bold text-lg rounded-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    CONTINUAR
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'partner_input' && (
              <motion.div
                key="partner_input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  E qual o nome da <span className="text-[#d4af37]">pessoa amada</span>?
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Nome dele(a)"
                    className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-lg focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                  <button
                    disabled={!partnerName.trim()}
                    onClick={() => nextStep('partner_input', 'q1')}
                    className="w-full py-5 bg-[#d4af37] text-[#1a0b0b] font-sans font-bold text-lg rounded-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    CONTINUAR
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'q1' && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Qual é o seu <span className="text-[#d4af37]">estado civil</span> atual?
                </h2>
                <div className="grid gap-4">
                  {['Solteira', 'Em um relacionamento', 'Casada', 'Divorciada/Separada'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q1', 'q2', opt, 'status')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'q2' && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  O que você mais deseja <span className="text-[#d4af37]">resolver</span> hoje?
                </h2>
                <div className="grid gap-4">
                  {[
                    'Trazer um amor de volta',
                    'Encontrar um novo amor',
                    'Melhorar meu relacionamento atual',
                    'Saber se ele(a) me trai'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q2', 'q3', opt, 'goal')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'q3' && (
              <motion.div
                key="q3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Há quanto tempo você sente que seu <span className="text-[#d4af37]">coração está aflito</span>?
                </h2>
                <div className="grid gap-4">
                  {[
                    'Menos de 1 mês',
                    'De 1 a 6 meses',
                    'Mais de 1 ano',
                    'Há muito tempo'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q3', 'q4', opt, 'duration')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'q4' && (
              <motion.div
                key="q4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Você acredita no <span className="text-[#d4af37]">poder das simpatias</span> ciganas?
                </h2>
                <div className="grid gap-4">
                  {[
                    'Sim, acredito plenamente',
                    'Tenho curiosidade',
                    'Estou desesperada por ajuda'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q4', 'q5', opt, 'belief')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'q5' && (
              <motion.div
                key="q5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Você já tentou outras <span className="text-[#d4af37]">simpatias ou rituais</span> antes?
                </h2>
                <div className="grid gap-4">
                  {[
                    'Sim, e não funcionou',
                    'Sim, e funcionou por pouco tempo',
                    'Nunca tentei nada antes',
                    'Já fiz trabalhos espirituais'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q5', 'video_break', opt, 'previous_attempts')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'video_break' && (
              <motion.div
                key="video_break"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-8 text-center"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-display font-bold text-[#d4af37]">
                    Veja o que aconteceu com quem seguiu as orientações:
                  </h2>
                  <p className="text-white/60 text-sm">
                    Assista este breve depoimento antes de continuarmos sua consulta.
                  </p>
                </div>

                <div className="relative aspect-[9/16] max-h-[500px] mx-auto bg-black rounded-3xl overflow-hidden border-2 border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <iframe
                    src="https://drive.google.com/file/d/1C0E9c5gJK7laNRk12avrV7ZA6HaeiEgt/preview"
                    className="w-full h-full border-none"
                    allow="autoplay"
                  ></iframe>
                </div>

                <button
                  onClick={() => nextStep('video_break', 'q6')}
                  className="w-full py-5 bg-[#d4af37] text-[#1a0b0b] font-sans font-bold text-lg rounded-2xl shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                >
                  CONTINUAR MINHA CONSULTA
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 'q6' && (
              <motion.div
                key="q6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Há quanto tempo vocês estão <span className="text-[#d4af37]">afastados</span> ou sem se falar?
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Menos de 1 semana',
                    'Entre 1 semana e 1 mês',
                    'Entre 1 mês e 6 meses',
                    'Mais de 6 meses',
                    'Nunca namoramos, mas quero ele(a)'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q6', 'q7', opt, 'separation_time')}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all flex items-center gap-4"
                    >
                      <div className="w-4 h-4 rounded-full border border-[#d4af37]/50" />
                      <span className="text-sm font-sans font-semibold">{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'q7' && (
              <motion.div
                key="q7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Você sente que existe alguma <span className="text-[#d4af37]">energia negativa</span> atrapalhando vocês?
                </h2>
                <div className="grid gap-4">
                  {[
                    'Sim, sinto muita inveja ao redor',
                    'Sim, acho que fizeram algo contra nós',
                    'Não tenho certeza, mas as coisas não fluem',
                    'Não acredito que seja energia'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q7', 'q8', opt, 'negative_energy')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'q8' && (
              <motion.div
                key="q8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Com que frequência você <span className="text-[#d4af37]">pensa</span> nessa pessoa?
                </h2>
                <div className="grid gap-4">
                  {[
                    'O dia inteiro, não sai da minha cabeça',
                    'Várias vezes ao dia',
                    'Apenas quando estou sozinha',
                    'Às vezes, mas quero que seja recíproco'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q8', 'q9', opt, 'thoughts_frequency')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'q9' && (
              <motion.div
                key="q9"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Você está disposta a seguir as <span className="text-[#d4af37]">orientações</span> de Dona Carmen à risca?
                </h2>
                <div className="grid gap-4">
                  {[
                    'Sim, farei tudo o que for preciso',
                    'Sim, se não for nada perigoso',
                    'Vou tentar o meu melhor',
                    'Quero ver os resultados primeiro'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q9', 'q10', opt, 'commitment')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'q10' && (
              <motion.div
                key="q10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold leading-tight">
                  Qual a sua <span className="text-[#d4af37]">faixa etária</span>?
                </h2>
                <div className="grid gap-4">
                  {[
                    'Menos de 25 anos',
                    'Entre 25 e 40 anos',
                    'Entre 40 e 60 anos',
                    'Mais de 60 anos'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep('q10', 'calculating', opt, 'age')}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-white/10 hover:border-[#d4af37]/50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'calculating' && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12 text-center"
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-40 h-40 border-t-2 border-b-2 border-[#d4af37] rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-[#d4af37] animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-display font-bold">Dona Carmen está consultando as cartas...</h2>
                  <div className="space-y-2 max-w-xs mx-auto">
                    <LoadingItem label="Analisando energias espirituais" delay={0} />
                    <LoadingItem label="Verificando compatibilidade astral" delay={1} />
                    <LoadingItem label="Preparando sua simpatia exclusiva" delay={2} onComplete={() => setStep('result')} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 pb-20"
              >
                {/* Header Section */}
                <div className="space-y-6 text-center">
                  <h2 className="text-3xl font-display font-bold leading-tight">
                    Dona Carmem vai preparar sua Simpatia das Chamas Eternas ainda hoje!
                  </h2>
                  
                  <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 p-6 rounded-3xl space-y-4 text-left">
                    <p className="text-lg leading-relaxed">
                      Se você ativar o ritual <span className="font-bold text-[#d4af37]">HOJE</span>, prepare-se para ver o <span className="font-bold text-[#d4af37] underline">{partnerName}</span> te procurando desesperado em poucos dias, se rastejando por você.
                    </p>
                    
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <span className="text-xl">🔥</span>
                        <span>Não importa se ele te bloqueou.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-xl">🔥</span>
                        <span>Não importa se ele está com outra.</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-xl">❌</span>
                        <span className="text-red-400 font-semibold">Sem karma negativo ou qualquer coisa ruim pra você e pra ele!</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Video 1 Section */}
                <div className="space-y-6">
                  <p className="text-center font-bold text-lg">
                    <span className="text-[#d4af37]">▶️</span> Assista o vídeo abaixo e entenda como essa simpatia funciona.
                  </p>
                  <div className="relative aspect-[9/16] max-h-[500px] mx-auto bg-black rounded-3xl overflow-hidden border-2 border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <iframe
                      src="https://drive.google.com/file/d/1mMMBxgD2x2ghcDLBftaigOVd__yxLZzx/preview"
                      className="w-full h-full border-none"
                      allow="autoplay"
                    ></iframe>
                  </div>
                </div>

                {/* Main CTA 1 */}
                <button
                  className="w-full py-6 bg-[#d4af37] text-[#1a0b0b] font-sans font-extrabold text-xl rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all"
                >
                  QUERO MINHA SIMPATIA AGORA!
                </button>

                {/* Video 2 Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-display font-bold text-center text-[#d4af37]">
                    Veja como a vida amorosa dessas mulheres mudou graças a simpatia das chamas eternas:
                  </h3>
                  <div className="relative aspect-[9/16] max-h-[500px] mx-auto bg-black rounded-3xl overflow-hidden border-2 border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <iframe
                      src="https://drive.google.com/file/d/1TX0ARx1ojm9upto0w1DhOVjsI6DGxp6m/preview"
                      className="w-full h-full border-none"
                      allow="autoplay"
                    ></iframe>
                  </div>
                </div>



                {/* Bio Section */}
                <div className="space-y-12 pt-10 border-t border-white/10">
                  {/* QUEM SOU EU */}
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-display font-bold">Quem sou eu?</h3>
                    <div className="w-64 h-64 mx-auto rounded-3xl border-2 border-[#d4af37] p-1 overflow-hidden shadow-2xl">
                      <img 
                        src="https://drive.google.com/thumbnail?id=1TppS1tbhdwXPsYRhBfIpv5NT9N5kCUQx&sz=w1000" 
                        alt="Dona Carmem" 
                        className="w-full h-full object-cover rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="text-xl font-display font-bold text-[#d4af37]">Meu nome é Dona Carmem</h4>
                    <div className="space-y-4 text-white/70 leading-relaxed">
                      <p>
                        Há mais de 20 anos, minha missão é uma só: usar o conhecimento que herdei da minha família cigana para ajudar mulheres que como você estão com o coração partido.
                      </p>
                      <p>
                        Dediquei minha vida a mostrar que para todo sofrimento de amor, sempre existe um caminho de volta.
                      </p>
                    </div>
                  </div>

                  {/* PARTICIPAÇÕES TV */}
                  <div className="space-y-6">
                    <div className="rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                      <img 
                        src="https://drive.google.com/thumbnail?id=1pHmdSI0uEGiI10PisUgV3h34xJYSl6PT&sz=w1000" 
                        alt="Dona Carmem na TV" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-display font-bold text-[#d4af37]">Minhas participações na TV</h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Tive a honra de ser convidada para levar meus conselhos a um público ainda maior em diversos programas de TV. Hoje, eu trago essa mesma força e esse mesmo ritual, que já foi destaque na TV, de forma exclusiva e personalizada para você, para conseguir reconquistar o amor perdido do seu amado de volta.
                      </p>
                    </div>
                  </div>

                  <button
                    className="w-full py-6 bg-[#d4af37] text-[#1a0b0b] font-sans font-extrabold text-xl rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all"
                  >
                    QUERO MINHA SIMPATIA AGORA!
                  </button>
                </div>

                <p className="text-center text-sm text-white/40 italic">
                  "O destino não é questão de sorte, é questão de escolha."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/5 text-center space-y-4">
          <p className="text-[10px] text-white/20 font-sans uppercase tracking-[0.2em]">
            © 2024 Simpatia Cigana • Dona Carmen • Todos os direitos reservados
          </p>
        </footer>
      </div>
    </div>
  );
}

function LoadingItem({ label, delay, onComplete }: { label: string, delay: number, onComplete?: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
      if (onComplete) {
        setTimeout(onComplete, 1000);
      }
    }, (delay + 1) * 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 text-left">
      {done ? (
        <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
      ) : (
        <Loader2 className="w-5 h-5 text-white/20 animate-spin" />
      )}
      <span className={`text-sm transition-opacity duration-500 ${done ? 'text-white/80' : 'text-white/40'}`}>
        {label}
      </span>
    </div>
  );
}
