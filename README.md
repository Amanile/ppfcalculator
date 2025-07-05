# PPF Calculator

A comprehensive Public Provident Fund (PPF) calculator built with Python Flask, HTML, CSS, and JavaScript.

## Features

- 📊 **Real-time Calculations** - Instant results as you type
- 📈 **Interactive Charts** - Visual representation of your investment growth
- 📋 **Year-wise Breakdown** - Detailed annual investment breakdown
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎯 **Default Values** - Pre-filled with realistic PPF values
- 💡 **Educational Content** - Learn about PPF benefits and features

## Default Values

- **Annual Investment**: ₹1,50,000 (maximum allowed)
- **Investment Period**: 15 years (minimum required)
- **Interest Rate**: 7.1% p.a. (current PPF rate)

## Installation

1. **Clone or download** this repository
2. **Install Python** (3.7 or higher)
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Start the application**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

3. **Use the calculator**:
   - Adjust the annual investment amount (₹500 - ₹1,50,000)
   - Set the investment period (minimum 15 years)
   - Modify the interest rate if needed
   - View real-time calculations and charts

## PPF Information

### Key Benefits
- **Triple Tax Benefit**: Deduction under Section 80C, tax-free interest, tax-free maturity
- **Guaranteed Returns**: Government-backed with attractive interest rates
- **Long-term Wealth Creation**: Compound interest over 15+ years

### Important Rules
- **Minimum Investment**: ₹500 per year
- **Maximum Investment**: ₹1,50,000 per year
- **Lock-in Period**: 15 years (extendable in 5-year blocks)
- **Partial Withdrawal**: Allowed after 7 years for specific purposes

## Technical Details

### Backend
- **Framework**: Flask (Python)
- **Routes**: 
  - `/` - Home page (redirects to calculator)
  - `/ppf-calculator/` - Main calculator page
  - `/calculate` - API endpoint for calculations

### Frontend
- **HTML5** with responsive design
- **CSS3** with modern styling and animations
- **JavaScript** for real-time calculations and chart rendering
- **Chart.js** for interactive visualizations

### File Structure
```
ppfcalculator/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   ├── index.html        # Home page
│   └── ppf_calculator.html # Calculator page
└── static/
    ├── css/
    │   └── style.css     # Styling
    └── js/
        └── script.js     # JavaScript functionality
```

## Deployment

### Local Development
```bash
pip install -r requirements.txt
python app.py
```

### Vercel Deployment
This application is configured for easy deployment to Vercel:

1. **Push to Git repository**
2. **Import project in Vercel Dashboard**
3. **Deploy automatically**

See `DEPLOYMENT.md` for detailed deployment instructions.

### Live Demo
🌐 **[View Live Demo](https://your-project-name.vercel.app)**

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the design
- Adding more financial calculators

## License

This project is open source and available under the MIT License.

---

**Note**: This calculator is for educational purposes. Please consult with a financial advisor for investment decisions. 