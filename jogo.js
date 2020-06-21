console.log('[AnaMeloni] Flappy Bird');

//Indicates the initial frame
let frames = 0;
//Inserting sound
const hitSound = new Audio(); 
hitSound.src = "./Sound_efects/hit.wav";

//Create an object Image and put sprites.png inside it.
const sprites = new Image(); 
sprites.src = './sprites.png';


//Started canvas wit a 2D design
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//Object floor
function createFloor(){ //Floor factory
    const floor = {
        sourceX: 0,//sx -> source initial image X
        sourceY: 610,//sy -> source initial image Y
        sWidth: 224,//sWidth -> source width
        sHeight: 111,//sHeight -> source height
        destinyX: 0,//dx -> destiny X, X on CANVAS
        destinyY: canvas.height-111,//dy -> destiny Y, Y on CANVAS
        
        //Make the floor move
        update(){
            const floorMovement = 1;
            const repeteIn = floor.sWidth/2;
            const movement = floor.destinyX - floorMovement;

            floor.destinyX = movement % repeteIn; //Garantee that the floor moves less than its width/2
        },

        draw(){
            //Insert images atributes to be displayd in screen, once. With loop, seems that the image is constantly on scrren
            context.drawImage(
                sprites,
                floor.sourceX,floor.sourceY,
                floor.sWidth,floor.sHeight,
                floor.destinyX,floor.destinyY,
                floor.sWidth,floor.sHeight,
            ),
    
            //Fit image in screen
            context.drawImage(
                sprites,
                floor.sourceX,floor.sourceY,
                floor.sWidth,floor.sHeight,
                (floor.destinyX+floor.sWidth), //Fit image in screen
                floor.destinyY,
                floor.sWidth,floor.sHeight,
            );
        }
    }
    return floor;
}


//Determinies what is a colision
function makeColision(flappyBird, floor){
    const flappyBirdYScreen = flappyBird.destinyY+flappyBird.sHeight;
    const floorYScreen = floor.destinyY;

    if(flappyBirdYScreen >= floorYScreen){
        return true;
    }
    return false;
}

//Object Flappy Bird
function createFlappyBird() { //Factory
    const flappyBird = {
        sourceX: 0,//sx -> source initial image X
        sourceY: 0,//sy -> source initial image Y
        sWidth: 34,//sWidth -> source width
        sHeight: 24,//sHeight -> source height
        destinyX: 10,//dx -> destiny X, X on CANVAS
        destinyY: 50,//dy -> destiny Y, Y on CANVAS
        speed: 0, //dy speed
        gravity: 0.25, //increase of speed
        leap: 4.6,

    
        jump(){
            flappyBird.speed =- this.leap;
        },

        //Change FlappyBird spriter once. with loop, seems that the image is constantly on scrren
        spriteUpdate() {
            //Verifies whem bird falls on the floor
            if(makeColision(flappyBird, global.floor)){
                //Play a colision sound whrn the bird falls on the floor
                hitSound.play(); 
                
                //Delay 1 sec on update scrren
                setTimeout(() => {
                    updateToScreen(screens.begining); //Change to startScreen
                }, 500);
                
                return;
            }

            flappyBird.speed += flappyBird.gravity,
            flappyBird.destinyY += flappyBird.speed;
        },

        //Array to story source/original sprite positions
        movement: [
            {sourceX: 0, sourceY: 0 }, //Wings up
            {sourceX: 0, sourceY: 26 }, //Wings midlle
            {sourceX: 0, sourceY: 52 }, //Wings down
            {sourceX: 0, sourceY: 26 }, //Wings midlle
        ],
        
        currentFrame: 0, 
        
        updateCurrentFrame () { //Update the game according the current frame
            const framesBreak = 10; //Each 10 frames the bird wings image will change
            const passedTheBreak = frames % framesBreak === 0; //Ensures that the value will neve exceeds 10 and the image changes when the break be 0
            
            if (passedTheBreak) {
                const incrementBase = 1;
                const i = incrementBase + flappyBird.currentFrame;
                const repetitionBasis = flappyBird.movement.length;
                flappyBird.currentFrame = i%repetitionBasis; //make the next frame show the next array position
            }
        },

        //Insert images atributes to be displayd in screen, once. With loop, seems that the image is constantly on scrren
        draw () {
            flappyBird.updateCurrentFrame();
            const {sourceX, sourceY} = flappyBird.movement[flappyBird.currentFrame]; //This notations desustrutures the iten os the array
            context.drawImage(
                sprites,//image
                sourceX,sourceY,
                flappyBird.sWidth,flappyBird.sHeight,
                flappyBird.destinyX,flappyBird.destinyY,
                flappyBird.sWidth,//dWidth -> destiny width
                flappyBird.sHeight, //dHeight -> destiny height
            );
        }
    }
    return flappyBird;
}

