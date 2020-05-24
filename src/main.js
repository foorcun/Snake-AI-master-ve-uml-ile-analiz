
ai_data = new ai_data();



// neural network settings
const MUTATION_RATE = 0.3
const ELITISM = Math.round(0.1 * ai_data.populasyon) // burdaki GAMES(artık ai_data.populasyon) aslında populasyoun sayısı bunu ayır, populasyon olarak işlem yapısn



// neataptic framework call
const Neat = neataptic.Neat
const Config = neataptic.Config
Config.warnings = false

// neat initialization
const neat = new Neat(6, 2, null, {
    popsize: ai_data.populasyon,
    elitism: ELITISM,
    mutationRate: MUTATION_RATE
  }
)

const chartData = {
  labels: [],
  datasets: [
    {
      name: 'Max',
      values: []
    },
    {
      name: 'Average',
      values: []
    },
    {
      name: 'Min',
      values: []
    }
  ]
}

const chart = new Chart('#chart', {
  title: 'generation score history',
  type: 'line',
  height: 200,
  data: chartData,
  colors: ['#F6FC53', 'light-blue', '#E41414'],

})

let highestScore = 0

const ai = new Ai({
  neat,
  fields: ai_data.populasyon, //hem populasyon hem game field
 
  onEndGeneration: ({generation, max, avg, min}) => {
    chartData.labels.push(generation.toString())
    chartData.datasets[0].values.push(max)
    chartData.datasets[1].values.push(avg)
    chartData.datasets[2].values.push(min)

    chart.update(chartData)
    if (max > highestScore) {
      highestScore = max
    }

    document.getElementById('generation').innerHTML = generation
    //document.getElementById('highest-score').innerHTML = highestScore
  }
})

ai.launchGeneration()
