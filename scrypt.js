document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const calculateButton = document.getElementById("calculateButton");
    const resultDiv = document.getElementById("result");
    const apiKey = "9398c5165977308ba6ac1cba8e7e9451"; // Replace with your actual Fixer API key


    calculateButton.addEventListener("click", function () {
        const storePrice = parseFloat(document.getElementById("storePrice").value);
        const storeFeeSelect = document.getElementById("storeFee");
        const selectedStoreFee = parseFloat(storeFeeSelect.value);

        const steamPrice = parseFloat(document.getElementById("steamPrice").value);
        const steamMarketCurrency = document.getElementById("steamMarketCurrency").value;
        const storeCurrency = document.getElementById("storeCurrency").value;

        const steamFeeSelect = document.getElementById("steamFee");
        const selectedSteamFee = parseFloat(steamFeeSelect.value);

        // Handle user-selected fee options or manually entered values
        const storeFee = (selectedStoreFee === 'other') ? parseFloat(prompt("Enter store fee as a percentage:")) : selectedStoreFee;
        const steamFee = (selectedSteamFee === 'other') ? parseFloat(prompt("Enter Steam fee as a percentage:")) : selectedSteamFee;

        // Calculate the amount in Steam Market currency

        const storeFeeAmount = (storeFee / 100) * storePrice;
        const steamFeeAmount = (steamFee / 100) * steamPrice;

        const storeFeePrice = storePrice + storeFeeAmount;
        const steamFeePrice = steamPrice - steamFeeAmount;

        console.log('totalCost:', storeFeePrice);
        console.log('revenue:', steamFeePrice);


        const apiUrl = `https://api.exchangerate.host/convert?from=${steamMarketCurrency}&to=${storeCurrency}&amount=${steamFeePrice}`;
        async function getConversion() {
            try {
                const response = await fetch(apiUrl);
                console.log('API response received:', response);
                const data = await response.json();
                console.log(data)


                const convertedTotalCost = data.result;
                const profitLoss = storeFeePrice - convertedTotalCost;
                console.log(profitLoss)

                resultDiv.innerHTML = profitLoss >= 0 ? `You lose ${profitLoss.toFixed(2)} ${storeCurrency.toString()}` : `You profit ${Math.abs(profitLoss).toFixed(2)} ${storeCurrency.toString()}`;
                resultDiv.classList.remove("hidden");

            } catch (error) {
                console.log('Došlo je do greške pri pozivu API-ja:', error);
            }
        }

        getConversion();









    });
});