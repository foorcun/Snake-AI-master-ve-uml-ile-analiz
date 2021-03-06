class Ai {

  constructor({ neat, populasyon, onEndGeneration }) {
    this.neat = neat // neat reinforcement algorithmalar atadık
    this.populasyon = [] // populasyon // galba burda değer olarak aldığı değer (bu durumda 55) arrayin size olarak atanıyor, değer olark değil
    this.populasyon_member_dead = 0 // ölenlerin saysı
    this.onEndGeneration = onEndGeneration // bu bir chart-data proceduru






    this.launchGameFields(populasyon)


  }

  launchGeneration() { // burda playıra beyin vererek player populasyonu başlatıyor
   /*  this.populasyon_member_dead = 0 // bu populasyon mu field le mi alakalı, fields ise burdan al bunu

    for (let i = 0; i < this.populasyon.length; i++) {
      this.populasyon[i].field.snake.brain = this.neat.population[i]
      this.populasyon[i].snake.brain.score = 0
      this.populasyon[i].start()
    } */

    this.populasyon_member_dead = 0 // bu populasyon mu field le mi alakalı, fields ise burdan al bunu

    for (let i = 0; i < this.populasyon.length; i++) {
      this.populasyon[i].gameField.snake.brain = this.neat.population[i]
      this.populasyon[i].gameField.snake.brain.score = 0
      this.populasyon[i].gameField.start()
    }

  }

  endGeneration() {
    if (this.populasyon_member_dead + 1 < this.populasyon.length) { // burdaki fieldslar populasyon anlamında, ölenlerin sayısı toplam sayısa eşitse hepsi ölmuştur kontrolu
      this.populasyon_member_dead++
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

  launchGameFields(populasyon) {
    /*  //burda sadece game_space başlatıyor
     for (let i = 0; i < populasyon; i++) { // burda her bir "FIELD + SNAKE" POPULASYONU yapmış olduk. playerımız olan....
       //.. snake için populasyon(aslında Field).snake şeklinde bir ulaşma sağlıyorz. ai ile snake arasında direk bir bağlantı yok
       // playerımıza filed üzerinden bağlanıyor
       this.populasyon.push(new Field({
         onGameOver: () => this.endGeneration() // enGameOver a procedure atıyorz
       }))
     } */



    for (let i = 0; i < populasyon; i++) { // burda her bir "FIELD + SNAKE" POPULASYONU yapmış olduk. playerımız olan....
      //.. snake için populasyon(aslında Field).snake şeklinde bir ulaşma sağlıyorz. ai ile snake arasında direk bir bağlantı yok
      // playerımıza filed üzerinden bağlanıyor

      //adapter uygulanması
      //game_field_adapter_object = new Game_field_adapter(Field) 

      this.field = new Field({
        onGameOver: () => this.endGeneration() // enGameOver a procedure atıyorz
      })
      this.populasyon.push(new Game_field_adapter(this.field))
    }








  }




}
