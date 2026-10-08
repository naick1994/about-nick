import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, MessageCircle, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DeployTag } from '@/components/DeployTag';
import { WindField } from '@/components/WindField';
import { WindCompass } from '@/components/WindCompass';
import { SessionStats } from '@/components/SessionStats';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { RoleList, type RoleItem } from '@/components/RoleList';
import { useLiveWind } from '@/hooks/useLiveWind';
import nickAvatar from '@/assets/nick-avatar.jpg';
import logoNaick from '@/assets/logo-naick.svg';
import naickWordmark from '@/assets/naick-wordmark.svg';
import logoFlightMode from '@/assets/logo-flight-mode.jpg';
import logoCasatiBrothers from '@/assets/logo-casati-brothers.svg';
import logoRidesk from '@/assets/logo-ridesk.jpg';
import logoHarlem from '@/assets/logo-harlem.jpg';
import logoSnowit from '@/assets/logo-snowit.jpg';
import logoTribala from '@/assets/logo-tribala.jpg';
import logoFnm from '@/assets/logo-fnm.jpg';
import logoDgm from '@/assets/logo-dgm.jpg';
import logoBocconi from '@/assets/logo-bocconi.jpg';
import logoNtuTaiwan from '@/assets/logo-ntu-taiwan.jpg';

const EXPERIENCE: RoleItem[] = [
  {
    title: 'Founder & Strategic Advisor', org: 'NAICK', period: 'Sep 2026 - Present', logo: logoNaick, era: 'Tarifa',
    companyDesc: 'NAICK is my independent advisory practice. Hands-on support for founders, scale-ups and sport brands that need to move faster: from strategy to execution, with the operator mindset of someone who has scaled teams and products first-hand.',
    desc: [
      'Growth strategy and go-to-market for startups, scale-ups and sport & outdoor brands.',
      'Digital transformation: operating models, processes, tooling and product organisation.',
      'AI adoption: identifying high-impact use cases, building internal AI workflows and agents, training teams to ship with AI.',
      'Fractional COO support for early-stage teams: P&L, ops routines, hiring plans and OKRs.',
    ],
  },
  {
    title: 'Co-Founder & CEO', org: 'Flight Mode', period: 'Mar 2025 - Present · 1 yr 5 mos', logo: logoFlightMode, era: 'Tarifa',
    desc: [
      'Objective: innovate and revolutionise the kitesurf industry.',
      'Developing market growth initiatives for the global wind-powered sports ecosystem.',
    ],
  },
  {
    title: 'Manager', org: 'Casati Brothers', orgUrl: 'https://casatibrothers.com/', period: 'Mar 2025 - Present · 1 yr 5 mos', logo: logoCasatiBrothers, logoScale: 2.1, era: 'Tarifa',
    desc: [
      'Athlete representation, sponsorships, partnerships, and strategic growth.',
      'Currently managing two of the most talented riders in the world.',
    ],
  },
  {
    title: 'Italy and Spain Distributor', org: 'Harlem Kitesurfing', period: 'Mar 2025 - Present · 1 yr 5 mos', logo: logoHarlem, era: 'Tarifa',
    desc: [
      'Exclusive distribution partner for Harlem in Italy, Spain, and the Canary Islands.',
      'Retail and ambassador strategy, brand positioning.',
    ],
  },
  {
    title: 'Co-Founder & CEO', org: 'Ridesk', orgUrl: 'https://www.ridesk.app/', period: 'Oct 2025 - Present · 10 mos', logo: logoRidesk, era: 'Tarifa',
    desc: [
      'Objective: simplify the watersport school industry through digital innovation.',
      'Building Ridesk, a scalable SaaS platform that helps schools manage bookings, instructors, payments, and daily operations from one all-in-one system.',
    ],
  },
  {
    title: 'Chief Operating Officer', org: 'Snowit (Founding Team)', orgUrl: 'https://snowit.ski/en', period: 'May 2019 - Feb 2025 · 5 yrs 10 mos', logo: logoSnowit, era: 'Milan',
    companyDesc: 'Leading travel-tech platform for winter sports, integrating ski passes, equipment rental, lessons, accommodation and other mountain services into a single digital customer journey. Snowit also provides white-label e-commerce solutions for ski resorts and tourism destinations.',
    desc: [
      'Scaled Snowit to 400k+ users and the team from 3 to 50+ people.',
      'Led Product, Ops, and Customer Care teams.',
      'Managed P&L and implemented agile project management tools and routines.',
      'Defined the new operating model and built the Operations & Product and Customer Care teams; the app holds a 4.8-star rating, credited in part to that work.',
      'GPS-based mobile application for skiers and snowboarders, designed to track and analyse on-slope performance. The app records distance travelled, elevation, number of runs, average and maximum speed, and calories burned, while allowing users to identify ski runs and visualise their routes on 3D maps. It also includes social and gamification features, such as challenges, rewards, performance comparison and social sharing.',
    ],
  },
  {
    title: 'Co-Founder & Chief Operating Officer', org: 'Tribala', orgUrl: 'https://tribala.travel/en', period: 'May 2023 - Feb 2025 · 1 yr 10 mos', logo: logoTribala, era: 'Milan',
    companyDesc: 'Sports travel platform specialising in curated group trips built around activities such as kitesurfing, skiing, padel and other outdoor sports. It combines travel services, coaching, equipment rental and local support, connecting people through communities based on shared sporting interests.',
    desc: [
      'Co-founded Tribala, taking it from the initial idea to launch and market validation.',
      'Built the brand identity and product strategy for a sports group travel marketplace.',
      'Led operations, partnerships, and growth, creating group experiences across multiple sports and destinations.',
    ],
  },
  {
    title: 'Digital & Innovation Ambassador', org: 'FNM S.p.A.', orgUrl: 'https://www.fnmgroup.it/', period: 'Sep 2022 - Oct 2024 · 2 yrs 2 mos', logo: logoFnm, era: 'Milan',
    companyDesc: 'Integrated mobility and infrastructure group active in public transport, railway and motorway infrastructure, renewable energy and logistics. The Group develops and manages services and infrastructure focused on sustainable, connected and innovative mobility.',
    desc: [
      'Member of Digital & Innovation Ambassadors to promote innovation within the FNM group.',
    ],
  },
  {
    title: 'Consultant', org: 'DGM Consulting Srl', orgUrl: 'https://dgmco.it/it/', period: 'Apr 2018 - Aug 2018 · 5 mos', logo: logoDgm, era: 'Milan',
    companyDesc: 'Management consulting firm specialising in corporate performance, supporting companies across performance planning, measurement and management. It combines business analysis, forecasting, management control and technology-enabled tools to improve decision-making, operational efficiency and business results.',
    desc: ['Data analytics and strategic consulting in hospitality and industrial sectors.'],
  },
];

