document.getElementById('currencyForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const amount = document.getElementById('amount').value;
            const fromCurrency = document.getElementById('fromCurrency').value;
            const toCurrency = document.getElementById('toCurrency').value;
            let conversionRate = 1; // Default for same currency
            if (fromCurrency === 'USD' && toCurrency === 'RWF') {
                conversionRate = 1462; // Example rate: 1 USD = 1000 RWF
            } else if (fromCurrency === 'RWF' && toCurrency === 'USD') {
                conversionRate = 0.00068389; // Example rate: 1 RWF = 0.001 USD
            }
                else if (fromCurrency === 'USD' && toCurrency === 'EUR') {
                    conversionRate = 0.85; // Example rate: 1 USD = 0.85 EUR
                } else if (fromCurrency === 'EUR' && toCurrency === 'USD') {
                    conversionRate = 1.18; // Example rate: 1 EUR = 1.18 USD
                } else if (fromCurrency === 'RWF' && toCurrency === 'EUR') {
                    conversionRate = 0.00058; // Example rate: 1 RWF = 0.00058 EUR
                } else if (fromCurrency === 'EUR' && toCurrency === 'RWF') {
                    conversionRate = 1724.14; // Example rate: 1 EUR = 1724.14 RWF
                }
                
            let convertedAmount = amount * conversionRate;
            if (amount > 0) {
                document.getElementById('result').textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
                 document.getElementById('result').style.color = 'black'
            } else {
               document.getElementById('result').textContent = "Invalid amount!" 
               document.getElementById('result').style.color = 'crimson'
            }
            
        });