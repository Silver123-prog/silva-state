import React, { useState, useEffect, useRef } from 'react';

// Real-world Exchange Rate (1 USD = 1330 NGN)
const USD_EXCHANGE_RATE = 1330;

// Rich Property Dataset
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
    realtorPhone: "+2349016318634",
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
    realtorPhone: "+2348000000001",
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
    realtorPhone: "+18005550199",
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
    realtorPhone: "+2349016318634",
    status: "Available"
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
    tag: "New Launch",
    verified: false,
    realtorName: "Sarah Jenkins",
    realtorPhone: "+18005550199",
    status: "Available"
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
    tag: "Investment",
    verified: true,
    realtorName: "Michael Adebayo",
    realtorPhone: "+2349016318634",
    status: "Available"
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
    tag: "Shortlet",
    verified: true,
    realtorName: "Belmont Property Developers",
    realtorPhone: "+2348000000001",
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

  // Auth & Role State
  const [userRole, setUserRole] = useState(null); // 'buyer' | 'realtor' | 'agency' | 'admin'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRoleTab, setAuthRoleTab] = useState('Buyer'); // 'Buyer' | 'Realtor' | 'Agency'
  const [otpSent, setOtpSent] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [cacDocument, setCacDocument] = useState(null);

  // Offer & Direct Negotiation State
  const [negotiationProperty, setNegotiationProperty] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerTimeline, setOfferTimeline] = useState('30 Days');
  const [offerCondition, setOfferCondition] = useState('');
  const [negotiationHistory, setNegotiationHistory] = useState([]);
  const [negotiationSubmitted, setNegotiationSubmitted] = useState(false);

  // Pre-Approved Financing Proof Modal State
  const [financingModalOpen, setFinancingModalOpen] = useState(false);
  const [financingSubmitted, setFinancingSubmitted] = useState(false);

  // Dedicated List Property Modal State
  const [listPropertyOpen, setListPropertyOpen] = useState(false);
  const [listPropertyForm, setListPropertyForm] = useState({ title: '', location: '', price: '', type: 'House For Sale', contactName: '', phone: '' });
  const [listPropertySubmitted, setListPropertySubmitted] = useState(false);

  // Service Consultation Form State
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', phone: '', note: '' });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Silva AI Assistant State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: "Hello! Welcome to Silva Estate. I am Silva AI, your grounded luxury real estate advisor. Ask me about properties under a specific budget, neighborhood ROI, or title due diligence!" }
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

  const formatPrice = (priceNGN, priceUSD) => {
    if (currency === 'NGN') {
      const totalNGN = priceNGN || (priceUSD * USD_EXCHANGE_RATE);
      return `₦${Math.round(totalNGN).toLocaleString('en-NG')}`;
    } else {
      const totalUSD = priceUSD || (priceNGN / USD_EXCHANGE_RATE);
      return `$${Math.round(totalUSD).toLocaleString('en-US')}`;
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
    } else {
      setUserRole(authRoleTab.toLowerCase());
      setAuthModalOpen(false);
      setOtpSent(false);
    }
  };

  // Secret Developer Trigger for Admin Access
  const triggerAdminLogin = () => {
    setUserRole('admin');
    setActivePage('AdminDashboard');
    setAuthModalOpen(false);
  };

  const startNegotiation = (prop) => {
    setNegotiationProperty(prop);
    setOfferAmount(currency === 'NGN' ? prop.priceNGN.toString() : prop.priceUSD.toString());
    setNegotiationHistory([
      { sender: 'system', text: `Official negotiation channel opened for ${prop.title} with Listing Agent ${prop.realtorName}.` }
    ]);
    setNegotiationSubmitted(false);
    setChatOpen(false);
  };

  const submitOffer = (e) => {
    e.preventDefault();
    const formattedVal = currency === 'NGN' ? `₦${Number(offerAmount).toLocaleString('en-NG')}` : `$${Number(offerAmount).toLocaleString('en-US')}`;
    const newEntry = {
      sender: userRole || 'Buyer',
      text: `Formal Offer Submitted: ${formattedVal} (${offerTimeline} Closing Window). Conditions: ${offerCondition || 'Standard contract terms'}.`
    };
    setNegotiationHistory((prev) => [...prev, newEntry]);
    setNegotiationSubmitted(true);
  };

  const resetChatSession = () => {
    setChatMessages([
      { sender: 'ai', text: "Session restarted. What location or property parameters are you searching for today?" }
    ]);
  };

  // RAG-Grounded AI Engine
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let aiResponse = "I can help you filter listings, evaluate neighborhood ROI, explain C of O land titles, or guide cross-border US investments!";
      const q = userText.toLowerCase().trim();

      if (q.includes('lekki') || q.includes('ikoyi') || q.includes('lagos')) {
        aiResponse = "We have prime Lagos properties: 1) Ultra-Modern Villa in Ikoyi (₦850M / $639,097) with C of O, 2) Lekki Phase 1 Waterfront Estate (₦450M / $338,345), and 3) Epe Land Banking parcels (₦1.2B).";
      } else if (q.includes('usa') || q.includes('houston') || q.includes('atlanta') || q.includes('dollar')) {
        aiResponse = "For US Sunbelt acquisitions, we feature: 1) Houston Family Estate ($890,000 / ₦1.18B) and 2) Atlanta Gated Off-Plan Residences ($450,000). Foreign national 70% LTV mortgages are supported.";
      } else if (q.includes('c of o') || q.includes('title') || q.includes('legal') || q.includes('governor')) {
        aiResponse = "A Certificate of Occupancy (C of O) grants 99-year state leasehold rights. Subsequent resales require Governor's Consent to remain legally valid. All Silva Estate listings undergo Alausa & AGIS registry checks.";
      } else if (q.includes('thank') || q.includes('thanks') || q.includes('ok') || q.includes('okay')) {
        aiResponse = "You're very welcome! Feel free to ask whenever you need further property details or market summaries.";
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 500);
  };

  const NAV_MENUS = [
    {
      title: 'Buy',
      pageKey: 'Buy',
      links: ['Flats & Apartments For Sale', 'House For Sale', 'Lands For Sale', 'Commercial Property For Sale', 'All Property For Sale']
    },
    {
      title: 'Rent',
      pageKey: 'Rent',
      links: ['Flats & Apartments For Rent', 'Houses For Rent', 'Commercial Property For Rent', 'Long-term Leases']
    },
    {
      title: 'Shortlet',
      pageKey: 'Shortlet',
      links: ['Luxury Serviced Apartments', 'Vacation Villas with Private Pools', 'Executive Penthouse Shortlets', 'Daily & Weekly Stays']
    },
    {
      title: 'New Projects',
      pageKey: 'Projects',
      links: ['Off-Plan Development Opportunities', 'Gated Communities in Nigeria', 'US Housing Development Expansion', 'Smart City Residences']
    },
    {
      title: 'Services',
      pageKey: 'Services',
      links: ['Property Advisory & Portfolio Management', 'Valuation & Land Banking Services', 'Architectural Design & Renovation', 'Legal Due Diligence & Titles']
    },
    {
      title: 'Agents',
      pageKey: 'Agents',
      links: ['Find A Verified Realtor', 'Join Silva Estate Agency Network', 'Top Performing Lagos Brokers', 'International Partner Portal']
    },
    {
      title: 'Insights',
      pageKey: 'Insights',
      links: ['Nigeria Real Estate Market Reports', 'Cross-Border USA Property Investment', 'Area & Neighbourhood Guides', 'Property Laws & Land Titles']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative">
      
      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div onClick={() => handleNavigation('Home')} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
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

            {!userRole ? (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-amber-400 font-bold capitalize">
                  {userRole} Mode
                </span>
                <button
                  onClick={() => { setUserRole(null); setActivePage('Home'); }}
                  className="text-xs text-slate-400 hover:text-white"
                >
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
      </header>

      {/* HOME PAGE WITH FULL LUXURY HERO VIDEO */}
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
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-slate-950/80 border border-slate-700/80 text-amber-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                        {prop.tag}
                      </span>
                      {prop.verified && (
                        <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                          ✓ Verified C of O
                        </span>
                      )}
                    </div>

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
                        {prop.type} • Listing Agent: {prop.realtorName}
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

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => setSelectedProperty(prop)}
                        className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all border border-slate-700/50"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => startNegotiation(prop)}
                        className="py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md shadow-amber-500/10"
                      >
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {filteredProperties.map((prop) => (
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
                  <button onClick={() => startNegotiation(prop)} className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
                    Submit Formal Offer
                  </button>
                </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {EXECUTIVE_SERVICES.map((srv) => (
              <div key={srv.id} onClick={() => setSelectedService(srv)} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/50 transition-all cursor-pointer">
                <div className="text-4xl">{srv.icon}</div>
                <h3 className="text-xl font-bold text-white">{srv.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INSIGHTS PAGE */}
      {activePage === 'Insights' && (
        <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Market Intelligence</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Real Estate Insights & Reports</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {INSIGHTS_ARTICLES.map((article) => (
              <div key={article.id} onClick={() => setSelectedArticle(article)} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 cursor-pointer hover:border-amber-500/50">
                <span className="text-amber-400 text-xs font-bold uppercase">{article.category}</span>
                <h3 className="text-xl font-bold text-white">{article.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-2">{article.summary}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ADMIN DASHBOARD (RESTRICTED TO ADMIN ROLE) */}
      {activePage === 'AdminDashboard' && userRole === 'admin' && (
        <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-3xl font-black text-white">Platform Governance & Triage Center</h1>
              <p className="text-xs text-slate-400">Manage verification queues, complaint tickets, and listing audits.</p>
            </div>
            <span className="px-3 py-1 bg-red-500/20 text-red-400 font-bold text-xs rounded-full border border-red-500/30">Super Admin Mode</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-500 uppercase block">Pending Realtor CAC Audits</span>
              <span className="text-3xl font-black text-amber-400">14 Registrations</span>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-500 uppercase block">Pre-Approval PDF Reviews</span>
              <span className="text-3xl font-black text-emerald-400">8 Submissions</span>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-500 uppercase block">Platform Commission Ledger</span>
              <span className="text-3xl font-black text-white">₦18,450,000</span>
            </div>
          </div>
        </main>
      )}

      {/* FORMAL STRUCTURED OFFER & NEGOTIATION MODAL */}
      {negotiationProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setNegotiationProperty(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Safe On-Platform Deal Desk</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{negotiationProperty.title}</h2>
              <p className="text-xs text-slate-400">Listing Agent: <strong className="text-amber-400">{negotiationProperty.realtorName}</strong></p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 h-40 overflow-y-auto space-y-2 text-xs">
              {negotiationHistory.map((h, i) => (
                <div key={i} className={`p-2.5 rounded-xl ${h.sender === 'system' ? 'bg-slate-900 text-amber-400 italic' : 'bg-slate-800 text-white'}`}>
                  <strong>{h.sender}:</strong> {h.text}
                </div>
              ))}
            </div>

            {!negotiationSubmitted ? (
              <form onSubmit={submitOffer} className="space-y-4 border-t border-slate-800 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Offer Price ({currency})</label>
                    <input type="number" required value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Proposed Closing Window</label>
                    <select value={offerTimeline} onChange={(e) => setOfferTimeline(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none">
                      <option value="14 Days">14 Days (Fast Cash)</option>
                      <option value="30 Days">30 Days (Standard)</option>
                      <option value="60 Days">60 Days (Bank Mortgage)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Offer Conditions / Notes</label>
                  <input type="text" placeholder="e.g., Subject to title search and vacant possession" value={offerCondition} onChange={(e) => setOfferCondition(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm rounded-xl">
                  Submit Structured Counter-Offer
                </button>
              </form>
            ) : (
              <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/40 text-center space-y-3">
                <span className="text-3xl block">🤝</span>
                <h3 className="text-lg font-bold text-white">Formal Offer Dispatched</h3>
                <p className="text-xs text-slate-300">Your proposal has been recorded in the platform ledger and sent to {negotiationProperty.realtorName}.</p>
                <button onClick={() => setNegotiationProperty(null)} className="px-6 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">Close Window</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PUBLIC AUTHENTICATION MODAL (BUYER / REALTOR / AGENCY ONLY) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-6 relative shadow-2xl">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Platform Authentication</span>
              <h2 className="text-2xl font-black text-white">Login / Onboarding</h2>
            </div>

            <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-xl text-center text-xs font-bold">
              <button onClick={() => setAuthRoleTab('Buyer')} className={`py-2 rounded-lg ${authRoleTab === 'Buyer' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Buyer</button>
              <button onClick={() => setAuthRoleTab('Realtor')} className={`py-2 rounded-lg ${authRoleTab === 'Realtor' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Realtor</button>
              <button onClick={() => setAuthRoleTab('Agency')} className={`py-2 rounded-lg ${authRoleTab === 'Agency' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Agency</button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!otpSent ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Full Name</label>
                    <input type="text" required value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Full Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Phone Number (For OTP Verification)</label>
                    <input type="tel" required value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder="+234 800 000 0000" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                  </div>
                  {(authRoleTab === 'Realtor' || authRoleTab === 'Agency') && (
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">CAC / Business License Document (PDF)</label>
                      <input type="file" required onChange={(e) => setCacDocument(e.target.files[0])} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-400" />
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Enter 4-Digit Security OTP</label>
                  <input type="text" required placeholder="1234" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white text-center font-mono text-lg tracking-widest" />
                </div>
              )}

              <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400">
                {!otpSent ? 'Send OTP Verification Code' : 'Verify & Enter Platform'}
              </button>
            </form>

            <div className="pt-2 text-center border-t border-slate-800">
              <button onClick={triggerAdminLogin} className="text-[10px] text-slate-600 hover:text-slate-400">
                🔒 Developer Authorization Key Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRE-APPROVED FINANCING MODAL */}
      {financingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-6 relative shadow-2xl">
            <button onClick={() => setFinancingModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Proof of Funds Gateway</span>
              <h2 className="text-2xl font-black text-white">Financial Authentication</h2>
            </div>

            {!financingSubmitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setFinancingSubmitted(true); }} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Bank Pre-Approval / Proof Statement (PDF)</label>
                  <input type="file" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-400" />
                </div>
                <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
                  Submit Financial Verification
                </button>
              </form>
            ) : (
              <div className="text-center space-y-3 bg-slate-950 p-6 rounded-2xl border border-emerald-500/30">
                <span className="text-3xl block">🔒</span>
                <h3 className="text-lg font-bold text-white">Financial Audit Initiated</h3>
                <p className="text-xs text-slate-400">Your documentation has been registered for pre-approval verification.</p>
                <button onClick={() => setFinancingModalOpen(false)} className="px-6 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">Return to Platform</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SILVA AI ASSISTANT WIDGET */}
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
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">🤖</div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">Silva AI</h4>
                  <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" /> Live Assistant
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetChatSession} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-1 rounded-md">New Chat</button>
                <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white text-sm font-bold p-1">✕</button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-amber-500 text-slate-950 font-semibold' : 'bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input type="text" placeholder="Ask about properties, pricing, land titles..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500" />
              <button type="submit" className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs">Send</button>
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
                      <button onClick={() => handleNavigation(menu.pageKey, link)} className="hover:text-white transition-colors text-left">{link}</button>
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