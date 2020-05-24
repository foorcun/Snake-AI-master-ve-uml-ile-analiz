class game_data {

    game_amout = 55; // bu hem yaratılcak oyun alanı sayısı(field) hem de populasyon saysı 


// game settings
    fieldSize = 120
    fieldUnit = 5
    frameRate = 45

    // score settings
    POINTS_MOVED_TOWARDS_FOOD = 1
    POINTS_MOVED_AGAINST_FOOD = -1.5
    POINTS_ATE_FOOD = 2
    MAX_TURNS = 5000
    LOWEST_SCORE_ALLOWED = -50


 //score kuralları
    score = {
        getCloserToTheFood: this.POINTS_MOVED_TOWARDS_FOOD,
        getAwayFromFood: this.POINTS_MOVED_AGAINST_FOOD,
        ateFood: this.POINTS_ATE_FOOD
      }

    constructor() {

    }
}