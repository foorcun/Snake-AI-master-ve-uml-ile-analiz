var game_data = new Game_data()
var grid = game_data.grid

var snake = {

    x: 160,

    y: 160,



    // snake velocity. moves one grid length every frame in either the x or y direction

    dx: grid,

    dy: 0,



    // keep track of all grids the snake body occupies

    cells: [],



    // length of the snake. grows when eating an apple

    maxCells: 4,



    //
    direction: 'right',

    //brain
    brain: '',

    //score
    // score settings
    scoreModifiers: game_data.score,
    turns: 0


};


//klavye oklarının funcları
function leftArrow() {

    snake.dx = -grid;

    snake.dy = 0;
    snake.direction = 'left'
}
function upArrow() {

    snake.dy = -grid;

    snake.dx = 0;
    snake.direction = 'up'


}
function rightArrow() {

    snake.dx = grid;

    snake.dy = 0;
    snake.direction = 'right'

}
function downArrow() {

    snake.dy = grid;

    snake.dx = 0;
    snake.direction = 'down'

}





// hareket deneme

var sira = 0
var baslama = 0
function up_right() {


    if (baslama < 2) {
        baslama++

    } else {
        if (sira == 0) {
            // alert(sira)

            upArrow()
            //rightArrow()



            sira = 1
            baslama = 0

        } else {
            //alert(sira)
            //upArrow()
            rightArrow()


            sira = 0
            baslama = 0

        }

    }


}


function up_right2() {

    if (baslama < 2) {
        baslama++

    } else {
        if (sira == 0) {
            // alert(sira)

            rightArrow()



            sira = 1
            baslama = 0

        } else {
            // alert(sira)
            upArrow()


            sira = 0
            baslama = 0

        }

    }



}




// think

function think(snake, apple) {

    //snake = snake

    let isFoodForward = 0
    let isFoodLeft = 0
    let isFoodRight = 0

    snake = snake
    let head = snake.cells[0]
    //console.log(head)
    //let head = cells[0].x / grid //head x koordinatı
    //alert(head.x) //head x koordinatı

    //console.log("direction: ", snake.direction)
    if (head !== undefined) {

        switch (snake.direction) {
            case 'up':

                if (apple.y < head.y) isFoodForward = 1
                if (apple.x < head.x) isFoodLeft = 1
                if (apple.x > head.x) isFoodRight = 1

            case 'down':

                if (apple.y > head.y) isFoodForward = 1
                if (apple.x < head.x) isFoodRight = 1
                if (apple.x > head.x) isFoodLeft = 1

            case 'left':


                if (apple.x < head.x) isFoodForward = 1
                if (apple.y < head.y) isFoodRight = 1
                if (apple.y > head.y) isFoodLeft = 1
            case 'right':


                if (apple.x > head.x) isFoodForward = 1
                if (apple.y < head.y) isFoodLeft = 1
                if (apple.y > head.y) isFoodRight = 1





        }


    }




    // activate the neural network
    const input = [isFoodForward, isFoodLeft, isFoodRight]
    //console.log("input: ", input)



    // retrieve the output of our neural network
    // we only have number between 0 and 1 so we'll aproximate them to 0 (no) or 1 (yes)
    // after the aproximation we'll only have one 1
    const output = snake.brain.activate(input).map(_output => Math.round(_output))
    // alert("output " , output)
    //console.log("output: ", output)

    let think = []
    think.push(input[0])
    think.push(input[1])
    think.push(input[2])
    think.push(output[0])
    think.push(output[1])
    //console.log(think)

    return think

}



function dön(think, snake) {
    isFoodLeft = think[1]
    isFoodRight = think[2]
    isFoodForward = think[0]
    output = []
    output.push(think[3])
    output.push(think[4])
    //console.log(isFoodLeft)

    snake = snake

    // set the new direction by checking which one of the output is a yes
    // turn left
    //console.log("snake brain ",snake.brain)
    if (output[0]) {
        snake.brain.score += isFoodLeft ? snake.scoreModifiers.getCloserToTheFood : snake.scoreModifiers.getAwayFromFood
        snake.turns++

        switch (snake.direction) {
            case 'up': leftArrow(); break
            case 'down': rightArrow(); break
            case 'left': downArrow(); break
            case 'right': upArrow(); break
        }
    }
    // turn right
    else if (output[1]) {
        snake.brain.score += isFoodRight ? snake.scoreModifiers.getCloserToTheFood : snake.scoreModifiers.getAwayFromFood
        snake.turns++

        switch (snake.direction) {
            case 'up': rightArrow(); break
            case 'down': leftArrow(); break
            case 'left': downArrow();; break
            case 'right': upArrow(); break
        }
    }
    // go forward
    else {
        snake.brain.score += isFoodForward ? snake.scoreModifiers.getCloserToTheFood : snake.scoreModifiers.getAwayFromFood
    }
}


function ölüm1(popi,ind,snake, apple){

    if (ind < popi.length) {
        snake = popi[ind+1]
        ind +=1
        //apple.x = getRandomInt(0, 25) * grid;
    
        //apple.y = getRandomInt(0, 25) * grid;
    }
    else{
        alert("Dur")
    }

return snake

}

function ölüm(snake, apple){


    snake.x = 160;

    snake.y = 160;

    snake.cells = [];

    snake.maxCells = 4;

    snake.dx = grid;

    snake.dy = 0;



    apple.x = getRandomInt(0, 25) * grid;

    apple.y = getRandomInt(0, 25) * grid;






    //alert("süre bitti.")
    snake.brain.score = 0
     //bilgiYaz(ai,ind)


    game_data.game_time = 0

    ind++
    //alert(ind)

   // return ind

      if (ind == popi.length) {
        //alert("popi bitti")
        //ai.endGeneration()
        newGeneration = []

        ai.neat.sort() // belli ki yüksek scoredan düşüğe sıralıyor





        for (let i = 0; i < ai.neat.elitism; i++) { // yeni generationun bir kısımı elitism ile oluşturuluoyr
            newGeneration.push(ai.neat.population[i])
        }

        for (let i = 0; i < ai.neat.popsize - ai.neat.elitism; i++) { // yeni generationun elitismden kalan kısmı neat librarinin kendi funk siyonu ile
            newGeneration.push(ai.neat.getOffspring())
        }

        ai.neat.population = newGeneration // yeni generasyon, artık populasyonumuz oldu
        ai.neat.mutate() // populasyona mutasyon
        ai.neat.generation++
        //alert(ai.neat.generation)

        $( "#generation" ).html(ai.neat.generation)




        ai.launchGeneration() 





        popi = ai.population
        ind=0

//return popi        

    }  



    


}


function bilgiYaz(ai,ind)
{

    $( ".generation" ).append( "<p>Generation : " + ai.neat.generation+ ", üye: "+ ind+"</p>" );

}