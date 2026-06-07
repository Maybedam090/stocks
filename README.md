# 📈 Stock Market Trader Game

A fully-featured, GTA V-inspired stock trading simulation game built with vanilla HTML, CSS, and JavaScript.

## 🎮 Features

### Core Gameplay
- **200+ Real Companies** - Trade across diverse industries (Tech, Finance, Healthcare, Retail, etc.)
- **Dynamic Market** - Stock prices fluctuate realistically based on volatility
- **$5,000 Starting Capital** - Build your empire from scratch
- **Infinite Gameplay** - Trade forever, no win condition!
- **Market Events** - 20% chance daily of breaking news affecting stock sectors

### Advanced Features
- **Dividend System** - Earn passive income from holdings
- **Loan System** - Borrow up to $5,000 with 15% daily interest
- **Technical Analysis** - Click any stock to see:
  - 20+ day price charts with candlestick-style analysis
  - Buy/Sell recommendations
  - Trend analysis (Uptrend, Downtrend, Sideways)
  - Price position indicators
  - Momentum analysis
- **Portfolio Management** - Track holdings with real-time profit/loss
- **Transaction Log** - View all trades and market events
- **Search & Filter** - Find stocks by name, ticker, or sector

### UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Fixed Navigation** - Always accessible stats and controls
- **Quick Actions** - One-click Sell All, Get Loan, Repay options
- **Market Stats** - See top performers, dividends earned, holdings count
- **Mobile Toggle Sidebar** - Hamburger menu on small screens
- **Professional GTA-Inspired Theme** - Dark mode with neon accents

## 🚀 How to Play

### Getting Started
1. Open `stocks.html` in any web browser
2. You start with $5,000 cash
3. Look at the stock grid to find opportunities

### Buying Stocks
1. **Method 1:** Select stock from dropdown, enter quantity, click BUY
2. **Method 2:** Click any stock card to open detailed analysis
3. **Method 3:** Use Quick Buy in the modal

### Making Money
- **Buy Low** - Purchase stocks near their 30-day low
- **Sell High** - Sell when prices spike
- **Earn Dividends** - Hold stocks to receive daily dividend payouts
- **Monitor Trends** - Use technical analysis to predict price movements

### Advancing
- Click NEXT DAY to advance time and trigger price changes
- Market events happen 20% of days
- Use loans strategically to buy more during opportunities
- Diversify across sectors for stability

## 📊 Technical Analysis Explained

When you click a stock, you'll see:

| Indicator | Meaning | Action |
|-----------|---------|--------|
| **UPTREND** | Prices rising | Consider holding or buying |
| **DOWNTREND** | Prices falling | Consider selling or waiting |
| **SIDEWAYS** | Prices stable | Hold or wait for signal |
| **NEAR LOW** | Price at bottom of range | Good buy opportunity |
| **NEAR HIGH** | Price at top of range | Consider selling |
| **BULLISH** | Strong momentum up | Buy signal |
| **BEARISH** | Strong momentum down | Sell signal |
| **NEUTRAL** | No clear momentum | Wait for clearer signal |

## 🎯 Strategies

### Conservative (Beginners)
- Pick 3-5 solid dividend-paying stocks
- Hold for steady income
- Avoid high-volatility tech stocks
- Reinvest dividends

### Aggressive (Intermediate)
- Look for stocks "NEAR LOW" with "BULLISH" momentum
- Sell when "NEAR HIGH"
- Use loans to amplify returns
- Trade frequently based on events

### Mixed Balanced (Advanced)
- 70% stable dividend stocks
- 20% growth tech stocks
- 10% high-risk, high-reward plays
- Adjust based on market events

## 📱 Device Features

### Desktop
- Full-featured interface
- All panels visible simultaneously
- Keyboard/mouse optimized
- Professional trading layout

### Mobile
- Collapsible sidebar
- Compact buttons and cards
- Touch-friendly
- Landscape recommended for charts
- One-handed trading possible

### Tablet
- Responsive grid layout
- Balanced panel sizing
- Touch and stylus support
- Optimal for longer sessions

## 🛠️ Customization

Want to modify the game? Edit these sections:

- **Initial Cash:** In `stocks.js`, find `this.cash = 5000` and change value
- **Loan Interest:** Find `this.loanInterestRate = 0.15` (15% per day)
- **Max Loan:** In `borrowMoney()` function, change `5000` to new limit
- **Daily Event Chance:** Find `Math.random() < 0.2` (0.2 = 20% chance)
- **Colors:** Edit CSS variables in `stocks.css`

## 🌐 Deploy for Free

See `PUBLISHING_GUIDE.md` for complete instructions to publish online.

Quick options:
- **Netlify:** Drag & drop, live in 1 minute
- **GitHub Pages:** Free with version control
- **Vercel:** Lightning fast deployment
- **Firebase:** Google-powered hosting

## 🐛 Troubleshooting

**Chart not showing?**
- Try landscape orientation on mobile
- Zoom out in browser (Ctrl/Cmd + -)

**Prices not changing?**
- Click NEXT DAY to advance time
- Market updates each day

**Loan too expensive?**
- Repay early to reduce interest
- Use only when you have a clear profit plan

**Can't buy stock?**
- Insufficient funds - check Cash Available
- Loan amount to get more capital

## 📝 Tips & Tricks

1. **Monitor Events** - Check recent activity log before trading
2. **Diversify** - Don't put all money in one stock
3. **Reinvest Dividends** - Let them compound over time
4. **Use Loan Wisely** - Only borrow when you see opportunity
5. **Watch Trends** - Use 20+ day history to spot patterns
6. **Follow Recommendations** - Green "BUY" badges are usually good signals
7. **Paper Trade First** - Plan trades before committing capital
8. **Set Goals** - Aim for specific milestones ($10k, $50k, $100k+)

## 🎓 Learn More

- **Trading Basics:** Investopedia - Stock Trading Guide
- **Technical Analysis:** TradingView Education
- **Market Events:** Financial news sites (CNBC, Bloomberg, Reuters)

## 🎨 Customization Ideas

- Add custom color themes
- Create difficulty levels (Hard market = more volatility)
- Add achievements/badges for milestones
- Implement leaderboards
- Add sound effects
- Create tutorial/guide system
- Add news feed with real-world integration

## 📄 License

This game is open-source and free to use, modify, and distribute.

## 🙏 Credits

Built with:
- Vanilla HTML5
- Pure CSS3
- No external dependencies
- Inspired by GTA V's stock market mechanics

---

**Enjoy trading! May your portfolio grow! 📈💰**
