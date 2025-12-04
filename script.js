let lights = [];

function setup() {
  createCanvas(600, 400);
  noStroke();

  // Initialize string lights
  let numLights = 15;
  for (let i = 0; i < numLights; i++) {
    lights.push({
      x: map(i, 0, numLights - 1, 50, width - 50),
      y: 50 + sin(map(i, 0, numLights - 1, 0, PI)) * 15, // gentle dip
      brightness: random(150, 255)
    });
  }
}

function draw() {
  background(245, 239, 230); // light beige

  // --- String lights (animated) ---
  stroke(0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < lights.length; i++) {
    vertex(lights[i].x, lights[i].y);
  }
  endShape();

  noStroke();
  for (let i = 0; i < lights.length; i++) {
    fill(lights[i].brightness, 200, 50); // warm yellow
    ellipse(lights[i].x, lights[i].y, 12, 12);
    lights[i].brightness = random(150, 255); // flicker
  }

  // --- Shadows ---
  fill(0, 0, 0, 50);
  ellipse(450, 330, 280, 18); // main table shadow
  ellipse(140, 260, 80, 10);  // small table shadow behind

  // --- Small Circular Table (back, slightly smaller for perspective) ---
  drawCircularTable(140, 260, 70);

  // --- Games on small table ---
  drawDice(125, 250, 12);
  drawCards(145, 250);
  drawMeeple(135, 265, [255, 0, 200]);
  drawMeeple(145, 265, [0, 200, 255]);

  // --- Cornhole Boards (back, slightly smaller for perspective) ---
  drawCornhole(80, 190, 65, 32);
  drawCornhole(150, 190, 65, 32);

  // --- Main Table (front) ---
  drawTable(300, 300, 260, 70); // front table slightly bigger

  // --- Pizzas on main table ---
  drawPizza(360, 335, 75);
  drawPizza(440, 335, 75);
}

// ----------- Helper Functions ------------

function drawTable(x, y, w, h) {
  for (let i = 0; i < h; i++) {
    fill(193, 154, 107 + i * 0.3);
    rect(x, y + i, w, 1, 10);
  }
}

function drawCircularTable(x, y, d) {
  for (let i = 0; i < d / 2; i++) {
    fill(193, 154, 107 + i * 0.3);
    ellipse(x, y, d - i, d - i);
  }
}

function drawPizza(x, y, size) {
  fill(245, 220, 180); // crust
  ellipse(x, y, size, size);

  for (let i = 0; i < 3; i++) {
    fill(255, 210 - i * 5, 130 - i * 5);
    ellipse(x, y, size * 0.9 - i * 4, size * 0.9 - i * 4);
  }

  fill(200, 50, 50); // pepperoni
  let angleStep = TWO_PI / 8;
  let radius = size * 0.35;
  for (let i = 0; i < 8; i++) {
    let px = x + cos(i * angleStep) * radius;
    let py = y + sin(i * angleStep) * radius;
    ellipse(px, py, 12, 12);
    fill(150, 0, 0, 100);
    ellipse(px + 1, py + 1, 12, 12);
  }
}

function drawDice(x, y, s) {
  fill(255);
  rect(x, y, s, s, 5);
  fill(0);
  ellipse(x + s / 3, y + s / 3, s / 6);
  ellipse(x + 2 * s / 3, y + 2 * s / 3, s / 6);

  fill(0, 0, 0, 30);
  rect(x + 2, y + 2, s, s, 5);
}

function drawCards(x, y) {
  fill(255, 0, 0);
  rect(x, y, 15, 25, 3);
  fill(0);
  rect(x + 2, y + 2, 11, 21, 2);

  fill(0, 0, 0, 30);
  rect(x + 1, y + 1, 15, 25, 3);
}

function drawMeeple(x, y, col) {
  fill(col);
  ellipse(x, y, 12, 15);

  fill(0, 0, 0, 30);
  ellipse(x + 1, y + 1, 12, 15);
}

function drawCornhole(x, y, w, h) {
  fill(255, 79, 162);
  rect(x, y, w, h, 5);
  fill(0);
  ellipse(x + w - 12, y + h / 2, 10, 10);

  fill(0, 0, 0, 30);
  rect(x + 2, y + 2, w, h, 5);
}
