class Snake {
  constructor(x, y, transparency = 255) {
    this.snakecolor = createVector(random(255), random(255), random(255));
    this.position = createVector(x, y);
    this.transparency = transparency;
    this.alive = true;
  }

  move(direction, xlimit, ylimit) {
    // there can be a small confusion in the y dir as increases downwards and decreses upwards.

    // print('Dir = ',direction,'Pos = ',this.position.x,this.position.y)
    this.position.add(direction);
    // Wraparound condition.
    // print('New Pos = ',this.position.x,this.position.y)

    if (this.position.x >= xlimit) {
      this.position.x = this.position.x - xlimit;
    }
    if (this.position.x < 0) {
      this.position.x = this.position.x + xlimit;
    }
    if (this.position.y >= ylimit) {
      this.position.y = this.position.y - ylimit;
    }
    if (this.position.y < 0) {
      this.position.y = this.position.y + ylimit;
    }
    // print('Corrected Pos = ',this.position.x,this.position.y)
  }

  display(size, shape) {
    fill(
      this.snakecolor.x,
      this.snakecolor.y,
      this.snakecolor.z,
      this.transparency
    );
    // print((2*(this.position.x)+1)*size/2)
    if (shape == 'Circle') {
      ellipse(
        ((2 * this.position.x + 1) * size) / 2,
        ((2 * this.position.y + 1) * size) / 2,
        size,
        size
      );
    } else {
      rectMode(CENTER);
      rect(
        ((2 * this.position.x + 1) * size) / 2,
        ((2 * this.position.y + 1) * size) / 2,
        size,
        size
      );
    }
  }
}
