class Game_data {

grid=16

süre = 150
game_time =0




// score settings // puan değeri
//POINTS_MOVED_TOWARDS_FOOD = 1
POINTS_MOVED_TOWARDS_FOOD = 0
//POINTS_MOVED_AGAINST_FOOD = -1.5
POINTS_MOVED_AGAINST_FOOD = 0
//POINTS_ATE_FOOD = 2
POINTS_ATE_FOOD = 30
MAX_TURNS = 50000
LOWEST_SCORE_ALLOWED = -50

//score kuralları // neye ne kadar puan     
score = {
    getCloserToTheFood: this.POINTS_MOVED_TOWARDS_FOOD,
    getAwayFromFood: this.POINTS_MOVED_AGAINST_FOOD,
    ateFood: this.POINTS_ATE_FOOD
  }


    constructor() {

    }
}