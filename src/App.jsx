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
    image: "/201887995792794157.jpg",
    specialty: "High-Net-Worth Residential & Land Banking"
  },
  {
    id: 2,
    name: "Belmont Property Developers",
    agency: "Belmont Realty Partners",
    location: "Lekki Phase 1 & Epe, Lagos",
    rating: "4.9 ★★★★★ (38 reviews)",
    experience: "12 years experience",
    sales: "12 Prime Gated Estates",
    image: "/666955026112680341.jpg",
    specialty: "Off-Plan Joint Ventures & Waterfront Commercial"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    agency: "Sunbelt USA Expansion Advisory",
    location: "Houston TX & Atlanta GA, USA",
    rating: "5.0 ★★★★★ (56 reviews)",
    experience: "10 years experience",
    sales: "30+ Foreign National Transactions",
    image: "/Chinese Buyers Drive $56B Surge in US Housing___.jpg",
    specialty: "Cross-Border Mortgages & Dollar Dividend Yields"
  }
];

export default function App() {
  const [currency, setCurrency] = useState('NGN');
  const [activeTab, setActiveTab] = useState('Buy');
  const [activePage, setActivePage] = useState('Home');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Mobile Navigation Drawer Toggle State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication & Realtor.com Onboarding State
  const [userRole, setUserRole] = useState(null); // 'buyer' | 'realtor' | 'admin'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authViewMode, setAuthViewMode] = useState('consumer'); // 'consumer' | 'realtorPro'
  const [emailInput, setEmailInput] = useState('');
  const [proPhone, setProPhone] = useState('');
  const [proPassword, setProPassword] = useState('');

  // Structured Offer Negotiation Modal State
  const [negotiationProperty, setNegotiationProperty] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerTimeline, setOfferTimeline] = useState('30 Days');
  const [negotiationSubmitted, setNegotiationSubmitted] = useState(false);

  // Pre-Approved Financing Modal State
  const [financingModalOpen, setFinancingModalOpen] = useState(false);
  const [financingSubmitted, setFinancingSubmitted] = useState(false);

  // Silva AI Chat Assistant State
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
    setActiveDropdown(null);
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

  const handleConsumerAuth = (e) => {
    e.preventDefault();
    setUserRole('buyer');
    setAuthModalOpen(false);
  };

  const handleProAgentAuth = (e) => {
    e.preventDefault();
    setUserRole('realtor');
    setAuthModalOpen(false);
  };

  const triggerAdminLogin = () => {
    setUserRole('admin');
    setActivePage('AdminDashboard');
    setAuthModalOpen(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let aiResponse = "I can help you filter properties, calculate mortgage pre-approvals, or connect you with certified agents in Lagos and the USA.";
      const q = userText.toLowerCase().trim();

      if (q.includes('agent') || q.includes('realtor') || q.includes('find')) {
        aiResponse = "You can browse our verified realtor directory under 'Find An Agent' in the top menu to view rating badges and closed sales volume.";
      } else if (q.includes('ikoyi') || q.includes('lekki') || q.includes('lagos')) {
        aiResponse = "We feature prime Lagos listings: Ultra-Modern Ikoyi Villa (₦850M) and Lekki Phase 1 Waterfront Estate (₦450M) with verified Governor's Consent titles.";
      } else if (q.includes('c of o') || q.includes('title') || q.includes('legal')) {
        aiResponse = "A C of O grants 99-year state land rights. On resales, Governor's Consent is strictly required. All Silva Estate listings undergo Alausa registry checks.";
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative">
      
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

          {/* Desktop Links */}
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

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer Fix */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
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
              className="w-full py-3 bg-slate-900 border border-slate-800 text-amber-400 font-bold text-xs rounded-xl text-center"
            >
              🔒 Pre-Approved Financing Gateway
            </button>
          </div>
        )}
      </header>

      {/* HOME PAGE WITH HERO VIDEO */}
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
                <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-light">
                  Explore premier residential villas, luxury shortlets, and prime commercial investments across Nigeria and the USA.
                </p>
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
                      <option value="land" className="bg-slate-900">Lands & Plots</option>
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
              <div className="text-sm text-slate-400">
                Showing <strong className="text-amber-400">{INITIAL_PROPERTIES.length}</strong> available listings
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

      {/* REALTOR.COM STYLE FIND AN AGENT DIRECTORY PAGE */}
      {activePage === 'FindAgent' && (
        <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Certified Broker Network</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Find A Local Real Estate Agent</h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              Connect with top-performing luxury realtors in Nigeria and international cross-border specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {REALTORS_DIRECTORY.map((agent) => (
              <div key={agent.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-center hover:border-amber-500/50 transition-all shadow-xl">
                <img src={agent.image} alt={agent.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-amber-500" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                  <p className="text-xs text-amber-400 font-bold">{agent.agency}</p>
                  <p className="text-xs text-slate-400">📍 {agent.location}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
                  <div className="text-amber-400 font-bold">{agent.rating}</div>
                  <div className="text-slate-300">{agent.experience} • {agent.sales}</div>
                </div>
                <button onClick={() => { setAuthViewMode('consumer'); setAuthModalOpen(true); }} className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400">
                  Contact Agent
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REALTOR.COM STYLE AUTHENTICATION MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          {authViewMode === 'consumer' ? (
            /* Consumer Log In or Create Account Modal (Image 3) */
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
              <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-white">Log in or create an account</h2>
                <p className="text-xs text-slate-400">Access saved searches and direct realtor messaging.</p>
              </div>

              <form onSubmit={handleConsumerAuth} className="space-y-3">
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
                <button onClick={() => setUserRole('buyer')} className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2">
                  <span>🌐</span> Continue with Google
                </button>
                <button onClick={() => setUserRole('buyer')} className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2">
                  <span>🍎</span> Continue with Apple
                </button>
              </div>

              {/* Link to PRO Agent Onboarding */}
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
            /* Realtor.com PRO Agent Onboarding View (Image 4) */
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full overflow-hidden relative shadow-2xl grid grid-cols-1 md:grid-cols-2">
              <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white">✕</button>

              {/* Left Value Proposition Side */}
              <div className="p-8 bg-slate-950 space-y-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
                <div>
                  <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
                    Silva Estate PRO
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    Your Realtor PRO account allows you to:
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-xl">👤</span>
                    <div>
                      <h4 className="font-bold text-white">Claim your FREE agent profile</h4>
                      <p className="text-slate-400">Create an account to show up when buyers and sellers look for an agent.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-xl">💬</span>
                    <div>
                      <h4 className="font-bold text-white">Generate and manage leads</h4>
                      <p className="text-slate-400">Connect with motivated buyers visiting Silva Estate looking for verified agents.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-xl">📢</span>
                    <div>
                      <h4 className="font-bold text-white">Build your brand</h4>
                      <p className="text-slate-400">Increase visibility across Lagos and international markets with verified badges.</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => setAuthViewMode('consumer')} className="text-slate-400 hover:text-white text-xs text-left">
                  ← Back to Consumer Sign In
                </button>
              </div>

              {/* Right Agent Registration Form Side */}
              <div className="p-8 space-y-6 flex flex-col justify-center">
                <div>
                  <h3 className="text-xl font-bold text-white">Create your PRO account</h3>
                  <p className="text-xs text-slate-400">Join our verified broker marketplace network.</p>
                </div>

                <form onSubmit={handleProAgentAuth} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Phone number <span className="text-red-400">*</span></label>
                    <input type="tel" required placeholder="+234 800 000 0000" value={proPhone} onChange={(e) => setProPhone(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Email address <span className="text-red-400">*</span></label>
                    <input type="email" required placeholder="agent@realty.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Password <span className="text-red-400">*</span></label>
                    <input type="password" required placeholder="••••••••" value={proPassword} onChange={(e) => setProPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                  </div>

                  <button type="submit" className="w-full py-3.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400">
                    Create Agent PRO Account
                  </button>
                </form>

                <div className="text-center pt-2">
                  <button onClick={triggerAdminLogin} className="text-[10px] text-slate-600 hover:text-slate-400">
                    🔒 Developer Authorization Gateway
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FORMAL STRUCTURED OFFER MODAL */}
      {negotiationProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <button onClick={() => setNegotiationProperty(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Safe On-Platform Deal Desk</span>
              <h2 className="text-2xl font-black text-white">{negotiationProperty.title}</h2>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setNegotiationSubmitted(true); }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Offer Amount ({currency})</label>
                <input type="number" required value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white" />
              </div>
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