
function setup() {
  screensize = min(windowWidth,windowHeight);
  createCanvas(screensize,screensize);
  background(9, 132, 227);
  

}

function draw() {
  background(9, 132, 227);
}

function windowResized(){
  screensize = min(windowWidth,windowHeight);
  resizeCanvas(screensize,screensize);
}
function mousePressed() {
}

function showGrid() {
  fill(0);
  strokeWeight(1);
  for (let i = 0; i < width; i += width / 100) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += height / 100) {
    line(0, i, width, i);
  }
}
