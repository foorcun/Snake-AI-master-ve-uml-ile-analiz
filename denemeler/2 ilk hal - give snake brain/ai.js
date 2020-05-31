class Ai {

  constructor({ neat, populasyon,onEndGeneration }) {
    this.neat = neat // neat reinforcement algorithmalar atadık
    this.populasyon = [] // populasyon // galba burda değer olarak aldığı değer (bu durumda 55) arrayin size olarak atanıyor, değer olark değil
    // this.populasyon, oyuncu arrayi,  this.neat.populasyon, oyuncu brain arrayi
    this.populasyon_member_dead = 0 // ölenlerin saysı
    this.onEndGeneration =onEndGeneration






    this.launchGameFields(populasyon)


  }

  launchGeneration() { // burda playıra beyin vererek player populasyonu başlatıyor
    /*  this.populasyon_member_dead = 0 // bu populasyon mu field le mi alakalı, fields ise burdan al bunu
 
     for (let i = 0; i < this.populasyon.length; i++) {
       this.populasyon[i].field.snake.brain = this.neat.population[i]
       this.populasyon[i].snake.brain.score = 0
       this.populasyon[i].start()
     } */

    //this.populasyon_member_dead = 0 // bu populasyon mu field le mi alakalı, fields ise burdan al bunu

    var i = this.populasyon_member_dead

   // alert(i)
    // for (let i = 0; i < this.populasyon.length; i++) {
    /*   alert(this.populasyon[i].snake) */
    //alert(this.populasyon)
    this.populasyon[i].ide = i
    this.populasyon[i].generation = this.neat.generation
    console.log(this.populasyon[i].ide)
    console.log(this.populasyon[i].brain.connections)

    try {
      // console.log("i"+this.populasyon[i].ide)// == this.populasyon[i-1].ide)
      // console.log("i-1" +this.populasyon[i-1].ide)
      max= ai.neat.getFittest().score
      alert(max)

    } catch{ }
    //console.log(this.populasyon[i].brain)
    //alert(this.populasyon[0].ide == this.populasyon[2].ide)


    this.populasyon[i].brain = this.neat.population[i] // yeni populasyona beyin verme işlemi // neat.population diye aldığı sadece beyin.
    this.populasyon[i].brain.score = 0
    //this.populasyon[i].gameField.start()
    //}

    return this.populasyon[i]


    // alert(this.populasyon[0])


  }


  /*   newGeneration(){
      
      //asıl end generation procedurue burdan sonra başlıyor
      this.neat.sort() // belli ki yüksek scoredan düşüğe sıralıyor
    } */
  endGeneration() {
    /*    if (this.populasyon_member_dead + 1 < this.populasyon.length) { // burdaki fieldslar populasyon anlamında, ölenlerin sayısı toplam sayısa eşitse hepsi ölmuştur kontrolu
         this.populasyon_member_dead++
         return  // her bir yılanın ölüşü ayrı ayrı endGeneration methodunu çağırıyor, bu return ile tamamı ölmemişse endGeneration procedure ara veriyrz
       } */

    //asıl end generation procedurue burdan sonra başlıyor
    this.neat.sort() // belli ki yüksek scoredan düşüğe sıralıyor



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

      /*   this.field = new Field({
          onGameOver: () => this.endGeneration() // enGameOver a procedure atıyorz
        })
  
        this.populasyon.push(new Game_field_adapter(this.field)) */
      //console.log(this.populasyon[i].snake)


      this.populasyon.push(snake)
      //alert(this.populasyon[i].ide)
      //console.log(this.populasyon[i])

    }


  





  }




}
