import React, { useState, useEffect, useRef } from 'react';

// Real-world Exchange Rate (1 USD = 1330 NGN)
const USD_EXCHANGE_RATE = 1330;

// Property Data Array
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
    realtorName: "Michael Adebayo"
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
    realtorName: "Belmont Property Developers"
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
    realtorName: "Sarah Jenkins"
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
    realtorName: "Michael Adebayo"
  }
];

export default function App() {
  const [currency, setCurrency] = useState('NGN');
  const [activeTab, setActiveTab] = useState('Buy');
  const [activePage, setActivePage] = useState('Home');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [searchLocation, setSearchLocation] = useState('');
  
  // Authentication & Role State
  const [userRole, setUserRole] = useState(null); // 'buyer', 'realtor', 'admin', or null
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRoleTab, setLoginRoleTab] = useState('Buyer'); // Only 'Buyer' or 'Realtor' visible publicly
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Modals
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeRealtorChat, setActiveRealtorChat] = useState(null);
  const [financingModalOpen, setFinancingModalOpen] = useState(false);
  const [financingSubmitted, setFinancingSubmitted] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleNavigation = (pageKey) => {
    setActivePage(pageKey);
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
    } else {
      setUserRole(loginRoleTab.toLowerCase());
      setLoginModalOpen(false);
      setOtpSent(false);
    }
  };

  // Hidden Secret Key Trigger for Admin Access
  const triggerAdminLogin = () => {
    setUserRole('admin');
    setActivePage('AdminDashboard');
  };

  const startRealtorChat = (prop) => {
    setActiveRealtorChat(prop);
    setChatMessages([
      { sender: 'realtor', text: `Hello! I am ${prop.realtorName}. How can I assist you with ${prop.title}?` }
    ]);
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = { sender: userRole === 'realtor' ? 'realtor' : 'user', text: chatInput };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative">
      
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 h-20 flex items-center px-6 justify-between">
        <div onClick={() => handleNavigation('Home')} className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center">S</div>
          <span className="text-2xl font-black tracking-wider text-white">SILVA<span className="text-amber-400 font-light">ESTATE</span></span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <button onClick={() => handleNavigation('Home')} className="hover:text-amber-400">Listings</button>
          <button onClick={() => setFinancingModalOpen(true)} className="hover:text-amber-400">Pre-Approved Financing</button>
          {userRole === 'realtor' && <button onClick={() => handleNavigation('RealtorPortal')} className="text-amber-400 font-bold">My Realtor Portal</button>}
          {userRole === 'admin' && <button onClick={() => handleNavigation('AdminDashboard')} className="text-red-400 font-bold">Admin Command Center</button>}
        </nav>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button onClick={() => setCurrency('NGN')} className={`px-2.5 py-1 rounded ${currency === 'NGN' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>NGN</button>
            <button onClick={() => setCurrency('USD')} className={`px-2.5 py-1 rounded ${currency === 'USD' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>USD</button>
          </div>

          {!userRole ? (
            <button onClick={() => setLoginModalOpen(true)} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400">
              Sign In
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl capitalize text-amber-400">
                {userRole} Account
              </span>
              <button onClick={() => { setUserRole(null); setActivePage('Home'); }} className="text-xs text-slate-400 hover:text-white">Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* PUBLIC HOME / LISTINGS PAGE */}
      {activePage === 'Home' && (
        <main className="pt-28 pb-20 max-w-7xl mx-auto px-6 space-y-12">
          <div className="bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-950 p-8 rounded-3xl border border-slate-800 text-center space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Verified Multi-Tenant Real Estate Platform</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Institutional Property Marketplace</h1>
            <button onClick={() => setFinancingModalOpen(true)} className="px-6 py-3 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20">
              Verify Pre-Approved Financing
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_PROPERTIES.map((prop) => (
              <div key={prop.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all">
                <div className="h-56 relative">
                  <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-4 text-white font-black text-xl">{formatPrice(prop.priceNGN, prop.priceUSD)}</div>
                </div>
                <div className="p-5 space-y-3">
                  <span className="text-[10px] text-amber-400 uppercase font-bold">{prop.type} • Listing Agent: {prop.realtorName}</span>
                  <h3 className="font-bold text-white text-base leading-snug">{prop.title}</h3>
                  <button onClick={() => startRealtorChat(prop)} className="w-full py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs rounded-xl transition-colors">
                    Direct Message Realtor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ADMIN COMMAND CENTER (ACCESSIBLE ONLY BY ADMIN) */}
      {activePage === 'AdminDashboard' && userRole === 'admin' && (
        <main className="pt-28 pb-20 max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-3xl font-black text-white">Developer & Admin Control Desk</h1>
              <p className="text-xs text-slate-400">Manage realtors, review financial submissions, and assign admin roles.</p>
            </div>
            <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs rounded-full">System Admin Mode</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-500 uppercase block">Pending Realtor Audits</span>
              <span className="text-3xl font-black text-amber-400">12 Brokers</span>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-500 uppercase block">Financing Documents Submitted</span>
              <span className="text-3xl font-black text-emerald-400">8 Pre-Approvals</span>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-500 uppercase block">Platform Commission Earned</span>
              <span className="text-3xl font-black text-white">₦14,250,000</span>
            </div>
          </div>
        </main>
      )}

      {/* PUBLIC LOGIN GATEWAY MODAL (NO PUBLIC ADMIN TAB) */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-6 relative shadow-2xl">
            <button onClick={() => setLoginModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Platform Gateway</span>
              <h2 className="text-2xl font-black text-white">Login / Register</h2>
            </div>

            {/* Publicly visible roles: Only Buyer and Realtor */}
            <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl text-center text-xs font-bold">
              <button onClick={() => setLoginRoleTab('Buyer')} className={`py-2 rounded-lg ${loginRoleTab === 'Buyer' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Buyer</button>
              <button onClick={() => setLoginRoleTab('Realtor')} className={`py-2 rounded-lg ${loginRoleTab === 'Realtor' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Realtor</button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {!otpSent ? (
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Phone Number (For OTP Verification)</label>
                  <input type="tel" required placeholder="+234 800 000 0000" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500" />
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Enter 4-Digit Security OTP</label>
                  <input type="text" required placeholder="1234" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 text-center tracking-widest font-mono text-lg" />
                </div>
              )}

              <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400">
                {!otpSent ? 'Send OTP Code' : 'Verify & Enter Platform'}
              </button>
            </form>

            <div className="pt-2 text-center border-t border-slate-800">
              <button onClick={triggerAdminLogin} className="text-[10px] text-slate-600 hover:text-slate-400">
                🔒 Developer Authorization Entry
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
                  <label className="text-xs text-slate-300">Bank / Pre-Approval Statement (PDF)</label>
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
                <p className="text-xs text-slate-400">Your pre-approval documentation has been submitted for verification.</p>
                <button onClick={() => setFinancingModalOpen(false)} className="px-6 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">Return to Listings</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REAL-TIME DIRECT MESSAGING DRAWER */}
      {activeRealtorChat && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col h-[450px] overflow-hidden">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-white">{activeRealtorChat.realtorName}</h4>
              <span className="text-[10px] text-emerald-400">● Verified Broker Connected</span>
            </div>
            <button onClick={() => setActiveRealtorChat(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-amber-500 text-slate-950 font-semibold' : 'bg-slate-950 text-slate-200 border border-slate-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendChatMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input type="text" placeholder="Type your message to realtor..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500" />
            <button type="submit" className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs">Send</button>
          </form>
        </div>
      )}

      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        Silva Estate Multi-Tenant Real Estate Platform © {new Date().getFullYear()}
      </footer>

    </div>
  );
}