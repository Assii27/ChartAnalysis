import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Scale, Info, PieChart, Activity, Target } from 'lucide-react';
import { ChartPattern } from '../constants';

import { PatternIllustration } from './PatternIllustration';

interface PatternModalProps {
  pattern: ChartPattern | null;
  onClose: () => void;
}

export const PatternModal: React.FC<PatternModalProps> = ({ pattern, onClose }) => {
  if (!pattern) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${
                pattern.type === 'Reversal' ? 'bg-indigo-100 text-indigo-600' : 
                pattern.type === 'Continuation' ? 'bg-emerald-100 text-emerald-600' : 
                'bg-amber-100 text-amber-600'
              }`}>
                <pattern.icon size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">{pattern.name}</h2>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{pattern.type} Pattern</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto space-y-8">
            <section className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                <Activity size={20} className="text-indigo-500" />
                <h3>Pattern Dynamics</h3>
              </div>
              <div className="h-64 bg-white rounded-2xl border border-slate-100 p-8 shadow-inner overflow-hidden flex items-center justify-center">
                 <PatternIllustration id={pattern.id} type={pattern.type} />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                <Info size={20} className="text-indigo-500" />
                <h3>Overview</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                {pattern.details}
              </p>
            </section>

            {/* Perfect Indicator Stat Card */}
            <section className="bg-slate-900 p-6 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity size={120} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 bg-emerald-500 rounded-lg">
                    <PieChart size={16} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold tracking-wide">Winning Probability</h3>
                </div>

                <div className="flex items-end gap-4 mb-4">
                  <span className="text-6xl font-display font-bold text-emerald-400">
                    {pattern.winningRatio}%
                  </span>
                  <div className="pb-2">
                    <p className="text-emerald-400/60 text-sm font-medium">Confidence Score</p>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div 
                          key={s} 
                          className={`h-1 w-4 rounded-full ${s <= (pattern.winningRatio / 20) ? 'bg-emerald-400' : 'bg-slate-700'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Accuracy Bar Animation */}
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pattern.winningRatio}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                  />
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/30">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Scale size={16} className="text-indigo-500" />
                  Key Confluences
                </h4>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    Relative Strength Index (RSI) confirmation
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    Volume spike on breakout points
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    Multi-timeframe structural alignment
                  </li>
                </ul>
              </div>
              <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/30">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Target size={16} className="text-indigo-500" />
                  Strategy Tip
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Always wait for a candle body close outside the pattern boundaries. False breakouts are common; look for 'the retest' of the break level for a higher probability entry.
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-indigo-200">
              Learn More at TradingView Mastery <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
