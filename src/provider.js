const url = "https://query1.finance.yahoo.com/v8/finance/chart/"
const place = ".PA"

export async function getPrice(index){
    try{
        const reponse = await fetch(url+ index+ place)

        if (!reponse.ok){
            throw new Error(`HTTP Error : ${reponse.status}`)
        }

        const data = await reponse.json()

        const price  = data.chart.result[0].meta.regularMarketPrice
        const previousClose = data.chart.result[0].meta.chartPreviousClose

        return { price, previousClose }

    }catch (error){
        console.error("Request error :", error)
    }
}