import React, { useState, useEffect, useRef } from 'react';

// Real-world Exchange Rate (1 USD = 1330 NGN)
const USD_EXCHANGE_RATE = 1330;

// Property Listings Data
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
    tag: "Exclusive",
    verified: true,
    realtorName: "Michael Adebayo",
    realtorAgency: "Silva Estate Luxury Realty",
    realtorRating: "5.0",
    realtorSales: "18 Sales in past year",
    status: "Available"
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
    tag: "Hot Deal",
    verified: true,
    realtorName: "Belmont Property Developers",
    realtorAgency: "Belmont Realty Partners",
    realtorRating: "4.9",
    realtorSales: "24 Sales in past year",
    status: "Available"
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
    tag: "For Sale",
    verified: true,
    realtorName: "Sarah Jenkins",
    realtorAgency: "Sunbelt Cross-Border Advisory",
    realtorRating: "5.0",
    realtorSales: "31 Sales in past year",
    status: "Under Offer"
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
    tag: "Verified",
    verified: true,
    realtorName: "Michael Adebayo",
    realtorAgency: "Silva Estate Luxury Realty",
    realtorRating: "5.0",
    realtorSales: "18 Sales in past year",
    status: "Available"
  }
];

// Executive Services Database
const EXECUTIVE_SERVICES = [
  {
    id: 'advisory',
    icon: "🏛️",
    title: "Property Advisory & Portfolio Management",
    desc: "Institutional grade market valuations and yield analytics for high-net-worth investors.",
    details: "Our wealth management team helps individuals analyze land appreciation potential, perform stress-tests against inflation, and structure optimized real estate portfolios across Lagos and US Sunbelt cities."
  },
  {
    id: 'due-diligence',
    icon: "📜",
    title: "Legal Title & Due Diligence",
    desc: "Rigorous verification of Governor's Consent, C of O, and land registry titles.",
    details: "Avoid costly title litigation. We perform complete surveyor searches at the Lagos State Lands Bureau (Alausa), AGIS in Abuja, and county recorder offices in the US."
  },
  {
    id: 'architecture',
    icon: "🎨",
    title: "Architectural Design & Renovation",
    desc: "Bespoke furnishings and smart-home integration for modern residential estates.",
    details: "Transform prime space into world-class luxury residences. We manage end-to-end architectural modernizations, solar energy grid integration, automated security systems, and high-end interior styling."
  }
];

// Verified Realtors Directory
const REALTORS_DIRECTORY = [
  {
    id: 1,
    name: "Michael Adebayo",
    agency: "Silva Estate Lead Advisory",
    location: "Ikoyi & Victoria Island, Lagos",
    rating: "5.0 ★★★★★ (42 reviews)",
    experience: "8 years experience",
    sales: "₦4.5B+ Closed Volume",
    image: "/201887995792794157.jpg"
  },
  {
    id: 2,
    name: "Belmont Property Developers",
    agency: "Belmont Realty Partners",
    location: "Lekki Phase 1 & Epe, Lagos",
    rating: "4.9 ★★★★★ (38 reviews)",
    experience: "12 years experience",
    sales: "12 Prime Gated Estates",
    image: "/666955026112680341.jpg"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    agency: "Sunbelt USA Expansion Advisory",
    location: "Houston TX & Atlanta GA, USA",
    rating: "5.0 ★★★★★ (56 reviews)",
    experience: "10 years experience",
    sales: "30+ Foreign National Transactions",
    image: "/Chinese Buyers Drive $56B Surge in US Housing___.jpg"
  }
];

