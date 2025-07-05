// PPF Calculator JavaScript
let ppfChart = null;

// DOM elements
const form = document.getElementById('ppf-form');
const annualInvestmentInput = document.getElementById('annual-investment');
const yearsInput = document.getElementById('years');
const interestRateInput = document.getElementById('interest-rate');
const totalInvestmentEl = document.getElementById('total-investment');
const totalInterestEl = document.getElementById('total-interest');
const maturityAmountEl = document.getElementById('maturity-amount');
const breakdownTbody = document.getElementById('breakdown-tbody');
const chartCanvas = document.getElementById('ppf-chart');

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Format number with commas
function formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
}

// Calculate PPF returns
function calculatePPF(annualInvestment, years, interestRate) {
    let totalInvestment = annualInvestment * years;
    let balance = 0;
    let yearWiseData = [];
    
    for (let year = 1; year <= years; year++) {
        balance += annualInvestment;
        let interestEarned = balance * (interestRate / 100);
        balance += interestEarned;
        
        yearWiseData.push({
            year: year,
            investment: annualInvestment,
            interest: interestEarned,
            balance: balance
        });
    }
    
    let maturityAmount = balance;
    let totalInterest = maturityAmount - totalInvestment;
    
    return {
        totalInvestment,
        maturityAmount,
        totalInterest,
        yearWiseData
    };
}

// Update results display
function updateResults(results) {
    totalInvestmentEl.textContent = formatCurrency(results.totalInvestment);
    totalInterestEl.textContent = formatCurrency(results.totalInterest);
    maturityAmountEl.textContent = formatCurrency(results.maturityAmount);
    
    // Update breakdown table
    updateBreakdownTable(results.yearWiseData);
    
    // Update chart
    updateChart(results.yearWiseData);
}

// Update breakdown table
function updateBreakdownTable(yearWiseData) {
    breakdownTbody.innerHTML = '';
    
    yearWiseData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.year}</td>
            <td>${formatCurrency(data.investment)}</td>
            <td>${formatCurrency(data.interest)}</td>
            <td>${formatCurrency(data.balance)}</td>
        `;
        breakdownTbody.appendChild(row);
    });
}

// Update chart
function updateChart(yearWiseData) {
    const ctx = chartCanvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (ppfChart) {
        ppfChart.destroy();
    }
    
    const years = yearWiseData.map(data => `Year ${data.year}`);
    const investments = yearWiseData.map(data => data.investment);
    const balances = yearWiseData.map(data => data.balance);
    
    ppfChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Annual Investment',
                    data: investments,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Total Balance',
                    data: balances,
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.raw);
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const annualInvestment = parseFloat(annualInvestmentInput.value);
    const years = parseInt(yearsInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    
    // Validate inputs
    if (annualInvestment < 500 || annualInvestment > 150000) {
        alert('Annual investment should be between ₹500 and ₹1,50,000');
        return;
    }
    
    if (years < 15) {
        alert('Minimum investment period is 15 years');
        return;
    }
    
    if (interestRate <= 0) {
        alert('Interest rate should be greater than 0');
        return;
    }
    
    // Calculate results
    const results = calculatePPF(annualInvestment, years, interestRate);
    updateResults(results);
});

// Real-time calculation on input change
function handleInputChange() {
    const annualInvestment = parseFloat(annualInvestmentInput.value) || 0;
    const years = parseInt(yearsInput.value) || 15;
    const interestRate = parseFloat(interestRateInput.value) || 7.1;
    
    if (annualInvestment > 0 && years > 0 && interestRate > 0) {
        const results = calculatePPF(annualInvestment, years, interestRate);
        updateResults(results);
    }
}

// Add event listeners for real-time calculation
annualInvestmentInput.addEventListener('input', handleInputChange);
yearsInput.addEventListener('input', handleInputChange);
interestRateInput.addEventListener('input', handleInputChange);

// Initialize with default values
document.addEventListener('DOMContentLoaded', function() {
    handleInputChange();
});

// Add some animation effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation to cards
    const cards = document.querySelectorAll('.summary-card, .info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover effect to input fields
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Add some utility functions
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    const form = document.getElementById('ppf-form');
    form.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showLoading() {
    const form = document.getElementById('ppf-form');
    form.classList.add('loading');
}

function hideLoading() {
    const form = document.getElementById('ppf-form');
    form.classList.remove('loading');
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculatePPF,
        formatCurrency,
        formatNumber
    };
} 