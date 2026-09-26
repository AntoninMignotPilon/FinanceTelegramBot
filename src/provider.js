const url = "https://query1.finance.yahoo.com/v8/finance/chart/"
const place = ".PA"

export async function getPrice(ticker) {
    const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.PA`;

    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

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
}