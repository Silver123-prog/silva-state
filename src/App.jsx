import React, { useState, useEffect, useRef } from 'react';

// Real-world Exchange Rate (1 USD = 1330 NGN)
const USD_EXCHANGE_RATE = 1330;

// Property Data Array with Exact Market Valuations
const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: "Ultra-Modern Luxury Villa & Private Pool",
    category: "Buy",
    type: "House For Sale",
    priceNGN: 850000000,
    priceUSD: 639097,
    location: "Ikoyi, Lagos, Nigeria",
    country: "Nigeria",
    beds: 5,
    baths: 6,
    sqft: 7500,
    image: "/201887995792794157.jpg",
    featured: true,
    tag: "Exclusive"
  },
  {
    id: 2,
    title: "Contemporary Architectural Waterfront Estate",
    category: "Buy",
    type: "Flats & Apartments For Sale",
    priceNGN: 450000000,
    priceUSD: 338345,
    location: "Lekki Phase 1, Lagos, Nigeria",
    country: "Nigeria",
    beds: 4,
    baths: 4,
    sqft: 4200,
    image: "/666955026112680341.jpg",
    featured: true,
    tag: "Hot Deal"
  },
  {
    id: 3,
    title: "Suburban Family House with Private Lawn",
    category: "Buy",
    type: "House For Sale",
    priceNGN: 1183700000,
    priceUSD: 890000,
    location: "Houston, Texas, USA",
    country: "USA",
    beds: 4,
    baths: 3,
    sqft: 3800,
    image: "/Chinese Buyers Drive $56B Surge in US Housing___.jpg",
    featured: false,
    tag: "For Sale"
  },
  {
    id: 4,
    title: "Minimalist Executive Smart Duplex",
    category: "Rent",
    type: "Flats & Apartments For Rent",
    priceNGN: 25000000,
    priceUSD: 18796,
    location: "Maitama, Abuja, Nigeria",
    country: "Nigeria",
    beds: 4,
    baths: 5,
    sqft: 3600,
    image: "/home decor ideas.jpg",
    featured: true,
    tag: "Verified"
  },
  {
    id: 5,
    title: "Master-Planned Suburban Gated Community",
    category: "New Project",
    type: "Off-Plan Development Opportunities",
    priceNGN: 598500000,
    priceUSD: 450000,
    location: "Atlanta, Georgia, USA",
    country: "USA",
    beds: 3,
    baths: 3,
    sqft: 3100,
    image: "/🎯 Ready to make your dream home yours on the….jpg",
    featured: false,
    tag: "New Launch"
  },
  {
    id: 6,
    title: "Expansive Ranch Estate & Private Farm Lands",
    category: "Buy",
    type: "Lands For Sale",
    priceNGN: 1200000000,
    priceUSD: 902255,
    location: "Epe Corridor, Lagos, Nigeria",
    country: "Nigeria",
    beds: 6,
    baths: 7,
    sqft: 45000,
    image: "/Facebook.jpg",
    featured: true,
    tag: "Investment"
  },
  {
    id: 7,
    title: "Oceanfront Penthouse & Helipad Suite",
    category: "Shortlet",
    type: "Luxury Serviced Apartments",
    priceNGN: 450000,
    priceUSD: 338,
    location: "Victoria Island, Lagos, Nigeria",
    country: "Nigeria",
    beds: 3,
    baths: 4,
    sqft: 3200,
    image: "/666955026112680341 (1).jpg",
    featured: true,
    tag: "Shortlet"
  }
];

