import React, { useEffect, useRef } from 'react';

export const CandlestickChart: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          "width": "100%",
          "height": "600",
          "symbol": "TVC:GOLD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f5f9",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tradingview_advanced_chart"
        });
      }
    };
    container.current?.appendChild(script);
  }, []);

  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
      <div id="tradingview_advanced_chart" ref={container} className="w-full h-[600px]" />
    </div>
  );
};

declare global {
  interface Window {
    TradingView: any;
  }
}
