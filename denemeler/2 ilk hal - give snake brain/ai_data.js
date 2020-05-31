class Ai_data  {

    //grid=16

    populasyon = 15

    // neural network settings
    MUTATION_RATE = 0.3
    ELITISM = Math.round(0.1 * this.populasyon)


    // neataptic framework call
    Neat = neataptic.Neat
    Config = neataptic.Config
    neat;




    constructor() {
        this.Config.warnings = false;
        this.neat = this.initNeat() 


    }

    initNeat() {

        // neat initialization
        const neat = new this.Neat(6, 2, null, {
            popsize: this.populasyon,
            elitism: this.ELITISM,
            mutationRate: this.MUTATION_RATE
        }
        )


        return neat
    }
}