const EDUCATION: RoleItem[] = [
  {
    title: 'MSc in Management', org: 'Bocconi University', period: 'Sep 2016 - Dec 2018', logo: logoBocconi, era: 'Milan',
    desc: [
      'Top grades (110/110).',
      'Final thesis on budgeting effectiveness and behavior.',
      "Bocconi is consistently ranked among the world's top business schools in Financial Times rankings.",
    ],
  },
  {
    title: 'Exchange Program', org: 'National Taiwan University of Taipei', period: 'Aug 2016 - Dec 2018', logo: logoNtuTaiwan, era: 'Taiwan',
    desc: ['Business & culture exchange.', 'GPA 4/4.'],
  },
  {
    title: 'BSc', org: 'Bocconi University', period: 'Sep 2013 - Jul 2016', logo: logoBocconi, era: 'Milan',
    desc: [],
  },
];

const LANGUAGES = [
  { flag: '🇮🇹', text: 'Italian: Native' },
  { flag: '🇬🇧', text: 'English: Professional working proficiency' },
  { flag: '🇪🇸', text: 'Spanish: Professional working proficiency' },
];

export default function AboutNick() {
  const [heroIn, setHeroIn] = useState(false);
  const wind = useLiveWind();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => setHeroIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden border-b border-border">
        {wind.status === 'ready' && (
          <WindField speedKn={wind.data.speedKn} directionDeg={wind.data.directionDeg} />
        )}
        <div
          className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 pt-16 pb-14 max-w-2xl relative">
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-full bg-primary/20 blur-xl motion-safe:animate-pulse" aria-hidden="true" />
                <img
                  src={nickAvatar}
                  alt="Nicholas Baruffaldi"
                  className="relative w-24 h-24 rounded-full object-cover border-2 border-primary/40 shadow-[0_0_30px_-8px_hsl(var(--primary)/0.5)]"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  Nicholas Baruffaldi
                </h1>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  <Badge variant="outline" className="border-primary/40 text-primary text-[11px]">Forbes Under 30</Badge>
                  <Badge variant="outline" className="text-[11px] gap-1">
                    <MapPin className="w-3 h-3" /> Based in Tarifa
                  </Badge>
                  <a href="#work-together">
                    <Badge variant="outline" className="text-[11px] gap-1.5 border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10 transition-colors">
                      <span className="relative flex w-1.5 h-1.5">
                        <span className="absolute inset-0 rounded-full bg-emerald-500 motion-safe:animate-ping opacity-75" />
                        <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </span>
                      NAICK advisory
                    </Badge>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              I'm a digital enthusiast and sport lover born and raised in the Italian Alps, with the dream of
              transforming the competitive sport arena into something bigger than performance. Today I'm CEO
              &amp; Co-founder of Flight Mode, official Harlem Kitesurfing distributor for Italy and Spain,
              and manager of pro athletes Lorenzo and Leonardo Casati, two of the most iconic talents in
              international kitesurfing. Previously C-level
              executive in scale-ups, I bring a hybrid mindset blending business, brand building and athlete
              development. Selected in Forbes Under 30, I believe in clarity, bold execution and authentic
              stories. As an avid believer in optimisation, I follow the motto: "done is better than perfect."
            </p>

            <p className="text-base text-muted-foreground mb-8 -mt-4">
              Since September 2026 I also run <span className="font-semibold bg-gradient-to-b from-[#FF9B14] to-[#FD6502] bg-clip-text text-transparent">NAICK</span>,
              my independent advisory practice, helping founders and companies on strategy, digital transformation and AI adoption.{' '}
              <a href="#work-together" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
                Want to work together? <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {wind.status === 'ready' && (
                <WindCompass
                  directionDeg={wind.data.directionDeg}
                  speedKn={wind.data.speedKn}
                  gustsKn={wind.data.gustsKn}
                  temperatureC={wind.data.temperatureC}
                />
              )}
              <SessionStats totalSessions={377} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="group relative rounded-lg border border-border bg-card p-4 text-center overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-hover)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <AnimatedCounter target={50} suffix="+" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-tight">Team scaled from 3, as founding COO</div>
              </div>
              <div className="group relative rounded-lg border border-border bg-card p-4 text-center overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-hover)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <AnimatedCounter target={2} />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-tight">World Champion riders managed: Lorenzo & Leonardo Casati</div>
              </div>
              <div className="group relative rounded-lg border border-border bg-card p-4 text-center overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-hover)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <AnimatedCounter target={110} suffix="/110" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-tight">Bocconi MSc in Management</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 max-w-2xl">
        <div className="flex items-center gap-2 mb-5">
          <Briefcase className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-mono tracking-widest uppercase text-primary">Experience</h2>
        </div>
        <RoleList items={EXPERIENCE} />

        <div className="flex items-center gap-2 mb-5 mt-14">
          <GraduationCap className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-mono tracking-widest uppercase text-primary">Education</h2>
        </div>
        <RoleList items={EDUCATION} />

        <div className="space-y-10 mt-16">
          <div>
            <h2 className="font-bold mb-3">Languages</h2>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {LANGUAGES.map((l) => <li key={l.text}>{l.flag} {l.text}</li>)}
            </ul>
          </div>

          <div id="work-together" className="scroll-mt-8 relative rounded-xl border border-[#FD6502]/30 bg-card p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FD6502] to-transparent" aria-hidden="true" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FD6502]/10 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <img src={naickWordmark} alt="NAICK" className="h-7 md:h-8 w-auto" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF9B14] border-l border-border pl-3">Advisory</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">Want to work together?</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg">
                Strategy, digital transformation, AI adoption or a fractional COO for your next growth phase.
                Tell me where you are and where you want to go, and let's see if I can help you get there faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/393483409712?text=Hi%20Nicholas%2C%20I%27d%20like%20to%20talk%20about%20working%20together."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:brightness-105"
                >
                  <MessageCircle className="w-4 h-4" /> Message me on WhatsApp
                </a>
                <a
                  href="mailto:nicholas.baruffaldi@gmail.com?subject=Let's%20work%20together"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 hover:border-primary/50"
                >
                  <Mail className="w-4 h-4" /> Send me an email
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-6 gap-y-1.5 mt-5 text-xs text-muted-foreground">
                <a href="mailto:nicholas.baruffaldi@gmail.com" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Mail className="w-3.5 h-3.5" /> nicholas.baruffaldi@gmail.com
                </a>
                <a href="tel:+393483409712" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Phone className="w-3.5 h-3.5" /> +39 348 3409712
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeployTag />
    </div>
  );
}
