console.log('[AnaMeloni] Flappy Bird');

//Create an object Image and put sprites.png inside it.
const sprites = new Image();
sprites.src = './sprites.png';


//Started canvas wit a 2D design
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//Object floor
const floor = {
    sourceX: 0,//sx -> source initial image X
    sourceY: 610,//sy -> source initial image Y
    sWidth: 224,//sWidth -> source width
    sHeight: 111,//sHeight -> source height
    destinyX: 0,//dx -> destiny X, X on CANVAS
    destinyY: canvas.height-111,//dy -> destiny Y, Y on CANVAS

    draw () {
        //Insert images atributes to be displayd in screen, once. With loop, seems that the image is constantly on scrren
        context.drawImage(
            sprites,
            floor.sourceX,floor.sourceY,
            floor.sWidth,floor.sHeight,
            floor.destinyX,floor.destinyY,
            floor.sWidth,floor.sHeight,
        );

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

//Object Flappy Bird
const flappyBird = {
    sourceX: 0,//sx -> source initial image X
    sourceY: 0,//sy -> source initial image Y
    sWidth: 34,//sWidth -> source width
    sHeight: 24,//sHeight -> source height
    destinyX: 10,//dx -> destiny X, X on CANVAS
    destinyY: 50,//dy -> destiny Y, Y on CANVAS
    speed: 0, //dy speed
    gravity: 0.25, //increase of speed

    //Change FlappyBird spriter once. with loop, seems that the image is constantly on scrren
    spriteUpdate() {
        flappyBird.speed += flappyBird.gravity,
        flappyBird.destinyY += flappyBird.speed;
     },

    //Insert images atributes to be displayd in screen, once. With loop, seems that the image is constantly on scrren
    draw () {
        context.drawImage(
            sprites,//image
            flappyBird.sourceX,flappyBird.sourceX,
            flappyBird.sWidth,flappyBird.sHeight,
            flappyBird.destinyX,flappyBird.destinyY,
            flappyBird.sWidth,//dWidth -> destiny width
            flappyBird.sHeight, //dHeight -> destiny height
        );
    }
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

//Show spintes in screen repedidaly
function loop(){
    scenario.draw();
    floor.draw();
    flappyBird.draw();
    flappyBird.spriteUpdate();

    requestAnimationFrame(loop);
}


//STAR GAME
loop();