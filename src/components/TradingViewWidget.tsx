import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    
    // Clear previous if any (though memo should handle it)
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": "OANDA:XAUUSD",
      "interval": "15",
      "timezone": "Etc/UTC",
      "theme": darkMode ? "dark" : "light",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [darkMode]);

  return (
    <div className="tradingview-widget-container h-full w-full rounded-2xl overflow-hidden" ref={container}>
      <div className="tradingview-widget-container__widget h-full w-full"></div>
    </div>
  );
};

export default memo(TradingViewWidget);