// Executive Services Database
const EXECUTIVE_SERVICES = [
  {
    id: 'advisory',
    icon: "🏛️",
    title: "Property Advisory & Portfolio Management",
    desc: "Institutional grade market valuations and yield analytics for high-net-worth investors.",
    details: "Our wealth management team helps individuals analyze land appreciation potential, perform stress-tests against inflation, and structure optimized real estate portfolios across Lagos and US Sunbelt cities.",
    highlights: ["Portfolio Yield Audits", "Asset Re-balancing", "Tax & Wealth Structuring"]
  },
  {
    id: 'due-diligence',
    icon: "📜",
    title: "Legal Title & Due Diligence",
    desc: "Rigorous verification of Governor's Consent, C of O, and land registry titles.",
    details: "Avoid costly title litigation. We perform complete surveyor searches at the Lagos State Lands Bureau (Alausa), AGIS in Abuja, and county recorder offices in the US to guarantee encumbrance-free titles prior to contract signing.",
    highlights: ["Governor's Consent Verification", "Charted Coordinates Review", "Escrow Contract Management"]
  },
  {
    id: 'architecture',
    icon: "🎨",
    title: "Architectural Design & Renovation",
    desc: "Bespoke furnishings and smart-home integration for modern residential estates.",
    details: "Transform prime space into world-class luxury residences. We manage end-to-end architectural modernizations, solar energy grid integration, automated security systems, and high-end interior styling.",
    highlights: ["Smart Home Automation", "3D Architectural Renderings", "Turnkey Luxury Fit-outs"]
  },
  {
    id: 'valuation',
    icon: "🔑",
    title: "Valuation & Land Banking Services",
    desc: "Full-service tenant management, maintenance, and land banking appreciation strategies.",
    details: "Capitalize on urban expansion corridors in Epe, Ibeju-Lekki, and suburban US growth zones. We identify undervalued land parcels with high potential for 5 to 10-year holding returns.",
    highlights: ["Commercial Land Banking", "Certified Asset Valuations", "Subdivision Advisory"]
  },
  {
    id: 'usa-acquisitions',
    icon: "💼",
    title: "Cross-Border USA Acquisitions",
    desc: "Direct access to lucrative commercial and residential developments in Texas & Georgia.",
    details: "Seamlessly acquire dollar-denominated assets. We assist non-resident investors with US LLC formation, Foreign National Mortgage approval, and local property management.",
    highlights: ["US Foreign National Mortgages", "Delaware/Wyoming LLC Setup", "USD Rental Dividend Flows"]
  },
  {
    id: 'joint-venture',
    icon: "🏗️",
    title: "Joint Venture Development",
    desc: "Partnering with accredited landowners and capital partners for master-planned communities.",
    details: "Maximize the value of un-developed land. We structure equitable Joint Venture (JV) agreements connecting reputable property developers with verified land owners.",
    highlights: ["Developer Matching", "Equity Sharing Structures", "Feasibility Studies"]
  }
];

