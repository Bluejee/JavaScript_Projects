let gridsize = 5;

let xsegments;
let ysegments;

let cwidth;
let cheight;

let snake = [];
let nsnakes = 50;
let space = [];


function setup() {

  cwidth = windowWidth - windowWidth%gridsize;

  cheight = windowHeight - windowHeight%gridsize;

  createCanvas(cwidth,cheight);

  xsegments = width/gridsize;
  ysegments = height/gridsize;

  // background(9, 132, 227);
  strokeWeight(0)
  background(255)


  // print('seg = ',xsegments,ysegments)

  for(i = 0;i<ysegments;i++){
    space[i] = []
    for(j = 0;j<xsegments;j++){
      space[i][j] = 0;
    }
  }

  // console.table(space);


  for(i = 0;i<nsnakes;i++){
    snake[i] = new Snake(floor(xsegments/2),floor(ysegments/2));

    // snake[i] = new Snake(floor(random(xsegments)),floor(random(ysegments)));
  }

}

function draw() {
  // frameRate(4)
  // background(9, 132, 227);
  // showGrid();

  fill(0);
  for(i=0;i<nsnakes;i++){
    snake[i].display(gridsize)
    // Updating the space
    space[snake[i].position.y][snake[i].position.x] = 1
    // print(snake.position.x,snake.position.y)
    c = floor(random(4))

    // moving the snake
    if (c == 0){
      snake[i].move([1,0],xsegments,ysegments);
      // print('Move R.',snake.position.x,snake.position.y)

    }
    else if(c == 1){
      snake[i].move([-1,0],xsegments,ysegments);
      // print('Move L.',snake.position.x,snake.position.y)
    }
    else if(c == 2){
      snake[i].move([0,1],xsegments,ysegments);
      // print('Move D.',snake.position.x,snake.position.y)
    }
    else{
      snake[i].move([0,-1],xsegments,ysegments);
      // print('Move U.',snake.position.x,snake.position.y)
    }

  }


  }

// function windowResized(){
//   screensize = min(windowWidth,windowHeight);
//   resizeCanvas(screensize,screensize);
// }


function mousePressed() {
  for(i = 0;i<nsnakes;i++){
  snake[i].snakecolor =  createVector(random(255),random(255),random(255));
}
  // snake.position = createVector(floor(mouseX/gridsize),floor(mouseY/gridsize));
}

function showGrid() {
  fill(0);
  strokeWeight(1);
  
  
  for (let i = 0; i < width; i += gridsize) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += gridsize) {
    line(0, i, width, i);
  }
}
