let inputDir = {x: 0, y: 0}; //input direction
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
const gameOverSound = new Audio('gameover.mp3');
const musicSound = new Audio('music.mp3');
let speed = 8;
let lastPaintTime=0;
let score = 0;

let SnakeArr=[
    {
        x:13,
        y:15
    }
]

food = {x:6, y:7};

function main(ctime)
{
    window.requestAnimationFrame(main);
   // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake)
{
     // if you bump into yourself

     for(let i = 1; i<SnakeArr.length ;i++)
     {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
     }

     //If you bump into the wall

     if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
     { 
     return true;
     }
}

function gameEngine(){
    //updating the snake array & food

    if(isCollide(SnakeArr)){
        gameOverSound.play();
       // musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over. Press any key to play again");
        SnakeArr=[{x:13,y:15}]
        musicSound.play();
        score=0;
    }

    // If the snake has eaten the food, incremnet the score and regenarte the food
    if(SnakeArr[0].y === food.y && SnakeArr[0].x === food.x){
        foodSound.play();
        score +=1;
        scoreBox.innerHTML = "Score: " + score;
        SnakeArr.unshift({x: SnakeArr[0].x + inputDir.x, y: SnakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = { 
            x: Math.floor(a + (b - a) * Math.random()), 
            y: Math.floor(a + (b - a) * Math.random()) 
        };
        

    }

    //Moving the Snake

      for(let i = SnakeArr.length-2; i>=0; i--)
      {
        SnakeArr[i+1]={...SnakeArr[i]};
      }

    SnakeArr[0].x+=inputDir.x;
    SnakeArr[0].y+=inputDir.y;

    //Display the snake 
    board.innerHTML="";
    SnakeArr.forEach((e,index)=>{
        SnakeElement= document.createElement('div');
        SnakeElement.style.gridRowStart=e.y;
        SnakeElement.style.gridColumnStart=e.x;
        SnakeElement.classList.add('snake');
        if(index === 0)
        {
            SnakeElement.classList.add('head');
        }
        else
        {
            SnakeElement.classList.add('snake');
        }
        board.appendChild(SnakeElement);

    });
    
    //Display the food

    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart=food.y;
    FoodElement.style.gridColumnStart=food.x;
    FoodElement.classList.add('food')
    board.appendChild(FoodElement)
}



window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;

        default:
            break;
    }

});