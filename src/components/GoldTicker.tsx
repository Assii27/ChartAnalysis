import React, { useEffect, useRef } from 'react';

export const GoldTicker: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": "TVC:GOLD",
        "width": "100%",
        "colorTheme": darkMode ? "dark" : "light",
        "isTransparent": true,
        "locale": "en",
        "largeChartUrl": ""
      });
      container.current.appendChild(script);
    }
  }, [darkMode]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};