//Object scenario
const scenario = {
    sourceX: 390,//sx -> source initial image X
    sourceY: 0,//sy -> source initial image Y
    sWidth: 276,//sWidth -> source width
    sHeight: 204,//sHeight -> source height
    destinyX: 0,//dx -> destiny X, X on CANVAS
    destinyY: canvas.height-204,//dy -> destiny Y, Y on CANVAS

    draw () {
        context.fillStyle = "#70c5ce";
        context.fillRect(0,0,canvas.width,canvas.height)

        //Insert images atributes to be displayd in screen, once. With loop, seems that the image is constantly on scrren
        context.drawImage(
            sprites,
            scenario.sourceX,scenario.sourceY,
            scenario.sWidth,scenario.sHeight,
            scenario.destinyX,scenario.destinyY,
            scenario.sWidth,scenario.sHeight,
        );

        //Fit image in screen
        context.drawImage(
            sprites,
            scenario.sourceX,scenario.sourceY,
            scenario.sWidth,scenario.sHeight,
            (scenario.destinyX+scenario.sWidth/2), //Fit image in screen
            scenario.destinyY,
            scenario.sWidth,scenario.sHeight,
        );
    }
}

//Object startScreen
const startScreen = {
    sourceX: 134,//sx -> source initial image X
    sourceY: 0,//sy -> source initial image Y
    sWidth: 174,//sWidth -> source width
    sHeight: 152,//sHeight -> source height
    destinyX: (canvas.width/2)-(174/2),//dx -> destiny X, X on CANVAS
    destinyY: 50,//dy -> destiny Y, Y on CANVAS

    draw () {
        //Insert images atributes to be displayd in screen, once. With loop, seems that the image is constantly on scrren
        context.drawImage(
            sprites,
            startScreen.sourceX,startScreen.sourceY,
            startScreen.sWidth,startScreen.sHeight,
            startScreen.destinyX,startScreen.destinyY,
            startScreen.sWidth,startScreen.sHeight,
        );
    }
}

//
//SCREENS
//

const global = {}; //Global variable created to make possible to access any object created on some Factory
let activeScreen ={}; //var to keep the current screen shown

//Change the screens
function updateToScreen(newScreen) {
    activeScreen = newScreen;

    if(activeScreen.initializes){
        activeScreen.initializes();
    }
};

const screens = {
    begining: {
        //Start the FlappyBird's factory
        initializes(){
            global.flappyBird = createFlappyBird();
            global.floor = createFloor();
            
        },

        //Draw startGame screen
        draw(){
            scenario.draw();
            global.floor.draw();
            startScreen.draw(); 
            global.flappyBird.draw();
        },

        //Change from start screen to the game when the screen is toutched
        click(){
            updateToScreen(screens.gameScreen);
        },
        
        update(){
            global.floor.update(); //Re-draw the floor to make it move
        }
    },

    gameScreen: {
        draw(){
            scenario.draw();
            global.floor.draw();
            global.flappyBird.draw();
        },
        //Make the bird jump when the screen be toutched
        click(){
            global.flappyBird.jump();
        },

        update(){
            global.flappyBird.spriteUpdate();
        },
    }
}

//Show spintes in screen repedidaly
function loop(){
    activeScreen.draw();
    activeScreen.update();
    frames += 1; //Frame increment to indicates the current frame
    requestAnimationFrame(loop);
}

//
//STAR GAME
//
//Event to make something and somebody beat the screen
window.addEventListener('click', function() {
    if(activeScreen.click()){
        activeScreen,click();
    };
});

updateToScreen(screens.begining) //The game starts with the begining screen
loop();