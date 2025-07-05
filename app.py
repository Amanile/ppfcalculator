from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ppf-calculator/')
def ppf_calculator():
    return render_template('ppf_calculator.html')

@app.route('/calculate', methods=['POST'])
def calculate_ppf():
    try:
        data = request.get_json()
        annual_investment = float(data.get('annual_investment', 0))
        years = int(data.get('years', 15))
        interest_rate = float(data.get('interest_rate', 7.1))
        
        # PPF calculation
        monthly_rate = interest_rate / 100 / 12
        total_months = years * 12
        
        # Calculate maturity amount using compound interest formula
        # For PPF, we assume annual investment at the beginning of each year
        maturity_amount = 0
        total_investment = 0
        
        for year in range(years):
            yearly_investment = annual_investment
            total_investment += yearly_investment
            # Calculate compound interest for remaining years
            remaining_years = years - year
            amount_after_interest = yearly_investment * ((1 + interest_rate/100) ** remaining_years)
            maturity_amount += amount_after_interest
        
        total_interest = maturity_amount - total_investment
        
        # Year-wise breakdown
        year_wise_data = []
        running_balance = 0
        
        for year in range(1, years + 1):
            running_balance += annual_investment
            interest_earned = running_balance * (interest_rate / 100)
            running_balance += interest_earned
            
            year_wise_data.append({
                'year': year,
                'investment': annual_investment,
                'interest': round(interest_earned, 2),
                'balance': round(running_balance, 2)
            })
        
        return jsonify({
            'success': True,
            'total_investment': round(total_investment, 2),
            'maturity_amount': round(maturity_amount, 2),
            'total_interest': round(total_interest, 2),
            'year_wise_data': year_wise_data
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 