let board=document.getElementById('Board')
let context=board.getContext('2d')
let w=board.width;
let h=board.height;
let scoretext=document.getElementById('value')
const u=25;
let start=false
let fx,fy,xv=25,yv=0;
let snake=[
    {x:u*3,y:0},
    {x:2*u,y:0},
    {x:u,y:0},
    {x:0,y:0}
];
let score=0,active=true;
window.addEventListener('keydown',keyPress)
startGame();
function startGame(){
    context.fillstyle="#212121";

  //  fillRect(xstart,ystart,width,height)
    context.fillRect(0,0,w,h);
    createFood();
    displayFood();
    draw();
   // move();
   // draw();
  // clear();
  // draw();
  // nexttick();
}
function createFood()
{
   fx=Math.floor(Math.random()*w/u)*u
   fy=Math.floor(Math.random()*h/u)*u
}
function displayFood(){
    context.fillStyle='red';
    context.fillRect(fx,fy,u,u)
}
 function draw(){
    context.fillStyle='aqua';
    context.strokeStyle="black"
    snake.forEach((s)=>{
        context.fillRect(s.x,s.y,u,u)
        context.strokeRect(s.x,s.y,u,u)
})
}
function move(){
    let head={x:snake[0].x+xv,y:snake[0].y+yv}

    snake.unshift(head)
    if(snake[0].x==fx && snake[0].y==fy)
    {
        createFood();
        score+=5
      //  let sum="Score :"+score
        scoretext.innerHTML=score
    }
    else
    {
        snake.pop()
    }
    
}
function clear(){
    context.fillStyle="#212121"
    context.fillRect(0,0,w,h)
}
function nexttick(){
    if(active)
    {
    setTimeout(()=>
    {
    clear();
    displayFood();
    move();
    draw();
    gameover();
    nexttick();}
    ,180)
    }
    else{
       clear();
       context.font="bold 40px serif";
        context.fillStyle='white';
       // context.textAlign="centre";
        context.fillText("Game over!!",89 ,h/2)
    }
}

function keyPress(event){
    //num.keyCode
  //  console.log(event)
    if(!start)
    {
        start=true
        nexttick();
    }
    const left=37,up=38,right=39,down=40
    switch(true){
        case(event.keyCode==left  && xv!=u):
        xv=-u
        yv=0
        break;
        case(event.keyCode==right && xv!=-u):
        xv=u
        yv=0
        break;
        case(event.keyCode==up && yv!=u):
        xv=0
        yv=-u
        break;
        case(event.keyCode==down && yv!=-u):
        xv=0
        yv=u
        break;

    }
}
function gameover(){
    switch(true){
        case(snake[0].x<0):
            active=false
            break
        case(snake[0].x>=w):
            active=false
            break
        case(snake[0].y<0):
            active=false
            break
        case(snake[0].y>=h):
            active=false
            break
                   

    }
}