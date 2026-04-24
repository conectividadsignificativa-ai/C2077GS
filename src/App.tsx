/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  Shield, 
  Users, 
  ArrowRight, 
  Database, 
  Globe, 
  Radio, 
  Smartphone,
  Lock,
  Wifi,
  Scale,
  Leaf
} from 'lucide-react';
import { 
  LEVEL_1_SCENES, 
  SKILL_SPHERES, 
  REAL_HEADLINES, 
  Scene, 
  Choice 
} from './constants';

// --- Components ---

const NarrativeVoice = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-lg md:text-xl font-mono text-cyan-400 italic mb-4 leading-relaxed"
    >
      "{displayedText}"
    </motion.p>
  );
};

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block overflow-hidden group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-red-500 animate-pulse opacity-0 group-hover:opacity-50 transition-opacity">
        {text}
      </span>
    </div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState<'intro' | 'level1' | 'level2' | 'final'>('intro');
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [scores, setScores] = useState({ techSovereignty: 0, socialConnectivity: 0, innovation: 0 });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [history, setHistory] = useState<Choice[]>([]);

  const currentScene = LEVEL_1_SCENES[currentSceneIndex];

  const handleChoice = (choice: Choice) => {
    if (choice.impact) {
      setScores(prev => ({
        techSovereignty: prev.techSovereignty + (choice.impact?.techSovereignty || 0),
        socialConnectivity: prev.socialConnectivity + (choice.impact?.socialConnectivity || 0),
        innovation: prev.innovation + (choice.impact?.innovation || 0),
      }));
    }
    setHistory(prev => [...prev, choice]);

    if (currentScene.isFinalLevel1 && gameState === 'level1') {
      setGameState('level2');
    } else {
      const nextId = choice.nextSceneId;
      const nextIndex = LEVEL_1_SCENES.findIndex(s => s.id === nextId);
      if (nextIndex !== -1) setCurrentSceneIndex(nextIndex);
    }
  };

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
    );
  };

  const getFinalMessage = () => {
    const total = scores.techSovereignty + scores.socialConnectivity + scores.innovation;
    if (total > 10) return "Dominio de Soberanía Absoluta. Colombia 2077 es un faro de autonomía digital global.";
    if (total > 5) return "Habéis forjado una Colombia Digital Soberana. La corresponsabilidad fue vuestro norte.";
    if (total > 0) return "Futuro en Transición. La red es fuerte pero la brecha aún respira por las fisuras estatales.";
    return "Dependencia Absoluta. El algoritmo externo dicta las reglas. La soberanía es un recuerdo.";
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg text-cyber-text flex flex-col items-center justify-center p-4">
      <div className="crt-overlay" />
      
      <div id="game-container" className="w-full max-w-[1024px] h-full lg:h-[768px] relative p-8 flex flex-col justify-between overflow-hidden cyber-border bg-cyber-panel/50 backdrop-blur-sm shadow-2xl">
        
        {/* HEADER */}
        <header className="flex justify-between items-start z-10 shrink-0 mb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-cyber-accent animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-[0.34em] opacity-60">Sistema de Gestión de Crisis v4.0.2</span>
            </div>
            <h1 className="text-3xl font-black tracking-tighter">COLOMBIA<span className="text-cyber-accent">2077</span></h1>
            <p className="text-[10px] opacity-40 italic tracking-wider">Protocolo de Conectividad Significativa</p>
          </div>
          <div className="flex gap-8 text-right font-mono">
            <div>
              <p className="text-[10px] opacity-40 uppercase tracking-tighter">Ciudadano ID</p>
              <p className="text-xs font-bold text-white tracking-widest cursor-default hover:text-cyber-accent transition-colors">#COL-882-X</p>
            </div>
            <div>
              <p className="text-[10px] opacity-40 uppercase tracking-tighter">Estado de Red</p>
              <p className={`text-xs font-bold tracking-widest ${gameState === 'level1' ? 'text-cyber-warning' : 'text-cyber-accent animate-pulse'}`}>
                {gameState === 'level1' ? 'CRÍTICO - JAQUE' : 'ESTABLE'}
              </p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {gameState === 'intro' && (
            <motion.main 
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 glitch-bg -z-10" />
              <div className="max-w-xl">
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="mb-12"
                >
                  <p className="text-cyber-accent text-xs font-mono tracking-[0.4em] uppercase mb-4">Iniciando Enlace de Transmisión...</p>
                  <h2 className="text-4xl md:text-5xl font-light italic text-white/90 leading-tight border-l-2 border-cyber-accent pl-6 text-left">
                    "La autonomía es una decisión colectiva, no técnica."
                  </h2>
                </motion.div>
                
                <button 
                  onClick={() => setGameState('level1')}
                  className="group relative px-10 py-5 bg-white/5 border border-white/20 text-white font-bold text-lg uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-cyber-accent hover:text-black hover:border-cyber-accent"
                >
                  <span className="relative z-10 flex items-center gap-4">
                    Asumir Rol
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyber-accent group-hover:w-0 transition-all opacity-50" />
                </button>
              </div>
            </motion.main>
          )}

          {(gameState === 'level1' || gameState === 'level2') && (
            <motion.main 
              key="main-game"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex gap-6 overflow-hidden min-h-0"
            >
              {/* ASIDE 1: Headlines & Scores */}
              <aside className="hidden lg:flex w-64 flex-col gap-4">
                <div className="cyber-border p-5 bg-[#0d0d14] flex-1 overflow-y-auto">
                  <h3 className="text-[11px] uppercase tracking-wider text-cyber-accent mb-4 font-bold border-b border-cyber-accent/20 pb-2 flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Titulares Históricos
                  </h3>
                  <div className="space-y-6 opacity-80">
                    {REAL_HEADLINES.map((h, i) => (
                      <div key={i} className="text-[10px] leading-relaxed border-l border-white/10 pl-3">
                        <p className="text-white/40 font-bold mb-1">[ARCHIVE-{2024 + i}]</p>
                        <p className="italic">"{h}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cyber-border p-5 h-44 bg-[#0d0d14]">
                  <h3 className="text-[11px] uppercase tracking-wider text-white/40 mb-3 font-bold">Monitor de Futuro</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Soberanía', val: scores.techSovereignty, max: 10, color: 'bg-cyber-accent' },
                      { label: 'Conectividad', val: scores.socialConnectivity, max: 10, color: 'bg-green-500' },
                      { label: 'Innovación', val: scores.innovation, max: 10, color: 'bg-yellow-500' }
                    ].map(s => (
                      <div key={s.label}>
                        <div className="flex justify-between text-[10px] mb-1 uppercase tracking-tighter">
                          <span className="opacity-60">{s.label}</span>
                          <span className="font-bold">{Math.min(Math.max((s.val + 5) * 10, 0), 100)}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10">
                          <div 
                            className={`h-full ${s.color} transition-all duration-500 shadow-[0_0_8px_rgba(0,243,255,0.4)]`} 
                            style={{ width: `${Math.min(Math.max((s.val + 5) * 10, 0), 100)}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              {/* CENTRAL NARRATIVE */}
              <section className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div id="narrative-window" className="cyber-border flex-1 bg-[#0d0d14] p-8 relative overflow-hidden flex flex-col min-h-0">
                  <div className="absolute inset-0 opacity-5 pointer-events-none glitch-bg"></div>
                  
                  <div className="relative z-10 flex-1 flex flex-col min-h-0">
                    <div className="mb-8 shrink-0">
                      <p className="text-cyber-accent font-bold text-[10px] mb-4 uppercase tracking-[0.4em]">
                        {gameState === 'level1' ? `Nivel 1 Scena ${currentSceneIndex + 1} / Jaque` : 'Nivel 2 / Futuros Posibles'}
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={gameState === 'level1' ? currentScene.id : 'l2-voice'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-l-2 border-cyber-accent pl-5"
                        >
                          <h2 className="text-xl md:text-2xl font-light leading-relaxed mb-4 text-white/90 italic tracking-tight">
                            {gameState === 'level1' ? currentScene.narrative : "¿Qué habilidades guiarán el mañana de Colombia?"}
                          </h2>
                          <p className="text-xs opacity-50 font-mono tracking-wide leading-relaxed italic">
                            {gameState === 'level1' ? currentScene.voice : "Selecciona los ejes de tu visión personal."}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      {gameState === 'level1' && (
                        <div className="grid grid-cols-1 gap-3">
                          {currentScene.choices.map((choice) => (
                            <button
                              key={choice.id}
                              onClick={() => handleChoice(choice)}
                              className="group p-5 text-left bg-white/5 border border-white/10 flex justify-between items-center transition-all hover:bg-cyber-accent/10 hover:border-cyber-accent hover:translate-x-1"
                            >
                              <span className="text-sm font-medium tracking-tight text-white/80 group-hover:text-white transition-colors">
                                {choice.text}
                              </span>
                              <span className="text-[10px] opacity-0 group-hover:opacity-100 uppercase tracking-widest text-cyber-accent">Seleccionar</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {gameState === 'level2' && (
                        <div className="grid grid-cols-2 gap-4">
                          {SKILL_SPHERES.map((sphere, idx) => (
                            <motion.button
                              key={sphere.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              onClick={() => toggleSkill(sphere.id)}
                              className={`p-4 border transition-all text-left flex flex-col gap-2 relative overflow-hidden group ${
                                selectedSkills.includes(sphere.id) 
                                ? 'bg-cyber-accent/20 border-cyber-accent shadow-[0_0_20px_rgba(0,243,255,0.2)]'
                                : 'bg-white/5 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-full border border-current flex items-center justify-center mb-2 ${sphere.color}`}>
                                {sphere.id === 's1' && <Shield className="w-4 h-4" />}
                                {sphere.id === 's2' && <Wifi className="w-4 h-4" />}
                                {sphere.id === 's3' && <Cpu className="w-4 h-4" />}
                                {sphere.id === 's4' && <Lock className="w-4 h-4" />}
                                {sphere.id === 's5' && <Users className="w-4 h-4" />}
                                {sphere.id === 's6' && <Database className="w-4 h-4" />}
                                {sphere.id === 's7' && <Scale className="w-4 h-4" />}
                                {sphere.id === 's8' && <Leaf className="w-4 h-4" />}
                              </div>
                              <span className="text-[11px] font-bold uppercase tracking-widest">{sphere.label}</span>
                              {selectedSkills.includes(sphere.id) && (
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyber-accent rounded-full animate-pulse" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>

                    {gameState === 'level2' && (
                      <div className="mt-6 shrink-0 text-center">
                        <button
                          onClick={() => setGameState('final')}
                          disabled={selectedSkills.length === 0}
                          className={`px-10 py-4 font-bold text-sm uppercase tracking-[0.3em] transition-all border ${
                            selectedSkills.length > 0 
                            ? 'bg-cyber-accent text-black border-cyber-accent hover:shadow-[0_0_30px_rgba(0,243,255,0.4)]'
                            : 'bg-transparent text-white/20 border-white/10 cursor-not-allowed'
                          }`}
                        >
                          Visualizar Escenario Final
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* ASIDE 2: Interaction Context */}
              <aside className="hidden lg:flex w-48 flex-col gap-4">
                <div className="cyber-border p-4 bg-[#0d0d14] flex-1 text-center flex flex-col items-center justify-center">
                   <div className="animate-float w-24 h-24 border border-cyber-accent/30 rounded-full flex items-center justify-center mb-6 bg-cyber-accent/5 relative">
                      <div className="w-16 h-16 border border-cyber-accent/60 flex items-center justify-center rotate-45">
                        <span className="-rotate-45 text-[10px] font-bold text-cyber-accent uppercase tracking-tighter">
                          {gameState === 'level1' ? 'SYNC' : 'VISION'}
                        </span>
                      </div>
                      <div className="absolute inset-0 border-t border-cyber-accent/20 rounded-full animate-spin [animation-duration:8s]" />
                   </div>
                   <h4 className="text-[10px] uppercase font-bold text-cyber-accent mb-2 tracking-widest">
                     {gameState === 'level1' ? 'Respuesta Activa' : 'Valores Forjados'}
                   </h4>
                   <p className="text-[9px] opacity-40 italic leading-relaxed px-2">
                     Las decisiones pasadas alimentan el motor de simulación de futuro.
                   </p>
                </div>

                <div className="h-44 cyber-border bg-[#0d0d14] flex flex-col items-center justify-center relative overflow-hidden group">
                   <div className="absolute w-full h-[30%] bg-cyber-warning/5 bottom-0 border-t border-cyber-warning/20 transform translate-y-0 group-hover:-translate-y-2 transition-transform" />
                   <span className="text-[8px] uppercase tracking-tighter opacity-40 mb-1 z-10">Huella Digital Acumulada</span>
                   <span className="text-4xl font-bold tracking-tighter z-10">
                     {((scores.techSovereignty + scores.socialConnectivity + 5) / 15).toFixed(2)}
                     <span className="text-xs text-cyber-accent font-light">/1.0</span>
                   </span>
                </div>
              </aside>
            </motion.main>
          )}

          {gameState === 'final' && (
            <motion.main 
              key="final-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 glitch-bg opacity-10" />
              <div className="max-w-2xl text-center z-10 px-8">
                <p className="text-cyber-accent text-xs font-mono tracking-[0.6em] mb-6 animate-pulse uppercase">Simulación de Futuro Completa</p>
                <div className="bg-cyber-bg/80 cyber-border p-10 backdrop-blur-md">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 italic text-white leading-tight">
                    "{getFinalMessage()}"
                  </h2>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {selectedSkills.map(id => (
                      <span key={id} className="text-[9px] uppercase font-mono px-3 py-1 border border-cyber-accent/40 text-cyber-accent bg-cyber-accent/5 tracking-widest">
                        {SKILL_SPHERES.find(s => s.id === id)?.label}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => window.location.reload()}
                    className="px-10 py-4 border border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-black transition-all font-mono text-xs uppercase tracking-[0.4em]"
                  >
                    Reiniciar Protocolo 2077
                  </button>
                </div>
              </div>
            </motion.main>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="h-16 flex items-center justify-between border-t border-white/10 pt-4 z-10 shrink-0 mt-4">
          <div className="flex gap-4 items-center">
            <div className={`w-3 h-3 rounded-full animate-pulse ${gameState === 'level1' ? 'bg-cyber-warning' : 'bg-cyber-accent'}`}></div>
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-60 font-mono">
              Voz Narrativa: {gameState === 'intro' ? 'Transmisión Segura' : gameState === 'level1' ? 'Alerta Crítica' : 'Generando Futuro...'}
            </p>
          </div>
          <div className="flex gap-8 font-mono">
            <div className="text-[9px] uppercase tracking-widest opacity-30 hover:opacity-100 cursor-pointer transition-opacity underline-offset-4 hover:underline">Reiniciar</div>
            <div className="text-[9px] uppercase tracking-widest opacity-30 cursor-not-allowed">Reportar Glitch</div>
            <div className="text-[10px] font-bold text-cyber-accent tracking-widest underline decoration-cyber-accent/30 underline-offset-4">TERMINAL_0.2.X</div>
          </div>
        </footer>

      </div>
    </div>
  );
}
