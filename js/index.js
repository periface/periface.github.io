const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  World,
  MouseConstraint,
  Constraint,
} = Matter;
let engine;
let render;
let world;
let elements = [];
let boxes = [];
let ground;
let techo;
let ball;
let cannon;
function setup() {
  engine = Engine.create();
  render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      height: innerHeight,
      width: innerWidth,
      wireframes: false,
      background: "f0f0f0f0", // <-- important
    },
  });
  world = engine.world;
}
function canAdd() {
  return elements.length <= 5;
}
function createRandom() {
  const radius = Math.random() * (30 - 4) + 10;
  setInterval(() => {
    if (canAdd()) {
      let x;
      let y;
      if (Math.random() < 0.5) {
        x = Math.random() * canvas.width + 30;
        y = -10;
      } else {
        x = Math.random() * canvas.width - 30;
        y = -10;
      }
      //Velocity
      elements.push(
        new Circle({
          x,
          y,
          r: 20,
        })
      );
    }
  }, 500);
}

function buildMap() {
  for (let index = 0; index < 5; index++) {
    boxes[index] = new Rectangle({
      x: canvas.width - 100,
      y: canvas.height - index * 75,
      w: 100,
      h: 100,
    });
  }
}

const init = () => {
  setup();

  //createRandom();
  ground = new Rectangle({
    x: 0,
    y: canvas.height,
    w: canvas.width * 2,
    h: 30,
    isStatic: true,
  });
  ball = new Circle({ x: 100, y: canvas.height / 2, r: 10 });
  cannon = new Cannon({ x: 100, y: canvas.height / 2, body: ball.body });
  // cannon.draw();
  Render.run(render);
  const mouse = Mouse.create(canvas);
  const options = {
    mouse: mouse,
  };

  const mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  startLoop();
  buildMap();
};
init();
function startLoop() {
  requestAnimationFrame(startLoop);
  Engine.update(engine);
}
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
