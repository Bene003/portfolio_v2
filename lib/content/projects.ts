import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "elyra",
    name: "Elyra",
    tagline: "Beauty e-commerce, end to end",
    summary:
      "A full direct-to-consumer storefront for an LED skincare brand — catalogue, checkout, editorial blog and an automated content pipeline. I own the design, the storefront, the admin and the infrastructure.",
    sector: "Beauty & skincare",
    role: "Design & Full-stack",
    year: "2025 — 2026",
    type: "E-commerce",
    status: "Live",
    tier: "listed",
    liveUrl: null,
    scope: [
      "Storefront, catalogue and Stripe checkout with geo-aware pricing",
      "MDX editorial blog on a scheduled publishing cadence",
      "Drag-and-drop merchandising admin behind row-level security",
      "Design, infrastructure and automation owned end to end",
    ],
    cover: {
      src: "/images/work/elyra/cover.webp",
      alt: "Elyra beauty-tech storefront homepage featuring an LED skincare mask",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "Supabase",
      "Stripe",
      "MDX",
      "Resend",
      "Vercel",
    ],
    highlights: [
      "Multi-currency & geo-aware pricing",
      "Stripe Checkout + webhook fulfilment",
      "MDX editorial blog with scheduled generation",
      "Drag-and-drop admin merchandising",
    ],
    problem: [
      "The brand had a product but no way to sell it. Off-the-shelf platforms locked the storefront into a template, took a cut of every sale, and made the editorial side — the part that actually brings traffic — an afterthought.",
      "The goal was a storefront I fully control: fast, indexable, multi-currency, and cheap to run — with content production that does not depend on someone remembering to write a blog post.",
    ],
    build: [
      {
        title: "Storefront & checkout",
        body: [
          "Product catalogue rendered statically with incremental revalidation, so the pages are as fast as a static site while stock and pricing stay current.",
          "Checkout runs on Stripe Checkout with a webhook that fulfils the order, writes it to Postgres and triggers the transactional email through Resend. Prices and currency resolve from the visitor's region rather than a single hard-coded market.",
        ],
      },
      {
        title: "Editorial engine",
        body: [
          "The blog is MDX, so an article is a file — versioned, diffable, and renderable with real components instead of a WYSIWYG blob.",
          "Scheduled jobs draft and publish content on a cadence, keeping the long-tail SEO surface growing without manual work.",
        ],
      },
      {
        title: "Admin",
        body: [
          "A drag-and-drop merchandising panel for reordering collections and featured products, backed by Supabase row-level security so the admin surface is genuinely locked down rather than hidden behind an unlisted URL.",
        ],
      },
    ],
    technical: [
      {
        title: "Static-first rendering",
        body: "Product and article routes are prerendered and revalidated on demand. Cold traffic never waits on a database round-trip.",
      },
      {
        title: "Webhook-driven fulfilment",
        body: "Order state is derived from Stripe events, never from the browser. A closed tab mid-payment cannot lose an order.",
      },
      {
        title: "Scheduled automation",
        body: "Cron routes handle content generation, product sync and analytics cleanup — the site maintains itself between releases.",
      },
      {
        title: "Row-level security",
        body: "Authorisation lives in Postgres policies, so an API mistake cannot leak another user's data.",
      },
    ],
    outcome: [
      "A storefront the brand owns outright, with no platform fees and no template ceiling — around 400 source files covering the shop, the blog, the admin and the automation.",
    ],
    accent: "#FF6A2B",
  },
  {
    slug: "immobilius",
    name: "Immobilius",
    tagline: "B2B real-estate intelligence",
    summary:
      "A SaaS that tells commercial real-estate teams which companies are about to need space. It watches funding rounds, headcount growth and executive hires, scores the signal, and drops the qualified lead on a map.",
    sector: "Commercial real estate",
    role: "Product & Full-stack",
    year: "2025 — 2026",
    type: "B2B SaaS",
    status: "Live",
    tier: "listed",
    liveUrl: null,
    scope: [
      "Signal engine watching funding, hiring and leadership moves",
      "AI lead scoring that states the reason behind every score",
      "Clustered map of thousands of qualified leads",
      "Subscription billing and daily digests",
    ],
    cover: {
      src: "/images/work/immobilius/cover.webp",
      alt: "Immobilius landing page showing a real-time globe of tracked companies beside a live feed of detected funding and hiring signals",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Leaflet",
      "Anthropic API",
      "Stripe",
      "Vercel",
    ],
    highlights: [
      "Signal engine: funding, hiring, leadership moves",
      "AI lead scoring with explainable reasons",
      "Clustered map of thousands of leads",
      "Subscription billing & daily digests",
    ],
    problem: [
      "Commercial brokers find deals by hearing about them late. By the time a company publicly looks for space, five other brokers already know.",
      "The bet: the intent is visible earlier. A funding round, a spike in job postings, a new COO — these leak months before a lease search. The product had to collect those signals continuously, decide which ones actually matter, and put them somewhere a broker can act on in ten seconds.",
    ],
    build: [
      {
        title: "Signal engine",
        body: [
          "Ingestion routes pull company events on a schedule and normalise them into a single signal table in Postgres — funding rounds, headcount deltas, executive appointments, address changes.",
          "Deduplication happens at write time, so one funding round reported by four sources becomes one signal rather than four leads.",
        ],
      },
      {
        title: "Scoring",
        body: [
          "Each lead gets a score from the combination of its signals, weighted by recency and by how predictive that signal type has been. The model returns a short written reason alongside the number — a score with no explanation is a score nobody trusts.",
        ],
      },
      {
        title: "The map",
        body: [
          "Leads render on a Leaflet map with marker clustering, so a dense downtown does not collapse into an unreadable pile of pins. Filters, the list view and the map stay in sync through a single URL-driven state.",
        ],
      },
    ],
    technical: [
      {
        title: "Idempotent ingestion",
        body: "Every ingestion job can be replayed safely. Re-running yesterday's fetch produces no duplicates.",
      },
      {
        title: "Explainable scoring",
        body: "Every score carries the signals that produced it. Users can audit the reasoning instead of trusting a black box.",
      },
      {
        title: "Clustered geospatial rendering",
        body: "Marker clustering plus viewport-bounded queries keep the map responsive with thousands of leads in play.",
      },
      {
        title: "Cron-backed digests",
        body: "A daily job emails each user only the leads that crossed their threshold since the last run — no dashboard-checking required.",
      },
    ],
    outcome: [
      "The largest thing I have built: roughly 880 source files spanning the ingestion pipeline, the scoring layer, the dashboard, the map and subscription billing.",
    ],
    accent: "#FFA24C",
  },
  {
    slug: "capitalhype",
    name: "CapitalHype",
    tagline: "Content agency site + CV engine",
    summary:
      "A done-for-you content agency for notaries and accountants. A narrative, scroll-driven site with a real-time 3D hero, plus an internal engine that turns a profile into a formatted, downloadable CV.",
    sector: "Professional services",
    role: "Design & Full-stack",
    year: "2026",
    type: "Marketing site & tool",
    status: "Live",
    tier: "case-study",
    featured: true,
    liveUrl: null,
    cover: {
      src: "/images/work/capitalhype/cover.webp",
      alt: "CapitalHype Studio landing page for notaries and accounting experts",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Spline",
      "GSAP",
      "Tailwind v4",
    ],
    highlights: [
      "Real-time WebGL hero",
      "GSAP scroll-driven narrative",
      "Profile-to-CV generation",
      "Tiered performance budget",
    ],
    problem: [
      "Notaries and accountants know they should publish. They do not have the time, and the agencies that serve them produce interchangeable filler.",
      "The site had to sell a done-for-you service to a conservative, sceptical audience — which meant it had to look expensive without looking frivolous, and load instantly on a mid-range laptop in an office.",
    ],
    build: [
      {
        title: "3D hero",
        body: [
          "A real-time WebGL scene built with React Three Fiber, gated behind a capability check so it only ever mounts on hardware that can actually run it. Everything else gets a designed CSS fallback, not a blank box.",
        ],
      },
      {
        title: "Scroll narrative",
        body: [
          "GSAP drives a sequence that explains the offer as you scroll: the problem, the process, the deliverable. Each beat is a pinned scene rather than a wall of copy.",
        ],
      },
      {
        title: "CV engine",
        body: [
          "An internal tool that takes a structured profile and produces a formatted CV, handling layout and export so the output is consistent regardless of who fills the form.",
        ],
      },
    ],
    technical: [
      {
        title: "Capability-gated WebGL",
        body: "GPU tier, memory, connection and motion preference are all checked before Three.js is even downloaded.",
      },
      {
        title: "Pinned scroll scenes",
        body: "GSAP ScrollTrigger drives the narrative with a single timeline, keeping scroll behaviour predictable across devices.",
      },
      {
        title: "Deterministic document output",
        body: "CV generation runs off a typed profile schema, so the same input always produces the same document.",
      },
    ],
    outcome: [
      "A marketing site that carries a premium positioning for a traditionally dry sector, plus the internal tooling the service runs on.",
    ],
    accent: "#6E7A94",
  },
  {
    slug: "ericeira-sense",
    name: "Ericeira Sense",
    tagline: "Surf lessons, booked and briefed",
    summary:
      "A booking platform for a surf school in Ericeira. Students pick a level, a package, a coach and a slot, then pay online — and the waiver, the swell brief and the reminders fire on their own. Coaches run their groups from the same system.",
    sector: "Sport & tourism",
    role: "Product & Full-stack",
    year: "2026",
    type: "Booking platform",
    status: "Delivered",
    tier: "listed",
    liveUrl: "https://ericeirasense.com",
    scope: [
      "Availability computed from roster, group limits and slots sold",
      "Stripe checkout confirmed by webhook, never by the browser",
      "Waivers, swell briefs and reminders timed to the lesson",
      "Coach space with group lists and student progression",
    ],
    cover: {
      src: "/images/work/ericeira-sense/cover.webp",
      alt: "Ericeira Sense beginner course page: two coaches in wetsuits holding surfboards beside a pricing table for one, three and five lessons, with what the level covers",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "Resend",
      "Vercel",
    ],
    highlights: [
      "Level, package, coach and slot selection",
      "Stripe checkout confirmed by webhook",
      "Automated waivers, swell briefs and reminders",
      "Coach space with student progression",
    ],
    problem: [
      "A surf school sells a slot that depends on the ocean, the tide and how many coaches are free that morning. Run over messages, that means double bookings, waivers signed on paper at the beach, and a coach discovering their group size on arrival.",
      "The booking flow had to know what is genuinely available before it takes money — and everything that used to happen by hand afterwards, from the waiver to the meeting point, had to fire by itself.",
    ],
    build: [
      {
        title: "Availability & checkout",
        body: [
          "Availability is computed from the coach roster, each package's group limit and the slots already sold, so a place disappears the moment it is taken rather than at the moment someone pays for it.",
          "Payment runs through Stripe and the booking is confirmed by the webhook, not the browser. A student who closes the tab mid-payment never ends up half-booked.",
        ],
      },
      {
        title: "Automatic briefing",
        body: [
          "Each booking starts its own sequence: the liability waiver to sign, the kit list, the meeting point, and a swell and weather brief timed to the session rather than to the purchase.",
          "Reminders are queued against the lesson, which is what removed the message the school used to send by hand every evening.",
        ],
      },
      {
        title: "Coach space",
        body: [
          "Coaches get their own view: the groups they have today, each student's level and history, and somewhere to log progression after the session — so a returning student is not assessed from scratch.",
        ],
      },
    ],
    technical: [
      {
        title: "Availability computed, never stored",
        body: "Free slots are derived from roster, capacity and existing bookings on every request. There is no second copy of the truth to drift out of sync.",
      },
      {
        title: "Webhook-confirmed bookings",
        body: "A place is held at checkout and only confirmed by the Stripe event, so the seat count can never be wrong — in the school's favour or the student's.",
      },
      {
        title: "Session-relative messaging",
        body: "Waivers, briefs and reminders are scheduled against the lesson time, not the booking time. A lesson bought three weeks out is still briefed the day before it happens.",
      },
    ],
    outcome: [
      "A school that sells slots instead of negotiating them by message, with waivers signed before anyone reaches the sand and coaches arriving knowing exactly who they have.",
    ],
    accent: "#2E9BC4",
  },
  {
    slug: "black-cat-cinema",
    name: "Black Cat Cinema",
    tagline: "Screenings, tickets and the weather",
    summary:
      "Programming, ticketing, newsletter and private-hire requests for an open-air cinema, in one system. Audiences browse screenings by venue and buy a ticket — and when the sky cancels the night, the postponement, the notifications and the refunds run themselves.",
    sector: "Culture & events",
    role: "Product & Full-stack",
    year: "2026",
    type: "Ticketing platform",
    status: "Delivered",
    tier: "listed",
    liveUrl: "https://www.theblackcatcinema.com",
    scope: [
      "Programming and ticketing across several open-air venues",
      "Weather postponements with automatic notices and refunds",
      "Newsletter and private-hire requests in the same system",
      "Audience communications tied to each screening",
    ],
    cover: {
      src: "/images/work/black-cat-cinema/cover.webp",
      alt: "Black Cat Cinema venues page: an audience seated in a floodlit Lisbon cloister facing an open-air screen at dusk",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "Resend",
      "Vercel",
    ],
    highlights: [
      "Screenings browsable by venue and date",
      "Stripe ticketing with practical details attached",
      "Weather watch, postponement and automatic refunds",
      "Newsletter and private-hire in one contact record",
    ],
    problem: [
      "An open-air cinema sells a night the sky can cancel. The programme lived in one place and the tickets in another, so a rained-off screening meant messaging every buyer by hand and refunding them one at a time.",
      "Selling the ticket was the easy half. The platform had to own the awkward half: moving a screening, telling everyone holding a ticket, and refunding the ones who cannot make the new date.",
    ],
    build: [
      {
        title: "Programme & ticketing",
        body: [
          "Screenings are browsable by venue and date, with tickets sold through Stripe. Gate time, address and what to bring travel with the ticket itself rather than sitting in a confirmation email nobody reopens.",
        ],
      },
      {
        title: "Weather, postponement & refunds",
        body: [
          "Each screening carries a weather watch scoped to its own venue. When a night is called off, a single action moves the screening, notifies every ticket holder, offers the new date and refunds anyone who declines it.",
          "That replaced a spreadsheet of buyers and a series of manual refunds — the part of the job that used to cost an evening.",
        ],
      },
      {
        title: "Audience & private hire",
        body: [
          "The newsletter and the private-hire requests run through the same records, so someone who bought a ticket and someone asking to rent the venue are one known contact instead of two disconnected inboxes.",
        ],
      },
    ],
    technical: [
      {
        title: "One action, whole-audience effect",
        body: "Postponing fans out to notification, rebooking and refund as a single operation, so no ticket holder can be silently missed.",
      },
      {
        title: "Refunds through the payment provider",
        body: "Money is returned against the original charge in Stripe, so the platform never holds a balance that has to be reconciled by hand.",
      },
      {
        title: "Venue-scoped weather watch",
        body: "Each location is watched independently — one site being rained out does not cancel a screening happening across town.",
      },
    ],
    outcome: [
      "A cinema that can lose a night to the weather without losing that night's audience: the screening moves, everyone is told, and the refunds settle themselves.",
    ],
    accent: "#7C6BD6",
  },
  {
    slug: "castellana-dental",
    name: "Castellana Clínica Dental",
    tagline: "From symptom to appointment",
    summary:
      "A rebuilt patient journey for a dental clinic: patients find the treatment matching what they actually feel, and request an appointment without leaving the site. Forms, calendar and CRM are connected so qualification, confirmations and reminders happen on their own — inside GDPR constraints.",
    sector: "Healthcare",
    role: "Product & Full-stack",
    year: "2026",
    type: "Patient journey",
    status: "Delivered",
    tier: "case-study",
    featured: true,
    liveUrl: "https://castellanaclinicadental.es",
    cover: {
      src: "/images/work/castellana-dental/cover.webp",
      alt: "Castellana Clínica Dental contact page: clinical staff in scrubs beside an invitation to get in touch, above the treatment navigation",
    },
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "PostgreSQL",
      "Supabase",
      "CRM integration",
      "Vercel",
    ],
    highlights: [
      "Symptom-first treatment discovery",
      "Request form wired to calendar and CRM",
      "Automated qualification, confirmation and follow-up",
      "GDPR-shaped data model",
    ],
    problem: [
      "Patients do not search for implantology. They search for a broken tooth, a pain, a price. The site listed treatments the way the clinic thinks about them, so a visitor had to self-diagnose before finding anything — and then call during opening hours.",
      "Automating that is constrained: a dental enquiry is health data. The system had to qualify and route requests without quietly turning a medical concern into a marketing record.",
    ],
    build: [
      {
        title: "Treatment discovery",
        body: [
          "Entry points are written from the patient's symptom and situation rather than the clinical name, each leading to the treatment page and, from there, straight into a request — with no detour through a generic contact page.",
        ],
      },
      {
        title: "Request, calendar & CRM",
        body: [
          "The request form, the clinic's calendar and the CRM write to one record. A submitted request arrives already qualified, then gets its confirmation, its reminder and a follow-up if it goes cold, without anyone re-typing it.",
        ],
      },
      {
        title: "Data handling",
        body: [
          "The flow is built around what it is allowed to keep: explicit consent, a stated retention period, the minimum set of fields, and clinical detail kept out of channels that were never meant to carry it.",
        ],
      },
    ],
    technical: [
      {
        title: "GDPR-shaped data model",
        body: "Consent, retention and minimisation are properties of the schema rather than a banner. A field that cannot be justified is not collected in the first place.",
      },
      {
        title: "Single qualified record",
        body: "Form, calendar and CRM share one record, so a confirmation and a reminder can never disagree about the appointment.",
      },
      {
        title: "Symptom-first information architecture",
        body: "Routes are organised by the patient's problem and cross-linked to the clinical treatment — which is also what makes them findable in search.",
      },
    ],
    outcome: [
      "A clinic whose site answers the question the patient actually asked, and turns that answer into a booked appointment without a phone call.",
    ],
    accent: "#3FA98A",
  },

  {
    slug: "wrong-sense",
    name: "Wrong Sense",
    tagline: "Streetwear drops and a VIP programme",
    summary:
      "One ecosystem for the shop, the collection drops, the restock alerts and the VIP programme. Order verification, collaboration requests and creator tracking were automated to replace the manual back-and-forth that was running through Instagram DMs.",
    sector: "Streetwear & apparel",
    role: "Design, build & growth",
    year: "2026",
    type: "E-commerce & community",
    status: "Delivered",
    tier: "case-study",
    featured: true,
    liveUrl: "https://wrongsense.com",
    cover: {
      src: "/images/work/wrong-sense/cover.webp",
      alt: "Wrong Sense storefront: a split editorial shot of two models wearing the Mediterraneo Vol.3 Mallorca collection, over a shop-now call to action",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "PostgreSQL",
      "Stripe",
      "Resend",
      "Automation",
      "Vercel",
    ],
    highlights: [
      "Drop launches with queued restock alerts",
      "Automated order verification for VIP access",
      "Creator and ambassador tracking",
      "Editorial and UGC campaign strategy",
    ],
    problem: [
      "A streetwear label lives on drops, and a drop is a spike: everything sells in an hour, then the questions arrive. Where is my order, when does it restock, can I collaborate — all of it landing in the same Instagram inbox as the sales.",
      "The VIP programme made that worse rather than better. Access was granted by hand, which meant someone had to open each order, check it was real, and remember who had been let in. The brand was spending its attention on verification instead of on the next collection.",
    ],
    build: [
      {
        title: "Storefront & drops",
        body: [
          "One system holds the shop, the collections and the drops. A drop is scheduled rather than announced, so the release, the product going live and the countdown all come from the same record instead of being coordinated across three places.",
          "Restock interest is captured on the product itself and queued. When stock returns, the alert goes out on its own — which is what turned the most repeated DM into something nobody has to answer.",
        ],
      },
      {
        title: "VIP & verification",
        body: [
          "Order verification is derived from the order, not from a screenshot sent in a message. A completed purchase grants the access it earns, and the programme's tiers follow from purchase history rather than from someone's memory.",
          "Collaboration and ambassador requests get their own intake, so a creator pitch is a record with a status instead of a message that scrolls away.",
        ],
      },
      {
        title: "Community & content",
        body: [
          "The editorial side — campaign shoots, UGC and the ambassador programme — was planned as part of the platform rather than bolted on, so a drop, its content and the creators pushing it share one calendar.",
        ],
      },
    ],
    technical: [
      {
        title: "Scheduled releases",
        body: "A drop's visibility is computed from its release time, so nothing has to be published by hand at midnight and nothing leaks early.",
      },
      {
        title: "Order-derived access",
        body: "VIP status is read from paid orders rather than stored as a flag someone sets. There is no manual grant to get wrong or forget to revoke.",
      },
      {
        title: "Queued notifications",
        body: "Restock alerts are queued against the product and sent when stock changes, which keeps a sudden restock from turning into a send-storm the brand has to babysit.",
      },
    ],
    outcome: [
      "A label that can run a drop without the drop running the inbox: orders verify themselves, restock alerts leave on their own, and creator requests arrive somewhere they can be answered.",
      "The audience work was scoped through the first 10,000 qualified followers — a target the platform was built to support, not a number it has already delivered.",
    ],
    accent: "#E0533F",
  },

  /* ── Listed work ──────────────────────────────────────────────────
     Shipped, but not written up. Some are mine, some were delivered for
     a client; what they share is that the interesting part is the
     operational problem each one removed, which fits in `scope`. ──── */

  {
    slug: "lisbon-by-design",
    name: "Lisbon by Design",
    tagline: "Applications, exhibitors and the floor plan",
    summary:
      "An event platform where artists, galleries and designers apply, submit a portfolio and follow their selection. It also centralises exhibitors, spaces, sponsors, ticketing and the pre-event communications.",
    sector: "Design & events",
    role: "Design, build & growth",
    year: "2026",
    type: "Event platform",
    status: "Delivered",
    tier: "listed",
    liveUrl: "https://www.lisbonbydesign.com",
    cover: {
      src: "/images/work/lisbon-by-design/cover.webp",
      alt: "Lisbon by Design site: an exhibition room with a stone side table, an upholstered chair and a sculptural bust, beside the fair's information navigation",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Stripe"],
    scope: [
      "Application flow with portfolio submission and selection tracking",
      "Exhibitors, spaces and sponsors managed in one place",
      "Ticketing and pre-event communications",
      "Content and partnerships scoped through the first 5,000 qualified followers in design and craft",
    ],
    accent: "#C98A3F",
  },
  {
    slug: "inside-marbella",
    name: "Inside Marbella",
    tagline: "An audience turned into partnerships",
    summary:
      "A media platform rebuilt to convert its audience into commercial partnerships. A B2B funnel takes a venue from downloading the media kit to booking a call and receiving a proposal generated for its profile.",
    sector: "Media & hospitality",
    role: "Design, build & growth",
    year: "2026",
    type: "Media & B2B acquisition",
    status: "Delivered",
    tier: "listed",
    liveUrl: "https://insidemarbella.es",
    cover: {
      src: "/images/work/inside-marbella/cover.webp",
      alt: "Inside Marbella editorial: a guide to Marbella opening on a flower-lined old-town street, beside a sidebar of related articles",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "CRM integration"],
    scope: [
      "B2B funnel: media kit, qualification, call booking, generated proposal",
      "Site, CRM and social accounts connected to attribute bookings to campaigns",
      "Editorial support and performance reporting",
      "Audience work scoped through the first 10,000 engaged followers",
    ],
    accent: "#D4A03C",
  },
  {
    slug: "ceramiche-de-simone",
    name: "Ceramiche De Simone",
    tagline: "Handmade ceramics, told properly",
    summary:
      "An e-commerce experience built around the colour, the collections and the hand behind them. Each piece carries an editorial page on its origin and how it is made, alongside workshop booking and digital certificates of authenticity.",
    sector: "Craft & homeware",
    role: "Design, build & growth",
    year: "2026",
    type: "Craft e-commerce",
    status: "Delivered",
    tier: "listed",
    liveUrl: "https://www.ceramichedesimone.com/en",
    cover: {
      src: "/images/work/ceramiche-de-simone/cover.webp",
      alt: "Ceramiche De Simone storefront: hand-painted red and white teapots and mugs on a laid table, over an invitation to find your mug",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Stripe", "MDX"],
    scope: [
      "Editorial product pages covering origin and process",
      "Workshop booking alongside the shop",
      "Stock alerts and personalised recommendations",
      "Digital certificates of authenticity tied to purchased pieces",
    ],
    accent: "#C2603C",
  },
  {
    slug: "athens-food-on-foot",
    name: "Athens Food on Foot",
    tagline: "Food tours, in four languages",
    summary:
      "A multilingual booking journey where visitors filter experiences by dietary preference, language, group size and availability. Guide assignment, payments, pre-tour information and review requests all run automatically.",
    sector: "Food tourism",
    role: "Design, build & growth",
    year: "2026",
    type: "Tour booking",
    status: "Delivered",
    tier: "listed",
    liveUrl: "https://www.athensfoodonfoot.com",
    cover: {
      src: "/images/work/athens-food-on-foot/cover.webp",
      alt: "Athens Food on Foot homepage: a market stall stacked with vegetables behind the words Food Tours in Athens and a book-your-tour button",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Stripe", "i18n"],
    scope: [
      "Multilingual booking filtered by diet, language, group size and date",
      "Automated guide assignment and payment handling",
      "Pre-tour information and post-tour review requests",
      "Add-on offers matched to the traveller's profile",
    ],
    accent: "#D98A2B",
  },
  {
    slug: "caves-pere-auguste",
    name: "Les Caves du Père Auguste",
    tagline: "Tastings, cellar and stay in one place",
    summary:
      "The wine shop, the tastings, the accommodation and the private-event requests brought into a single experience. Visitors book an activity, buy the wines they tasted and arrange their stay without leaving the site.",
    sector: "Wine tourism",
    role: "Design, build & growth",
    year: "2026",
    type: "Wine tourism platform",
    status: "Delivered",
    tier: "listed",
    liveUrl: "https://www.pereauguste.com",
    cover: {
      src: "/images/work/caves-pere-auguste/cover.webp",
      alt: "Les Caves du Père Auguste homepage: vines at sunrise under the line six generations of winegrowers since 1875, beside tasting and stay navigation",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Stripe", "CRM"],
    scope: [
      "Wine shop, tasting booking, accommodation and event requests unified",
      "Buy-what-you-tasted flow linking the visit to the cellar",
      "CRM segmenting visitors and automating post-tasting follow-up",
      "A club built for returning customers",
    ],
    accent: "#8E3B52",
  },
  {
    slug: "frederic-rent-a-bike",
    name: "Frédéric Rent a Bike",
    tagline: "Booking wired to real inventory",
    summary:
      "A rental platform connected to the actual fleet. Visitors pick a bike, accessories, a duration and options, then pay a deposit — while the team tracks what is available, out or in maintenance from one dashboard.",
    sector: "Rental & mobility",
    role: "Design, build & growth",
    year: "2026",
    type: "Rental & inventory",
    status: "Delivered",
    tier: "listed",
    liveUrl: "https://www.frederic.nl",
    cover: {
      src: "/images/work/frederic-rent-a-bike/cover.webp",
      alt: "Frédéric Rent a Bike homepage: the shop's painted bicycle banner over the line bike rental, city tours, bike repairs and a rent-a-bike button",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Stripe"],
    scope: [
      "Booking bound to real inventory, with accessories, duration and options",
      "Deposit handling and digital rental contracts",
      "Return reminders, repair slots and guided-tour booking",
      "Fleet dashboard: available, rented, in maintenance",
    ],
    accent: "#4E8B57",
  },
];

/** Only case studies have a page, so this is what routing and the sitemap
 *  should build from — a listed project resolving to a half-empty page would
 *  be worse than not linking it at all. */
export const caseStudies = projects.filter((p) => p.tier === "case-study");

export const otherWork = projects.filter((p) => p.tier === "listed");

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}
