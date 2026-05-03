import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, BookOpen, Crown, Target, LayoutDashboard, Menu, X, Sparkles, TrendingUp, Activity, Zap } from 'lucide-react';
import { CHART_PATTERNS, ChartPattern, PatternType } from './constants';
import { PatternCard } from './components/PatternCard';
import { PatternModal } from './components/PatternModal';
import { GoldTicker } from './components/GoldTicker';
import { CandlestickChart } from './components/CandlestickChart';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<PatternType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<ChartPattern | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<'Academy' | 'Live'>('Academy');

  const filteredPatterns = useMemo(() => {
    return CHART_PATTERNS.filter(pattern => {
      const matchCategory = activeCategory === 'All' || pattern.type === activeCategory;
      const matchSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pattern.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Crown size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg">ChartPattern <span className="text-indigo-600">Pro</span></span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                <Crown size={24} className="text-white" />
              </div>
              <h1 className="font-display font-extrabold text-2xl tracking-tight text-slate-900">
                ChartPattern <br/><span className="text-indigo-600">Academy</span>
              </h1>
            </div>
          </div>

          <div className="px-6 mb-6">
             <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 overflow-hidden min-h-[140px]">
                <GoldTicker />
             </div>
          </div>

          <nav className="flex-1 px-4 space-y-6">
            <div className="space-y-1">
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">View</p>
              <button 
                onClick={() => { setActiveTab('Academy'); setActiveCategory('All'); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'Academy' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'hover:bg-slate-50 text-slate-500'}`}
              >
                <LayoutDashboard size={20} />
                Library
              </button>
              <button 
                onClick={() => setActiveTab('Live')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'Live' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'hover:bg-slate-50 text-slate-500'}`}
              >
                <Activity size={20} />
                Live Market
              </button>
            </div>

            {activeTab === 'Academy' && (
              <div className="space-y-1">
                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Categories</p>
                <button 
                  onClick={() => setActiveCategory('Reversal')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeCategory === 'Reversal' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'hover:bg-slate-50 text-slate-500'}`}
                >
                  <Target size={20} />
                  Reversal
                </button>
                <button 
                  onClick={() => setActiveCategory('Continuation')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeCategory === 'Continuation' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'hover:bg-slate-50 text-slate-500'}`}
                >
                  <TrendingUp size={20} />
                  Continuation
                </button>
                <button 
                  onClick={() => setActiveCategory('Candlestick')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeCategory === 'Candlestick' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'hover:bg-slate-50 text-slate-500'}`}
                >
                  <Zap size={20} className={activeCategory === 'Candlestick' ? 'text-indigo-600' : 'text-amber-500'} />
                  Candlesticks
                </button>
              </div>
            )}

            <div className="space-y-1">
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Resources</p>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium hover:bg-slate-50 text-slate-500">
                <BookOpen size={20} />
                Cheat Sheets
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium hover:bg-slate-50 text-slate-500">
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
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          {activeTab === 'Academy' ? (
            <>
              <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h2 className="text-3xl font-display font-extrabold text-slate-900">Pattern Discovery</h2>
                  <p className="text-slate-500 font-medium">Master {CHART_PATTERNS.length} high-accuracy price formations</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative w-full sm:w-64 md:w-80 h-14 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search pattern..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-full pl-12 pr-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400 shadow-sm"
                    />
                  </div>
                  
                  <button className="h-14 px-6 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
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
                  <div className="p-6 bg-slate-100 rounded-full mb-4">
                    <Search size={40} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">No patterns found</h3>
                  <p className="text-slate-500">Try adjusting your search or filters.</p>
                </motion.div>
              )}
            </>
          ) : (
            <div className="space-y-6">
               <header className="space-y-1">
                  <h2 className="text-3xl font-display font-extrabold text-slate-900">Live Market Analysis</h2>
                  <p className="text-slate-500 font-medium">Real-time XAU/USD data with advanced technical tools</p>
                </header>
                <CandlestickChart />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Trend Strength</h4>
                      <p className="text-2xl font-display font-bold text-emerald-600">Strong Bullish</p>
                   </div>
                   <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Volatility Index</h4>
                      <p className="text-2xl font-display font-bold text-slate-900">Moderate High</p>
                   </div>
                   <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Signals (24h)</h4>
                      <p className="text-2xl font-display font-bold text-indigo-600">4 Active</p>
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
