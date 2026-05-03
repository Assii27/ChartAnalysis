import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  ShieldCheck, 
  AlertCircle,
  Square,
  Triangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Repeat,
  Layers,
  LayoutGrid,
  Crown
} from 'lucide-react';

export type PatternType = 'Reversal' | 'Continuation' | 'Candlestick';

export interface ChartPattern {
  id: number;
  name: string;
  type: PatternType;
  description: string;
  winningRatio: number; // Percentage
  details: string;
  icon: any;
}

export const CHART_PATTERNS: ChartPattern[] = [
  {
    id: 1,
    name: "Megaphone Pattern",
    type: "Reversal",
    winningRatio: 68,
    description: "Broadening formation with expanding volatility, resembling a megaphone.",
    details: "Characterized by higher highs and lower lows. Reflects increasing uncertainty and volatility. Can be both continuation and reversal depending on breakout direction.",
    icon: LayoutGrid
  },
  {
    id: 2,
    name: "Bullish Rectangle",
    type: "Continuation",
    winningRatio: 72,
    description: "Sideways consolidation bounded by parallel support and resistance.",
    details: "Signifies a pause in an uptrend. A break above resistance confirms continuation. High probability setup in trending markets.",
    icon: Square
  },
  {
    id: 3,
    name: "Bump and Run",
    type: "Reversal",
    winningRatio: 75,
    description: "Multi-phase reversal starting with a sharp unsustainable price move.",
    details: "Lead-in, Bump, and Run phases. Conceptualized by Thomas Bulkowski. High accuracy reversal signal once trendline is broken.",
    icon: TrendingUp
  },
  {
    id: 4,
    name: "Ascending Broadening Wedge",
    type: "Reversal",
    winningRatio: 65,
    description: "Bearish reversal pattern with diverging upward trendlines.",
    details: "Higher highs and higher lows with expanding range. Indicates exhaustion after an uptrend.",
    icon: TrendingDown
  },
  {
    id: 5,
    name: "Descending Broadening Wedge",
    type: "Reversal",
    winningRatio: 67,
    description: "Bullish reversal pattern with expanding downward waves.",
    details: "Lower lows and lower highs with expanding range. Typically forms at the end of a bearish trend.",
    icon: TrendingUp
  },
  {
    id: 6,
    name: "Ascending Channel",
    type: "Continuation",
    winningRatio: 62,
    description: "Parallel upward-sloping trendlines encapsulating price action.",
    details: "Indicates a consistent bullish trend. Lower line is support, upper is resistance. Trading usually involves buying at support.",
    icon: ArrowUpRight
  },
  {
    id: 7,
    name: "Descending Channel",
    type: "Continuation",
    winningRatio: 60,
    description: "Parallel downward-sloping trendlines showing a bearish trend.",
    details: "Consistent lower highs and lower lows. The bearish trend is intact until an upward breakout occurs.",
    icon: ArrowDownRight
  },
  {
    id: 8,
    name: "Trend Channels",
    type: "Continuation",
    winningRatio: 64,
    description: "Graphical frames defining market direction & volatility.",
    details: "Can be Ascending, Descending, or Horizontal. Used to identify established trends and range boundaries.",
    icon: Layers
  },
  {
    id: 9,
    name: "Ascending Triangle",
    type: "Continuation",
    winningRatio: 74,
    description: "Flat upper resistance and upward-sloping support.",
    details: "Buyers are more aggressive, creating higher lows against a horizontal resistance wall.",
    icon: Triangle
  },
  {
    id: 10,
    name: "Symmetrical Triangle",
    type: "Continuation",
    winningRatio: 63,
    description: "Converging trendlines with lower peaks and higher troughs.",
    details: "Indicates a period of consolidation. Breakout direction determines the next trend.",
    icon: Zap
  },
  {
    id: 11,
    name: "Bearish Flag",
    type: "Continuation",
    winningRatio: 78,
    description: "Brief consolidation after a sharp vertical decline.",
    details: "Resembles a flag on a pole. High probability continuation trade for the short side.",
    icon: TrendingDown
  },
  {
    id: 12,
    name: "Rounding Bottom",
    type: "Reversal",
    winningRatio: 82,
    description: "Slow, steady 'U' shaped recovery from a downtrend.",
    details: "Gradual shift from bearish to bullish sentiment. Also known as a saucer bottom.",
    icon: RefreshCw
  },
  {
    id: 13,
    name: "Bull Flag",
    type: "Continuation",
    winningRatio: 80,
    description: "Brief consolidation after a sharp vertical rise.",
    details: "The most popular continuation pattern. Indicates strong momentum temporarily pausing.",
    icon: TrendingUp
  },
  {
    id: 14,
    name: "Double Bottom",
    type: "Reversal",
    winningRatio: 76,
    description: "Two consecutive troughs at a similar level ('W' shape).",
    details: "Indicates buyers are defending a specific support level. Reversal confirms on neckline break.",
    icon: ShieldCheck
  },
  {
    id: 15,
    name: "Double Top",
    type: "Reversal",
    winningRatio: 76,
    description: "Two consecutive peaks at similar levels ('M' shape).",
    details: "Indicates selling pressure at a resistance level. Reversal confirms on support break.",
    icon: AlertCircle
  },
  {
    id: 16,
    name: "Triple Top",
    type: "Reversal",
    winningRatio: 79,
    description: "Three distinct peaks at the same resistance level.",
    details: "Stronger reversal signal than a double top as it shows failure to break higher three times.",
    icon: LayoutGrid
  },
  {
    id: 17,
    name: "AB=CD Pattern",
    type: "Reversal",
    winningRatio: 71,
    description: "Harmonic pattern with two equal price legs.",
    details: "Calculated using Fibonacci ratios (61.8% and 127.2%). Predicts precise reversal zones.",
    icon: Zap
  },
  {
    id: 18,
    name: "Descending Triangle",
    type: "Continuation",
    winningRatio: 73,
    description: "Flat lower support and downward-sloping resistance.",
    details: "Sellers are more aggressive, creating lower highs against a support wall.",
    icon: Triangle
  },
  {
    id: 19,
    name: "Triple Bottom",
    type: "Reversal",
    winningRatio: 81,
    description: "Three distinct lows at a strong support zone.",
    details: "Indicates deep accumulation and exhaustion of selling pressure.",
    icon: ShieldCheck
  },
  {
    id: 20,
    name: "Diamond Pattern",
    type: "Reversal",
    winningRatio: 84,
    description: "Broadening phase followed by a narrowing range.",
    details: "Complex but reliable pattern. Signifies extreme market indecision before a major move.",
    icon: Zap
  },
  {
    id: 21,
    name: "Wedge Patterns",
    type: "Reversal",
    winningRatio: 66,
    description: "Converging trendlines sloping in the same direction.",
    details: "Rising Wedge (Bearish) or Falling Wedge (Bullish). Sign of diminishing momentum.",
    icon: Triangle
  },
  {
    id: 22,
    name: "Cup and Handle",
    type: "Continuation",
    winningRatio: 85,
    description: "Rounded base followed by a small consolidation.",
    details: "The 'Handle' is the final trap before a massive breakout. Trend continuation signal.",
    icon: RefreshCw
  },
  {
    id: 23,
    name: "Pennant Pattern",
    type: "Continuation",
    winningRatio: 77,
    description: "Small symmetrical triangle after a big move.",
    details: "Like a flag but with converging trendlines. High momentum continuation signal.",
    icon: Triangle
  },
  {
    id: 24,
    name: "Three Drives",
    type: "Reversal",
    winningRatio: 70,
    description: "Three symmetrical impulsive drives in one direction.",
    details: "Rhythmic movement finishing with a drive reaching Fibonacci extensions.",
    icon: Repeat
  },
  {
    id: 25,
    name: "Head and Shoulders",
    type: "Reversal",
    winningRatio: 83,
    description: "Large peak flanked by two smaller shoulders.",
    details: "The most famous reversal pattern. Inverse H&S is its bullish counterpart.",
    icon: AlertCircle
  },
  {
    id: 26,
    name: "Quasimodo (QM)",
    type: "Reversal",
    winningRatio: 86,
    description: "Pattern formed by HH and LL sequence.",
    details: "Advanced structural pattern often occurring at reversal inflection points.",
    icon: LayoutGrid
  },
  {
    id: 27,
    name: "Adam and Eve",
    type: "Reversal",
    winningRatio: 78,
    description: "Combination of V-shaped and U-shaped troughs.",
    details: "Unique reversal pattern with higher success than traditional double bottoms.",
    icon: RefreshCw
  },
  {
    id: 28,
    name: "Dragon Pattern",
    type: "Reversal",
    winningRatio: 72,
    description: "Advanced W or M shaped structural reversal.",
    details: "Mirrors a Chinese dragon. Reliable for detecting major trend shifts.",
    icon: TrendingUp
  },
  {
    id: 29,
    name: "Dead Cat Bounce",
    type: "Continuation",
    winningRatio: 58,
    description: "Temporary recovery in a heavy declining market.",
    details: "A trap for buyers. Prices usually resume downtrend after a brief rise.",
    icon: ArrowDownRight
  },
  {
    id: 30,
    name: "Inverse Head & Shoulders",
    type: "Reversal",
    winningRatio: 84,
    description: "Bullish reversal pattern with three troughs, the middle being lowest.",
    details: "The mirror image of the Head and Shoulders. Highly reliable bullish reversal signal when the neckline is broken.",
    icon: ShieldCheck
  },
  {
    id: 31,
    name: "Wolfe Wave",
    type: "Reversal",
    winningRatio: 78,
    description: "A natural rhythmic pattern of five waves in the market.",
    details: "Found in all timeframes. Predicts an Estimated Arrival Time (ETA) and Estimated Arrival Price (EPA).",
    icon: Zap
  },
  {
    id: 32,
    name: "Gartley Pattern",
    type: "Reversal",
    winningRatio: 72,
    description: "Harmonic pattern using Fibonacci ratios for precise entries.",
    details: "Commonly occurs in gold markets. Validated at the 78.6% retracement of the XA leg.",
    icon: Crown
  },
  {
    id: 33,
    name: "Bat Pattern",
    type: "Reversal",
    winningRatio: 74,
    description: "Harmonic pattern with a deep retracement of the original leg.",
    details: "Validated at the 88.6% Fibonacci retracement. Known for providing tight stop-loss opportunities.",
    icon: Crown
  },
  {
    id: 34,
    name: "Butterfly Pattern",
    type: "Reversal",
    winningRatio: 71,
    description: "Extension pattern where the final leg exceeds the starting point.",
    details: "Occurs at major market turning points. D point is typically at 127% or 161.8% extension of XA.",
    icon: Crown
  },
  {
    id: 35,
    name: "Shark Pattern",
    type: "Reversal",
    winningRatio: 69,
    description: "Powerful harmonic pattern that traps traders on failed breakouts.",
    details: "A leading indicator often followed by a 5-0 pattern. Highly effective in volatile commodities like gold.",
    icon: Zap
  },
  {
    id: 36,
    name: "Broadening Wedge Top",
    type: "Reversal",
    winningRatio: 64,
    description: "Diverging trendlines at market peaks indicating volatility.",
    details: "Forms after a strong uptrend. Suggests market indecision and high probability of a bearish reversal.",
    icon: TrendingDown
  },
  {
    id: 37,
    name: "V-Top Reversal",
    type: "Reversal",
    winningRatio: 60,
    description: "Sharp vertical rise followed immediately by a vertical decline.",
    details: "Common in parabolic moves. Extremely difficult to trade but highly profitable when caught early.",
    icon: TrendingDown
  },
  {
    id: 38,
    name: "Horizontal Channel",
    type: "Continuation",
    winningRatio: 66,
    description: "Consolidation between two parallel horizontal lines.",
    details: "Also known as a trading range. Breakout in either direction signals the next major move.",
    icon: Square
  },
  {
    id: 101,
    name: "Hammer / Pin Bar",
    type: "Candlestick",
    winningRatio: 68,
    description: "Small body at the top with a long lower wick.",
    details: "Bullish reversal signal. Occurs at the bottom of a downtrend, showing that buyers rejected lower prices aggressively.",
    icon: Zap
  },
  {
    id: 102,
    name: "Shooting Star",
    type: "Candlestick",
    winningRatio: 70,
    description: "Small body at the bottom with a long upper wick.",
    details: "Bearish reversal signal. Occurs at the top of an uptrend, indicating that bulls failed to sustain higher levels.",
    icon: Zap
  },
  {
    id: 103,
    name: "Bullish Engulfing",
    type: "Candlestick",
    winningRatio: 74,
    description: "Large green candle that completely 'engulfs' the previous red candle.",
    details: "Strong bullish conviction. The market opens lower but rallies significantly to close above previous highs.",
    icon: Zap
  },
  {
    id: 104,
    name: "Bearish Engulfing",
    type: "Candlestick",
    winningRatio: 73,
    description: "Large red candle that completely 'engulfs' the previous green candle.",
    details: "Strong bearish conviction. The market opens higher but sells off heavily to close below previous lows.",
    icon: Zap
  },
  {
    id: 105,
    name: "Doji Star",
    type: "Candlestick",
    winningRatio: 65,
    description: "Indecision candle where open and close are nearly identical.",
    details: "Signifies a balance between buyers and sellers. Often precedes a major trend reversal or exhaustion.",
    icon: Zap
  },
  {
    id: 106,
    name: "Morning Star",
    type: "Candlestick",
    winningRatio: 78,
    description: "Three-candle bullish reversal pattern.",
    details: "Large red candle, small body indifferent candle, and large green candle. Signals the dawn of a new uptrend.",
    icon: Zap
  },
  {
    id: 107,
    name: "Evening Star",
    type: "Candlestick",
    winningRatio: 79,
    description: "Three-candle bearish reversal pattern.",
    details: "Large green candle, small body indifferent candle, and large red candle. Signifies the end of an uptrend.",
    icon: Zap
  },
  {
    id: 108,
    name: "Piercing Line",
    type: "Candlestick",
    winningRatio: 72,
    description: "Bullish reversal pattern after a downtrend.",
    details: "Second candle opens below the first but closes above its midpoint. Indicates strong rejection of lows.",
    icon: Zap
  },
  {
    id: 109,
    name: "Dark Cloud Cover",
    type: "Candlestick",
    winningRatio: 71,
    description: "Bearish reversal pattern after an uptrend.",
    details: "Second candle opens above the first but closes below its midpoint. Signifies momentum shift to sellers.",
    icon: Zap
  },
  {
    id: 110,
    name: "Harami Cross (Bullish)",
    type: "Candlestick",
    winningRatio: 75,
    description: "Smaller candle inside the previous candle's body.",
    details: "Indicates market exhaustion. The second candle is a Doji, making it a highly reliable turning point.",
    icon: Zap
  },
  {
    id: 111,
    name: "Three White Soldiers",
    type: "Candlestick",
    winningRatio: 82,
    description: "Three consecutive long green candles with short wicks.",
    details: "Strong bullish reversal. Each candle opens within the previous body and closes at a new high.",
    icon: Zap
  },
  {
    id: 112,
    name: "Three Black Crows",
    type: "Candlestick",
    winningRatio: 81,
    description: "Three consecutive long red candles with short wicks.",
    details: "Strong bearish reversal. Indicates massive selling pressure and end of the bullish sentiment.",
    icon: Zap
  }
];
