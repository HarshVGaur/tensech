// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'fca_live_RGlWtpT78ENFnO0weFDdkklg2I3fXhfJaFMEUVmb';
const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_RGlWtpT78ENFnO0weFDdkklg2I3fXhfJaFMEUVmb`;

// Function to populate currency dropdowns
function populateCurrencies(selectElement) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            for (const currency of currencies) {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                selectElement.appendChild(option);
            }
        })
        .catch(error => console.error('Error fetching currencies:', error));
}

// Function to convert currency
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            const resultElement = document.getElementById('result');
            resultElement.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => console.error('Error fetching exchange rates:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    populateCurrencies(fromCurrencySelect);
    populateCurrencies(toCurrencySelect);

    const convertButton = document.getElementById('convert');
    convertButton.addEventListener('click', convertCurrency);
});
