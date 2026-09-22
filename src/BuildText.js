function calculateVariation(data){
    return (data.price - data.previousClose) / data.previousClose * 100
}


function buildOutput(index, data){
    const variation = calculateVariation(data)
    const emoji = variation >= 0 ? "🟢" : "🔴"

    return `${emoji} ${data.shortName} : ${data.price} € (${variation.toFixed(2)}%)`
}

