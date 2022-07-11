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

let jsBox;
let cssBox;
let htmlBox;
let husky;
let ground;
function init() {
  setup();

  jsBox = new Rectangle({
    x: canvas.width - 200,
    y: 0,
    w: 100,
    h: 115,
    bodyRestitution: 0,
    options: {
      render: {
        sprite: {
          texture: "../img/js.png",
          xScale: 0.3,
          yScale: 0.3,
        },
      },
    },
  });
  cssBox = new Rectangle({
    x: canvas.width - 200,
    y: 500,
    w: 100,
    h: 200,
    bodyRestitution: 0,
    options: {
      render: {
        sprite: {
          texture: "../img/css.png",
          xScale: 0.3,
          yScale: 0.3,
        },
      },
    },
  });
  htmlBox = new Rectangle({
    x: canvas.width - 200,
    y: -300,
    w: 100,
    h: 200,
    bodyRestitution: 0,
    options: {
      render: {
        sprite: {
          texture: "../img/html.png",
          xScale: 0.3,
          yScale: 0.3,
        },
      },
    },
  });
  ground = new Rectangle({
    x: 0,
    y: canvas.height,
    w: canvas.width * 2,
    h: 50,
    options: {
      render: {
        fillStyle: "transparent",
      },
    },
    isStatic: true,
  });

  husky = new Circle({
    x: -canvas.width,
    y: canvas.height - 200,
    r: 200,
    options: {
      render: {
        fillStyle: "transparent",
      },
    },
    animationOptions: {
      imageSrc: "/img/dog-run.png",
      framesMax: 8,
      scale: 4,
      framesHold: 5,
      offset: {
        x: 0,
        y: 0,
      },
    },
    isStatic: false,
  });

  Render.run(render);
  startLoop();
}
function startLoop() {
  requestAnimationFrame(startLoop);
  Engine.update(engine);
  husky.update();
  husky.body.position.x += 0.3;
}
function setup() {
  engine = Engine.create();
  render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      height: innerHeight,
      width: innerWidth,
      wireframes: false,
      render: {
        sprite: {},
      }, // <-- important
    },
  });
  world = engine.world;
}
init();
