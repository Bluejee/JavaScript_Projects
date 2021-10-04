let segments = 50;
//Segments the smaller side into as many portions

let gridsize;

let x;
let y;
let elc;
function setup() {
  // screensize = min(windowWidth,windowHeight);
  // createCanvas(screensize,screensize);
  createCanvas(windowWidth,windowHeight);
  gridsize = min(width,height)/segments;
  background(255);
  // showGrid();
  
  // x = floor(random(segments));
  // y = floor(random(segments));
  x = 0;
  y = 0;
  elc = color(random(255),random(255),random(255))

}

function draw() {
  // frameRate(4)
  // background(9, 132, 227);
  // showGrid(segments);
  
  fill(elc);
  
  ellipse((2*x+1)*gridsize/2,(2*y+1)*gridsize/2,gridsize,gridsize)
  
  // print(x,y);
  
  c = floor(random(4))
  if (c == 0){
    x = (x + 1)%(floor(width/gridsize) + 1);
  }
  else if(c == 1){
    y = (y + 1)%(floor(height/gridsize));
  }
  else if(c == 2){
    x = (x - 1)%(floor(width/gridsize) + 1);
  }
  else{
    y = (y - 1)%(floor(height/gridsize));
  }
  
  if (x<0){
    x = (floor(width/gridsize) + 1) + x;
  }
  if (y<0){
    y = floor(height/gridsize) + y;
  }
  
  if (floor(random(5)) == 0){
      elc = color(random(255),random(255),random(255))

  }
  
}

// function windowResized(){
//   screensize = min(windowWidth,windowHeight);
//   resizeCanvas(screensize,screensize);
// }
function mousePressed() {
  elc = color(random(255),random(255),random(255))
}

function showGrid(n) {
  fill(0);
  strokeWeight(1);
  
  
  for (let i = 0; i < width; i += gridsize) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += gridsize) {
    line(0, i, width, i);
  }
}
