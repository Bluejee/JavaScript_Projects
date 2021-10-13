let gridsize = 5;

let xsegments;
let ysegments;

let cwidth;
let cheight;

//snake
let snake = [];
let nsnakes = 50;
let space = [];
let available_pos = [];
let snake_collide = false;
let inherit_color = false;
let shape = 'Circle';

//dom
let collision_checkbox;
let inherit_color_checkbox;

let shape_radio;

let reset_button;
let pause_play_button;

let info1;
let info2;
let snake_number_text;
let snake_number_input;
let snake_size_slider;
let slider_value_text;

function setup() {
  noLoop();

  // Setting up the canvas.
  cwidth = (windowWidth) - ((windowWidth) % gridsize);
  cheight = (windowHeight-35) - ((windowHeight-35) % gridsize);
  createCanvas(cwidth, cheight);
  xsegments = width / gridsize;
  ysegments = height / gridsize;
  // background(9, 132, 227);
  strokeWeight(0);
  background(0);
  // print('seg = ',xsegments,ysegments)

  // Setting up the space matrix for collision detection.
  // also creating a list of available positions.
  // the space matrix is a transpose of the actual space and hence should be used as space[y][x]
  for (r = 0; r < ysegments; r++) {
    space[r] = [];
    for (c = 0; c < xsegments; c++) {
      space[r][c] = 0;
      available_pos.push([c, r]);
    }
  }
  // console.table(space);
  print(available_pos.length);
  // Initializing the snakes.
  for (i = 0; i < nsnakes; i++) {
    //snake[i] = new Snake(floor(xsegments / 2), floor(ysegments / 2), 255);
    let available_pos_index = floor(random(available_pos.length));
    let x_pos = available_pos[available_pos_index][0];
    let y_pos = available_pos[available_pos_index][1];
    snake[i] = new Snake(x_pos, y_pos);
    // print(y_pos, x_pos);
    space[y_pos][x_pos] = 1;
    available_pos.splice(available_pos_index, 1);
  }

  // Creating all the dom elemetns for controlling the snakes

  info1 = createSpan(
    "Scroll Down for Controls and Information."
  );
  info1.style("padding", "5px");
  info1.style('background-color', color(0));
  info1.style("width", "100%");
  info1.style("color", "#ff0000");

  pause_play_button = createButton("Play");
  pause_play_button.mousePressed(pauseplay);
  pause_play_button.style("width", "70px");
  pause_play_button.style("background-color", color(0, 255, 0));

  
  info2 = createDiv(
    "These are the options that can be manipulated inorder to change the way the simulation works. The effects selected will only effect once the simulation is reset."
  );
  info2.style("padding", "5px");
  // info.style('background-color', color(25,23,200,50));
  info2.style("color", "#ff0000");

  snake_number_text = createSpan("Number of Snakes :: ");
  // snake_number_text.style('padding','5px');
  snake_number_text.style("color", "#ff0000");

  // snake_number_text.style('background-color',color(255,255,255));

  snake_number_input = createInput("50");
  snake_number_input.style("width", "20px");
  // snake_number_input.style('padding','5px');

  // slider_value_text = createP('Snake size :: ');
  slider_value_text = createDiv("Size of the Snakes :: 5");
  slider_value_text.style("color", "#ff0000");
  slider_value_text.style("padding", "5px");

  snake_size_slider = createSlider(2, 20, 5, 1);
  snake_size_slider.style("width", "18%");
  snake_size_slider.changed(sizechange);

  collision_checkbox = createCheckbox("Collisions", false);
  collision_checkbox.style("padding", "5px");

  inherit_color_checkbox = createCheckbox("Inherit Colour", false);
  inherit_color_checkbox.style("padding", "5px");

  shape_radio = createRadio()
  shape_radio.option('Circle');
  shape_radio.option('Square');
  shape_radio.style("padding", "5px");
  shape_radio.selected('Circle')

  reset_button = createButton("Reset");
  reset_button.mousePressed(reset);
  reset_button.style("width", "9%");
  reset_button.style("background-color", color(0, 0, 255));

  // collision_checkbox.changed(changeCollide);
}

