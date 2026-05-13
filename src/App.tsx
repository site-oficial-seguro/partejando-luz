import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Instagram, 
  MessageCircle, 
  Heart, 
  Baby, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  Plus, 
  Minus,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Lock,
  User,
  Calendar,
  FileText,
  LogOut
} from 'lucide-react';

// --- Constants ---

const SECTION_PADDING = "py-20 md:py-32 px-6 md:px-12 lg:px-24";
const CONTAINER_WIDE = "max-w-7xl mx-auto";
const BTN_BASE = "inline-flex items-center justify-center px-8 py-4 rounded-full transition-all duration-300 font-medium tracking-wide";
const BTN_PRIMARY = `${BTN_BASE} bg-brand-rose text-white hover:bg-brand-terracotta hover:scale-[1.02] shadow-lg shadow-brand-rose/20`;
const BTN_SECONDARY = `${BTN_BASE} border-2 border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white`;
const BTN_OUTLINE = `${BTN_BASE} border-2 border-brand-rose text-brand-rose hover:bg-brand-rose hover:text-white`;

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Início', href: isHomePage ? '#home' : '/#home' },
    { name: 'Sobre', href: isHomePage ? '#sobre' : '/#sobre' },
    { name: 'Serviços', href: isHomePage ? '#servicos' : '/#servicos' },
    { name: 'Como Funciona', href: isHomePage ? '#processo' : '/#processo' },
    { name: 'Depoimentos', href: isHomePage ? '#depoimentos' : '/#depoimentos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Material', href: '/material' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-brand-offwhite/95 backdrop-blur-md py-4 shadow-sm' : 'bg-brand-offwhite/80 backdrop-blur-sm py-8'}`}>
      <div className={`${CONTAINER_WIDE} flex justify-between items-center px-6`}>
        <Link to="/" className="flex items-center space-x-4">
          <img src="/Logoo.jpg" alt="Flávia Pontes Logo" className="h-12 md:h-16 w-auto object-contain rounded-lg" />
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-brand-ink">Partejando Luz</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.href.startsWith('/') && !link.href.includes('#') ? (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-sm font-medium hover:text-brand-terracotta transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium hover:text-brand-terracotta transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            )
          ))}
          <a 
            href="https://wa.me/554291256207?text=Olá%20Flávia!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20seu%20acompanhamento." 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${BTN_PRIMARY} py-2 px-6 text-sm`}
          >
            Entrar em contato
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-ink" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-offwhite shadow-xl py-8 px-6 flex flex-col space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-brand-ink border-b border-brand-beige pb-2"
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-brand-ink border-b border-brand-beige pb-2"
                >
                  {link.name}
                </a>
              )
            ))}
            <a 
              href="https://wa.me/554291256207?text=Olá%20Flávia!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20seu%20acompanhamento." 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${BTN_PRIMARY} w-full text-center`}
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-48 pb-24 overflow-hidden bg-brand-sand">
      <div className={`${CONTAINER_WIDE} grid md:grid-cols-2 gap-16 items-center z-10 px-6`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-brand-terracotta font-medium tracking-[0.3em] uppercase text-[10px]"
            >
              Doula & Enfermeira Obstetra
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-serif text-brand-ink">
              Acolhimento e <br />
              <span className="italic font-normal">cuidado</span> para o seu parto.
            </h1>
          </div>
          <p className="text-lg md:text-xl text-brand-ink/70 max-w-lg leading-relaxed font-light">
            Viva sua gestação, parto e pós-parto com mais segurança, presença e confiança. Um suporte técnico e emocional individualizado em Guarapuava e região.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <a 
              href="https://wa.me/554291256207?text=Olá%20Flávia!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20seu%20acompanhamento." 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${BTN_PRIMARY} group`}
            >
              Falar no WhatsApp
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#servicos" className={BTN_SECONDARY}>
              Conhecer serviços
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl bg-brand-ink">
            <video 
              src="/Video do lugar.mp4" 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl max-w-[240px] hidden lg:block">
            <Heart className="text-brand-terracotta mb-4" />
            <p className="text-sm font-serif italic text-brand-ink leading-relaxed">
              "O parto é o momento de maior potência de uma mulher. Estar presente é uma honra."
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-beige/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-brand-ink/30"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className={`${SECTION_PADDING} bg-brand-offwhite`}>
      <div className={`${CONTAINER_WIDE} grid md:grid-cols-2 gap-20 items-center`}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-t-full overflow-hidden border-[16px] border-brand-sand shadow-inner bg-brand-sand">
            <img 
              src="/Foto Flávia.jpg" 
              alt="Flávia Pontes" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-brand-sage p-8 rounded-3xl text-white shadow-2xl">
            <div className="text-4xl font-serif mb-1">10+</div>
            <div className="text-[10px] uppercase tracking-[0.2em] opacity-90 font-medium">Anos de Experiência</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <span className="text-brand-terracotta font-medium tracking-[0.2em] uppercase text-[10px]">Quem é Flávia</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-brand-ink">
              Uma jornada dedicada ao <br />
              <span className="italic">nascimento humanizado.</span>
            </h2>
          </div>
          <div className="space-y-8 text-brand-ink/80 leading-relaxed font-light text-lg">
            <p>
              Sou Flávia Pontes, enfermeira obstetra por formação e doula por vocação. Minha missão é devolver à mulher o protagonismo do seu próprio corpo e do momento mais transformador de sua vida.
            </p>
            <p>
              Acredito que o parto não é apenas um evento fisiológico, mas uma experiência emocional profunda que merece respeito, silêncio, acolhimento e segurança técnica.
            </p>
            <p>
              Em Guarapuava e região, acompanho famílias que buscam um olhar sensível, embasado em evidências científicas e focado no bem-estar integral da mãe e do bebê.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="text-brand-sage shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-sm">Segurança Técnica</h4>
                <p className="text-xs text-brand-ink/60">Enfermeira Obstetra capacitada.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Heart className="text-brand-terracotta shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-sm">Apoio Emocional</h4>
                <p className="text-xs text-brand-ink/60">Presença constante e acolhedora.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HelpSection = () => {
  const points = [
    {
      title: "Acolhimento Emocional",
      desc: "Escuta ativa e suporte para lidar com os medos e expectativas da gestação.",
      icon: <Heart className="w-6 h-6" />,
      details: "A gestação é um período de grandes mudanças internas. Ofereço um espaço seguro para que você possa expressar suas emoções, medos e desejos, fortalecendo sua saúde mental e emocional para a chegada do bebê."
    },
    {
      title: "Preparação para o Parto",
      desc: "Informação baseada em evidências para que você tome decisões conscientes.",
      icon: <Sparkles className="w-6 h-6" />,
      details: "Conhecimento é poder. Através de encontros educativos, discutimos a fisiologia do parto, as intervenções possíveis e como construir um plano de parto que reflita seus valores e escolhas."
    },
    {
      title: "Apoio no Trabalho de Parto",
      desc: "Alívio não farmacológico da dor e suporte contínuo durante todo o processo.",
      icon: <Baby className="w-6 h-6" />,
      details: "Durante o parto, utilizo técnicas como massagens, banhos, exercícios e aromaterapia para auxiliar no alívio da dor, além de oferecer o suporte emocional ininterrupto que faz toda a diferença na experiência."
    },
    {
      title: "Suporte no Pós-Parto",
      desc: "Acompanhamento na amamentação e nos primeiros cuidados com o recém-nascido.",
      icon: <ShieldCheck className="w-6 h-6" />,
      details: "O 'quarto trimestre' é desafiador. Estou ao seu lado para auxiliar na amamentação, nos cuidados práticos com o bebê e na sua recuperação física e emocional, garantindo uma transição mais suave."
    }
  ];

  return (
    <section className={`${SECTION_PADDING} bg-brand-sand`}>
      <div className={CONTAINER_WIDE}>
        <div className="max-w-3xl mb-20">
          <span className="text-brand-terracotta font-medium tracking-[0.2em] uppercase text-[10px]">Como posso te ajudar</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-6 text-brand-ink leading-[1.1]">
            Cuidado integral em todas as <br />
            <span className="italic">fases da sua jornada.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {points.map((point, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group border border-brand-beige/50"
            >
              <div className="w-14 h-14 bg-brand-beige rounded-2xl flex items-center justify-center text-brand-terracotta mb-8 group-hover:scale-110 group-hover:bg-brand-terracotta group-hover:text-white transition-all duration-500">
                {point.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4 text-brand-ink">{point.title}</h3>
              <p className="text-brand-ink/70 leading-relaxed font-light">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      title: "Acompanhamento na Gestação",
      desc: "Consultas mensais para tirar dúvidas, preparar o plano de parto e fortalecer o vínculo.",
      price: "Individualizado",
      details: "O acompanhamento pré-natal vai além do médico. Focamos na sua preparação física e emocional, discutindo o plano de parto, exercícios de mobilidade pélvica e criando uma rede de apoio sólida para o nascimento."
    },
    {
      title: "Acompanhamento no Parto",
      desc: "Presença contínua desde o trabalho de parto em casa até o nascimento no hospital.",
      price: "Suporte 24h",
      details: "Estarei com você desde os primeiros sinais de trabalho de parto ativo, oferecendo suporte contínuo, métodos de alívio da dor e garantindo que seus desejos sejam respeitados pela equipe hospitalar."
    },
    {
      title: "Consultoria em Amamentação",
      desc: "Ajuda técnica para pega correta, prevenção de fissuras e estabelecimento da amamentação.",
      price: "Visita Domiciliar",
      details: "A amamentação pode ser desafiadora no início. Ofereço suporte técnico para garantir a pega correta, prevenir fissuras, tratar ingurgitamentos e trazer tranquilidade para esse momento de conexão."
    },
    {
      title: "Cuidados Complementares",
      desc: "Drenagem linfática gestacional, taping e técnicas de relaxamento para o bem-estar.",
      price: "Sob Consulta",
      details: "Técnicas específicas para aliviar os desconfortos físicos da gestação, como inchaços e dores lombares, utilizando drenagem, bandagens terapêuticas (taping), o primeiro brinco do bebê e relaxamento profundo."
    },
    {
      title: "Suporte no Pós-Parto",
      desc: "Visitas para acompanhar a recuperação da mãe e adaptação do bebê nos primeiros dias.",
      price: "Puerpério",
      details: "O puerpério é um renascimento. Ofereço visitas domiciliares para acompanhar sua recuperação física, sessão de laser, o bem-estar do bebê e oferecer o suporte emocional necessário para essa nova fase da vida."
    }
  ];

  return (
    <section id="servicos" className={`${SECTION_PADDING} bg-brand-offwhite`}>
      <div className={CONTAINER_WIDE}>
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-brand-terracotta font-medium tracking-[0.2em] uppercase text-[10px]">Nossos Serviços</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-6 text-brand-ink leading-[1.1]">
            Serviços pensados para o seu <br />
            <span className="italic">conforto e segurança.</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
              className="border border-brand-beige p-12 rounded-[50px] flex flex-col items-center text-center justify-between hover:bg-brand-sand hover:border-brand-rose/30 transition-all duration-700 group relative overflow-hidden w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-[10px] uppercase tracking-[0.2em] text-brand-terracotta mb-6 font-semibold">{service.price}</div>
                <h3 className="text-3xl font-serif mb-8 text-brand-ink group-hover:scale-105 transition-transform duration-700">{service.title}</h3>
                <p className="text-brand-ink/70 font-light leading-relaxed mb-10 text-lg">
                  {service.desc}
                </p>
              </div>
              <button 
                onClick={() => setSelectedService(service)}
                className="flex items-center text-sm font-medium text-brand-ink hover:text-brand-terracotta transition-colors group/btn relative z-10"
              >
                Saiba mais <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-y-1 transition-transform" />
              </button>
              
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-brand-beige/20 rounded-full blur-3xl group-hover:bg-brand-rose/10 transition-colors duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-brand-offwhite w-full max-w-2xl rounded-[40px] p-10 md:p-16 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 text-brand-ink/40 hover:text-brand-ink transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="space-y-8">
                <div>
                  <span className="text-brand-terracotta font-medium tracking-[0.2em] uppercase text-[10px]">{selectedService.price}</span>
                  <h3 className="text-4xl font-serif mt-4 text-brand-ink">{selectedService.title}</h3>
                </div>
                <div className="h-px bg-brand-beige w-20" />
                <p className="text-xl text-brand-ink/80 leading-relaxed font-light">
                  {selectedService.details}
                </p>
                <div className="pt-6">
                  <a 
                    href={`https://wa.me/554291256207?text=Olá%20Flávia!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20serviço:%20${encodeURIComponent(selectedService.title)}.`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={BTN_PRIMARY}
                  >
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-sand rounded-full blur-3xl opacity-50" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      title: "Escuta",
      desc: "Nosso primeiro contato é para entender sua história, seus desejos e seus receios."
    },
    {
      title: "Orientação",
      desc: "Forneço informações claras sobre o sistema de saúde e as opções de parto."
    },
    {
      title: "Preparação",
      desc: "Trabalhamos o corpo e a mente para o grande dia, com exercícios e plano de parto."
    },
    {
      title: "Acompanhamento",
      desc: "No dia do parto, estou ao seu lado o tempo todo, oferecendo suporte ininterrupto."
    },
    {
      title: "Suporte Contínuo",
      desc: "Após o nascimento, sigo acompanhando você no desafio do pós-parto e amamentação."
    }
  ];

  return (
    <section id="processo" className={`${SECTION_PADDING} bg-brand-ink text-brand-offwhite overflow-hidden`}>
      <div className={CONTAINER_WIDE}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-40 mb-16 lg:mb-0">
            <span className="text-brand-rose font-medium tracking-widest uppercase text-xs">Como funciona</span>
            <h2 className="text-4xl md:text-6xl mt-6 leading-tight">
              Um caminho de <br />
              <span className="italic font-normal text-brand-beige">parceria e confiança.</span>
            </h2>
            <p className="mt-8 text-brand-offwhite/60 max-w-md font-light leading-relaxed">
              Cada gestação é única. Meu acompanhamento é moldado para as suas necessidades específicas, garantindo que você nunca se sinta sozinha.
            </p>
            <div className="mt-12">
              <a 
                href="https://wa.me/554291256207?text=Olá%20Flávia!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20conversa%20inicial%20para%20conhecer%20seu%20trabalho." 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${BTN_OUTLINE} border-brand-offwhite text-brand-offwhite hover:bg-brand-offwhite hover:text-brand-ink`}
              >
                Agendar conversa inicial
              </a>
            </div>
          </div>

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-8 group"
              >
                <div className="text-5xl font-serif text-brand-rose/20 group-hover:text-brand-rose transition-colors duration-500">
                  0{idx + 1}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-serif mb-3">{step.title}</h3>
                  <p className="text-brand-offwhite/50 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DoulaInfo = () => {
  return (
    <section className={`${SECTION_PADDING} bg-brand-beige/30`}>
      <div className={`${CONTAINER_WIDE} bg-white rounded-[60px] p-12 md:p-24 shadow-sm border border-brand-beige`}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif text-brand-ink">O que faz uma doula?</h2>
            <p className="text-brand-ink/80 leading-relaxed font-light">
              A doula é uma profissional que oferece suporte físico, emocional e informativo à mulher durante a gestação, parto e pós-parto. 
            </p>
            <ul className="space-y-4">
              {[
                "Não realiza procedimentos médicos (esse é o papel da equipe técnica).",
                "Oferece métodos naturais de alívio da dor (massagens, banhos, posições).",
                "Ajuda a manter o ambiente calmo e respeitoso.",
                "Traduz termos médicos e ajuda a mulher a entender suas opções.",
                "Oferece suporte ao parceiro(a), ajudando-o a participar ativamente."
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm text-brand-ink/70">
                  <div className="w-1.5 h-1.5 bg-brand-terracotta rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm italic text-brand-terracotta">
              "Estudos mostram que a presença de uma doula reduz as taxas de cesárea e aumenta a satisfação da mulher com o parto."
            </p>
          </div>
          <div className="relative">
            <img 
              src="/Doula.png" 
              alt="Flávia em atendimento" 
              className="rounded-[40px] shadow-lg w-full object-cover aspect-square"
              loading="lazy"
            />
            <div className="absolute -top-3 -right-3 md:-top-5 md:-right-5 w-12 h-12 md:w-16 md:h-16 bg-brand-sand rounded-full flex items-center justify-center border-2 md:border-4 border-white shadow-lg">
              <Sparkles className="text-brand-gold w-5 h-5 md:w-8 md:h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mariana Silva",
      text: "A Flávia foi um anjo na minha vida. Sem o apoio dela, não sei se teria conseguido o parto natural que tanto sonhei. Ela transmite uma paz indescritível.",
      role: "Mãe do Theo"
    },
    {
      name: "Camila Rocha",
      text: "Como enfermeira obstetra, ela me deu a segurança técnica que eu precisava. Como doula, me deu o colo que eu não sabia que precisaria. Indico para todas!",
      role: "Mãe da Alice"
    },
    {
      name: "Beatriz Mendes",
      text: "O acompanhamento no pós-parto salvou minha amamentação. A sensibilidade da Flávia para entender o que eu estava sentindo foi fundamental.",
      role: "Mãe do Lucas"
    }
  ];

  return (
    <section id="depoimentos" className={`${SECTION_PADDING} bg-brand-offwhite`}>
      <div className={CONTAINER_WIDE}>
        <div className="text-center mb-24">
          <span className="text-brand-terracotta font-medium tracking-[0.2em] uppercase text-[10px]">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-6 text-brand-ink leading-[1.1]">Histórias de <span className="italic">nascimento.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              className="bg-brand-sand p-12 rounded-[50px] relative group hover:bg-brand-beige/50 transition-colors duration-700"
            >
              <div className="text-brand-terracotta/10 text-9xl font-serif absolute top-4 left-6 group-hover:text-brand-terracotta/20 transition-colors duration-700">“</div>
              <p className="text-brand-ink/80 font-light leading-relaxed mb-10 relative z-10 italic text-lg">
                {t.text}
              </p>
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-terracotta font-serif text-xl shadow-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-brand-ink">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/40 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "Em qual momento da gestação devo contratar uma doula?",
      a: "A partir de 12 semanas."
    },
    {
      q: "Você atende em quais hospitais de Guarapuava?",
      a: "Quase todos os hospitais, verificar disponibilidade."
    },
    {
      q: "A doula substitui o acompanhante (marido/parceiro)?",
      a: "De forma alguma! Meu papel é também dar suporte ao acompanhante, orientando como ele pode ajudar e permitindo que ele viva o momento com mais tranquilidade."
    },
    {
      q: "Como funciona o plantão para o parto?",
      a: "A partir da 37ª semana, fico em disponibilidade total (24h por dia) para atender ao seu chamado assim que o trabalho de parto começar."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className={`${SECTION_PADDING} bg-brand-sand/50`}>
      <div className={`${CONTAINER_WIDE} max-w-4xl`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-brand-ink">Dúvidas Frequentes</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-brand-beige">
              <button 
                className="w-full px-8 py-6 flex justify-between items-center text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-serif text-lg text-brand-ink">{faq.q}</span>
                {openIdx === i ? <Minus size={20} className="text-brand-terracotta" /> : <Plus size={20} className="text-brand-terracotta" />}
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-6 text-brand-ink/70 font-light leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className={`${SECTION_PADDING} bg-brand-offwhite relative overflow-hidden`}>
      <div className={`${CONTAINER_WIDE} text-center relative z-10`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-10"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-brand-ink leading-tight">
            Pronta para viver um parto <br />
            <span className="italic">com mais presença?</span>
          </h2>
          <p className="text-xl text-brand-ink/60 font-light max-w-2xl mx-auto">
            Estou aqui para caminhar ao seu lado. Vamos conversar sobre como posso apoiar a sua jornada?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="https://wa.me/554291256207?text=Olá%20Flávia!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20seu%20acompanhamento." 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${BTN_PRIMARY} text-lg px-12 py-5`}
            >
              Falar no WhatsApp agora
            </a>
            <a href="https://www.instagram.com/partejandoluz/" target="_blank" rel="noopener noreferrer" className={`${BTN_SECONDARY} text-lg px-12 py-5 flex items-center justify-center`}>
              <Instagram className="mr-2 w-5 h-5" />
              Seguir no Instagram
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-sand rounded-full blur-3xl opacity-50 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand-beige rounded-full blur-3xl opacity-50 translate-x-1/2" />
    </section>
  );
};

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const posts = [
    {
      title: "O que é uma Doula e por que ter uma no seu parto?",
      excerpt: "Entenda o papel fundamental desse suporte emocional e físico que transforma a experiência do nascimento.",
      date: "15 Mai, 2026",
      category: "Conhecimento",
      content: `A palavra 'doula' vem do grego e significa 'mulher que serve'. No contexto moderno, a doula é uma profissional treinada para oferecer suporte contínuo, físico, emocional e informativo, à gestante antes, durante e logo após o parto.

Diferente da equipe médica, a doula não realiza procedimentos técnicos. Seu foco é o bem-estar da mulher. Ela utiliza métodos naturais para alívio da dor, como massagens, técnicas de respiração e sugestões de posições que favorecem a descida do bebê.

Além do suporte físico, o apoio emocional é crucial. A presença de uma doula reduz significativamente os níveis de ansiedade e estresse, criando um ambiente de segurança e confiança. Estudos mostram que o acompanhamento por doulas reduz em até 50% as taxas de cesárea e em 25% a duração do trabalho de parto.`,
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Plano de Parto: Como construir o seu guia.",
      excerpt: "Aprenda a expressar seus desejos e garantir uma experiência de parto mais respeitosa e consciente.",
      date: "10 Mai, 2026",
      category: "Preparação",
      content: `O Plano de Parto é um documento onde a gestante registra suas preferências em relação ao trabalho de parto, ao parto propriamente dito e aos primeiros cuidados com o recém-nascido.

Construir esse documento é um exercício de autoconhecimento e empoderamento. Nele, você pode definir desde quem será seu acompanhante até preferências sobre o uso de métodos de alívio da dor, iluminação do ambiente e o corte do cordão umbilical.

É importante que o plano seja flexível e discutido previamente com seu médico e sua doula. Ele serve como uma ferramenta de comunicação com a equipe hospitalar, garantindo que suas escolhas sejam conhecidas e respeitadas, promovendo um nascimento mais humanizado.`,
      image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Puerpério: O renascimento da mulher no pós-parto.",
      excerpt: "Dicas essenciais para enfrentar os desafios emocionais e físicos nos primeiros dias após o nascimento.",
      date: "05 Mai, 2026",
      category: "Pós-parto",
      content: `O puerpério, muitas vezes chamado de 'quarto trimestre', é o período de intensas transformações que ocorre após o nascimento do bebê. É um momento de ajustes hormonais, físicos e, principalmente, emocionais.

Nesta fase, a mulher vive um verdadeiro renascimento. É comum sentir o chamado 'baby blues', uma melancolia leve causada pela queda hormonal. Ter uma rede de apoio sólida, incluindo parceiro, família e profissionais como doulas e consultoras de amamentação, é fundamental para atravessar esse período com mais leveza.

Priorizar o descanso (sempre que o bebê dormir), manter uma alimentação nutritiva e, acima de tudo, ser gentil consigo mesma são passos vitais. Lembre-se: para cuidar bem de um bebê, você também precisa estar cuidada.`,
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="blog" className={`${SECTION_PADDING} bg-brand-offwhite min-h-screen pt-40`}>
      <div className={CONTAINER_WIDE}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-brand-ink/40 mb-6 font-medium">
              <Link to="/" className="hover:text-brand-terracotta transition-colors">Início</Link>
              <span>/</span>
              <span className="text-brand-terracotta">Blog</span>
            </div>
            <span className="text-brand-terracotta font-medium tracking-[0.2em] uppercase text-[10px]">Espaço Educativo</span>
            <h2 className="text-4xl md:text-6xl mt-6 text-brand-ink leading-[1.1]">
              Informação para uma <br />
              <span className="italic">jornada consciente.</span>
            </h2>
          </div>
          <p className="text-brand-ink/60 max-w-sm font-light leading-relaxed mb-2">
            Artigos preparados com carinho para te apoiar em cada etapa, da descoberta à amamentação. Um espaço dedicado ao conhecimento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[30px] mb-8 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-terracotta">
                  {post.category}
                </div>
              </div>
              <div className="space-y-4 px-2">
                <span className="text-[10px] uppercase tracking-widest text-brand-ink/40 font-medium">{post.date}</span>
                <h3 className="text-2xl font-serif text-brand-ink group-hover:text-brand-terracotta transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-brand-ink/60 font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center text-sm font-bold text-brand-ink group-hover:gap-2 transition-all">
                  Ler artigo <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-brand-ink/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-brand-offwhite w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-ink hover:bg-white transition-colors shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto">
                <div className="h-64 md:h-96 w-full relative">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-offwhite via-transparent to-transparent" />
                </div>
                
                <div className="p-8 md:p-16 -mt-20 relative">
                  <div className="bg-white inline-block px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-terracotta mb-6 shadow-sm">
                    {selectedPost.category}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif text-brand-ink mb-8 leading-tight">
                    {selectedPost.title}
                  </h3>
                  <div className="flex items-center space-x-4 mb-10 text-brand-ink/40 text-xs uppercase tracking-widest">
                    <span>{selectedPost.date}</span>
                    <div className="w-1 h-1 bg-brand-terracotta rounded-full" />
                    <span>Por Flávia Pontes</span>
                  </div>
                  <div className="prose prose-brand-ink max-w-none">
                    {selectedPost.content.split('\n\n').map((para: string, i: number) => (
                      <p key={i} className="text-xl text-brand-ink/70 leading-relaxed font-light mb-6 whitespace-pre-line">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="pt-10 border-t border-brand-beige mt-12 flex flex-col md:row justify-between items-center gap-8">
                    <p className="text-brand-ink/50 italic text-sm">Gostou deste conteúdo? Compartilhe com outras gestantes.</p>
                    <a 
                      href={`https://wa.me/554291256207?text=Olá%20Flávia!%20Li%20seu%20artigo%20sobre%20${encodeURIComponent(selectedPost.title)}%20e%20gostaria%20de%20conversar.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={BTN_PRIMARY}
                    >
                      Conversar com Flávia
                      <MessageCircle size={18} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Location = () => {
  return (
    <section className="bg-brand-offwhite py-20 px-6">
      <div className={CONTAINER_WIDE}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-brand-terracotta font-medium tracking-[0.2em] uppercase text-[10px]">Onde estamos</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-ink">Venha nos <span className="italic">visitar.</span></h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-sand rounded-2xl flex items-center justify-center text-brand-terracotta shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-brand-ink">Endereço</h4>
                  <p className="text-brand-ink/70 font-light leading-relaxed">
                    R. das Camélias, 42 - Trianon, Guarapuava - PR <br />
                    <span className="text-sm text-brand-terracotta font-medium">Próximo ao UPA Trianon</span>
                  </p>
                </div>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=R.+das+Camélias,+42+-+Trianon,+Guarapuava+-+PR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={BTN_SECONDARY}
                >
                  Abrir no Google Maps
                </a>
                <a 
                  href="https://maps.apple.com/?q=R.+das+Camélias,+42+-+Trianon,+Guarapuava+-+PR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={BTN_SECONDARY}
                >
                  Abrir no Apple Maps
                </a>
              </div>
            </div>
          </div>
          <div className="h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white relative group">
            <iframe 
              src="https://maps.google.com/maps?q=R.+das+Camélias,+42+-+Trianon,+Guarapuava+-+PR&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Flávia Pontes"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-[1px] border-brand-ink/5 rounded-[40px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-brand-ink text-brand-offwhite pt-20 pb-10 px-6 font-light">
      <div className={CONTAINER_WIDE}>
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 space-y-6">
            <img src="/Logoo.jpg" alt="Flávia Pontes Logo" className="h-20 w-auto object-contain rounded-xl" />
            <p className="text-brand-offwhite/50 max-w-sm font-light leading-relaxed">
              Doula e Enfermeira Obstetra dedicada ao acolhimento feminino e ao parto humanizado em Guarapuava e região.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/partejandoluz/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-offwhite/20 flex items-center justify-center hover:bg-brand-offwhite hover:text-brand-ink transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/554291256207?text=Olá%20Flávia!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20seu%20acompanhamento." target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-offwhite/20 flex items-center justify-center hover:bg-brand-offwhite hover:text-brand-ink transition-all">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-widest font-bold">Navegação</h4>
            <ul className="space-y-4 text-brand-offwhite/60 text-sm font-light">
              <li><a href={isHomePage ? '#home' : '/#home'} className="hover:text-brand-rose transition-colors">Início</a></li>
              <li><a href={isHomePage ? '#sobre' : '/#sobre'} className="hover:text-brand-rose transition-colors">Sobre</a></li>
              <li><a href={isHomePage ? '#servicos' : '/#servicos'} className="hover:text-brand-rose transition-colors">Serviços</a></li>
              <li><a href={isHomePage ? '#processo' : '/#processo'} className="hover:text-brand-rose transition-colors">Como Funciona</a></li>
              <li><a href={isHomePage ? '#depoimentos' : '/#depoimentos'} className="hover:text-brand-rose transition-colors">Depoimentos</a></li>
              <li><Link to="/blog" className="hover:text-brand-rose transition-colors">Blog</Link></li>
              <li><Link to="/material" className="hover:text-brand-rose transition-colors">Material</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-widest font-bold">Contato</h4>
            <ul className="space-y-4 text-brand-offwhite/60 text-sm font-light">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-brand-rose shrink-0 mt-1" />
                <span>R. das Camélias, 42 - Trianon, Guarapuava - PR<br/><span className="text-[10px] opacity-70">(Próximo ao UPA Trianon)</span></span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-brand-rose" />
                <span>(42) 9125-6207</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-brand-rose" />
                <span>fjpontes@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-offwhite/10 pt-10 flex flex-col md:row justify-between items-center text-[10px] uppercase tracking-widest text-brand-offwhite/30">
          <p>© 2026 Flávia Pontes. Todos os direitos reservados.</p>
          <p className="mt-4 md:mt-0">
            Design Premium por <a href="https://wa.me/5542998319895?text=vim%20pelo%20site%20da%20flávia" target="_blank" rel="noopener noreferrer" className="hover:text-brand-rose transition-colors underline underline-offset-4">Diego Camargo Dias</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/554291256207?text=Olá%20Flávia!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20seu%20acompanhamento." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-brand-ink px-4 py-2 rounded-lg text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Falar com Flávia
      </span>
    </a>
  );
};

// --- Page Components ---

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <HelpSection />
      <Services />
      <Process />
      <DoulaInfo />
      <Testimonials />
      <FAQ />
      <Location />
      <FinalCTA />
    </>
  );
};

// --- Material Access System (Firebase Integrated) ---

const MaterialPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const materials = [
    {
      id: 'guia',
      title: "Guia dos Prim. Dias",
      subtitle: "Tudo o que você precisa saber para o início da jornada.",
      file: "/material/guia-primeiros-dias.pdf"
    },
    {
      id: 'shantala',
      title: "Técnica de Shantala",
      subtitle: "Aprenda a arte da massagem para conexão do bebê.",
      file: "/material/shantala.pdf"
    }
  ];

  const [activePDF, setActivePDF] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const docRef = doc(db, "users", fbUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser({ ...fbUser, ...docSnap.data() });
          } else {
            setUser(fbUser);
          }
        } catch (err) {
          console.error("Erro ao buscar dados do usuário:", err);
          setUser(fbUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const fbUser = userCredential.user;
      
      const extraData = {
        registrationDate: new Date().getTime(),
      };
      
      await setDoc(doc(db, "users", fbUser.uid), extraData);
      setUser({ ...fbUser, ...extraData });
      setError('');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') setError('Este e-mail já está sendo usado.');
      else if (err.code === 'auth/weak-password') setError('A senha deve ter pelo menos 6 caracteres.');
      else setError('Ocorreu um erro no cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setError('');
    } catch (err: any) {
      setError('E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActivePDF(null);
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  };

  const getStatus = () => {
    if (!user || !user.registrationDate) return null;
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor((new Date().getTime() - user.registrationDate) / msPerDay);
    const daysRemaining = Math.max(0, 60 - daysPassed);
    const isAccessible = daysPassed <= 60;
    
    return { daysPassed, daysRemaining, isAccessible };
  };

  const status = getStatus();


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-terracotta"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen pt-40 pb-20 bg-brand-offwhite px-6">
        <div className="max-w-md mx-auto bg-white rounded-[40px] p-10 shadow-xl border border-brand-beige">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-sand rounded-2xl flex items-center justify-center text-brand-terracotta mx-auto mb-6">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-serif text-brand-ink">Material Exclusivo</h2>
            <p className="text-brand-ink/60 mt-2 font-light">Acesse o guia completo para sua gestação.</p>
          </div>

          <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-brand-ink/40 mb-2 ml-4">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={18} />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 bg-brand-sand/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-brand-ink/40 mb-2 ml-4">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={18} />
                <input 
                  type="password" 
                  className="w-full pl-12 pr-4 py-4 bg-brand-sand/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            <button type="submit" className={`${BTN_PRIMARY} w-full py-4`}>
              {view === 'login' ? 'Entrar Agora' : 'Criar Conta Gratuita'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                setView(view === 'login' ? 'register' : 'login');
                setError('');
              }}
              className="text-sm text-brand-terracotta hover:underline font-medium"
            >
              {view === 'login' ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-40 pb-20 bg-brand-offwhite px-6">
      <div className={CONTAINER_WIDE}>
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* User Sidebar */}
          <div className="w-full md:w-80 space-y-8">
            <div className="bg-white rounded-[40px] p-10 shadow-lg border border-brand-beige">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-brand-rose/10 rounded-xl flex items-center justify-center text-brand-rose">
                  <User size={24} />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-serif font-bold text-brand-ink truncate">{user.email}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-brand-ink/40 font-bold">Gestante</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-brand-sand/50 rounded-2xl">
                  <div className="flex justify-between text-xs font-bold text-brand-ink/40 uppercase mb-2">
                    <span>Tempo de Uso</span>
                    <span className="text-brand-terracotta">{status?.daysPassed} dias</span>
                  </div>
                  <div className="w-full h-2 bg-brand-beige rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((status?.daysPassed || 0) / 60 * 100, 100)}%` }}
                      className="h-full bg-brand-terracotta"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm text-brand-ink/70">
                  <Calendar size={18} className="text-brand-sage" />
                  <span>Acesso por 60 dias</span>
                </div>

                <div className="pt-4 border-t border-brand-beige">
                  {status?.isAccessible ? (
                    <div className="text-center p-4 bg-brand-sage/10 text-brand-sage rounded-2xl text-xs font-bold">
                      VOCÊ TEM {status?.daysRemaining} DIAS DE ACESSO
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-red-50 text-red-500 rounded-2xl text-xs font-bold">
                      ACESSO EXPIRADO
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-10 flex items-center justify-center space-x-2 text-brand-ink/40 hover:text-red-500 transition-colors text-sm font-medium"
              >
                <LogOut size={16} />
                <span>Sair da conta</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-sm border border-brand-beige">
              <span className="text-brand-terracotta font-medium tracking-[0.2em] uppercase text-[10px]">Material Didático</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-ink mt-4 mb-8">
                Sua Biblioteca de <br />
                <span className="italic">Conhecimento</span>
              </h2>
              <p className="text-brand-ink/60 font-light leading-relaxed mb-10 max-w-2xl text-lg">
                Selecione abaixo o material que deseja consultar. Estes recursos foram preparados para te guiar em cada passo.
              </p>

              {status?.isAccessible ? (
                    <div className="grid sm:grid-cols-2 gap-8">
                      {materials.map((item) => (
                        <div 
                          key={item.id}
                          className="bg-brand-sand rounded-[40px] p-8 flex flex-col items-center text-center cursor-pointer hover:bg-brand-beige/50 transition-all border-2 border-dashed border-brand-beige group"
                          onClick={() => {
                            setActivePDF(item.file);
                            document.body.style.overflow = 'hidden';
                          }}
                        >
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-terracotta mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <FileText size={32} />
                          </div>
                          <h3 className="text-brand-ink font-serif text-xl mb-2">{item.title}</h3>
                          <p className="text-xs text-brand-ink/40 leading-relaxed px-4">{item.subtitle}</p>
                          <span className="text-[10px] uppercase tracking-widest text-brand-terracotta font-bold mt-6 group-hover:gap-2 flex items-center transition-all">
                            Abrir Material <ArrowRight size={12} className="ml-2" />
                          </span>
                        </div>
                      ))}

                      {activePDF && (
                        <AnimatePresence>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] bg-brand-ink/95 backdrop-blur-md flex flex-col"
                          >
                            <div className="flex justify-between items-center px-6 py-4 bg-brand-ink border-b border-white/10">
                              <div className="flex items-center space-x-3">
                                <FileText className="text-brand-rose" size={20} />
                                <h4 className="text-white font-serif text-sm md:text-base truncate max-w-[200px] md:max-w-none">
                                  {materials.find(m => m.file === activePDF)?.title}
                                </h4>
                              </div>
                              <button 
                                onClick={() => {
                                  setActivePDF(null);
                                  document.body.style.overflow = 'auto';
                                }}
                                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors text-xs font-bold uppercase tracking-widest"
                              >
                                <X size={18} />
                                <span>Fechar</span>
                              </button>
                            </div>
                            
                            <div className="flex-1 w-full max-w-5xl mx-auto p-2 md:p-6 lg:p-10">
                              <div className="w-full h-full bg-white rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl relative">
                                <iframe 
                                  src={`${activePDF}#toolbar=0&navpanes=0&scrollbar=0`}
                                  className="w-full h-full border-none"
                                  title="Visualizador de PDF"
                                />
                              </div>
                            </div>
                            
                            <div className="py-3 bg-brand-ink/50 text-center">
                              <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.2em]">
                                Protegido por Partejando Luz • Visualização Exclusiva Online
                              </p>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
              ) : (
                <div className="p-12 bg-red-50 rounded-[40px] text-center">
                  <Lock size={48} className="text-red-200 mx-auto mb-6" />
                  <h3 className="text-2xl font-serif text-red-800 mb-4">Acesso Expirado</h3>
                  <p className="text-red-600/70 font-light max-w-sm mx-auto">
                    O seu período de acesso de 60 dias a este material encerrou. Caso precise de suporte adicional, entre em contato.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Scroll to Top ---

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// --- Main App ---

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-brand-terracotta selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/material" element={<MaterialPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}