// Rich Articles Database for Insights
const INSIGHTS_ARTICLES = [
  {
    id: 'lekki-roi',
    title: "Why Lekki Phase 1 Waterfront Properties Yield 18% Annual ROI",
    category: "Nigeria Market",
    subCategory: "Nigeria Real Estate Market Reports",
    date: "Oct 2026",
    readTime: "5 min read",
    author: "Michael Adebayo — Lead Analyst",
    summary: "An in-depth analysis of capital growth drivers, rental yield compression, and infrastructural upgrades along the Admiralty & Freedom Way corridors in Lekki Phase 1.",
    content: [
      "Waterfront properties in Lekki Phase 1 have demonstrated resilient capital appreciation despite macroeconomic fluctuations. High demand from expatriates, tech founders, and executive shortlet operators has maintained high occupancy levels.",
      "Key investment drivers include the expansion of private boat jetties, proximity to Victoria Island's financial district, and premium shortlet daily rates averaging ₦250,000 to ₦450,000 per night for 4-bedroom duplexes.",
      "Investors seeking capital preservation alongside high cash flow yields are advised to target off-plan luxury developments with private shore protection and automated facility management."
    ],
    stats: { roi: "18.4% p.a.", rentalYield: "11.2%", occupancy: "88%" }
  },
  {
    id: 'us-expansion',
    title: "Navigating Cross-Border US Property Acquisitions for African Investors",
    category: "US Expansion",
    subCategory: "Cross-Border USA Property Investment",
    date: "Sep 2026",
    readTime: "7 min read",
    author: "Sarah Jenkins — US Partner Lead",
    summary: "Step-by-step framework for international buyers setting up US LLCs, securing non-resident mortgage financing, and optimizing tax structures in Texas & Georgia.",
    content: [
      "Acquiring real estate in fast-growing US Sunbelt markets like Houston, Dallas, and Atlanta offers foreign investors strong hedge protection against currency volatility.",
      "Using Foreign National Mortgage Programs, accredited buyers can secure up to 70% LTV financing with minimal US credit history requirements, provided proper documentation and escrow accounts are configured.",
      "We recommend establishing a Wyoming or Delaware LLC paired with local property management firms to streamline property tax assessments, tenant placement, and dividend repatriation."
    ],
    stats: { averageYield: "7.8% Net", leverage: "70% LTV", taxEfficiency: "High" }
  },
  {
    id: 'area-guides',
    title: "Ikoyi, Victoria Island & Maitama: 2026 Neighborhood Guide",
    category: "Area Guides",
    subCategory: "Area & Neighbourhood Guides",
    date: "Sep 2026",
    readTime: "6 min read",
    author: "Silva Estate Advisory Board",
    summary: "Comprehensive comparative review of security infrastructure, price per square meter, power reliability, and lifestyle amenities across Nigeria's prime addresses.",
    content: [
      "Ikoyi remains the pinnacle of ultra-luxury living in Nigeria, commanding land values exceeding ₦1.2M per square meter in prime enclaves like Banana Island and Old Ikoyi.",
      "Abuja's Maitama district continues to show steady growth driven by diplomatic missions and federal institutional leases, offering long-term stability with minimal turnover risk.",
      "Victoria Island continues its transition into mixed-use high-rise developments, making it the top destination for commercial office space and corporate residential suites."
    ],
    stats: { avgSqmRate: "₦1.1M / m²", securityIndex: "9.8/10", powerUptime: "99%" }
  },
  {
    id: 'land-titles',
    title: "Understanding Governor's Consent vs. Certificate of Occupancy (C of O)",
    category: "Legal Framework",
    subCategory: "Property Laws & Land Titles",
    date: "Aug 2026",
    readTime: "8 min read",
    author: "Legal Due Diligence Desk",
    summary: "Essential legal legalities every property buyer must know before making commitments on Nigerian land, Gazette records, and excision titles.",
    content: [
      "A Certificate of Occupancy (C of O) is the initial legal title issued by the state government granting 99-year lease rights on land. However, subsequent sales of that property require a Governor's Consent to remain legally valid.",
      "Failing to perfect Governor's Consent on a resale property leaves the buyer vulnerable during ownership disputes or state compulsory acquisitions.",
      "Always verify land status at the Lagos State Lands Bureau in Alausa or the Abuja Geographic Information Systems (AGIS) before depositing funds."
    ],
    stats: { validity: "99 Years", processingTime: "3-6 Mos", riskLevel: "Zero with Consent" }
  }
];

