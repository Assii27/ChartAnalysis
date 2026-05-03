import React from 'react';
import { motion } from 'motion/react';

interface PatternIllustrationProps {
  id: number;
  type: 'Reversal' | 'Continuation' | 'Candlestick';
}

interface CandleProps {
  key?: React.Key;
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
  index: number;
  width?: number;
}

const Candle = ({ x, o, h, l, c, index, width = 4 }: CandleProps) => {
  const isBull = c <= o; // In SVG Y is down, so lower Y is higher price (bullish)
  const color = isBull ? "#10b981" : "#ef4444";
  return (
    <motion.g
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <line x1={x} y1={h} x2={x} y2={l} stroke={color} strokeWidth="1" strokeLinecap="round" />
      <rect x={x - width/2} y={Math.min(o, c)} width={width} height={Math.max(Math.abs(o - c), 1)} fill={color} rx="1" />
    </motion.g>
  );
};

export const PatternIllustration: React.FC<PatternIllustrationProps> = ({ id, type }) => {

  const ChartBackground = () => {
    // Generate grid lines
    const gridLines = [];
    for (let i = 1; i < 10; i++) {
        gridLines.push(<line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="currentColor" strokeWidth="0.1" className="opacity-5" />);
        gridLines.push(<line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="currentColor" strokeWidth="0.1" className="opacity-5" />);
    }

    // Generate some semi-random but vaguely trending candles
    const candles = [];
    let lastC = 50;
    for (let i = 0; i < 20; i++) {
      const x = 5 + (i * 4.7);
      const o = lastC;
      const change = (Math.random() - 0.5) * 20;
      const c = Math.max(10, Math.min(90, o + change));
      const h = Math.max(0, Math.min(o, c) - Math.random() * 5);
      const l = Math.min(100, Math.max(o, c) + Math.random() * 5);
      candles.push(<Candle key={i} x={x} o={o} h={h} l={l} c={c} index={i} width={3} />);
      lastC = c;
    }
    return (
      <g>
        {gridLines}
        <g className="opacity-10">{candles}</g>
      </g>
    );
  };

  const getPath = (id: number) => {
    switch(id) {
      case 101: // Hammer
        return (
          <>
            <Candle x={20} o={35} h={30} l={45} c={40} index={0} />
            <Candle x={30} o={45} h={40} l={55} c={50} index={1} />
            <Candle x={40} o={55} h={50} l={65} c={60} index={2} />
            <Candle x={50} o={65} h={63} l={90} c={67} index={3} /> {/* Hammer Candle */}
            <Candle x={60} o={60} h={45} l={65} c={50} index={4} />
          </>
        );
      case 102: // Shooting Star
        return (
          <>
            <Candle x={20} o={65} h={60} l={75} c={60} index={0} />
            <Candle x={30} o={55} h={50} l={65} c={50} index={1} />
            <Candle x={40} o={45} h={40} l={55} c={40} index={2} />
            <Candle x={50} o={35} h={10} l={37} c={33} index={3} /> {/* Shooting Star */}
            <Candle x={60} o={40} h={40} l={60} c={50} index={4} />
          </>
        );
      case 103: // Bullish Engulfing
        return (
          <>
            <Candle x={35} o={55} h={50} l={70} c={65} index={1} />
            <Candle x={45} o={70} h={40} l={75} c={45} index={2} /> {/* Engulfing candle */}
          </>
        );
      case 104: // Bearish Engulfing
        return (
          <>
            <Candle x={35} o={45} h={40} l={60} c={35} index={1} />
            <Candle x={45} o={30} h={25} l={70} c={65} index={2} /> {/* Engulfing candle */}
          </>
        );
      case 105: // Doji
        return (
          <>
            <Candle x={30} o={50} h={45} l={55} c={48} index={0} />
            <Candle x={40} o={51} h={50} l={52} c={51} index={1} />
            <Candle x={50} o={50} h={25} l={75} c={50} index={2} /> {/* Doji */}
            <Candle x={60} o={52} h={51} l={53} c={52} index={3} />
          </>
        );
      case 9: // Ascending Triangle
        return (
          <>
            <line x1="15" y1="30" x2="85" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="opacity-30" />
            <line x1="15" y1="75" x2="85" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="opacity-30" />
            <Candle x={15} o={75} h={70} l={85} c={80} index={0} />
            <Candle x={25} o={45} h={40} l={55} c={50} index={1} />
            <Candle x={35} o={65} h={60} l={75} c={70} index={2} />
            <Candle x={45} o={45} h={40} l={55} c={50} index={3} />
            <Candle x={55} o={55} h={50} l={65} c={60} index={4} />
            <Candle x={65} o={42} h={38} l={50} c={45} index={5} />
            <Candle x={75} o={35} h={30} l={45} c={40} index={6} />
            <Candle x={85} o={30} h={15} l={35} c={20} index={7} />
          </>
        );
      case 2: // Bullish Rectangle
        return (
          <>
            <rect x="15" y="30" width="70" height="40" fill="currentColor" className="opacity-5" />
            <line x1="10" y1="30" x2="90" y2="30" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
            <line x1="10" y1="70" x2="90" y2="70" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
            <Candle x={15} o={80} h={75} l={85} c={75} index={0} />
            <Candle x={25} o={35} h={30} l={45} c={45} index={1} />
            <Candle x={35} o={65} h={60} l={75} c={70} index={2} />
            <Candle x={45} o={35} h={30} l={45} c={45} index={3} />
            <Candle x={55} o={65} h={60} l={75} c={70} index={4} />
            <Candle x={65} o={35} h={30} l={45} c={45} index={5} />
            <Candle x={75} o={65} h={60} l={75} c={70} index={6} />
            <Candle x={85} o={40} h={15} l={45} c={25} index={7} />
          </>
        );
      case 7: // Descending Channel
        return (
          <>
            <line x1="10" y1="20" x2="80" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
            <line x1="20" y1="50" x2="90" y2="90" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
            <Candle x={15} o={20} h={15} l={30} c={25} index={0} />
            <Candle x={25} o={50} h={45} l={60} c={55} index={1} />
            <Candle x={35} o={35} h={30} l={45} c={40} index={2} />
            <Candle x={45} o={65} h={60} l={75} c={70} index={3} />
            <Candle x={55} o={50} h={45} l={60} c={55} index={4} />
            <Candle x={65} o={80} h={75} l={90} c={85} index={5} />
            <Candle x={75} o={65} h={60} l={75} c={70} index={6} />
            <Candle x={85} o={90} h={85} l={100} c={95} index={7} />
          </>
        );
      case 18: // Descending Triangle
        return (
          <>
            <line x1="20" y1="75" x2="85" y2="75" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
            <line x1="20" y1="25" x2="85" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
            <Candle x={20} o={25} h={20} l={35} c={30} index={0} />
            <Candle x={30} o={75} h={70} l={85} c={80} index={1} />
            <Candle x={40} o={40} h={35} l={50} c={45} index={2} />
            <Candle x={50} o={75} h={70} l={85} c={80} index={3} />
            <Candle x={60} o={55} h={50} l={65} c={60} index={4} />
            <Candle x={70} o={75} h={70} l={85} c={80} index={5} />
            <Candle x={80} o={70} h={65} l={95} c={85} index={6} />
          </>
        );
      case 38: // Horizontal Channel
        return (
          <>
            <line x1="10" y1="35" x2="90" y2="35" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
            <line x1="10" y1="65" x2="90" y2="65" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
            <Candle x={15} o={50} h={45} l={55} c={45} index={0} />
            <Candle x={25} o={40} h={35} l={45} c={35} index={1} />
            <Candle x={35} o={60} h={55} l={70} c={65} index={2} />
            <Candle x={45} o={40} h={35} l={45} c={35} index={3} />
            <Candle x={55} o={60} h={55} l={70} c={65} index={4} />
            <Candle x={65} o={40} h={35} l={45} c={35} index={5} />
            <Candle x={75} o={60} h={55} l={70} c={65} index={6} />
            <Candle x={85} o={50} h={45} l={55} c={50} index={7} />
          </>
        );
      case 108: // Piercing Line
        return (
          <>
            <Candle x={40} o={30} h={25} l={70} c={65} index={0} />
            <Candle x={50} o={75} h={50} l={85} c={45} index={1} />
          </>
        );
      case 109: // Dark Cloud Cover
        return (
          <>
            <Candle x={40} o={70} h={65} l={25} c={30} index={0} />
            <Candle x={50} o={20} h={20} l={55} c={55} index={1} />
          </>
        );
      case 110: // Harami
        return (
          <>
            <Candle x={40} o={30} h={20} l={80} c={70} index={0} />
            <Candle x={50} o={55} h={45} l={58} c={45} index={1} />
          </>
        );
      case 14: // Double Bottom
        return (
          <>
            <line x1="10" y1="75" x2="90" y2="75" stroke="#10b981" strokeWidth="2" strokeDasharray="4" className="opacity-50" />
            <Candle x={10} o={30} h={25} l={40} c={35} index={0} />
            <Candle x={20} o={55} h={50} l={80} c={75} index={1} />
            <Candle x={30} o={75} h={70} l={85} c={70} index={2} />
            <Candle x={40} o={50} h={40} l={60} c={45} index={3} />
            <Candle x={50} o={40} h={35} l={45} c={45} index={4} />
            <Candle x={60} o={65} h={60} l={80} c={75} index={5} />
            <Candle x={70} o={75} h={70} l={85} c={70} index={6} />
            <Candle x={80} o={40} h={30} l={50} c={20} index={7} />
          </>
        );
      case 15: // Double Top
        return (
          <>
            <line x1="10" y1="25" x2="90" y2="25" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" className="opacity-50" />
            <Candle x={10} o={70} h={65} l={80} c={65} index={0} />
            <Candle x={20} o={45} h={20} l={50} c={25} index={1} />
            <Candle x={30} o={25} h={15} l={30} c={30} index={2} />
            <Candle x={40} o={50} h={45} l={60} c={55} index={3} />
            <Candle x={50} o={60} h={55} l={65} c={55} index={4} />
            <Candle x={60} o={35} h={20} l={40} c={25} index={5} />
            <Candle x={70} o={25} h={15} l={30} c={30} index={6} />
            <Candle x={80} o={60} h={55} l={90} c={80} index={7} />
          </>
        );
      case 25: // Head and Shoulders
        return (
          <>
            <line x1="10" y1="65" x2="90" y2="65" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <Candle x={15} o={70} h={65} l={75} c={65} index={0} />
            <Candle x={25} o={50} h={40} l={60} c={45} index={1} />
            <Candle x={35} o={65} h={60} l={70} c={65} index={2} />
            <Candle x={45} o={35} h={20} l={45} c={25} index={3} />
            <Candle x={55} o={65} h={60} l={70} c={65} index={4} />
            <Candle x={65} o={50} h={40} l={60} c={45} index={5} />
            <Candle x={75} o={65} h={60} l={75} c={70} index={6} />
          </>
        );
      case 13: // Bull Flag
        return (
          <>
            <motion.path d="M 15 85 L 25 15" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <Candle x={10} o={85} h={80} l={90} c={80} index={0} />
            <Candle x={15} o={80} h={75} l={85} c={65} index={1} />
            <Candle x={20} o={65} h={60} l={70} c={45} index={2} />
            <Candle x={25} o={45} h={40} l={50} c={25} index={3} />
            <Candle x={30} o={25} h={20} l={30} c={15} index={4} />
            {/* The flag */}
            <line x1="30" y1="15" x2="70" y2="35" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
            <line x1="30" y1="35" x2="70" y2="55" stroke="#10b981" strokeWidth="1" strokeDasharray="2" />
            <Candle x={35} o={20} h={15} l={25} c={25} index={5} />
            <Candle x={45} o={30} h={25} l={35} c={35} index={6} />
            <Candle x={55} o={40} h={35} l={45} c={45} index={7} />
            <Candle x={65} o={50} h={45} l={55} c={55} index={8} />
            <Candle x={75} o={40} h={20} l={45} c={25} index={9} />
          </>
        );
      case 10: // Symmetrical Triangle
        return (
          <>
            <line x1="15" y1="20" x2="85" y2="50" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
            <line x1="15" y1="80" x2="85" y2="50" stroke="#10b981" strokeWidth="1" strokeDasharray="2" />
            <Candle x={15} o={25} h={20} l={30} c={35} index={0} />
            <Candle x={25} o={75} h={70} l={80} c={65} index={1} />
            <Candle x={35} o={40} h={35} l={45} c={50} index={2} />
            <Candle x={45} o={65} h={60} l={70} c={60} index={3} />
            <Candle x={55} o={50} h={45} l={55} c={55} index={4} />
            <Candle x={65} o={45} h={40} l={50} c={48} index={5} />
            <Candle x={75} o={49} h={47} l={52} c={50} index={6} />
            <Candle x={85} o={50} h={30} l={55} c={35} index={7} />
          </>
        );
      case 20: // Diamond
        return (
          <>
            <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3" className="opacity-20" />
            <Candle x={15} o={50} h={45} l={55} c={50} index={0} />
            <Candle x={25} o={40} h={35} l={45} c={45} index={1} />
            <Candle x={35} o={30} h={20} l={40} c={30} index={2} />
            <Candle x={45} o={25} h={20} l={30} c={25} index={3} />
            <Candle x={55} o={35} h={30} l={40} c={35} index={4} />
            <Candle x={65} o={50} h={45} l={55} c={55} index={5} />
            <Candle x={75} o={70} h={65} l={75} c={75} index={6} />
            <Candle x={85} o={50} h={45} l={95} c={90} index={7} />
          </>
        );
      case 22: // Cup and Handle
        return (
          <>
            <path d="M 15 30 Q 50 90 85 30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3" className="opacity-20" />
            {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => {
               const y = 30 + Math.pow((x - 50)/35, 2) * 40;
               return <Candle key={i} x={x} o={y} h={y-5} l={y+5} c={i < 4 ? y+5 : y-5} index={i} />;
            })}
            <Candle x={85} o={35} h={30} l={40} c={40} index={8} />
            <Candle x={92} o={40} h={20} l={45} c={25} index={9} />
          </>
        );
      case 30: // Inverse Head and Shoulders
        return (
          <>
            <line x1="10" y1="35" x2="90" y2="35" stroke="currentColor" strokeWidth="2" strokeDasharray="4" className="opacity-30" />
            <Candle x={15} o={30} h={25} l={35} c={35} index={0} />
            <Candle x={25} o={50} h={45} l={65} c={60} index={1} />
            <Candle x={35} o={35} h={30} l={40} c={35} index={2} />
            <Candle x={45} o={65} h={60} l={85} c={80} index={3} />
            <Candle x={55} o={35} h={30} l={40} c={35} index={4} />
            <Candle x={65} o={50} h={45} l={65} c={60} index={5} />
            <Candle x={75} o={35} h={30} l={40} c={30} index={6} />
          </>
        );
      case 31: // Wolfe Wave
        return (
          <motion.path 
            d="M 10 20 L 30 70 L 50 30 L 70 80 L 90 20" 
            fill="none" stroke="currentColor" strokeWidth="3" 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
          />
        );
      case 32: // Gartley
        return (
          <motion.path 
            d="M 10 70 L 30 20 L 50 50 L 70 20 L 90 70" 
            fill="none" stroke="currentColor" strokeWidth="3" 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
          />
        );
      case 33: // Bat
        return (
          <motion.path 
            d="M 10 80 L 30 20 L 50 60 L 70 20 L 90 80" 
            fill="none" stroke="currentColor" strokeWidth="3" 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
          />
        );
      case 34: // Butterfly
        return (
          <motion.path 
            d="M 10 60 L 40 20 L 60 80 L 90 20" 
            fill="none" stroke="currentColor" strokeWidth="3" 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
          />
        );
      case 35: // Shark
        return (
          <motion.path 
            d="M 10 80 L 30 40 L 50 90 L 70 10 L 90 60" 
            fill="none" stroke="currentColor" strokeWidth="3" 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
          />
        );
      case 106: // Morning Star
        return (
          <>
            <Candle x={30} o={30} h={25} l={70} c={65} index={0} />
            <Candle x={45} o={75} h={70} l={85} c={80} index={1} />
            <Candle x={60} o={65} h={20} l={67} c={25} index={2} />
          </>
        );
      case 107: // Evening Star
        return (
          <>
            <Candle x={30} o={70} h={65} l={25} c={30} index={0} />
            <Candle x={45} o={25} h={15} l={30} c={20} index={1} />
            <Candle x={60} o={35} h={75} l={37} c={70} index={2} />
          </>
        );
      case 111: // Three White Soldiers
        return (
          <>
            <Candle x={30} o={70} h={45} l={75} c={50} index={0} />
            <Candle x={45} o={55} h={30} l={60} c={35} index={1} />
            <Candle x={60} o={40} h={15} l={45} c={20} index={2} />
          </>
        );
      case 112: // Three Black Crows
        return (
          <>
            <Candle x={30} o={30} h={25} l={55} c={50} index={0} />
            <Candle x={45} o={45} h={40} l={70} c={65} index={1} />
            <Candle x={60} o={60} h={55} l={85} c={80} index={2} />
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
    <div className={`w-full aspect-video rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800 mb-4 bg-slate-50 dark:bg-slate-950 relative animate-pulse-subtle ${
       type === 'Reversal' ? 'text-indigo-400' : type === 'Continuation' ? 'text-emerald-400' : 'text-amber-400'
    }`}>
      <svg viewBox="0 0 100 100" className="w-full h-full p-4 drop-shadow-sm">
        <ChartBackground />
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
