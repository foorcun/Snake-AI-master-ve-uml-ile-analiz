class Ai {

  constructor ({neat, fields, onEndGeneration}) {
    this.neat = neat
    this.fields = []
    this.fieldsFinished = 0
    this.onEndGeneration = onEndGeneration

    for (let i = 0; i < fields; i++) { // burdaki fieldlar fields anlamında
      this.fields.push(new Field({
        onGameOver: () => this.endGeneration() // enGameOver a procedure atıyorz
      }))
    }
  }

  launchGeneration () { // burdaki fieldslar populasyon anlamında
    this.fieldsFinished = 0 // bu populasyon mu field le mi alakalı, fields ise burdan al bunu

    for (let i = 0; i < this.fields.length; i++) {
      this.fields[i].snake.brain = this.neat.population[i]
      this.fields[i].snake.brain.score = 0
      this.fields[i].start()
    }
  }

  endGeneration () {
    if (this.fieldsFinished + 1 < this.fields.length) { // burdaki fieldslar populasyon anlamında, ölenlerin sayısı toplam sayısa eşitse hepsi ölmuştur kontrolu
      this.fieldsFinished++
      return  // her bir yılanın ölüşü ayrı ayrı endGeneration methodunu çağırıyor, bu return ile tamamı ölmemişse endGeneration procedure ara veriyrz
    }

    //asıl end generation procedurue burdan sonra başlıyor
    this.neat.sort() // belli ki yüksek scoredan düşüğe sıralıyor

    this.onEndGeneration({ // bu data table ile alakalı
      generation: this.neat.generation,
      max: this.neat.getFittest().score,
      avg: Math.round(this.neat.getAverage()),
      min: this.neat.population[this.neat.popsize - 1].score // dizinin son elemanının skorunu alıyr, bellik yüksekten düşüğe sıralanmış
    })

    const newGeneration = [] //yeni generation

    for (let i = 0; i < this.neat.elitism; i++) { // yeni generationun bir kısımı elitism ile oluşturuluoyr
      newGeneration.push(this.neat.population[i])
    }

    for (let i = 0; i < this.neat.popsize - this.neat.elitism; i++) { // yeni generationun elitismden kalan kısmı neat librarinin kendi funk siyonu ile
      newGeneration.push(this.neat.getOffspring())
    }

    this.neat.population = newGeneration // yeni generasyon, artık populasyonumuz oldu
    this.neat.mutate() // populasyona mutasyon
    this.neat.generation++ // bu ne bilmiorm
    this.launchGeneration() // let the game begin
  }

}
