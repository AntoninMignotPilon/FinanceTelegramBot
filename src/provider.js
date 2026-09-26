export async function getPrice(ticker) {
    const maxTentatives = 10;

    const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.PA`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

    for (let tentative = 1; tentative <= maxTentatives; tentative++) {
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`Erreur Proxy: ${response.status}`);

            const proxyData = await response.json();
            const yahooData = JSON.parse(proxyData.contents);

            const result = yahooData.chart.result[0];
            const meta = result.meta;

            return {
                price: meta.regularMarketPrice,
                previousClose: meta.chartPreviousClose,
                shortName: meta.shortName || ticker
            };
        } catch (error) {
            if (tentative === maxTentatives) {
                throw error;
            }
            const delai = 1000 * 2 ** (tentative - 1); //1s, 2s, 4s ...
            await new Promise(r => setTimeout(r, delai));
        }
    }
}