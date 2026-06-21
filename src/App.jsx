import { useEffect, useMemo, useState } from 'react';
import { Check, Menu, Phone, Play, Star, X } from 'lucide-react';
import portraitImage from '../picture.jpeg';
import logoImage from '../logo.png';

const navLinks = [
  ['Home', '#'],
  ['Conditions', '#conditions'],
  ['Results', '#results'],
  ['Pricing', '#pricing'],
];

const actionLinks = [
  ['WhatsApp', '#'],
  ['Call', 'tel:+917846800800'],
];

const conditions = [
  ['01', 'Diabetes', 'Type 1, Type 2, gestational and pre-diabetes plans measured against HbA1c.'],
  ['02', 'PCOS', 'Insulin resistance, fertility nutrition and cycle regularity through food.'],
  ['03', 'Thyroid', 'Hypothyroid, hyperthyroid and Hashimoto plans timed around medication.'],
  ['04', 'Kidney', 'CKD, dialysis and transplant nutrition with precise clinical targets.'],
  ['05', 'Heart', 'Lipids, hypertension and cardiac recovery without fad restrictions.'],
  ['06', 'Weight', 'Sustainable fat loss built around your kitchen, schedule and labs.'],
];

const stats = [
  ['3,671', 'Patients recommend her on Practo'],
  ['30,000+', 'Patients treated'],
  ['30', 'Years of clinical practice'],
  ['4.9★', 'Average rating'],
];

const testimonials = [
  ['Lost 28 kg in 6 months', 'I was 30 kilos overweight and lost 28 in six months. I never once starved.', 'VK', 'Vidya K.', 'Weight Management'],
  ['Thyroid dose reduced', 'Thyroid issues of 18 years. Sustainable solutions, not quick fixes - and my dose came down.', 'SR', 'Sreedhar R.', 'Thyroid'],
  ['All parameters normal', 'No extra supplement or drink. Every parameter came back to normal in three months.', 'BM', 'Bharati M.', 'Metabolic Health'],
];

const depthItems = [
  ['Diabetes Mellitus', '4 sub-conditions', 'Type 1, Type 2, gestational and pre-diabetes. Carbohydrate-counted plans target HbA1c reduction and, where possible, Type 2 remission.'],
  ['PCOS & Women\'s Endocrine', '3 sub-conditions', 'PCOS, insulin resistance and infertility nutrition. Restoring ovulation and cycle regularity through metabolic correction.'],
  ['Thyroid Disorders', '3 sub-conditions', 'Hypothyroidism, hyperthyroidism and Hashimoto\'s. Nutrition timed around medication while supporting energy and weight.'],
  ['Renal / Kidney Disease', '4 sub-conditions', 'CKD by stage, dialysis nutrition, transplant and nephrotic syndrome. Protein, potassium, phosphorus and fluid management.'],
];

const steps = [
  ['Share your reports', 'Upload your latest labs and history before the first session - no repeat tests needed.'],
  ['Full metabolic assessment', 'Dr. Nafeesa reviews every parameter and maps your real clinical picture.'],
  ['A diet from your own kitchen', 'A plan built on the food your family already cooks. Nothing to buy.'],
  ['Follow-ups & verified results', 'Regular reviews, plan adjustments and progress you confirm in your next report.'],
];

const prices = [
  { tag: 'Start here', tier: 'First Consultation', amount: '₹1,000', duration: 'One full session with Dr. Nafeesa', credit: 'Credited toward any programme you choose.', items: ['Full metabolic assessment', 'Lab-report review', 'Honest go / no-go advice'], tone: 'lead' },
  { tier: '3-Month', amount: '₹22,000', duration: 'Short programme', items: ['2 detailed diet plans', 'Follow-up reviews'] },
  { tag: 'Most chosen', tier: '6-Month', amount: '₹35,000', duration: 'Standard programme', items: ['Quarterly diet plans', 'Priority follow-ups', 'Lab-cycle tracking'], tone: 'feature' },
  { tier: '9-Month', amount: '₹48,000', duration: 'Extended programme', items: ['Ongoing plans', 'Sustained tapering'] },
  { tier: '12-Month', amount: '₹60,000', duration: 'Full-year programme', items: ['Year-long support', 'Full reversal focus'] },
];

