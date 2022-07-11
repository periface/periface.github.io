const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Composites,
  Mouse,
  World,
  MouseConstraint,
  Constraint,
  Body,
} = Matter;
let engine;
let render;
let world;

let jsBox;
let cssBox;
let htmlBox;
let husky;
let ground;
let table;
let coffe;
let images = [
  {
    img: "../img/red-bull.png",
    scale: {
      xScale: 0.04,
      yScale: 0.04,
    },
  },
  {
    img: "../img/book.png",
    scale: {
      xScale: 0.02,
      yScale: 0.02,
    },
  },
];

/**
 *   "../img/js.png",
  "../img/html.png",
  "../img/css.png",
 */

let pc;
function init() {
  setup();
  table = new Rectangle({
    x: canvas.width - 300,
    y: canvas.height - 100,
    w: 400,
    h: 175,
    isStatic: true,
    bodyRestitution: 0,
    options: {
      render: {
        sprite: {
          texture: "../img/table2.png",
          xScale: 0.8,
          yScale: 0.9,
        },
      },
    },
  });
  pc = new Rectangle({
    x: table.body.position.x,
    y: canvas.height - 150,
    w: 150,
    h: 130,
    isStatic: false,
    bodyRestitution: 0,
    options: {
      render: {
        sprite: {
          texture: "../img/pc.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    },
  });
  coffe = new Rectangle({
    x: table.body.position.x - 100,
    y: table.body.position.y - table.h,
    w: 30,
    h: 30,
    bodyRestitution: 0,
    options: {
      render: {
        sprite: {
          texture: "../img/coffe.png",
          xScale: 0.05,
          yScale: 0.05,
        },
      },
    },
  });

  showObjects();
  Render.run(render);
  startLoop();
}
function showObjects() {
  var stack = Composites.stack(
    pc.body.position.x,
    pc.body.position.y - pc.h,
    2,
    2,
    15,
    15,
    function (x, y) {
      var image = images[Math.floor(Math.random() * images.length)];

      return new Rectangle({
        x: x,
        y: y,
        w: 50,
        h: 50,
        options: {
          render: {
            sprite: {
              texture: image.img,
              xScale: image.scale.xScale,
              yScale: image.scale.yScale,
            },
          },
        },
      }).body;
    }
  );
  ground = new Rectangle({
    x: 0,
    y: canvas.height,
    w: canvas.width * 2,
    h: 20,
    options: {
      // render: {
      //   fillStyle: "transparent",
      // },
    },
    isStatic: true,
  });

  husky = new Rectangle({
    x: -canvas.width,
    y: canvas.height - 100,
    w: 300,
    h: 200,
    bodyRestitution: 0.5,
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
        x: 150,
        y: 60,
      },
    },
    isStatic: false,
  });

  // Body.applyForce(
  //   husky.body,
  //   { x: husky.body.position.x, y: husky.body.position.y },
  //   { x: 5, y: 0 }
  // );
}
let force = false;
function startLoop() {
  requestAnimationFrame(startLoop);
  Engine.update(engine);
  husky.update();
  // Body.applyForce(
  //   husky.body,
  //   { x: husky.body.position.x, y: husky.body.position.y },
  //   { x: 0.05, y: 0 }
  // );
  husky.body.friction = 0;
  husky.body.mass = 30;

  if (husky.body.position.x > canvas.width / 2 - 100 && !force) {
    Body.applyForce(
      husky.body,
      { x: husky.body.position.x, y: husky.body.position.y },
      { x: 0, y: -1.5 }
    );
    force = true;
  } else {
    husky.body.position.x += 0.15;
  }
  if (husky.body.position.x > canvas.width + 1000) {
    showObjects();
    force = false;
  }
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
