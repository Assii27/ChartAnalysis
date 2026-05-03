import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, TrendingDown, Target, ShieldCheck, AlertCircle, Loader2, Zap } from 'lucide-react';
import { getXAUUSDAnalysis, MarketStrategy } from '../services/geminiService';

export const AIStrategyPanel: React.FC = () => {
  const [strategy, setStrategy] = useState<MarketStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [curPrice, setCurPrice] = useState("4614");

  const handleFetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getXAUUSDAnalysis(curPrice);
      setStrategy(data);
    } catch (err) {
      setError("Market volatility too high for instant analysis. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-100 shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 truncate">AI Live Strategy</h3>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">XAU/USD • 2HR</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reference Price</span>
            <input 
              type="text" 
              value={curPrice} 
              onChange={(e) => setCurPrice(e.target.value)}
              placeholder="e.g. 4614"
              className="w-20 bg-transparent border-none p-0 text-xs font-bold text-slate-900 focus:outline-none focus:ring-0"
            />
          </div>
          
          <button 
            onClick={handleFetchAnalysis}
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-tight hover:bg-indigo-600 transition-all disabled:opacity-50 group"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} className="fill-white" /> }
            {loading ? "Analyzing..." : "Update Analysis"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!strategy && !loading && !error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl"
          >
            <div className="max-w-xs mx-auto space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                <Sparkles size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">Click the button above to generate a real-time technical strategy for Gold.</p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600"
          >
            <AlertCircle size={20} />
            <p className="text-sm font-bold">{error}</p>
          </motion.div>
        )}

        {strategy && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                   <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Market Bias</h4>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                     strategy.trend === 'Bullish' ? 'bg-emerald-50 text-emerald-600' : 
                     strategy.trend === 'Bearish' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'
                   }`}>
                     {strategy.trend}
                   </span>
                </div>
                <div className="flex items-end gap-2">
                   <span className="text-4xl font-display font-black text-slate-900">{strategy.strength}%</span>
                   <span className="text-slate-500 font-bold text-sm mb-1">Trend Strength</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${strategy.strength}%` }}
                    className={`h-full ${strategy.trend === 'Bullish' ? 'bg-emerald-500' : strategy.trend === 'Bearish' ? 'bg-red-500' : 'bg-slate-400'}`}
                   />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trade Setup</h4>
                <div className="grid grid-cols-3 gap-4">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Entry</p>
                      <p className="text-sm font-bold text-slate-900">{strategy.entry}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-red-400 uppercase">SL</p>
                      <p className="text-sm font-bold text-slate-900">{strategy.stopLoss}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">TP</p>
                      <p className="text-sm font-bold text-slate-900">{strategy.takeProfit}</p>
                   </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-500">Risk/Reward</span>
                   <span className="text-sm font-black text-indigo-600">{strategy.riskRewardRatio}</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-6">
              <h4 className="text-lg font-display font-bold">Analysis Rationale</h4>
              <ul className="space-y-4">
                {strategy.rationale.map((point, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1">
                      <ShieldCheck size={16} className="text-indigo-200" />
                    </div>
                    <p className="text-sm font-medium text-indigo-50 leading-relaxed">{point}</p>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                <AlertCircle size={12} />
                Trade involves high risk. AI analysis for educational use.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