function draw() {
  // frameRate(10);
  // background(9, 132, 227);
  // showGrid();

  fill(0);
  // check if there are any snakes alive. if alive snakes = 0 then do something.
  if (snake.length == 0) {
    print("All Snakes Dead.");
    pause_play_button.html("Play");
    pause_play_button.style("background-color", color(0, 255, 0));
    noLoop();
  }

  // Using a seperate loop for display and space updation and another one for computations.
  for (i = 0; i < snake.length; i++) {
    snake[i].display(gridsize,shape);
    // Updating the space
    space[snake[i].position.y][snake[i].position.x] = 1;
    // print(snake.position.x,snake.position.y)
  }

  // Every loop we create a list of available positions to use.
  // print(available_pos.length);
  available_pos = [];
  for (r = 0; r < ysegments; r++) {
    for (c = 0; c < xsegments; c++) {
      if (space[r][c] == 0) {
        available_pos.push([c, r]);
      }
    }
  }

  for (i = 0; i < snake.length; i++) {
    let move_dir; // the direction for the snake to move.

    // Collision active check
    // If the collision is inactive, just move the snake like a random walker with equal probablity.
    // If the collision is active then check the snake position, and the space matrix and only move in the directions that have a free spot in the space matrix with equal probablit in available directions.
    // Note that in the collision active case, wraparound is not active. rather the boundary is considerd inaccesible.
    // If all posibilities are exhausted then kill the snake.
    if (snake_collide) {
      // creating a list of possible directions in which the snake can move.(0,1,2,3 :: U R D L)
      possible_dir = [];
      //Checking U
      if (snake[i].position.y > 0) {
        // need to check the space only if the snake is not on the top border
        // now that the snake is not on the border we check the space
        if (space[snake[i].position.y - 1][snake[i].position.x] == 0) {
          possible_dir.push(0);
        }
      }
      //Checking R
      if (snake[i].position.x < xsegments - 1) {
        // need to check the space only if the snake is not on the right border
        // now that the snake is not on the border we check the space
        if (space[snake[i].position.y][snake[i].position.x + 1] == 0) {
          possible_dir.push(1);
        }
      }
      //Checking D
      if (snake[i].position.y < ysegments - 1) {
        // need to check the space only if the snake is not on the bottom border
        // now that the snake is not on the border we check the space
        if (space[snake[i].position.y + 1][snake[i].position.x] == 0) {
          possible_dir.push(2);
        }
      }
      //Checking L
      if (snake[i].position.x > 0) {
        // need to check the space only if the snake is not on the left border
        // now that the snake is not on the border we check the space
        if (space[snake[i].position.y][snake[i].position.x - 1] == 0) {
          possible_dir.push(3);
        }
      }

      // now that we have a list of available directions checking to see if it is to be killed or to be moved.
      if (possible_dir.length == 0) {
        // killing the snake.
        snake[i].alive = false;
      } else {
        // as there exist atleast one direction, determining which direction to move the snake in.
        // we use the length of the list to crearte a random index and use it to pick the direction.
        move_dir = possible_dir[floor(random(possible_dir.length))];
      }
    } else {
      // moving the snake like a random walker with equal probablities(order is U R D L)
      move_dir = floor(random(4));
    }

    // Now that we have the direction to move the snake in, we use the order (0,1,2,3 :: U R D L) to move the snake

    if (move_dir == 0) {
      snake[i].move([0, -1], xsegments, ysegments);
      // print('Move U.',snake.position.x,snake.position.y)
    } else if (move_dir == 1) {
      snake[i].move([1, 0], xsegments, ysegments);
      // print('Move R.',snake.position.x,snake.position.y)
    } else if (move_dir == 2) {
      snake[i].move([0, 1], xsegments, ysegments);
      // print('Move D.',snake.position.x,snake.position.y)
    } else {
      snake[i].move([-1, 0], xsegments, ysegments);
      // print('Move U.',snake.position.x,snake.position.y)
    }
  }

  // Once we have completed one frame it is now time to remove all the dead snakes.
  // we use a reverse loop as we are deleting some of the elment and the index shifts.
  // but as the loop is reverse the computation is not affected.
  // In case we want the newborn snake to have the same color as the diying snake, we can store the color and then reuse it.
  for (i = snake.length - 1; i >= 0; i--) {
    let temp_color;
    if (!snake[i].alive) {
      // if snake not alive
      temp_color = snake[i].snakecolor;
      snake.splice(i, 1);
      // remove the ith element from the list.

      // If there is space remaining for snakes to be born, then create a snake over there and change the space state to one.
      // Another thing that has to be done is to remove that element from the list of available positions.
      if (available_pos.length != 0) {
        let available_pos_index = floor(random(available_pos.length));
        let x_pos = available_pos[available_pos_index][0];
        let y_pos = available_pos[available_pos_index][1];
        let temp = new Snake(x_pos, y_pos);

        if (inherit_color) {
          temp.snakecolor = temp_color;
        }

        snake.push(temp);
        space[y_pos][x_pos] = 1;
        available_pos.splice(available_pos_index, 1);
      }
    }
  }
}