export default function App() {
  const [currency, setCurrency] = useState('NGN');
  const [activeTab, setActiveTab] = useState('Buy');
  const [activePage, setActivePage] = useState('Home');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication & Realtor.com Onboarding State
  const [userRole, setUserRole] = useState(null); // 'buyer' | 'realtor' | 'admin'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authViewMode, setAuthViewMode] = useState('consumer'); // 'consumer' | 'realtorPro'
  const [emailInput, setEmailInput] = useState('');
  const [proPhone, setProPhone] = useState('');

  // Offer Negotiation & Financing Modals State
  const [negotiationProperty, setNegotiationProperty] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [financingModalOpen, setFinancingModalOpen] = useState(false);
  const [financingSubmitted, setFinancingSubmitted] = useState(false);

  // Silva AI Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: "Hello! Welcome to Silva Estate. I am Silva AI. Ask me about property prices, legal land titles, or finding top-rated agents!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleNavigation = (pageKey) => {
    setActivePage(pageKey);
    setMobileMenuOpen(false);
    setChatOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (priceNGN, priceUSD) => {
    if (currency === 'NGN') {
      const totalNGN = priceNGN || (priceUSD * USD_EXCHANGE_RATE);
      return `₦${Math.round(totalNGN).toLocaleString('en-NG')}`;
    } else {
      const totalUSD = priceUSD || (priceNGN / USD_EXCHANGE_RATE);
      return `$${Math.round(totalUSD).toLocaleString('en-US')}`;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let aiResponse = "I can help you filter properties, calculate pre-approvals, or connect you with certified agents in Lagos and the USA.";
      const q = userText.toLowerCase().trim();

      if (q.includes('agent') || q.includes('realtor') || q.includes('find')) {
        aiResponse = "You can browse our verified realtor directory under 'Find An Agent' in the top menu.";
      } else if (q.includes('ikoyi') || q.includes('lekki') || q.includes('lagos')) {
        aiResponse = "We feature prime Lagos listings: Ultra-Modern Ikoyi Villa (₦850M) and Lekki Phase 1 Waterfront Estate (₦450M).";
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 500);
  };

  const NAV_MENUS = [
    { title: 'Buy', pageKey: 'Buy' },
    { title: 'Rent', pageKey: 'Rent' },
    { title: 'Shortlet', pageKey: 'Shortlet' },
    { title: 'New Projects', pageKey: 'Projects' },
    { title: 'Find An Agent', pageKey: 'FindAgent' },
    { title: 'Services', pageKey: 'Services' },
    { title: 'Insights', pageKey: 'Insights' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative flex flex-col justify-between">
      
      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div onClick={() => handleNavigation('Home')} className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-lg sm:text-xl shadow-lg shadow-amber-500/20">
              S
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white">SILVA</span>
              <span className="text-xl sm:text-2xl font-light text-amber-400">ESTATE</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {NAV_MENUS.map((menu) => (
              <button
                key={menu.title}
                onClick={() => handleNavigation(menu.pageKey)}
                className={`hover:text-amber-400 transition-colors ${activePage === menu.pageKey ? 'text-amber-400 font-bold' : ''}`}
              >
                {menu.title}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex items-center text-[10px] sm:text-xs font-semibold">
              <button onClick={() => setCurrency('NGN')} className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md ${currency === 'NGN' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>
                NGN
              </button>
              <button onClick={() => setCurrency('USD')} className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md ${currency === 'USD' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>
                USD
              </button>
            </div>

            {!userRole ? (
              <button
                onClick={() => { setAuthViewMode('consumer'); setAuthModalOpen(true); }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-amber-400 font-bold capitalize">
                  {userRole} Mode
                </span>
                <button onClick={() => { setUserRole(null); setActivePage('Home'); }} className="text-xs text-slate-400 hover:text-white">
                  Logout
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 space-y-4">
            <div className="space-y-3 border-b border-slate-800 pb-4">
              {NAV_MENUS.map((menu) => (
                <button
                  key={menu.title}
                  onClick={() => handleNavigation(menu.pageKey)}
                  className="w-full text-left py-2 text-sm font-semibold text-slate-200 hover:text-amber-400 block"
                >
                  {menu.title}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setFinancingModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-slate-900 border border-slate-800 text-amber-400 font-bold text-xs rounded-xl"
            >
              🔒 Pre-Approved Financing Gateway
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1">
        {/* HOME VIEW */}
        {activePage === 'Home' && (
          <>
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
              <video
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                webkit-playsinline="true"
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
                </div>

                <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                        <option value="house" className="bg-slate-900">Houses & Villas</option>
                        <option value="apartment" className="bg-slate-900">Flats & Apartments</option>
                      </select>
                    </div>

                    <button 
                      onClick={() => setFinancingModalOpen(true)}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold rounded-xl py-3 px-6 text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <span>🔒</span> Pre-Approved Financing
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {INITIAL_PROPERTIES.map((prop) => (
                  <div key={prop.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col shadow-xl">
                    <div className="relative h-64 overflow-hidden">
                      <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-4 text-white font-black text-2xl drop-shadow-md">
                        {formatPrice(prop.priceNGN, prop.priceUSD)}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{prop.type} • {prop.realtorName}</span>
                        <h3 className="text-lg font-bold text-white">{prop.title}</h3>
                        <p className="text-slate-400 text-xs">📍 {prop.location}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button onClick={() => setSelectedProperty(prop)} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl">
                          View Details
                        </button>
                        <button onClick={() => { setNegotiationProperty(prop); setOfferAmount(currency === 'NGN' ? prop.priceNGN : prop.priceUSD); }} className="py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl">
                          Submit Offer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* PROPERTY LISTINGS PAGE */}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
              {INITIAL_PROPERTIES.map((prop) => (
                <div key={prop.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col shadow-xl">
                  <div className="relative h-64 overflow-hidden">
                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 text-white font-black text-2xl drop-shadow-md">{formatPrice(prop.priceNGN, prop.priceUSD)}</div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{prop.type}</span>
                      <h3 className="text-lg font-bold text-white mt-1">{prop.title}</h3>
                      <p className="text-slate-400 text-xs">📍 {prop.location}</p>
                    </div>
                    <button onClick={() => { setNegotiationProperty(prop); setOfferAmount(currency === 'NGN' ? prop.priceNGN : prop.priceUSD); }} className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
                      Submit Formal Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FIND AN AGENT DIRECTORY VIEW */}
        {activePage === 'FindAgent' && (
          <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Certified Broker Network</span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">Find A Local Real Estate Agent</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              {REALTORS_DIRECTORY.map((agent) => (
                <div key={agent.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-center hover:border-amber-500/50 transition-all shadow-xl">
                  <img src={agent.image} alt={agent.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-amber-500" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                    <p className="text-xs text-amber-400 font-bold">{agent.agency}</p>
                  </div>
                  <button onClick={() => { setAuthViewMode('consumer'); setAuthModalOpen(true); }} className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400">
                    Contact Agent
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SERVICES PAGE */}
        {activePage === 'Services' && (
          <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Bespoke Real Estate Solutions</span>
              <h1 className="text-4xl sm:text-5xl font-black text-white">Our Executive Services</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {EXECUTIVE_SERVICES.map((srv) => (
                <div key={srv.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="text-4xl">{srv.icon}</div>
                  <h3 className="text-xl font-bold text-white">{srv.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{srv.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* FULL LUXURY FOOTER RESTORED */}
      <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-xs">
            {NAV_MENUS.map((menu) => (
              <div key={menu.title} className="space-y-3">
                <h4 className="text-amber-400 font-extrabold uppercase tracking-wider text-sm">{menu.title}</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><button onClick={() => handleNavigation(menu.pageKey)} className="hover:text-white transition-colors text-left">Overview</button></li>
                  <li><button onClick={() => handleNavigation(menu.pageKey)} className="hover:text-white transition-colors text-left">Featured Listings</button></li>
                  <li><button onClick={() => handleNavigation(menu.pageKey)} className="hover:text-white transition-colors text-left">Verified Advisory</button></li>
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white">SILVA ESTATE</span>
              <span>© {new Date().getFullYear()} Silva Estate Technologies Ltd. All rights reserved.</span>
            </div>
            <div className="flex gap-4">
              <button className="hover:text-slate-300">Privacy Policy</button>
              <button className="hover:text-slate-300">Terms of Service</button>
              <button className="hover:text-slate-300">Land Title Registry Verification</button>
            </div>
          </div>
        </div>
      </footer>

      {/* CONSUMER / REALTOR.COM LOG IN MODAL WITH SVG BRAND LOGOS */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          {authViewMode === 'consumer' ? (
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
              <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-white">Log in or create an account</h2>
                <p className="text-xs text-slate-400">Access saved searches and direct realtor messaging.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setUserRole('buyer'); setAuthModalOpen(false); }} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email address <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400">
                  Continue
                </button>
              </form>

              <div className="relative text-center my-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                <span className="relative bg-slate-900 px-3 text-[10px] text-slate-500 uppercase">or</span>
              </div>

              <div className="space-y-2">
                {/* SVG Google Vector Icon */}
                <button onClick={() => { setUserRole('buyer'); setAuthModalOpen(false); }} className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-3 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* SVG Apple Vector Icon */}
                <button onClick={() => { setUserRole('buyer'); setAuthModalOpen(false); }} className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-3 transition-colors">
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.9-14.49-6.08-3.32-2.65-7.25-7.3-11.8-13.97-6.12-8.91-11.07-18.9-14.85-29.98-3.78-11.07-5.68-21.72-5.68-31.94 0-12.28 3.03-22.56 9.1-30.82 6.07-8.27 13.88-12.49 23.42-12.67 4.5 0 9.53 1.14 15.09 3.41 5.56 2.28 9.29 3.42 11.2 3.42 1.58 0 5.42-1.2 11.52-3.6 6.1-2.4 11.2-3.52 15.3-3.37 10.07.44 18.01 4.28 23.82 11.52-9.15 5.56-13.62 13.4-13.4 23.52.22 7.84 3.19 14.48 8.91 19.92 5.72 5.44 12.63 8.64 20.73 9.6-1.2 3.65-2.73 7.6-4.58 11.86zm-30.34-110.3c0 6.1-2.26 11.83-6.78 17.18-5.18 6.07-11.64 9.58-19.38 10.53-.18-1.03-.27-1.99-.27-2.88 0-5.88 2.37-11.64 7.11-17.27 4.74-5.63 11.1-9.13 19.08-10.5 0 .97.24 1.95.24 2.94z"/>
                  </svg>
                  <span>Continue with Apple</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-800 text-center space-y-1">
                <p className="text-xs text-slate-400">Are you a real estate agent?</p>
                <button
                  onClick={() => setAuthViewMode('realtorPro')}
                  className="text-amber-400 font-bold text-xs hover:underline"
                >
                  Log in or create a Realtor PRO account
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl">
              <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

              <div className="space-y-1">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Silva Estate PRO</span>
                <h2 className="text-2xl font-black text-white">Create your PRO Realtor Account</h2>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setUserRole('realtor'); setAuthModalOpen(false); }} className="space-y-3">
                <input type="tel" required placeholder="Phone number" value={proPhone} onChange={(e) => setProPhone(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                <input type="email" required placeholder="Email address" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400">
                  Create Agent PRO Account
                </button>
              </form>

              <button onClick={() => setAuthViewMode('consumer')} className="text-xs text-slate-400 hover:text-white">
                ← Back to Consumer Sign In
              </button>
            </div>
          )}
        </div>
      )}

      {/* FORMAL COUNTER-OFFER MODAL */}
      {negotiationProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <button onClick={() => setNegotiationProperty(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Safe On-Platform Deal Desk</span>
              <h2 className="text-2xl font-black text-white">{negotiationProperty.title}</h2>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setNegotiationProperty(null); }} className="space-y-4">
              <input type="number" required value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white" />
              <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
                Submit Formal Counter-Offer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SILVA AI CHAT ASSISTANT */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button onClick={() => setChatOpen(true)} className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-full shadow-2xl">
            <span className="text-xl">🤖</span>
            <span className="text-xs font-black tracking-wide">Ask Silva AI</span>
          </button>
        ) : (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-80 sm:w-96 h-[480px] shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <span className="text-sm font-bold text-white">Silva AI</span>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-amber-500 text-slate-950 font-semibold' : 'bg-slate-950 text-slate-200 border border-slate-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input type="text" placeholder="Ask about properties..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              <button type="submit" className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs">Send</button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}