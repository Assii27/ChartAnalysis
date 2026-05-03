import React from 'react';
import { motion } from 'motion/react';

interface PatternIllustrationProps {
  id: number;
  type: 'Reversal' | 'Continuation' | 'Candlestick';
}

export const PatternIllustration: React.FC<PatternIllustrationProps> = ({ id, type }) => {
  const Candle = ({ x, o, h, l, c, index }: { x: number, o: number, h: number, l: number, c: number, index: number }) => {
    const isBull = c < o; // In SVG Y is down, so lower Y is higher price
    const color = isBull ? "#10b981" : "#ef4444";
    return (
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <line x1={x} y1={h} x2={x} y2={l} stroke={color} strokeWidth="1" />
        <rect x={x - 2} y={Math.min(o, c)} width="4" height={Math.abs(o - c) || 1} fill={color} />
      </motion.g>
    );
  };

  const getPath = (id: number) => {
    switch(id) {
      case 101: // Hammer
        return (
          <>
            <Candle x={20} o={30} h={25} l={40} c={35} index={0} />
            <Candle x={30} o={40} h={35} l={50} c={45} index={1} />
            <Candle x={40} o={50} h={45} l={60} c={55} index={2} />
            <Candle x={50} o={60} h={58} l={85} c={62} index={3} /> {/* Hammer Candle */}
            <Candle x={60} o={55} h={40} l={60} c={45} index={4} />
          </>
        );
      case 102: // Shooting Star
        return (
          <>
            <Candle x={20} o={70} h={65} l={80} c={65} index={0} />
            <Candle x={30} o={60} h={55} l={70} c={55} index={1} />
            <Candle x={40} o={50} h={45} l={60} c={45} index={2} />
            <Candle x={50} o={40} h={15} l={42} c={38} index={3} /> {/* Shooting Star */}
            <Candle x={60} o={45} h={45} l={65} c={55} index={4} />
          </>
        );
      case 103: // Bullish Engulfing
        return (
          <>
            <Candle x={35} o={50} h={45} l={65} c={60} index={1} />
            <Candle x={45} o={65} h={35} l={70} c={40} index={2} /> {/* Engulfing candle */}
          </>
        );
      case 104: // Bearish Engulfing
        return (
          <>
            <Candle x={35} o={50} h={45} l={65} c={40} index={1} />
            <Candle x={45} o={35} h={30} l={75} c={70} index={2} /> {/* Engulfing candle */}
          </>
        );
      case 105: // Doji
        return (
          <>
            <Candle x={30} o={50} h={45} l={55} c={48} index={0} />
            <Candle x={40} o={51} h={50} l={52} c={51} index={1} />
            <Candle x={50} o={50} h={30} l={70} c={50} index={2} /> {/* Doji */}
            <Candle x={60} o={52} h={51} l={53} c={52} index={3} />
          </>
        );
      case 9: // Ascending Triangle
        return (
          <>
            <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="opacity-30" />
            <line x1="20" y1="70" x2="80" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="opacity-30" />
            <Candle x={20} o={70} h={65} l={80} c={65} index={0} />
            <Candle x={30} o={35} h={30} l={45} c={40} index={1} />
            <Candle x={40} o={55} h={50} l={65} c={60} index={2} />
            <Candle x={50} o={35} h={30} l={40} c={35} index={3} />
            <Candle x={60} o={45} h={40} l={50} c={42} index={4} />
            <Candle x={70} o={32} h={28} l={35} c={30} index={5} />
            <Candle x={80} o={25} h={15} l={30} c={18} index={6} />
          </>
        );
      case 14: // Double Bottom
        return (
          <>
            <line x1="10" y1="70" x2="90" y2="70" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <motion.path 
              d="M 10 20 L 30 70 L 50 40 L 70 70 L 90 20" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            />
          </>
        );
      case 15: // Double Top
        return (
          <>
            <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <motion.path 
              d="M 10 80 L 30 30 L 50 60 L 70 30 L 90 80" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            />
          </>
        );
      case 25: // Head and Shoulders
        return (
          <>
            <line x1="10" y1="65" x2="90" y2="65" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <motion.path 
              d="M 10 65 L 25 45 L 35 65 L 50 25 L 65 65 L 75 45 L 90 65" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            />
          </>
        );
      case 13: // Bull Flag
        return (
          <>
            <motion.path 
              d="M 20 80 L 40 20 L 55 40 L 70 20 L 85 40 L 95 30" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            />
            <path d="M 35 15 L 90 45" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="opacity-40" />
            <path d="M 50 45 L 95 65" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="opacity-40" />
          </>
        );
      case 22: // Cup and Handle
        return (
          <>
            <motion.path 
              d="M 10 30 C 10 80, 70 80, 70 30 M 70 30 C 70 50, 90 50, 90 30 L 95 20" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            />
          </>
        );
      case 20: // Diamond Pattern
        return (
          <>
            <motion.path 
              d="M 50 20 L 80 50 L 50 80 L 20 50 Z" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            />
            <motion.path 
              d="M 10 60 L 30 40 L 50 70 L 70 30 L 90 50 L 95 40" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            />
          </>
        );
      case 10: // Symmetrical Triangle
        return (
          <>
            <line x1="20" y1="20" x2="80" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <line x1="20" y1="80" x2="80" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <motion.path 
              d="M 10 20 L 25 75 L 40 30 L 55 65 L 70 40 L 85 55 L 95 50" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            />
          </>
        );
      case 2: // Bullish Rectangle
        return (
          <>
            <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <motion.path 
              d="M 10 80 L 20 30 L 35 70 L 50 30 L 65 70 L 80 30 L 95 20" 
              fill="none" stroke="currentColor" strokeWidth="3" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            />
          </>
        );
      default:
        // Generic representation based on type
        return (
          <motion.path 
            d={type === 'Reversal' ? "M 10 80 L 30 20 L 50 60 L 70 10 L 90 90" : "M 10 90 L 30 40 L 50 50 L 70 20 L 90 10"} 
            fill="none" stroke="currentColor" strokeWidth="3" 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
          />
        );
    }
  };

  return (
    <div className={`w-full aspect-video rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 mb-4 bg-slate-50 relative animate-pulse-subtle ${
       type === 'Reversal' ? 'text-indigo-400' : type === 'Continuation' ? 'text-emerald-400' : 'text-amber-400'
    }`}>
      <svg viewBox="0 0 100 100" className="w-full h-full p-4 drop-shadow-sm">
        {getPath(id)}
      </svg>
      <div className="absolute bottom-2 right-2 flex gap-1">
        <div className={`w-1 h-1 rounded-full ${type === 'Reversal' ? 'bg-indigo-300' : type === 'Continuation' ? 'bg-emerald-300' : 'bg-amber-300'}`} />
        <div className={`w-1 h-1 rounded-full ${type === 'Reversal' ? 'bg-indigo-300' : type === 'Continuation' ? 'bg-emerald-300' : 'bg-amber-300'}`} />
        <div className={`w-1 h-1 rounded-full ${type === 'Reversal' ? 'bg-indigo-300' : type === 'Continuation' ? 'bg-emerald-300' : 'bg-amber-300'}`} />
      </div>
    </div>
  );
};
