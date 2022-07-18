let slider;
let angle;
let input;
let inputSh;
let len;
let shrinkFactor;
function setup() {
  // put setup code here
  createCanvas(innerWidth, innerHeight);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
  slider.position(width / 2 - 300, height - 100);
  input = createInput(100);
  input.position(width / 2 - 300, height - 200);
  input.size(100);
  input.style("color", "black");
  input.style("font-weight", "bolder");
  inputSh = createInput(0.67);
  inputSh.position(width / 2 - 400, height - 200);
  inputSh.size(100);
  inputSh.style("color", "black");
  inputSh.style("font-weight", "bolder");
}
function draw() {
  // put drawing code here
  background(51);

  len = input.value() > 400 ? 100 : input.value();
  angle = slider.value();
  shrinkFactor = inputSh.value() > 0.69 ? 0.67 : inputSh.value();
  //TRANSLATE TO BOTTOM
  translate(innerWidth / 2, height);
  branch(len);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    stroke(getRandomColor());
    push();
    rotate(angle);
    branch(len * shrinkFactor);
    pop();
    push();
    rotate(-angle);
    branch(len * shrinkFactor);
    pop();
  }

  //line(0, 0, 0, -len * 0.67);
}
