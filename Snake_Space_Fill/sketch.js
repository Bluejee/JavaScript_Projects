let segments = 50;
let x;
let y;
let elc;
function setup() {
  screensize = min(windowWidth,windowHeight);
  createCanvas(screensize,screensize);
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
  ellipse(x*(width/segments) + (width/segments/2),y*(width/segments)+(width/segments/2),width/segments,width/segments)
  
  // print(x,y);
  
  c = floor(random(4))
  if (c == 0){
    x = (x + 1)%segments;
  }
  else if(c == 1){
    y = (y + 1)%segments;
  }
  else if(c == 2){
    x = (x - 1)%segments;
  }
  else{
    y = (y - 1)%segments;
  }
  
  if (x<0){
    print(x)
    x = segments + x;
    print(x)
  }
  if (y<0){
    y = segments + y;
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
  for (let i = 0; i < width; i += width / n) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += height / n) {
    line(0, i, width, i);
  }
}