const faqs = [
  ['Is the video consultation as good as in-person?', 'Yes. The assessment is based on your lab reports and history, which work identically over video. Most out-of-Bangalore and overseas patients are treated online.'],
  ['Will you coordinate with my doctor?', 'Always. Medical Nutrition Therapy runs alongside your physician\'s treatment. We never replace it, and we share plans on request.'],
  ['Do I have to buy supplements or products?', 'Never. Not one supplement, powder or product. Your plan uses ordinary food from your own kitchen.'],
  ['I am outside Bangalore or India - can I consult?', 'Yes. Video consultations are available across India and internationally, in addition to in-clinic visits in Bengaluru.'],
  ['What happens in the ₹1,000 session?', 'A full review of your reports, a clear explanation of your metabolic picture and honest advice on whether a programme will help.'],
];

const clinics = {
  Indiranagar: ['Map - Indiranagar', 'First Eat Right - Indiranagar', '100 Ft Road, Indiranagar, Bengaluru 560038'],
  Jayanagar: ['Map - Jayanagar', 'First Eat Right - Jayanagar', '4th Block, Jayanagar, Bengaluru 560011'],
  'JP Nagar': ['Map - JP Nagar', 'First Eat Right - JP Nagar', '6th Phase, JP Nagar, Bengaluru 560078'],
};

function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = [...document.querySelectorAll('.reveal')];
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('in'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  return (
    <div className="page-canvas min-h-screen text-body">
      <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <HeaderMobileMenu close={() => setMenuOpen(false)} />}
      <main>
        <Hero />
        <ConditionSelector />
        <FraudBlock />
        <DoctorProfile />
        <Stats />
        <Testimonials />
        <Videos />
        <GoogleReviews />
        <ConditionDepth />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Clinics />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}

function Wrap({ children, className = '' }) {
  return <div className={cx('mx-auto max-w-[1180px] px-6', className)}>{children}</div>;
}

function Section({ children, className = '', id }) {
  return <section id={id} className={cx('py-16 md:py-24', className)}>{children}</section>;
}

function Eyebrow({ children, center = false }) {
  return (
    <div className={cx('mb-5 inline-block border-b-2 border-gold-soft pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold', center && 'mx-auto')}>
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, text, center = false }) {
  return (
    <div className={cx('reveal mb-10 max-w-[62ch]', center && 'mx-auto text-center')}>
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className="font-serif text-[clamp(28px,4vw,40px)] leading-tight text-primary">{title}</h2>
      {text && <p className="mt-4 text-[clamp(16px,1.6vw,18px)] leading-8">{text}</p>}
    </div>
  );
}

function Button({ children, tone = 'primary', className = '', href = '#', ...props }) {
  const tones = {
    primary: 'border-deep bg-deep text-canvas hover:bg-brand',
    ghost: 'border-border-strong text-primary hover:border-primary hover:bg-primary hover:text-canvas',
    gold: 'border-gold bg-gold text-primary hover:brightness-105',
  };
  return (
    <a href={href} className={cx('inline-flex items-center justify-center gap-2 rounded-[10px] border px-6 py-3.5 text-base font-medium no-underline transition', tones[tone], className)} {...props}>
      {children}
    </a>
  );
}

