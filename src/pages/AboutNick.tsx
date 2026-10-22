import { useEffect, useState } from 'react';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { WindCompass } from '@/components/WindCompass';
import { SessionStats } from '@/components/SessionStats';
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
import logoWoo from '@/assets/logo-woo.svg';

const EXPERIENCE: RoleItem[] = [
  {
    title: 'Product Advisor', org: 'WOO Sports', orgUrl: 'https://woosports.com/', period: 'Oct 2026 - Present', logo: logoWoo, era: 'Remote',
    companyDesc: 'WOO builds the sensor and app that track kiteboarding performance, measuring jumps, height, airtime and landings. It is the reference data tool for riders and competitions worldwide.',
    desc: [
      'Product advisor to the WOO team, working on one focus area of the product at a time.',
      'Bringing the rider, coach and competition perspective into what WOO builds next.',
    ],
  },
  {
    title: 'Freelance Strategic Advisor', org: 'NAICK (freelance, independent)', period: 'Sep 2026 - Present', logo: logoNaick, era: 'Remote',
    companyDesc: 'NAICK is simply the name I work under as a freelance advisor. No agency, no team, no juniors: every project is run by me personally, end to end. Hands-on support for founders, scale-ups and sport brands that need to move faster, from strategy to execution, with the operator mindset of someone who has scaled teams and products first-hand.',
    desc: [
      'Growth strategy and go-to-market for startups, scale-ups and sport & outdoor brands.',
      'Digital transformation: operating models, processes, tooling and product organisation.',
      'AI adoption: identifying high-impact use cases, building internal AI workflows and agents, training teams to ship with AI.',
      'Fractional COO support for early-stage teams: P&L, ops routines, hiring plans and OKRs.',
    ],
  },
  {
    title: 'Co-Founder & CEO', org: 'Flight Mode', period: 'Mar 2025 - Present', logo: logoFlightMode, era: 'Tarifa',
    desc: [
      'Objective: innovate and revolutionise the kitesurf industry.',
      'Developing market growth initiatives for the global wind-powered sports ecosystem.',
    ],
  },
  {
    title: 'Manager', org: 'Casati Brothers', orgUrl: 'https://casatibrothers.com/', period: 'Mar 2025 - Present', logo: logoCasatiBrothers, logoScale: 2.1, era: 'Tarifa',
    desc: [
      'Athlete representation, sponsorships, partnerships, and strategic growth.',
      'Currently managing two of the most talented riders in the world.',
    ],
  },
  {
    title: 'Italy and Spain Distributor', org: 'Harlem Kitesurfing', period: 'Mar 2025 - Present', logo: logoHarlem, era: 'Tarifa',
    desc: [
      'Exclusive distribution partner for Harlem in Italy, Spain, and the Canary Islands.',
      'Retail and ambassador strategy, brand positioning.',
    ],
  },
  {
    title: 'Co-Founder & CEO', org: 'Ridesk', orgUrl: 'https://www.ridesk.app/', period: 'Oct 2025 - Present', logo: logoRidesk, era: 'Tarifa',
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
      <header className="container mx-auto px-5 pt-20 pb-16 max-w-2xl">
        <div
          style={{
            opacity: heroIn ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div className="flex items-center gap-5 mb-10">
            <img
              src={nickAvatar}
              alt="Nicholas Baruffaldi"
              className="w-20 h-20 rounded-full object-cover shrink-0 ring-2 ring-primary/70 ring-offset-4 ring-offset-background"
            />
            <div className="min-w-0">
              <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight leading-tight">
                Nicholas Baruffaldi
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Forbes Under 30</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Based in Tarifa · Working remotely</span>
              </p>
            </div>
          </div>

          <p className="text-[17px] leading-relaxed text-foreground/85 mb-6">
            I'm a digital enthusiast and sport lover born and raised in the Italian Alps, with the dream of
            transforming the competitive sport arena into something bigger than performance. Today I'm CEO
            &amp; Co-founder of Flight Mode, official Harlem Kitesurfing distributor for Italy and Spain,
            and manager of pro athletes Lorenzo and Leonardo Casati, two of the most iconic talents in
            international kitesurfing. Previously C-level
            executive in scale-ups, I bring a hybrid mindset blending business, brand building and athlete
            development. Selected in Forbes Under 30, I believe in clarity, bold execution and authentic
            stories. As an avid believer in optimisation, I follow the motto: "done is better than perfect."
          </p>

          <p className="text-[17px] leading-relaxed text-foreground/85">
            Since September 2026 I also work as a <span className="text-foreground font-medium">freelance strategic advisor</span> under
            the <span className="font-semibold text-[#FD6502]">NAICK</span> brand. It's just me, working fully remote: I work one-to-one with founders and companies wherever they are, on strategy, digital transformation and AI adoption.{' '}
            <a href="#work-together" className="text-primary font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors">
              Want to work together?
            </a>
          </p>

          <dl className="grid grid-cols-3 mt-12 border-y border-border divide-x divide-border">
            {[
              { value: '50+', label: 'Team scaled from 3, as founding COO' },
              { value: '2', label: 'World Champion riders managed: Lorenzo & Leonardo Casati' },
              { value: '110/110', label: 'Bocconi MSc in Management' },
            ].map((stat) => (
              <div key={stat.value} className="py-5 px-3 first:pl-0 sm:px-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-3xl md:text-4xl tabular-nums text-primary">{stat.value}</dd>
                <dd className="text-xs text-muted-foreground mt-1.5 leading-snug">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main className="container mx-auto px-5 pb-16 max-w-2xl">
        <section>
          <h2 className="font-serif text-2xl mb-4 flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-primary" aria-hidden="true" />Experience</h2>
          <RoleList items={EXPERIENCE} />
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-2xl mb-4 flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-primary" aria-hidden="true" />Education</h2>
          <RoleList items={EDUCATION} />
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-2xl mb-4 flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-primary" aria-hidden="true" />Languages</h2>
          <ul className="divide-y divide-border border-y border-border text-sm">
            {LANGUAGES.map((l) => {
              const [lang, level] = l.text.split(': ');
              return (
                <li key={l.text} className="flex justify-between gap-4 py-3">
                  <span>{lang}</span>
                  <span className="text-muted-foreground text-right">{level}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-2xl mb-4 flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-primary" aria-hidden="true" />On the water</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </section>

        <section id="work-together" className="scroll-mt-8 mt-20 rounded-xl border border-[#FD6502]/30 bg-[#FD6502]/[0.04] p-6 md:p-10">
          <div className="flex items-center gap-3 mb-5">
            <img src={naickWordmark} alt="NAICK" className="h-6 w-auto" />
            <span className="text-xs text-[#FF9B14] border-l border-border pl-3">Freelance advisor</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Want to work together?</h2>
          <p className="text-[17px] leading-relaxed text-foreground/85 mb-8 max-w-xl">
            Strategy, digital transformation, AI adoption or a fractional COO for your next growth phase.
            I work solo and fully remote, so you deal directly with me from the first call to the last deliverable, wherever you are.
            Tell me where you are and where you want to go, and let's see if I can help you get there faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:nicholas.baruffaldi@gmail.com?subject=Let's%20work%20together"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#FF9B14] to-[#FD6502] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Mail className="w-4 h-4" /> Send me an email
            </a>
            <a
              href="https://wa.me/393483409712?text=Hi%20Nicholas%2C%20I%27d%20like%20to%20talk%20about%20working%20together."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              <MessageCircle className="w-4 h-4" /> Message me on WhatsApp
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-6 gap-y-1.5 mt-6 text-sm text-muted-foreground">
            <a href="mailto:nicholas.baruffaldi@gmail.com" className="hover:text-foreground transition-colors">
              nicholas.baruffaldi@gmail.com
            </a>
            <a href="tel:+393483409712" className="hover:text-foreground transition-colors">
              +39 348 3409712
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
