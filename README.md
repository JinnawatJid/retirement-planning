# Retirement Planning Web Application

A modern, responsive retirement planning calculator built with Next.js, supporting both Thai and English languages.

## Features

### 🌟 Core Features
- **Multi-language Support**: Thai (default) and English
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Toggle between themes
- **Step-by-step Calculator**: Easy-to-use form with progress tracking
- **Visual Results**: Progress bars and detailed calculations
- **Save & Share**: Local save and social media sharing
- **Donation System**: PromptPay integration for Thai users

### 📊 Calculations
- Working period analysis (years/months)
- Retirement period planning
- Total savings calculation
- Required expenses estimation
- Financial gap analysis

### 💰 Monetization
- Non-intrusive advertisement spaces
- Donation system with PromptPay QR codes
- Social sharing for organic growth

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **QR Codes**: react-qr-code
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd retirement-planning
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
retirement-planning/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── LandingPage.tsx      # Landing page
│   ├── RetirementForm.tsx   # Multi-step form
│   ├── ResultsPage.tsx      # Results display
│   ├── ShareModal.tsx       # Social sharing
│   └── DonationModal.tsx    # Donation interface
├── contexts/
│   ├── LanguageContext.tsx  # Language management
│   └── ThemeContext.tsx     # Theme management
└── package.json
```

## Configuration

### PromptPay Setup
To set up PromptPay donations:

1. Open `components/DonationModal.tsx`
2. Replace `promptPayId` with your actual PromptPay phone number or ID:
```typescript
const promptPayId = "0123456789"; // Replace with your PromptPay ID
```

### Language Customization
Add or modify translations in `contexts/LanguageContext.tsx`:

```typescript
const translations = {
  th: {
    'your.key': 'Thai translation',
  },
  en: {
    'your.key': 'English translation',
  },
};
```

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Features in Detail

### Multi-step Form
- **Step 1**: Starting work age
- **Step 2**: Monthly salary
- **Step 3**: Monthly savings
- **Step 4**: Retirement age
- **Step 5**: Monthly retirement expenses
- **Step 6**: Life expectancy

### Results Analysis
- Visual timeline showing work vs retirement periods
- Total savings calculation
- Total expenses estimation
- Financial gap analysis with recommendations
- Save results as JSON file
- Share via social media

### Social Sharing
- Copy shareable link
- Facebook sharing
- Instagram Stories (copy text + link)
- URL parameters for shared results

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you find this tool helpful, consider supporting the developer through the donation feature in the app!

## Roadmap

- [ ] Investment growth calculations
- [ ] Multiple currency support
- [ ] PDF export functionality
- [ ] Advanced analytics
- [ ] User accounts (optional)
- [ ] Comparison tools

---

Built with ❤️ for better financial planning
