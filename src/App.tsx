/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  MessageSquare, 
  TrendingUp, 
  BarChart3, 
  Calendar,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Heart,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  MousePointer2
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

// --- Data ---

const IMPACT_DATA = [
  { name: 'Jan', impact: 400 },
  { name: 'Feb', impact: 800 },
  { name: 'Mar', impact: 1200 },
  { name: 'Apr', impact: 1900 },
  { name: 'May', impact: 2800 },
  { name: 'Jun', impact: 3500 },
];

const WORKSTREAM_DETAILS: Record<string, string> = {
  "Community & School Network": "We build deep connections across educational institutions, creating a fabric of support that spans from individual classrooms to city-wide organizations. Our 'Crew' model allows students to find their tribe within a large school environment.",
  "Learning Labs": "Our labs are structured psychological and skill-building environments where youth engage in activities designed to improve emotional regulation, resilience, and collaborative problem-solving.",
  "Platform Foundation & Safety": "Safety is our core promise. We use state-of-the-art encryption and AI-driven moderation to ensure that every digital interaction within CYN is positive, age-appropriate, and free from harm.",
  "Advisor & Communication": "We empower trusted adults—teachers, mentors, and parents—with the tools they need to provide guidance without interrupting the student-led nature of the network.",
  "Social Media & Growth": "Our growth strategies are built on positive viral loops, where community impact naturally invites others to join and contribute to the movement.",
  "AI, Insights & Impact": "Using advanced analytics, we surface meaningful patterns in community health and individual growth, providing actionable insights for researchers and advisors.",
  "Events & Movement": "From local school assemblies to global virtual summits, our events celebrate youth voice and create the shared momentum needed for systemic change."
};

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Representing the "Connected" people icon from guidelines */}
      <div className="absolute top-0 w-4 h-4 rounded-full bg-brand-teal-soft" />
      <div className="absolute bottom-1 -left-1 w-4 h-4 rounded-full bg-brand-blue" />
      <div className="absolute bottom-1 -right-1 w-4 h-4 rounded-full bg-brand-coral" />
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 40C50 30 45 25 40 25C35 25 30 30 30 40C30 50 40 60 50 80C60 60 70 50 70 40C70 30 65 25 60 25C55 25 50 30 50 40Z" fill="currentColor" className="text-brand-teal-soft opacity-20" />
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-lg font-bold tracking-tight text-neutral-900 heading-condensed uppercase">Connected</span>
      <span className="text-[10px] font-medium tracking-[0.2em] text-brand-amber uppercase">Youth Network</span>
    </div>
  </div>
);

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-5xl font-bold mb-4 heading-condensed ${light ? 'text-white' : 'text-neutral-900'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-neutral-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

interface WorkstreamCardProps {
  index: number;
  title: string;
  description: string;
  icon: any;
  onClick: () => void;
  isActive: boolean;
}

const WorkstreamCard = ({ index, title, description, icon: Icon, onClick, isActive }: WorkstreamCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
    className={`p-8 rounded-3xl border transition-all group cursor-pointer relative overflow-hidden ${
      isActive 
      ? 'bg-neutral-900 border-neutral-900 shadow-2xl scale-[1.02]' 
      : 'bg-white border-neutral-100 hover:border-brand-teal-soft/30 hover:shadow-xl'
    }`}
  >
    {isActive && (
      <motion.div 
        layoutId="active-glow"
        className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl"
      />
    )}
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
      isActive ? 'bg-brand-blue text-white' : 'bg-bg-mist text-brand-teal-soft group-hover:bg-brand-teal-soft group-hover:text-white'
    }`}>
      <Icon size={24} />
    </div>
    <h3 className={`text-xl font-bold mb-3 heading-condensed ${isActive ? 'text-white' : 'text-neutral-900'}`}>{title}</h3>
    <p className={`leading-relaxed text-sm ${isActive ? 'text-white/60' : 'text-neutral-500'}`}>{description}</p>
    
    <div className={`mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isActive ? 'text-brand-blue' : 'text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity'}`}>
      <span>View Details</span>
      <ArrowRight size={14} />
    </div>
  </motion.div>
);

interface ArchitectureLayerProps {
  layer: number;
  title: string;
  items: string;
  isActive: boolean;
  onClick: () => void;
}

const ArchitectureLayer = ({ layer, title, items, isActive, onClick }: ArchitectureLayerProps) => (
  <motion.div 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: (5 - layer) * 0.1 }}
    onClick={onClick}
    className={`flex items-center gap-6 group cursor-pointer p-4 rounded-2xl transition-all ${isActive ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'}`}
  >
    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold transition-all ${
      isActive ? 'bg-brand-blue border-brand-blue text-white' : 'border-brand-blue text-brand-blue group-hover:bg-brand-blue group-hover:text-white'
    }`}>
      {layer}
    </div>
    <div className="flex-grow">
      <h4 className={`text-lg font-bold mb-1 heading-condensed uppercase tracking-wide transition-colors ${isActive ? 'text-brand-blue' : 'text-white group-hover:text-brand-blue'}`}>
        Layer {layer}: {title}
      </h4>
      <p className={`text-sm transition-colors ${isActive ? 'text-white/80' : 'text-white/40'}`}>{items}</p>
    </div>
  </motion.div>
);

const FlowStep = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex flex-col items-center text-center p-4 relative"
  >
    <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 text-brand-blue relative z-10">
      <Icon size={32} />
    </div>
    <h4 className="text-lg font-bold mb-2 heading-condensed text-neutral-900">{title}</h4>
    <p className="text-neutral-500 text-xs max-w-[150px]">{desc}</p>
  </motion.div>
);

// --- Main App ---

const ImpactCounter = ({ target, label, prefix = "", suffix = "" }: { target: number, label: string, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
      }
    }, { threshold: 0.5 });

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={nodeRef} className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 heading-condensed tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-bold text-brand-blue uppercase tracking-widest">{label}</div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDemoRequested, setIsDemoRequested] = useState(false);
  const [selectedWorkstream, setSelectedWorkstream] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<number>(3);

  const workstreams = [
    { title: "Community & School Network", description: "Building the core network of crews, classrooms, and local organizations.", icon: Users },
    { title: "Learning Labs", description: "Structured activities and experiences that promote skill-building and reflection.", icon: BookOpen },
    { title: "Platform Foundation & Safety", description: "Core infrastructure, moderation tools, and policies that keep youth safe.", icon: ShieldCheck },
    { title: "Advisor & Communication", description: "Empowering trusted adults to monitor, guide, and engage with youth participants.", icon: MessageSquare },
    { title: "Social Media & Growth", description: "Outreach strategies and viral mechanisms to expand the CYN community.", icon: TrendingUp },
    { title: "AI, Insights & Impact", description: "Data analytics and AI-driven recommendations to measure and amplify outcomes.", icon: BarChart3 },
    { title: "Events & Movement", description: "Live and virtual events that celebrate youth voice and build collective momentum.", icon: Calendar },
  ];

  const layers = [
    { layer: 5, title: "Growth & Outreach", items: "Social media, funders, and community expansion", detail: "Connecting with the world to scale our mission." },
    { layer: 4, title: "AI & Insights", items: "Analytics, recommendations, and impact measurement", detail: "Data-driven wisdom for better mental health outcomes." },
    { layer: 3, title: "Advisor Layer", items: "Monitoring, safety, and trusted adult oversight", detail: "A protective layer of verified adult support." },
    { layer: 2, title: "Experience", items: "Activities, prompts, and check-ins for youth engagement", detail: "Guided growth through interactive digital experiences." },
    { layer: 1, title: "Community", items: "Crews and rooms — the heart of peer connection", detail: "Direct small-group interaction where belonging starts." },
  ];

  return (
    <div className="min-h-screen text-neutral-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#workstreams" className="hover:text-brand-blue transition-colors">Workstreams</a>
            <a href="#architecture" className="hover:text-brand-blue transition-colors">Architecture</a>
            <a href="#flow" className="hover:text-brand-blue transition-colors">User Flow</a>
            <button 
              onClick={() => setIsDemoRequested(true)}
              className="px-6 py-2.5 rounded-full bg-neutral-900 text-white font-bold hover:bg-brand-blue transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-neutral-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 font-medium">
                <a href="#workstreams" onClick={() => setIsMenuOpen(false)}>Workstreams</a>
                <a href="#architecture" onClick={() => setIsMenuOpen(false)}>Architecture</a>
                <a href="#flow" onClick={() => setIsMenuOpen(false)}>User Flow</a>
                <button 
                  onClick={() => { setIsDemoRequested(true); setIsMenuOpen(false); }}
                  className="w-full py-4 rounded-xl bg-neutral-900 text-white font-bold"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-bg-mist">
          {/* Abstract blobs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-teal-soft/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal-soft/10 text-brand-teal-soft text-xs font-bold uppercase tracking-wider mb-8"
              >
                <Sparkles size={14} /> Built for the Next Generation
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 heading-condensed"
              >
                Real connection.<br />
                <span className="text-brand-blue">Real belonging.</span><br />
                <span className="text-brand-amber">Real impact.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-neutral-600 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed"
              >
                Connected Youth Network creates student-led spaces where young people build real connections, experience belonging, and strengthen their emotional wellbeing together.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
              >
                <button 
                  onClick={() => setIsDemoRequested(true)}
                  className="px-8 py-4 rounded-full bg-neutral-900 text-white font-bold inline-flex items-center gap-3 hover:bg-brand-blue transition-all group active:scale-95"
                >
                  Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-neutral-200 font-bold hover:border-neutral-900 transition-colors">
                  Learn More
                </button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="flex-1 relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white aspect-[4/3] flex items-center justify-center p-12">
                 {/* Visual representation of the platform */}
                 <div className="w-full max-w-md space-y-4">
                    <div className="h-4 w-3/4 bg-neutral-100 rounded-full" />
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-24 bg-brand-teal-mist/20 rounded-2xl flex items-center justify-center text-brand-teal-mist"><Users size={32} /></div>
                       <div className="h-24 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue"><Heart size={32} /></div>
                    </div>
                    <div className="h-4 w-full bg-neutral-100 rounded-full" />
                    <div className="h-4 w-1/2 bg-neutral-100 rounded-full" />
                    <div className="mt-8 flex justify-end">
                       <div className="h-10 w-10 bg-brand-coral rounded-full animate-bounce" />
                    </div>
                 </div>
              </div>
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 /></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-neutral-400">Security</p>
                  <p className="text-xs font-bold">Verified Protocols</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Workstreams Section */}
        <section id="workstreams" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading 
              subtitle="CYN is organized into seven interconnected workstreams, each driving a distinct dimension of the platform. Click any card to explore our work."
            >
              Our Workstreams
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
              {workstreams.map((ws, i) => (
                <WorkstreamCard 
                  key={i} 
                  index={i} 
                  title={ws.title}
                  description={ws.description}
                  icon={ws.icon}
                  isActive={selectedWorkstream === ws.title}
                  onClick={() => setSelectedWorkstream(selectedWorkstream === ws.title ? null : ws.title)} 
                />
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="bg-brand-blue p-8 rounded-4xl text-white flex flex-col justify-center items-center text-center group cursor-pointer hover:shadow-2xl hover:shadow-brand-blue/30 transition-all border border-brand-blue"
              >
                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Zap size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 heading-condensed">Join the Movement</h3>
                <p className="text-white/80 text-sm mb-8 max-w-xs mx-auto">Be part of the community-wide impact scaling across schools every day.</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsDemoRequested(true); }}
                  className="px-6 py-3 rounded-full bg-white text-brand-blue font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all active:scale-95"
                >
                  Get Started <ArrowRight size={18} />
                </button>
              </motion.div>

              {/* Detail Expansion Panel */}
              <AnimatePresence>
                {selectedWorkstream && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="col-span-full bg-neutral-900 rounded-[3rem] p-12 mt-8 text-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px] -mr-48 -mt-48" />
                    <button 
                      onClick={() => setSelectedWorkstream(null)}
                      className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                    >
                      <X />
                    </button>
                    
                    <div className="max-w-4xl relative z-10">
                       <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 rounded-3xl bg-brand-blue flex items-center justify-center">
                            {(() => {
                              const ws = workstreams.find(w => w.title === selectedWorkstream);
                              const Icon = ws?.icon || Users;
                              return <Icon size={32} />;
                            })()}
                          </div>
                          <h2 className="text-3xl md:text-5xl font-bold heading-condensed tracking-tight">{selectedWorkstream}</h2>
                       </div>
                       <p className="text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
                         {WORKSTREAM_DETAILS[selectedWorkstream as keyof typeof WORKSTREAM_DETAILS] || "Detailed information coming soon."}
                       </p>
                       <div className="flex flex-wrap gap-4">
                          <button className="px-8 py-3 rounded-full bg-brand-blue text-white font-bold hover:brightness-110 transition-all">Download PDF Guide</button>
                          <button className="px-8 py-3 rounded-full border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all">Talk to an Advisor</button>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-24 bg-neutral-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="grid grid-cols-12 h-full w-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-white/10 h-full w-full" />
                ))}
             </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-white/20"
                >
                  System Architecture
                </motion.span>
                <h2 className="text-4xl md:text-7xl font-bold mb-10 heading-condensed leading-[0.95]">
                  A Shared <br /><span className="text-brand-blue">Ecosystem</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 mb-12 max-w-xl leading-relaxed">
                  CYN is built on five integrated layers. Click a layer to see how it supports the entire youth network architecture.
                </p>

                <div className="space-y-4">
                  {layers.map((l) => (
                    <ArchitectureLayer 
                      key={l.layer} 
                      layer={l.layer}
                      title={l.title}
                      items={l.items}
                      isActive={activeLayer === l.layer}
                      onClick={() => setActiveLayer(l.layer)} 
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col items-center">
                <div className="relative w-full max-w-lg aspect-square flex flex-col items-center justify-end p-12">
                   {layers.map((l, i) => (
                     <motion.div 
                        key={l.layer}
                        initial={{ opacity: 0, scaleY: 0 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        onMouseEnter={() => setActiveLayer(l.layer)}
                        style={{ 
                          width: `${(i + 1) * 20}%`, 
                          height: '20%', 
                          background: activeLayer === l.layer 
                            ? `rgb(25, 149, 210)` 
                            : `rgb(25, 149, 210, ${1 - i * 0.15})`,
                          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                          marginBottom: '-2px',
                          zIndex: 50 - i
                        }}
                        className={`relative cursor-pointer transition-all duration-300 ${activeLayer === l.layer ? 'drop-shadow-[0_0_30px_rgba(25,149,210,0.6)]' : ''}`}
                     >
                       <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-extrabold transition-all ${
                         activeLayer === l.layer ? 'bg-white text-brand-blue animate-pulse' : 'bg-white/20 text-white'
                       }`}>
                         LAYER {l.layer}
                       </div>
                     </motion.div>
                   )).reverse()}
                </div>
                
                <AnimatePresence mode="wait">
                   <motion.div 
                     key={activeLayer}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="mt-8 p-8 rounded-3xl bg-white/5 border border-white/10 max-w-sm text-center backdrop-blur-md"
                   >
                      <h4 className="text-xl font-bold mb-2 text-brand-blue heading-condensed uppercase tracking-wider">
                        {layers.find(l => l.layer === activeLayer)?.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed italic">
                        "{layers.find(l => l.layer === activeLayer)?.detail}"
                      </p>
                   </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* User Flow Section */}
        <section id="flow" className="py-24 bg-white relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-6">
              <SectionHeading 
                subtitle="From first sign-on to community-wide impact, every young person moves through a clear, intentional journey."
              >
                The User Journey
              </SectionHeading>

              <div className="relative mt-20">
                {/* Connecting Line */}
                <div className="absolute top-10 left-[10%] right-[10%] h-px bg-neutral-100 hidden md:block">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: '100%' }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                     className="h-px bg-brand-blue"
                   />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                   <FlowStep icon={Users} title="Join Platform" desc="Create an account and set up profile" delay={0.1} />
                   <FlowStep icon={Users} title="Join Crew" desc="Connect with a small peer group" delay={0.3} />
                   <FlowStep icon={BookOpen} title="Participate" desc="Take part in guided activities" delay={0.5} />
                   <FlowStep icon={MessageSquare} title="Engage Peers" desc="Share feedback and collaborate" delay={0.7} />
                   <FlowStep icon={BarChart3} title="Generate Insights" desc="Reflect and surface learnings" delay={0.9} />
                </div>
              </div>
           </div>
        </section>

        {/* AI & Impact Section */}
        <section id="impact" className="py-32 bg-neutral-900 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-blue/10 rounded-full blur-[120px]" />
           
           <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <motion.div 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                 >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest mb-8 border border-brand-blue/20">
                      <BarChart3 size={14} /> AI-Powered Intelligence
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 heading-condensed text-white leading-tight">
                      Measuring <span className="text-gradient-blue-teal">Real Impact</span>
                    </h2>
                    <p className="text-lg text-white/50 mb-10 leading-relaxed max-w-xl">
                      We don't just hope for change; we measure it. Our proprietary AI engine surfaces emotional wellbeing trends to help advisors provide proactive support.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                       <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                          <h4 className="text-white font-bold mb-2">Wellbeing Score</h4>
                          <div className="flex items-center gap-2 text-brand-teal-soft font-bold text-2xl">
                             <TrendingUp size={20} /> +18%
                          </div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mt-2">Avg. growth per crew</p>
                       </div>
                       <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                          <h4 className="text-white font-bold mb-2">Active Safety</h4>
                          <div className="flex items-center gap-2 text-brand-blue font-bold text-2xl">
                             <ShieldCheck size={20} /> 99.9%
                          </div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mt-2">Safe interaction rate</p>
                       </div>
                    </div>
                 </motion.div>

                 <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-[3rem] glass-dark h-[400px] flex flex-col"
                 >
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-white font-bold heading-condensed uppercase tracking-widest text-sm">Community Growth Velocity</h3>
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-brand-blue" />
                          <div className="w-3 h-3 rounded-full bg-brand-teal-soft" />
                       </div>
                    </div>
                    
                    <div className="flex-grow">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={IMPACT_DATA}>
                             <defs>
                                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#1995d2" stopOpacity={0.8}/>
                                   <stop offset="95%" stopColor="#1995d2" stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                             <XAxis dataKey="name" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                             <YAxis stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                             <Tooltip 
                                contentStyle={{ backgroundColor: '#071018', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                itemStyle={{ color: '#1995d2', fontWeight: 'bold' }}
                             />
                             <Area type="monotone" dataKey="impact" stroke="#1995d2" strokeWidth={3} fillOpacity={1} fill="url(#colorImpact)" />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </motion.div>
              </div>
           </div>

           {/* Quick Stats Grid */}
           <div className="max-w-7xl mx-auto px-6 mt-32 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <ImpactCounter target={12000} label="Youth Connected" suffix="+" />
                 <ImpactCounter target={258} label="Partner Schools" />
                 <ImpactCounter target={98} label="Belonging Score" suffix="%" />
                 <ImpactCounter target={100} label="Interventions" prefix="1M+" />
              </div>
           </div>
        </section>
        <section className="py-20 bg-bg-mist">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-neutral-100 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-6 heading-condensed">Security & Confidence</h3>
                <p className="text-neutral-500 mb-8 leading-relaxed">
                  Ensuring a safe and secure environment is paramount. Our approach integrates multiple layers of protection to safeguard users and data.
                </p>
                <ul className="space-y-4">
                  {[
                    "Data Privacy & Compliance",
                    "AI-Powered Content Moderation",
                    "Age-Appropriate Design",
                    "User Empowerment Tools"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 size={14} /></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-brand-blue/5 p-8 rounded-3xl text-center">
                   <ShieldCheck className="mx-auto mb-4 text-brand-blue" size={40} />
                   <p className="font-bold text-sm">Safe Space</p>
                </div>
                <div className="bg-brand-amber/5 p-8 rounded-3xl text-center">
                   <Users className="mx-auto mb-4 text-brand-amber" size={40} />
                   <p className="font-bold text-sm">Verified Network</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-white text-center">
           <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 heading-condensed">Ready to connect?</h2>
              <p className="text-lg text-neutral-500 mb-10 leading-relaxed">
                Join a world where connection and belonging are the norm, empowering young people to lead supportive, inclusive communities.
              </p>
              <button 
                onClick={() => setIsDemoRequested(true)}
                className="px-10 py-5 rounded-full bg-brand-blue text-white font-bold text-lg hover:shadow-2xl hover:shadow-brand-blue/20 transition-all active:scale-95"
              >
                Join the Network
              </button>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-20">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
               <div className="max-w-xs">
                  <div className="text-white mb-6">
                    <Logo />
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">
                     A unified platform designed to connect young people, educators, and advisors — building community and scaling impact.
                  </p>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                  <div>
                    <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Platform</h5>
                    <ul className="space-y-4 text-sm">
                      <li><a href="#" className="hover:text-brand-blue transition-colors">How it works</a></li>
                      <li><a href="#" className="hover:text-brand-blue transition-colors">Workstreams</a></li>
                      <li><a href="#" className="hover:text-brand-blue transition-colors">Safety</a></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Community</h5>
                    <ul className="space-y-4 text-sm">
                      <li><a href="#" className="hover:text-brand-blue transition-colors">Schools</a></li>
                      <li><a href="#" className="hover:text-brand-blue transition-colors">Advisors</a></li>
                      <li><a href="#" className="hover:text-brand-blue transition-colors">Log in</a></li>
                    </ul>
                  </div>
               </div>
            </div>

            <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs">
               <p>© 2026 Connected Youth Network. All rights reserved.</p>
               <div className="flex gap-8">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               </div>
            </div>
         </div>
      </footer>

      {/* Demo Modal / Toast */}
      <AnimatePresence>
        {isDemoRequested && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-neutral-900/60 backdrop-blur-md"
            onClick={() => setIsDemoRequested(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] p-12 max-w-md w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-brand-teal-soft/10 text-brand-teal-soft rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles size={40} />
              </div>
              <h3 className="text-3xl font-bold mb-4 heading-condensed">Welcome to the Network</h3>
              <p className="text-neutral-500 mb-8 leading-relaxed">
                Thank you for your interest in Connected Youth Network. Our team will reach out to you shortly to set up your account.
              </p>
              <button 
                onClick={() => setIsDemoRequested(false)}
                className="w-full py-4 rounded-full bg-neutral-900 text-white font-bold hover:bg-brand-blue transition-all"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
