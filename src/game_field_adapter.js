class Game_field_adapter extends Game_field_interface {




    //EnemyRobot Adaptee; // Adaptee Adaptee
    gameField;

    // EnemyRobotAdapter(EnemyRobot Adaptee) {
    constructor(Field) { // Adaptee objecti yaratıyorz
        super();

       // theRobot = newRobot;
    this.gameField = Field


    }

    launchGameFields(populasyon, endGeneration) { // istenen

        //theRobot.smashWithHands(); // bizde olan
        this.gameField.launchGameFields(populasyon, endGeneration)

    }

    launchGeneration(populasyon,neat) { // istenen

        //theRobot.walkForward(); // bizde olan
        this.gameField.launchGeneration(populasyon,neat);

    }

    endGeneration() { // istenen

        //theRobot.reactToHuman(driverName); // bizde olan

    }



}