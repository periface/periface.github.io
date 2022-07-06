const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;
let engine;
let render;
let world;
let elements = [];
let backgroundParticles = [];
let ground;
let techo;
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
  return elements.length <= 20;
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
const init = () => {
  setup();
  createRandom();
  ground = new Rectangle({
    x: 0,
    y: canvas.height,
    w: canvas.width * 2,
    h: 30,
    isStatic: true,
  });
  new Rectangle({
    x: 0,
    y: 0,
    w: 10,
    h: canvas.height * 2,
    isStatic: true,
  });
  new Rectangle({
    x: canvas.width,
    y: 0,
    w: 10,
    h: canvas.height * 2,
    isStatic: true,
  });
  Render.run(render);
  startLoop();
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
