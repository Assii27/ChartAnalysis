import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, BookOpen, Crown, Target, LayoutDashboard, Menu, X, Sparkles, TrendingUp, Activity, Zap, ShieldCheck, Moon, Sun } from 'lucide-react';
import { CHART_PATTERNS, ChartPattern, PatternType } from './constants';
import { PatternCard } from './components/PatternCard';
import { PatternModal } from './components/PatternModal';
import TradingViewWidget from './components/TradingViewWidget';
import { AIStrategyPanel } from './components/AIStrategyPanel';
import { GoldTicker } from './components/GoldTicker';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<PatternType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<ChartPattern | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [activeTab, setActiveTab] = useState<'ByAsif' | 'Live' | 'Resources'>('ByAsif');

  // Toggle dark mode class on body or root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredPatterns = useMemo(() => {
    return CHART_PATTERNS.filter(pattern => {
      const matchCategory = activeCategory === 'All' || pattern.type === activeCategory;
      const matchSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pattern.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div id="app-root-container" className={`min-h-screen flex flex-col md:flex-row ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
      {/* Mobile Header */}
      <div className={`md:hidden flex items-center justify-between p-4 border-b ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Crown size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg">ChartPattern <span className="text-indigo-600">By Asif</span></span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-600'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 hidden md:block">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200/20">
                  <Crown size={24} className="text-white" />
                </div>
                <h1 className="font-display font-extrabold text-2xl tracking-tight leading-6">
                  ChartPattern <br/><span className="text-indigo-600">By Asif</span>
                </h1>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)} 
                className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="px-6 mb-6">
             <div className={`rounded-2xl p-4 border overflow-hidden min-h-[140px] ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200/60'}`}>
                <GoldTicker darkMode={darkMode} />
             </div>
          </div>

          <nav className="flex-1 px-4 space-y-6">
            <div className="space-y-1">
              <p className={`px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>View</p>
              <button 
                onClick={() => { setActiveTab('ByAsif'); setActiveCategory('All'); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'ByAsif' ? (darkMode ? 'bg-indigo-900/40 text-indigo-300 shadow-sm' : 'bg-indigo-50 text-indigo-700 shadow-sm') : (darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500')}`}
              >
                <LayoutDashboard size={20} />
                By Asif
              </button>
              <button 
                onClick={() => setActiveTab('Live')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'Live' ? (darkMode ? 'bg-indigo-900/40 text-indigo-300 shadow-sm' : 'bg-indigo-50 text-indigo-700 shadow-sm') : (darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500')}`}
              >
                <Activity size={20} />
                Live Market
              </button>
            </div>

            {activeTab === 'ByAsif' && (
              <div className="space-y-1">
                <p className={`px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Categories</p>
                <button 
                  onClick={() => setActiveCategory('Reversal')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeCategory === 'Reversal' ? (darkMode ? 'bg-indigo-900/40 text-indigo-300 shadow-sm' : 'bg-indigo-50 text-indigo-700 shadow-sm') : (darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500')}`}
                >
                  <Target size={20} />
                  Reversal
                </button>
                <button 
                  onClick={() => setActiveCategory('Continuation')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeCategory === 'Continuation' ? (darkMode ? 'bg-indigo-900/40 text-indigo-300 shadow-sm' : 'bg-indigo-50 text-indigo-700 shadow-sm') : (darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500')}`}
                >
                  <TrendingUp size={20} />
                  Continuation
                </button>
                <button 
                  onClick={() => setActiveCategory('Candlestick')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeCategory === 'Candlestick' ? (darkMode ? 'bg-indigo-900/40 text-indigo-300 shadow-sm' : 'bg-indigo-50 text-indigo-700 shadow-sm') : (darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500')}`}
                >
                  <Zap size={20} className={activeCategory === 'Candlestick' ? 'text-indigo-400' : 'text-amber-500'} />
                  Candlesticks
                </button>
              </div>
            )}

            <div className="space-y-1">
              <p className={`px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Resources</p>
              <button 
                onClick={() => setActiveTab('Resources')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'Resources' ? (darkMode ? 'bg-indigo-900/40 text-indigo-300 shadow-sm' : 'bg-indigo-50 text-indigo-700 shadow-sm') : (darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500')}`}
              >
                <ShieldCheck size={20} className="text-amber-500" />
                Gold Strategy Guide
              </button>
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500'}`}>
                <BookOpen size={20} />
                Cheat Sheets
              </button>
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-50 text-slate-500'}`}>
                <Sparkles size={20} />
                Expert Tips
              </button>
            </div>
          </nav>

          <div className="p-4 space-y-4">
            <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-20">
                <Sparkles size={80} />
              </div>
              <p className="text-xs font-bold text-indigo-400 mb-1">PRO FEATURES</p>
              <h4 className="font-display font-medium text-sm mb-3">Unlock Daily Signals</h4>
              <button className="w-full py-2 bg-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">
                Upgrade Now
              </button>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 opacity-80 group cursor-default">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                <Target size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Developer</span>
                <span className="text-sm font-bold text-slate-700">Asif Maner</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          {activeTab === 'ByAsif' ? (
            <>
              <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h2 className={`text-3xl font-display font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Pattern Discovery</h2>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Master {CHART_PATTERNS.length} high-accuracy price formations</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative w-full sm:w-64 md:w-80 h-14 group">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-indigo-500 transition-colors`} size={20} />
                    <input 
                      type="text" 
                      placeholder="Search pattern..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full h-full pl-12 pr-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`}
                    />
                  </div>
                  
                  <button className={`h-14 px-6 border rounded-2xl font-bold flex items-center gap-2 transition-all shadow-sm ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                    <Filter size={18} />
                    Filters
                  </button>
                </div>
              </header>

              <div className="patterns-grid">
                <AnimatePresence mode="popLayout">
                  {filteredPatterns.map((pattern) => (
                    <PatternCard 
                      key={pattern.id} 
                      pattern={pattern} 
                      onClick={setSelectedPattern} 
                    />
                  ))}
                </AnimatePresence>
              </div>

              {filteredPatterns.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className={`p-6 rounded-full mb-4 ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                    <Search size={40} className={darkMode ? 'text-slate-600' : 'text-slate-400'} />
                  </div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>No patterns found</h3>
                  <p className={darkMode ? 'text-slate-500' : 'text-slate-500'}>Try adjusting your search or filters.</p>
                </motion.div>
              )}
            </>
          ) : activeTab === 'Live' ? (
            <div className="space-y-6">
               <header className="space-y-1">
                  <h2 className={`text-3xl font-display font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Live Market Analysis</h2>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Real-time XAU/USD data with advanced technical tools</p>
                </header>
                <div className={`border rounded-3xl h-[600px] shadow-sm overflow-hidden mb-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                   <TradingViewWidget darkMode={darkMode} />
                </div>
                
                <div className={`mb-8 p-8 rounded-[40px] border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <AIStrategyPanel darkMode={darkMode} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className={`p-6 rounded-3xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Trend Strength</h4>
                      <p className="text-2xl font-display font-bold text-emerald-600">Strong Bullish</p>
                   </div>
                   <div className={`p-6 rounded-3xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Volatility Index</h4>
                      <p className={`text-2xl font-display font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Moderate High</p>
                   </div>
                   <div className={`p-6 rounded-3xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Signals (24h)</h4>
                      <p className="text-2xl font-display font-bold text-indigo-600">4 Active</p>
                   </div>
                </div>
            </div>
          ) : (
            <div className="space-y-6">
               <header className="space-y-1">
                  <h2 className={`text-3xl font-display font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Gold Strategy Guide</h2>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Expert insights and high-probability setups for Gold (XAU/USD)</p>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className={`p-8 rounded-3xl border shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${darkMode ? 'bg-indigo-900/40 text-indigo-400' : 'bg-amber-50 text-amber-600'}`}>
                          <TrendingUp size={24} />
                        </div>
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>The Power of Pullbacks</h3>
                      </div>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                        Gold often moves in sharp aggressive cycles. The safest entry is always at a 50-61.8% Fibonacci retracement of a major impulsive move. Look for confluence with previous resistance turned support.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-slate-500"><Zap size={14} className="text-indigo-500" /> Wait for impulsive breakout</li>
                        <li className="flex items-center gap-2 text-sm text-slate-500"><Zap size={14} className="text-indigo-500" /> Draw Fib from low to high</li>
                        <li className="flex items-center gap-2 text-sm text-slate-500"><Zap size={14} className="text-indigo-500" /> Look for bullish Hammer at 61.8%</li>
                      </ul>
                    </div>

                    <div className={`p-8 rounded-3xl border shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${darkMode ? 'bg-indigo-900/40 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                          <Activity size={24} />
                        </div>
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>London Open Strategy</h3>
                      </div>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                        The 8:00 AM GMT (London Open) provides the highest volume for Gold. Watch for the 'Asia Range' breakout. A fake-out below the range followed by a sharp recovery often leads to the daily trend.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-8 rounded-3xl text-white space-y-6 relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 opacity-10">
                      <Crown size={200} />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <h3 className="text-2xl font-display font-bold">Pro Confluence Checklist</h3>
                      <div className="space-y-4 pt-4">
                        {[
                          "DXY (Dollar Index) correlation check",
                          "Major psychological levels ($2100, $2150...)",
                          "NFP & CPI data release schedule",
                          "H4 Structure vs M15 Entry alignment",
                          "RSI Overbought/Oversold with Divergence"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-[10px] font-bold">
                              {i+1}
                            </div>
                            <span className="text-sm font-medium text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          )}
        </div>
      </main>

      {/* Pattern Detail Modal */}
      <PatternModal 
        pattern={selectedPattern} 
        onClose={() => setSelectedPattern(null)} 
      />
    </div>
  );
}