export default function App() {
  const [currency, setCurrency] = useState('NGN');
  const [activeTab, setActiveTab] = useState('Buy');
  const [activePage, setActivePage] = useState('Home');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [activeInsightFilter, setActiveInsightFilter] = useState('All');
  const [savedProperties, setSavedProperties] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);

  // Booking Form State
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', phone: '', note: '' });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Silva AI Live Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: "Hello! Welcome to Silva Estate. I am Silva AI, your luxury property guide. Ask me about listings, legal land titles, or navigating buying in Nigeria & the US!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleNavigation = (pageKey, typeLink = 'All') => {
    setActivePage(pageKey);
    setSelectedTypeFilter(typeLink);

    if (pageKey === 'Buy' || pageKey === 'Rent' || pageKey === 'Shortlet' || pageKey === 'Projects') {
      setActiveTab(pageKey === 'Projects' ? 'New Project' : pageKey);
    } else if (pageKey === 'Insights') {
      setActiveInsightFilter(typeLink === 'All' ? 'All' : typeLink);
    }

    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setChatOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProperties = INITIAL_PROPERTIES.filter((item) => {
    const matchesPage = 
      activePage === 'Home' ? true :
      activePage === 'Buy' ? item.category === 'Buy' :
      activePage === 'Rent' ? item.category === 'Rent' :
      activePage === 'Shortlet' ? item.category === 'Shortlet' :
      activePage === 'Projects' ? item.category === 'New Project' : true;

    const matchesTab = activeTab === 'Buy' ? item.category === 'Buy' : item.category === activeTab;
    const matchesType = selectedTypeFilter === 'All' || item.type.toLowerCase().includes(selectedTypeFilter.toLowerCase());
    const matchesLoc = item.location.toLowerCase().includes(searchLocation.toLowerCase());
    
    return matchesPage && matchesTab && matchesType && matchesLoc;
  });

  const filteredArticles = INSIGHTS_ARTICLES.filter((article) => {
    if (activeInsightFilter === 'All') return true;
    return article.subCategory === activeInsightFilter || article.category === activeInsightFilter;
  });

  const toggleSave = (id) => {
    setSavedProperties((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  // Real Conversion Rate Formatter (1 USD = 1330 NGN)
  const formatPrice = (priceNGN, priceUSD) => {
    if (currency === 'NGN') {
      const totalNGN = priceNGN || (priceUSD * USD_EXCHANGE_RATE);
      return `₦${Math.round(totalNGN).toLocaleString('en-NG')}`;
    } else {
      const totalUSD = priceUSD || (priceNGN / USD_EXCHANGE_RATE);
      return `$${Math.round(totalUSD).toLocaleString('en-US')}`;
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setBookingDetails({ name: '', email: '', phone: '', note: '' });
  };

  const resetChatSession = () => {
    setChatMessages([
      { sender: 'ai', text: "Chat session restarted! How can Silva AI help you find your dream sanctuary today?" }
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let aiResponse = "I can help you explore listings, schedule consultations with verified brokers, or guide you on cross-border property investments in Nigeria and the USA!";
      const q = userText.toLowerCase();

      if (q.includes('where') || q.includes('see') || q.includes('listing') || q.includes('property') || q.includes('house') || q.includes('buy')) {
        aiResponse = "You can view all curated properties right on this page under 'Featured Properties', or use the 'Buy', 'Rent', and 'Shortlet' tabs in the top menu to filter!";
      } else if (q.includes('what else') || q.includes('do') || q.includes('help') || q.includes('can you')) {
        aiResponse = "I can guide you through: 1) Searching luxury homes in Ikoyi, Lekki & Abuja 2) US Sunbelt expansion in Texas & Georgia 3) Understanding Governor's Consent & C of O titles 4) Scheduling private advisory sessions!";
      } else if (q.includes('ikoyi') || q.includes('lekki') || q.includes('lagos')) {
        aiResponse = "Lagos is our primary luxury hub! We feature waterfront duplexes in Lekki Phase 1 starting at ₦450M and ultra-luxury Ikoyi villas from ₦850M.";
      } else if (q.includes('usa') || q.includes('america') || q.includes('dollar') || q.includes('houston') || q.includes('atlanta')) {
        aiResponse = "We facilitate dollar-denominated acquisitions in Texas and Georgia with 70% LTV Foreign National Mortgages for international buyers!";
      } else if (q.includes('c of o') || q.includes('title') || q.includes('legal')) {
        aiResponse = "All properties on Silva Estate undergo strict legal due diligence at Alausa Lands Bureau and AGIS to verify C of O and Governor's Consent titles before listing.";
      } else if (q.includes('price') || q.includes('cost') || q.includes('currency') || q.includes('ngn') || q.includes('usd')) {
        aiResponse = "You can switch pricing between 🇳🇬 NGN and 🇺🇸 USD anytime using the currency selector button in the top navbar!";
      } else if (q.includes('agent') || q.includes('consultant') || q.includes('contact') || q.includes('human')) {
        aiResponse = "You can schedule a private session directly under our 'Services' page or contact our Principal Partner, Michael Adebayo, on the 'Agents' page!";
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 500);
  };

  const NAV_MENUS = [
    {
      title: 'Buy',
      pageKey: 'Buy',
      links: [
        'Flats & Apartments For Sale',
        'House For Sale',
        'Lands For Sale',
        'Commercial Property For Sale',
        'All Property For Sale'
      ]
    },
    {
      title: 'Rent',
      pageKey: 'Rent',
      links: [
        'Flats & Apartments For Rent',
        'Houses For Rent',
        'Commercial Property For Rent',
        'Long-term Leases'
      ]
    },
    {
      title: 'Shortlet',
      pageKey: 'Shortlet',
      links: [
        'Luxury Serviced Apartments',
        'Vacation Villas with Private Pools',
        'Executive Penthouse Shortlets',
        'Daily & Weekly Stays'
      ]
    },
    {
      title: 'New Projects',
      pageKey: 'Projects',
      links: [
        'Off-Plan Development Opportunities',
        'Gated Communities in Nigeria',
        'US Housing Development Expansion',
        'Smart City Residences'
      ]
    },
    {
      title: 'Services',
      pageKey: 'Services',
      links: [
        'Property Advisory & Portfolio Management',
        'Valuation & Land Banking Services',
        'Architectural Design & Renovation',
        'Legal Due Diligence & Titles'
      ]
    },
    {
      title: 'Agents',
      pageKey: 'Agents',
      links: [
        'Find A Verified Realtor',
        'Join Silva Estate Agency Network',
        'Top Performing Lagos Brokers',
        'International Partner Portal'
      ]
    },
    {
      title: 'Insights',
      pageKey: 'Insights',
      links: [
        'Nigeria Real Estate Market Reports',
        'Cross-Border USA Property Investment',
        'Area & Neighbourhood Guides',
        'Property Laws & Land Titles'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative">
      
      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div 
            onClick={() => handleNavigation('Home')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-lg sm:text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              S
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white">SILVA</span>
              <span className="text-xl sm:text-2xl font-light text-amber-400">ESTATE</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {NAV_MENUS.map((menu) => (
              <div
                key={menu.title}
                className="relative group py-6"
                onMouseEnter={() => setActiveDropdown(menu.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavigation(menu.pageKey)}
                  className={`flex items-center gap-1.5 hover:text-amber-400 transition-colors ${
                    activePage === menu.pageKey ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  {menu.title}
                  <span className="text-[10px] text-slate-500 group-hover:rotate-180 transition-transform">▼</span>
                </button>

                {activeDropdown === menu.title && (
                  <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {menu.links.map((link) => (
                      <button
                        key={link}
                        onClick={() => handleNavigation(menu.pageKey, link)}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-colors flex items-center justify-between"
                      >
                        <span>{link}</span>
                        <span className="text-amber-400">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex items-center text-[10px] sm:text-xs font-semibold">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md transition-all ${
                  currency === 'NGN' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇳🇬 NGN
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md transition-all ${
                  currency === 'USD' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇺🇸 USD
              </button>
            </div>

            <button 
              onClick={() => handleNavigation('Services')}
              className="hidden sm:inline-flex px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              List Property
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl max-h-[calc(100vh-80px)] overflow-y-auto px-4 py-6 space-y-4">
            <div className="space-y-2">
              {NAV_MENUS.map((menu) => (
                <div key={menu.title} className="border-b border-slate-900 pb-2">
                  <button
                    onClick={() => {
                      setExpandedMobileCategory(
                        expandedMobileCategory === menu.title ? null : menu.title
                      );
                    }}
                    className="w-full flex items-center justify-between py-2.5 text-slate-200 font-semibold text-sm hover:text-amber-400"
                  >
                    <span>{menu.title}</span>
                    <span className="text-xs text-slate-500">
                      {expandedMobileCategory === menu.title ? '▲' : '▼'}
                    </span>
                  </button>

                  {expandedMobileCategory === menu.title && (
                    <div className="pl-4 py-2 space-y-2 bg-slate-900/50 rounded-xl my-1 border border-slate-800/60">
                      {menu.links.map((link) => (
                        <button
                          key={link}
                          onClick={() => handleNavigation(menu.pageKey, link)}
                          className="w-full text-left py-1.5 text-xs text-slate-400 hover:text-amber-400 block"
                        >
                          {link}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HOME PAGE */}
      {activePage === 'Home' && (
        <>
          <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
            >
              <source src="/From Klickpin.com- 7740630605979018-pin-id-7740630605979018.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30 z-10" />

            <div className="relative z-20 max-w-5xl mx-auto px-4 text-center space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
                  Nigeria & International Luxury Real Estate
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  Find Your Sanctuary Of <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                    Unrivaled Elegance
                  </span>
                </h1>
                <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-light">
                  Explore premier residential villas, luxury shortlets, and prime commercial investments across Nigeria and the USA.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
                  {['Buy', 'Rent', 'Shortlet', 'New Project'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSelectedTypeFilter('All');
                      }}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                        activeTab === tab
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
                    <span className="text-amber-400 text-lg">📍</span>
                    <input
                      type="text"
                      placeholder="Location (e.g. Ikoyi, Lekki, USA)"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none w-full"
                    />
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
                    <span className="text-amber-400 text-lg">🏡</span>
                    <select className="bg-transparent border-none text-sm text-slate-300 focus:outline-none w-full cursor-pointer">
                      <option value="" className="bg-slate-900">All Property Types</option>
                      <option value="apartment" className="bg-slate-900">Flats & Apartments</option>
                      <option value="house" className="bg-slate-900">Houses & Villas</option>
                      <option value="land" className="bg-slate-900">Lands & Plots</option>
                      <option value="commercial" className="bg-slate-900">Commercial</option>
                    </select>
                  </div>

                  <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold rounded-xl py-3 px-6 text-sm flex items-center justify-center gap-2">
                    <span>🔍</span> Search Listings
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Featured Properties
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Curated luxury properties with verified documentation and real-world pricing.
                </p>
              </div>
              <div className="text-sm text-slate-400">
                Showing <strong className="text-amber-400">{filteredProperties.length}</strong> available listings
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group flex flex-col shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-slate-950/80 border border-slate-700/80 text-amber-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                      {prop.tag}
                    </span>
                    <button
                      onClick={() => toggleSave(prop.id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/60 border border-slate-700/80 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-colors backdrop-blur-md"
                    >
                      {savedProperties.includes(prop.id) ? '❤️' : '🤍'}
                    </button>
                    <div className="absolute bottom-4 left-4 text-white font-black text-2xl drop-shadow-md">
                      {formatPrice(prop.priceNGN, prop.priceUSD)}
                      {prop.category === 'Rent' && <span className="text-xs font-normal text-slate-300"> / year</span>}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                        {prop.type} • {prop.country}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {prop.title}
                      </h3>
                      <p className="text-slate-400 text-xs flex items-center gap-1">
                        📍 {prop.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-xs text-slate-300">
                      <div className="bg-slate-950/50 py-2 rounded-lg border border-slate-800/60">
                        <span className="block font-bold text-white">{prop.beds}</span>
                        <span className="text-slate-500 text-[10px]">Beds</span>
                      </div>
                      <div className="bg-slate-950/50 py-2 rounded-lg border border-slate-800/60">
                        <span className="block font-bold text-white">{prop.baths}</span>
                        <span className="text-slate-500 text-[10px]">Baths</span>
                      </div>
                      <div className="bg-slate-950/50 py-2 rounded-lg border border-slate-800/60">
                        <span className="block font-bold text-white">{prop.sqft.toLocaleString()}</span>
                        <span className="text-slate-500 text-[10px]">Sq Ft</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="w-full mt-2 py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs rounded-xl transition-all border border-slate-700/50"
                    >
                      View Listing Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* PROPERTIES LISTINGS PAGE */}
      {(activePage === 'Buy' || activePage === 'Rent' || activePage === 'Shortlet' || activePage === 'Projects') && (
        <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
              Verified Properties • {activePage === 'Projects' ? 'New Projects' : activePage}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">
              {activePage === 'Buy' && 'Exclusive Properties For Sale'}
              {activePage === 'Rent' && 'Luxury Residential & Commercial Rentals'}
              {activePage === 'Shortlet' && 'Executive Serviced Vacation Suites'}
              {activePage === 'Projects' && 'Master-Planned Off-Plan Developments'}
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              Filter by property type or search by neighborhood across Nigeria and North America.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-slate-950/80 border border-slate-700/80 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                      {prop.tag}
                    </span>
                    <div className="absolute bottom-4 left-4 text-white font-black text-2xl drop-shadow-md">
                      {formatPrice(prop.priceNGN, prop.priceUSD)}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{prop.type}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{prop.title}</h3>
                      <p className="text-slate-400 text-xs">📍 {prop.location}</p>
                    </div>

                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="w-full py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs rounded-xl transition-all"
                    >
                      View Listing Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-4xl block">🏰</span>
                <h3 className="text-xl font-bold text-white">No Specific Listings Found</h3>
                <p className="text-slate-400 text-xs">Showing related developments in this category or search area.</p>
                <button onClick={() => setSelectedTypeFilter('All')} className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SERVICES PAGE */}
      {activePage === 'Services' && (
        <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Bespoke Real Estate Solutions</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Our Executive Services</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              From private advisory and title verification to luxury interior management across Nigeria and the USA. Click any service card to book a consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {EXECUTIVE_SERVICES.map((srv) => (
              <div 
                key={srv.id} 
                onClick={() => {
                  setSelectedService(srv);
                  setBookingSubmitted(false);
                }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/50 transition-all cursor-pointer group hover:scale-[1.02] shadow-xl"
              >
                <div className="text-4xl">{srv.icon}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{srv.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{srv.desc}</p>
                <button className="text-amber-400 text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Schedule Consultation <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SERVICE CONSULTATION MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors z-10"
            >
              ✕
            </button>

            <div className="flex items-center gap-4">
              <span className="text-5xl">{selectedService.icon}</span>
              <div>
                <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Executive Advisory Consultation</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedService.title}</h2>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-4">
              {selectedService.details}
            </p>

            {!bookingSubmitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Enter Contact Information</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Phone Number / WhatsApp"
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-full"
                />
                <textarea
                  rows="3"
                  placeholder="Additional notes or specific property requirements..."
                  value={bookingDetails.note}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, note: e.target.value })}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-full"
                ></textarea>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm rounded-xl hover:from-amber-400 hover:to-amber-500 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Submit Consultation Request
                </button>
              </form>
            ) : (
              <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/40 text-center space-y-3">
                <span className="text-4xl block">✨</span>
                <h3 className="text-xl font-bold text-white">Consultation Request Submitted</h3>
                <p className="text-slate-300 text-xs">
                  Your details have been registered with the <strong className="text-amber-400">Silva Estate Advisory Board</strong>. An executive consultant will get back to you shortly.
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Return to Platform
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AGENTS PAGE */}
      {activePage === 'Agents' && (
        <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Verified Brokers</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Meet Our Lead Advisory Agents</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {[
              { name: "Michael Adebayo", role: "Principal Partner — Nigeria", img: "/201887995792794157.jpg", deals: "$45M+ Closed" },
              { name: "Belmont Property Developers", role: "Specialist Investment Advisory", img: "/Maximising Real Estate Returns_ Collaborating with Specialist Belmont Investment Property Developers.jpg", deals: "12 Prime Estates" },
              { name: "Sarah Jenkins", role: "US Expansion Lead", img: "/Chinese Buyers Drive $56B Surge in US Housing___.jpg", deals: "30+ US Transactions" }
            ].map((agt) => (
              <div key={agt.name} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-center p-6 space-y-4">
                <img src={agt.img} alt={agt.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-amber-500" />
                <div>
                  <h3 className="text-lg font-bold text-white">{agt.name}</h3>
                  <p className="text-amber-400 text-xs font-semibold">{agt.role}</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedService(EXECUTIVE_SERVICES[0]);
                    setBookingSubmitted(false);
                  }}
                  className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Contact Agent
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INSIGHTS PAGE */}
      {activePage === 'Insights' && (
        <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Market Intelligence & Advisory</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Real Estate Insights & Reports</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              Live economic trends, yield benchmarks, and legal guidance for investors in Nigeria and North America.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-6">
            {['All', 'Nigeria Real Estate Market Reports', 'Cross-Border USA Property Investment', 'Area & Neighbourhood Guides', 'Property Laws & Land Titles'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveInsightFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeInsightFilter === filter
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 space-y-4 cursor-pointer transition-all hover:scale-[1.01] group shadow-xl"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold px-3 py-1 rounded-full uppercase">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                  {article.summary}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{article.author}</span>
                  <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Full Report <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors"
            >
              ✕
            </button>

            <div className="space-y-3">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                {selectedArticle.category} • {selectedArticle.date}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedArticle.title}</h2>
              <p className="text-slate-400 text-xs">{selectedArticle.author} • {selectedArticle.readTime}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              {Object.entries(selectedArticle.stats).map(([k, v]) => (
                <div key={k}>
                  <span className="text-slate-500 text-[10px] uppercase block capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-amber-400 font-bold text-sm sm:text-base">{v}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-4">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-800">
              <span className="text-xs text-slate-500">Silva Estate Market Intelligence Unit</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROPERTY MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 z-10"
            >
              ✕
            </button>

            <div className="h-72 relative">
              <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">{selectedProperty.type}</span>
                <h3 className="text-2xl font-black text-white">{selectedProperty.title}</h3>
                <p className="text-slate-300 text-xs">📍 {selectedProperty.location}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-slate-400 text-xs block">Asking Price</span>
                  <span className="text-amber-400 text-3xl font-black">
                    {formatPrice(selectedProperty.priceNGN, selectedProperty.priceUSD)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    setSelectedProperty(null);
                    setSelectedService(EXECUTIVE_SERVICES[0]);
                    setBookingSubmitted(false);
                  }}
                  className="flex-1 py-3 bg-amber-500 text-slate-950 font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
                >
                  Contact Listing Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SILVA AI LIVE CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-full shadow-2xl transition-all hover:scale-105"
          >
            <span className="text-xl">🤖</span>
            <span className="text-xs font-black tracking-wide">Ask Silva AI</span>
          </button>
        ) : (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-80 sm:w-96 h-[480px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                  🤖
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">Silva AI</h4>
                  <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" /> Live Assistant
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChatSession}
                  className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 px-2 py-1 rounded-md"
                >
                  New Chat
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-slate-400 hover:text-white text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none leading-relaxed'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask about properties, pricing, land titles..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs hover:bg-amber-400 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-xs">
            {NAV_MENUS.map((menu) => (
              <div key={menu.title} className="space-y-3">
                <h4 className="text-amber-400 font-extrabold uppercase tracking-wider text-sm">{menu.title}</h4>
                <ul className="space-y-2 text-slate-400">
                  {menu.links.map((link) => (
                    <li key={link}>
                      <button 
                        onClick={() => handleNavigation(menu.pageKey, link)} 
                        className="hover:text-white transition-colors text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white">SILVA ESTATE</span>
              <span>© {new Date().getFullYear()} Silva Estate Technologies Ltd. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}