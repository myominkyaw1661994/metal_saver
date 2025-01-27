
function convertPriceToCurrencyGram(data, currency) {
    // Find the USD/SGD conversion rate
	const usdToSgd = data.find((item) => item.SYMBOL === "USDSGD.GS");

	if (!usdToSgd) {
		console.error("USD/SGD conversion rate not found!");
		return;
	}

	const conversionRate = usdToSgd.BID; // Use the BID price as the conversion rate

	// Filter for Gold (XAUUSD), Silver (XAGUSD), and Platinum (XPTUSD)
	const metals = ["XAUUSD.GSW", "XAGUSD.GSW", "XPTUSD.GSW"];

	// If the currency is SGD, convert the prices
	if (currency === "SGD") {
		const pricesInSGD = data
			.filter((item) => metals.includes(item.SYMBOL))
			.map((item) => ({
				SYMBOL: item.SYMBOL,
				PRICE_IN_SGD: (item.BID * conversionRate).toFixed(item.DIGITS),
			}));

		return pricesInSGD;
	} else if (currency === "USD") {
		// If the currency is USD, return the original prices
		const pricesInUSD = data
			.filter((item) => metals.includes(item.SYMBOL))
			.map((item) => ({
				SYMBOL: item.SYMBOL,
				PRICE_IN_USD: item.BID.toFixed(item.DIGITS),
			}));

		return pricesInUSD;
	} else {
		console.error("Unsupported currency type! Use 'USD' or 'SGD'.");
		return;
	}
}



function getLivePrice() {
        const liveprice = [
			{
				SYMBOL: "USDSGD.GS",
				TIME: "2025-01-24T15:44:42.000Z",
				BID: 1.34289,
				ASK: 1.34931,
				LOW: 1.34131,
				HIGH: 1.3511199999999999,
				DIRECTION: 0,
				DIGITS: 5,
				SPREAD: 0,
				MODIFY_TIME: "2025-01-24T15:25:18.000Z",
			},
			{
				SYMBOL: "XAGUSD.GSW",
				TIME: "2025-01-24T15:44:59.000Z",
				BID: 0.98097,
				ASK: 0.98764,
				LOW: 0.97942,
				HIGH: 0.99508,
				DIRECTION: 0,
				DIGITS: 4,
				SPREAD: 0,
				MODIFY_TIME: "2025-01-24T15:25:34.000Z",
			},
			{
				SYMBOL: "XAUUSD.GSW",
				TIME: "2025-01-24T15:44:59.000Z",
				BID: 89.0971,
				ASK: 89.13343,
				LOW: 88.93764,
				HIGH: 89.56136,
				DIRECTION: 0,
				DIGITS: 3,
				SPREAD: 0,
				MODIFY_TIME: "2025-01-24T15:25:34.000Z",
			},
			{
				SYMBOL: "XPTUSD.GSW",
				TIME: "2025-01-24T15:44:59.000Z",
				BID: 30.33423,
				ASK: 30.84317,
				LOW: 30.28214,
				HIGH: 30.66281,
				DIRECTION: 0,
				DIGITS: 3,
				SPREAD: 0,
				MODIFY_TIME: "2025-01-24T15:25:34.000Z",
			},
		]
        let currency = 'SGD'

        let [gold, silver, platinum] = [0, 0, 0];
        const price = convertPriceToCurrencyGram(liveprice, currency);
        const symbolMap = {
            "XAGUSD.GSW": "silver",
            "XAUUSD.GSW": "gold",
            "XPTUSD.GSW": "platinum"
        };

        for (let i = 0; i < price.length; i++) {
            const { SYMBOL, PRICE_IN_SGD, PRICE_IN_USD } = price[i];
            const priceKey = currency === 'SGD' ? PRICE_IN_SGD : PRICE_IN_USD;

            if (symbolMap[SYMBOL]) {
                eval(`${symbolMap[SYMBOL]} = priceKey`);
            }
        }


		return [gold * 31.1035, silver * 31.1035, platinum * 31.1035];

}