function HeaderNav({ menuOpen, setMenuOpen }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-transparent bg-transparent backdrop-blur-xl">
      <Wrap className="grid min-h-[92px] grid-cols-[1fr_auto_1fr] items-center gap-5 py-4">
        <a href="#" className="flex min-w-[210px] items-center no-underline">
          <img src={logoImage} alt="First Eat Right" className="h-14 w-auto object-contain" />
        </a>

        <div className="hidden items-center rounded-full border border-border/60 bg-surface/45 px-2 py-1 shadow-lg shadow-primary/5 backdrop-blur-xl md:flex">
          {navLinks.map(([label, href]) => (
            <a key={label} className="rounded-full px-10 py-2.5 text-[13px] font-semibold text-primary transition hover:bg-canvas hover:text-deep" href={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center justify-end gap-5 md:flex">
          {actionLinks.map(([label, href]) => (
            <a key={label} className="text-[13px] font-bold text-deep transition hover:text-copper" href={href}>
              {label}
            </a>
          ))}
          <Button href="#pricing" className="rounded-2xl px-2 py-1 text-center text-[13px] font-bold">Book Consultation</Button>
        </div>

        <button className="col-start-3 ml-auto flex p-2 md:hidden" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Wrap>
    </nav>
  );
}

function HeaderMobileMenu({ close }) {
  return (
    <div className="border-b border-border bg-canvas px-6 py-3 md:hidden">
      {navLinks.map(([label, href]) => (
        <a key={label} onClick={close} className="block border-b border-border py-3 font-medium text-primary" href={href}>
          {label}
        </a>
      ))}
      {actionLinks.map(([label, href]) => (
        <a key={label} onClick={close} className="block border-b border-border py-3 font-medium text-primary" href={href}>
          {label}
        </a>
      ))}
      <Button href="#pricing" className="mt-4 w-full" onClick={close}>Book ₹1,000</Button>
    </div>
  );
}

function UtilityBar() {
  return (
    <div className="bg-deep text-xs text-canvas">
      <Wrap className="flex flex-wrap items-center justify-between gap-3 py-2">
        <div className="tracking-wide opacity-95"><b className="text-gold-soft">30 years</b> hospital clinical dietetics · <b className="text-gold-soft">30,000+</b> patients · No supplements</div>
        <div className="flex gap-5 font-medium"><a href="tel:+917846800800">+91 78468 00800</a><a href="#clinics">Bangalore clinics</a></div>
      </Wrap>
    </div>
  );
}

function Nav({ menuOpen, setMenuOpen }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-canvas/90 backdrop-blur">
      <Wrap className="flex items-center justify-between py-3.5">
        <a href="#" className="flex flex-col leading-none no-underline">
          <span className="font-serif text-2xl font-semibold text-primary">First Eat Right</span>
          <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-gold">Clinical Dietetics</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(([label, href]) => <a key={label} className="text-[15px] font-small text-primary hover:text-brand" href={href}>{label}</a>)}
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <a className="text-sm font-semibold text-deep" href="#">WhatsApp</a>
          <Button href="#pricing" className="px-5 py-2.5 text-sm">Book Consultation</Button>
        </div>
        <button className="flex p-2 md:hidden" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Wrap>
    </nav>
  );
}

function MobileMenu({ close }) {
  return (
    <div className="border-b border-border bg-canvas px-6 py-3 md:hidden">
      {navLinks.map(([label, href]) => <a key={label} onClick={close} className="block border-b border-border py-3 font-medium text-primary" href={href}>{label}</a>)}
      <Button href="#pricing" className="mt-4 w-full" onClick={close}>Book ₹1,000</Button>
    </div>
  );
}

function Hero() {
  return (
    <Section className="hero-background overflow-hidden !pt-6 md:!pt-8">
      <Wrap className="grid items-center gap-8 md:grid-cols-[1.05fr_.95fr]">
        <div className="hero-anim" >
          <h1 className="mb-6 font-serif text-[clamp(34px,5.2vw,55px)] leading-[1.04] text-primary">Reverse the numbers your doctor is worried about. <em className="text-deep">With food.</em></h1>
          <p className="mb-7 max-w-[54ch] text-[clamp(16px,1.7vw,15px)] leading-8">Dr. Nafeesa Imteyaz treats diabetes, PCOS, thyroid, kidney, heart and 10 other conditions with <b className="font-semibold text-primary">30 years of hospital-grade science</b> - built on ordinary Indian food. <b className="font-semibold text-primary">No supplements. No detox. No injections. Ever.</b></p>
          <div className="mb-7 flex flex-wrap gap-2.5">
            {['Diabetes', 'PCOS', 'Thyroid', 'Kidney', 'Heart', 'Weight'].map((item) => <a className="rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium hover:border-brand hover:text-brand" href="#conditions" key={item}>{item}</a>)}
            <a className="rounded-full border border-mint bg-sage px-3.5 py-2 text-sm font-semibold text-deep" href="#conditions">All 15</a>
          </div>
          <div className="mb-7 flex flex-wrap gap-3.5">
            <Button href="#pricing">Book consultation</Button>
            <Button tone="ghost" href="#naf">Meet Dr. Nafeesa</Button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <span className="flex items-center gap-1.5"><Star size={16} className="fill-gold text-gold" /> <b className="text-primary">4.9</b> Google</span>
            <span><b className="text-primary">3,671</b> Practo recommendations</span>
            <span><b className="text-primary">Video</b> and in-clinic</span>
          </div>
        </div>
        <div className="reveal relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sage to-warm md:max-w-[420px] lg:max-w-[460px] md:justify-self-end md:self-center">
          <img className="h-full w-full object-cover object-center" src={portraitImage} alt="Dr. Nafeesa Imteyaz" />
          <div className="absolute right-4 top-4 rounded-full border border-gold-soft bg-surface px-3 py-1.5 text-xs font-semibold text-gold">Clinical lead</div>
        </div>
      </Wrap>
    </Section>
  );
}

function ConditionSelector() {
  return (
    <Section id="conditions" className="bg-sage">
      <Wrap>
        <SectionHead eyebrow="Start with your condition" title="Find the plan built for your diagnosis." text="Clinical nutrition only works when it respects the condition, medication, reports and home food sitting in front of us." />
        <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map(([num, title, copy]) => <ConditionCard key={title} num={num} title={title} copy={copy} />)}
        </div>
        <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-4">
          <a className="font-semibold text-deep" href="#conditions-depth">View all 15 conditions →</a>
          <span className="text-sm text-muted">Each condition gets its own lab-led protocol page.</span>
        </div>
      </Wrap>
    </Section>
  );
}

function ConditionCard({ num, title, copy }) {
  return (
    <a href="#conditions-depth" className="block rounded-[18px] border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-border-strong hover:shadow-xl hover:shadow-primary/10">
      <span className="font-serif text-sm font-semibold text-gold">{num}</span>
      <h3 className="my-2 font-serif text-[21px] text-primary">{title}</h3>
      <p className="text-[14.5px] leading-6">{copy}</p>
      <div className="mt-4 text-sm font-semibold tracking-wide text-brand">Explore protocol</div>
    </a>
  );
}

function FraudBlock() {
  const never = ['Supplements', 'Detox drinks', 'Meal replacements', 'Fat-loss injections', 'Fear marketing', 'Junior staff handoffs'];
  return (
    <Section className="bg-warm">
      <Wrap>
        <SectionHead center eyebrow="The line we refuse to cross" title="Medicine first. Marketing never." />
        <p className="reveal mx-auto mb-10 max-w-[20ch] text-center font-serif text-[clamp(24px,3.4vw,34px)] italic leading-snug text-primary">That war is our brand.</p>
        <div className="reveal grid gap-5 md:grid-cols-2">
          <div className="rounded-[20px] border border-border bg-surface p-7">
            <h3 className="mb-5 font-serif text-xl text-primary">Built on</h3>
            {['Clinical reports', 'Hospital dietetics', 'Ordinary Indian food', 'Medication-aware plans', 'Follow-up lab tracking', 'Honest stop advice'].map((item) => (
              <div key={item} className="mb-3 flex gap-3 text-[15.5px]"><Check size={18} className="mt-1 text-brand" />{item}</div>
            ))}
          </div>
          <div className="rounded-[20px] bg-deep p-7 text-canvas">
            <h3 className="mb-5 font-serif text-xl text-canvas">Never sold here</h3>
            {never.map((item) => <div key={item} className="mb-3 text-[15.5px] text-[#fff3d7] line-through decoration-gold-soft decoration-2">{item}</div>)}
          </div>
        </div>
        <div className="reveal mt-8 rounded-2xl border border-gold-soft bg-warm p-6 font-serif text-lg italic leading-7 text-primary">"Patients are not sales funnels. They are people with reports, families and kitchens." <span className="mt-2 block font-sans text-sm not-italic text-muted">- First Eat Right clinical principle</span></div>
      </Wrap>
    </Section>
  );
}

function DoctorProfile() {
  return (
    <Section id="naf">
      <Wrap className="grid items-center gap-12 md:grid-cols-[.9fr_1.1fr]">
        <div className="reveal aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sage to-warm">
          <div className="flex h-full items-center justify-center font-serif text-7xl text-brand/50">NI</div>
        </div>
        <div className="reveal">
          <Eyebrow>Who you'd actually work with</Eyebrow>
          <h2 className="font-serif text-[clamp(28px,4vw,40px)] leading-tight text-primary">Why doctors send their own patients to her.</h2>
          <div className="my-7 space-y-5">
            {[
              ['F', 'Ran the Dietetics department at Fortis Hospital', 'three decades of hospital-grade clinical practice.'],
              ['★', 'Credentialed by the U.S. Academy of Nutrition & Dietetics', 'and licensed by Dubai\'s Ministry of Health.'],
              ['1', 'One specialist', '30 years, 30,000+ patients, 15 conditions. Never outsourced.'],
            ].map(([ico, bold, rest]) => (
              <div className="flex gap-4" key={bold}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage font-serif text-xl font-semibold text-deep">{ico}</span>
                <p className="leading-6"><b className="font-semibold text-primary">{bold}</b> - {rest}</p>
              </div>
            ))}
          </div>
          <div className="rounded-r-2xl border-l-4 border-gold bg-surface p-5 font-serif text-lg italic leading-7 text-primary">"Patients describe her as simple, uncomplicated and honest - she once told a patient to stop paying the moment her reports came back normal."</div>
        </div>
      </Wrap>
    </Section>
  );
}

function Stats() {
  return (
    <Section id="results" className="bg-alt">
      <Wrap>
        <SectionHead center eyebrow="Proof, not promises" title="Results you can verify in your own lab reports." />
        <div className="reveal grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(([num, label]) => (
            <div className="text-center" key={label}>
              <div className="text-[clamp(38px,5vw,54px)] font-bold leading-none text-deep">{num}</div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</div>
            </div>
          ))}
        </div>
        <p className="reveal mx-auto mt-10 max-w-[60ch] text-center"><b className="font-semibold text-primary">Medication reduction and biomarker reversal</b> - claims no supplement-seller, and almost no competing "nutritionist," can make.</p>
      </Wrap>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section>
      <Wrap>
        <SectionHead center eyebrow="In their own words" title="Real people. Real lab reports." text="★ 4.9 · 494 detailed patient stories on Practo" />
        <div className="reveal grid gap-5 md:grid-cols-3">
          {testimonials.map(([result, quote, av, name, cond]) => (
            <div className="flex flex-col rounded-[18px] border border-border bg-surface p-6" key={name}>
              <span className="mb-4 self-start rounded-full border border-gold-soft bg-warm px-3 py-1 text-sm font-bold text-copper">{result}</span>
              <p className="mb-5 font-serif text-lg leading-7 text-primary">"{quote}"</p>
              <div className="mt-auto flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mint text-sm font-bold text-deep">{av}</span>
                <div><div className="text-sm font-semibold text-primary">{name}</div><div className="text-xs text-muted">{cond}</div></div>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function Videos() {
  return (
    <Section className="bg-alt">
      <Wrap>
        <SectionHead center eyebrow="Hear it from them" title="Patient stories, unscripted." />
        <div className="reveal grid grid-cols-2 gap-4 md:grid-cols-4">
          {['Diabetes reversal - off two medications', 'PCOS - natural conception story', '22 kg lost, kept off for 2 years', 'Thyroid & energy, fully restored'].map((caption) => (
            <button key={caption} className="relative flex aspect-[9/13] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#4f7047] to-[#94b38a] text-left">
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/90 text-deep transition hover:scale-110"><Play size={24} fill="currentColor" /></span>
              <span className="relative z-10 w-full bg-gradient-to-b from-transparent to-black/60 p-4 text-sm font-semibold leading-5 text-[#fff3d7]">{caption}</span>
            </button>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function GoogleReviews() {
  return (
    <Section>
      <Wrap>
        <SectionHead center eyebrow="Verified on Google" title="Three clinics. One standard." />
        <div className="reveal mb-10 flex flex-wrap items-center justify-center gap-4">
          <span className="font-serif text-5xl font-semibold text-primary">4.9</span>
          <div><div className="text-xl tracking-widest text-gold">★★★★★</div><div className="text-sm text-muted">Across Indiranagar, Jayanagar & JP Nagar · live from Google</div></div>
        </div>
        <div className="reveal grid gap-5 md:grid-cols-3">
          {[
            ['Indiranagar', 'Finally a dietitian who reads your reports and explains everything. No products pushed at all.', 'Priya N.'],
            ['Jayanagar', 'My fatty liver reversed in four months on home food. I was sceptical - the reports convinced me.', 'Arun S.'],
            ['JP Nagar', 'Honest, scientific, patient. She told me when I no longer needed the programme. Who does that?', 'Latha R.'],
          ].map(([clinic, copy, who]) => (
            <div className="rounded-[18px] border border-border bg-surface p-6" key={clinic}>
              <div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-brand">{clinic}</span><span className="text-sm text-gold">★★★★★</span></div>
              <p className="text-[14.5px] leading-6">"{copy}"</p>
              <div className="mt-4 text-sm font-semibold text-primary">- {who}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function ConditionDepth() {
  const tags = ['Diabetes', 'PCOS', 'Thyroid', 'Kidney', 'Heart', 'Liver', 'Gut', 'Cancer', 'Pregnancy', 'Paediatric', 'Geriatric', 'Bone', 'Skin', 'Allergy', 'Weight'];
  return (
    <Section id="conditions-depth" className="bg-sage">
      <Wrap>
        <SectionHead eyebrow="How deep it goes" title="Fifteen conditions. Thirty-plus sub-conditions. Zero shortcuts." />
        <div className="reveal sticky top-16 z-20 mb-8 flex gap-1.5 overflow-x-auto rounded-full border border-mint bg-sage/95 p-2 backdrop-blur">
          {tags.map((tag) => <a href="#conditions-depth" className="shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold text-deep hover:bg-mint" key={tag}>{tag}</a>)}
        </div>
        <div className="reveal grid gap-4 md:grid-cols-2">
          {depthItems.map(([title, subs, copy]) => <div className="rounded-2xl border border-border bg-surface p-6" key={title}><h3 className="font-serif text-xl text-primary">{title}</h3><div className="my-2 text-sm font-semibold text-gold">{subs}</div><p className="text-[14.5px] leading-6">{copy}</p></div>)}
        </div>
        <p className="reveal mt-8 text-center text-sm text-muted">+ Heart, Liver, Gut, Cancer-support, Pregnancy, Paediatric, Geriatric, Bone, Skin, Allergy & Weight - each with its own protocol page.</p>
      </Wrap>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section>
      <Wrap>
        <SectionHead center eyebrow="What happens when you start" title="Four steps. No mystery." />
        <div className="reveal grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, copy], index) => <div className="relative pt-6" key={title}><div className="absolute left-0 top-0 font-serif text-sm font-semibold text-gold">0{index + 1}</div><div className="h-0.5 w-10 bg-gold-soft" /><h3 className="my-3 font-serif text-lg text-primary">{title}</h3><p className="text-[14.5px] leading-6">{copy}</p></div>)}
        </div>
      </Wrap>
    </Section>
  );
}

function Pricing() {
  return (
    <Section id="pricing" className="bg-alt">
      <Wrap>
        <SectionHead center eyebrow="What it costs, plainly" title="Simple, honest pricing." />
        <p className="reveal mx-auto mb-9 max-w-[60ch] text-center text-sm">No call-back marketing. No persuasive sales. No hidden costs. No supplements to buy - ever. <b className="text-primary">And we'll tell you to stop paying once you're well.</b></p>
        <div className="reveal grid gap-3.5 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1fr]">
          {prices.map((price) => <PriceCard key={price.tier} price={price} />)}
        </div>
        <div className="reveal mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-muted"><span><b className="text-body">UPI · NEFT · Cards</b></span><span><b className="text-body">GST-compliant</b> invoicing</span><span>Clear <b className="text-body">refund policy</b></span></div>
      </Wrap>
    </Section>
  );
}

function PriceCard({ price }) {
  const feature = price.tone === 'feature';
  const lead = price.tone === 'lead';
  return (
    <div className={cx('flex flex-col rounded-[18px] border p-5', feature ? 'border-deep bg-deep text-canvas shadow-2xl shadow-deep/20' : lead ? 'border-gold bg-warm md:col-span-2 lg:col-span-1' : 'border-border bg-surface')}>
      {price.tag && <span className="mb-3 self-start rounded-full bg-gold px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-primary">{price.tag}</span>}
      <div className={cx('text-xs font-semibold uppercase tracking-[0.1em]', feature ? 'text-gold-soft' : 'text-muted')}>{price.tier}</div>
      <div className="my-2 font-serif text-[34px] font-semibold">{price.amount}</div>
      <div className={cx('text-sm', feature ? 'text-[#fff3d7]' : 'text-muted')}>{price.duration}</div>
      {price.credit && <div className="mt-4 text-sm font-semibold leading-5 text-deep">{price.credit}</div>}
      <ul className="mt-4 space-y-2">
        {price.items.map((item) => <li className="flex gap-2 text-sm leading-5" key={item}><Check size={16} className={cx('mt-0.5 shrink-0', feature ? 'text-mint' : 'text-brand')} />{item}</li>)}
      </ul>
      <Button tone={feature ? 'gold' : lead ? 'primary' : 'ghost'} className="mt-auto w-full px-3 py-3 text-sm">{lead ? 'Book - ₹1,000' : 'Choose'}</Button>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Section>
      <Wrap>
        <SectionHead center eyebrow="Straight answers" title="Questions patients actually ask." />
        <div className="reveal mx-auto max-w-[780px]">
          {faqs.map(([question, answer], index) => (
            <div className="border-b border-border" key={question}>
              <button className="flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-xl text-primary" onClick={() => setOpen(open === index ? -1 : index)}>
                {question}<span className={cx('font-sans text-2xl text-gold transition', open === index && 'rotate-45')}>+</span>
              </button>
              <div className={cx('grid transition-all', open === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                <div className="overflow-hidden"><p className="max-w-[64ch] pb-5 text-[15px] leading-6">{answer}</p></div>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function Clinics() {
  const names = useMemo(() => Object.keys(clinics), []);
  const [active, setActive] = useState(names[0]);
  const clinic = clinics[active];

  return (
    <Section id="clinics" className="bg-alt">
      <Wrap className="grid gap-10 md:grid-cols-2">
        <div>
          <SectionHead eyebrow="Visit us" title="Three clinics across Bangalore." />
          <div className="reveal mb-5 flex flex-wrap gap-2">
            {names.map((name) => <button key={name} className={cx('rounded-full border px-4 py-2 text-sm font-semibold', active === name ? 'border-deep bg-deep text-canvas' : 'border-border bg-surface text-body')} onClick={() => setActive(name)}>{name}</button>)}
          </div>
          <div className="reveal">
            <div className="mb-4 flex aspect-[16/11] items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-sage to-mint text-sm font-semibold text-deep">{clinic[0]}</div>
            <p className="text-[14.5px] leading-6"><b className="text-primary">{clinic[1]}</b><br />{clinic[2]}<br />Mon-Sat · 10:00-19:00</p>
          </div>
        </div>
        <ContactForm />
      </Wrap>
    </Section>
  );
}

function ContactForm() {
  return (
    <div className="reveal rounded-[20px] border border-border bg-surface p-7">
      <h3 className="font-serif text-2xl text-primary">Talk to the clinic</h3>
      <p className="mb-5 text-sm text-muted">We respond within 24 hours - or faster on WhatsApp.</p>
      {['Your name', 'Mobile number'].map((label) => <label className="mb-4 block text-sm font-semibold text-primary" key={label}>{label}<input className="mt-1.5 w-full rounded-[10px] border border-border-strong bg-canvas px-3.5 py-3 text-[15px] text-body outline-brand" type={label === 'Mobile number' ? 'tel' : 'text'} placeholder={label === 'Mobile number' ? '10-digit mobile' : 'Full name'} /></label>)}
      <label className="mb-4 block text-sm font-semibold text-primary">Which condition?<select className="mt-1.5 w-full rounded-[10px] border border-border-strong bg-canvas px-3.5 py-3 text-[15px] text-body outline-brand"><option>Select a condition</option><option>Diabetes</option><option>PCOS</option><option>Thyroid</option><option>Kidney</option><option>Heart / Cholesterol</option><option>Weight</option><option>Other</option></select></label>
      <Button className="w-full">Send enquiry</Button>
      <p className="mt-4 text-center text-sm text-muted">Prefer to talk now? <a className="font-semibold text-deep" href="#">WhatsApp us</a> · <a className="font-semibold text-deep" href="tel:+917846800800">Call +91 78468 00800</a></p>
    </div>
  );
}

function FinalCTA() {
  return (
    <Section className="bg-deep text-center text-canvas">
      <Wrap>
        <h2 className="mb-6 font-serif text-[clamp(30px,4.6vw,46px)] leading-tight text-canvas">Take the first honest step for your health.</h2>
        <div className="mb-6 flex flex-wrap justify-center gap-3.5"><Button tone="gold" href="#pricing">Book your consultation - ₹1,000</Button><Button tone="ghost" className="border-canvas/50 text-canvas hover:bg-canvas hover:text-deep">WhatsApp us</Button></div>
        <div className="font-serif text-xl italic text-gold-soft">Real science. Ordinary food. Zero fraud.</div>
        <div className="mt-2 text-sm text-[#fff3d7]">In-clinic across Bangalore · Secure video consults across India & abroad</div>
      </Wrap>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-alt pb-32 pt-14">
      <Wrap>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div><div className="font-serif text-2xl font-semibold text-primary">First Eat Right</div><p className="mt-3 max-w-[32ch] text-sm leading-6 text-muted">Clinical dietetics led by Dr. Nafeesa Imteyaz. Medical Nutrition Therapy built on ordinary Indian food - never supplements.</p><div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-primary"><Star size={15} className="fill-gold text-gold" /> 4.9 on Google · 3,671 on Practo</div></div>
          <FooterCol title="Conditions" links={['Diabetes', 'PCOS', 'Thyroid', 'Kidney', 'Heart', 'View all 15 →']} />
          <FooterCol title="Resources" links={['Blog', 'Research & Patents', 'Myth Buster', 'Avoid Fraud', 'FAQs']} />
          <FooterCol title="Visit us" links={['Indiranagar', 'Jayanagar', 'JP Nagar', 'Book Consultation', 'Contact']} />
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-xs text-muted"><span>© 2026 FRST Healthcare Private Limited · CIN U85110KA2013PTC070387</span><span>Privacy · Terms</span></div>
      </Wrap>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return <div><h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-gold">{title}</h4>{links.map((link) => <a className="block py-1 text-sm text-body hover:text-brand" href="#" key={link}>{link}</a>)}</div>;
}

function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex gap-2 border-t border-border bg-surface p-2 shadow-2xl shadow-primary/20 md:hidden">
      <a className="flex-1 rounded-[10px] bg-sage px-2 py-3 text-center text-sm font-semibold text-deep" href="tel:+917846800800"><Phone className="mx-auto mb-0.5" size={16} />Call</a>
      <a className="flex-1 rounded-[10px] bg-warm px-2 py-3 text-center text-sm font-semibold text-copper" href="#">WhatsApp</a>
      <a className="flex-1 rounded-[10px] bg-deep px-2 py-3 text-center text-sm font-semibold text-canvas" href="#pricing">Book ₹1,000</a>
    </div>
  );
}

export default App;
