import React from 'react';
import { motion } from 'motion/react';
import { ChartPattern } from '../constants';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { PatternIllustration } from './PatternIllustration';

interface PatternCardProps {
  pattern: ChartPattern;
  onClick: (pattern: ChartPattern) => void;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, onClick }) => {
  const getColorClass = (type: string) => {
    switch (type) {
      case 'Reversal': return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400';
      case 'Continuation': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400';
      case 'Candlestick': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400';
      default: return 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'Reversal': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300';
      case 'Continuation': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300';
      case 'Candlestick': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(pattern)}
      className="glass-card p-5 rounded-3xl cursor-pointer group relative overflow-hidden dark:bg-slate-900/50 dark:border-slate-800"
    >
      <PatternIllustration id={pattern.id} type={pattern.type} />

      <div className="flex justify-between items-start mb-3">
        <div className={`p-2 rounded-xl ${getColorClass(pattern.type)} dark:bg-slate-800/50`}>
          <pattern.icon size={20} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getBadgeClass(pattern.type)}`}>
          {pattern.type}
        </span>
      </div>

      <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
        {pattern.name}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
        {pattern.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <Target size={14} className="text-slate-400" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Accuracy:</span>
          <span className={`text-xs font-bold ${
            pattern.winningRatio > 75 ? 'text-emerald-600' : 'text-amber-600'
          }`}>
            {pattern.winningRatio}%
          </span>
        </div>
        
        <div className="flex items-center gap-1 text-xs font-medium text-indigo-500 group-hover:gap-2 transition-all">
          Explore Detail <TrendingUp size={14} />
        </div>
      </div>
    </motion.div>
  );
};
