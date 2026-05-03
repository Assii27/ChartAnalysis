# ChartPattern Pro

An interactive cheat sheet for 29 essential chart patterns with animations and technical indicators.

## Features
- **Library**: Interactive catalog of 29 chart patterns and 5 candlestick patterns.
- **Visuals**: Animated SVG patterns showing ideal formations.
- **Live Market**: Real-time XAU/USD (Gold) data via TradingView widgets.
- **Indicators**: Winning probability scores and key confluence metrics.

## Development
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`

## Deployment
### Via AI Studio (Cloud Run)
1. Click the **"Deploy"** button in the top right corner of the AI Studio interface.
2. Follow the prompts to deploy your application to Google Cloud Run.
3. Once deployed, you'll receive a public URL for your application.

### Manual Deployment (Docker)
1. Build the image: `docker build -t chart-pattern-pro .`
2. Run the container: `docker run -p 8080:80 chart-pattern-pro`

## Developer
Developed by **Asif Maner**.