// function changeCollide() {
//   if (this.checked()) {
//     snake_collide = true;
//     console.log("Checking!");
//   } else {
//     snake_collide = false;
//     console.log("Unchecking!");
//   }
// }

function sizechange() {
  slider_value_text.html("Size of the Snakes :: " + snake_size_slider.value());
}

function reset() {
  // reseting the gridsize will have to resize the canvas also. and also change all other properties related with the gridsize.
  gridsize = snake_size_slider.value();
  cwidth = (windowWidth) - ((windowWidth) % gridsize);
  cheight = (windowHeight-35) - ((windowHeight-35) % gridsize);
  createCanvas(cwidth, cheight);
  xsegments = width / gridsize;
  ysegments = height / gridsize;

  if (collision_checkbox.checked()) {
    snake_collide = true;
    // console.log("Checking!");
  } else {
    snake_collide = false;
    // console.log("Unchecking!");
  }

  if (inherit_color_checkbox.checked()) {
    inherit_color = true;
    // console.log("Checking!");
  } else {
    inherit_color = false;
    // console.log("Unchecking!");
  }

  shape = shape_radio.value();

  
  
  strokeWeight(0);
  background(0);
  // print('seg = ',xsegments,ysegments)

  nsnakes = snake_number_input.value();

  // Setting up the space matrix for collision detection
  for (i = 0; i < ysegments; i++) {
    space[i] = [];
    for (j = 0; j < xsegments; j++) {
      space[i][j] = 0;
    }
  }
  // console.table(space);
  // Initializing the snakes.
  snake = [];
  for (i = 0; i < nsnakes; i++) {
    //snake[i] = new Snake(floor(xsegments / 2), floor(ysegments / 2), 255);
    snake[i] = new Snake(floor(random(xsegments)), floor(random(ysegments)));
  }
}

function pauseplay() {
  if (this.html() == "Play") {
    this.html("Pause");
    this.style("background-color", color(255, 0, 0));
    loop();
  } else {
    this.html("Play");
    this.style("background-color", color(0, 255, 0));
    noLoop();
  }
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

// function windowResized(){
//   screensize = min(windowWidth,windowHeight);
//   resizeCanvas(screensize,screensize);
// }

// function mousePressed() {
//   for (i = 0; i < snake.length; i++) {
//     snake[i].snakecolor = createVector(random(255), random(255), random(255));
//   }
//   // snake.position = createVector(floor(mouseX/gridsize),floor(mouseY/gridsize));
// }
