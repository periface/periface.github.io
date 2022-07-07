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
let backgroundElm = [];
let explosions = [];
let langs = ["angular.png", "css.png", "html.png", "js.png"];
let planets = {
  planetOne: undefined,
  planetTwo: undefined,
  planetThree: undefined,
};
function getRandomStarImg() {
  var max = 50;

  let number = Math.floor(Math.random() * max + 1).toString();
  //TwoNumbers
  if (number.length < 2) {
    number = "0" + number;
  }

  let star = `Stars_${number}.png`;
  return star;
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
      background: "f0f0f0f0",
      render: {
        sprite: {},
      }, // <-- important
    },
  });
  world = engine.world;
}
function canAdd() {
  // return elements.length <= 10;
  return true;
}
function createRandomStars() {
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
      //Velocity langs[Math.floor(Math.random() * langs.length)]
      let starImg = `/img/stars/${getRandomStarImg()}`;
      elements.push(
        new Rectangle({
          x,
          y,
          w: 50,
          h: 50,
          options: {
            render: {
              sprite: {
                texture: starImg,
              },
            },
          },
        })
      );
    }
  }, 500);
}
function createRandomExplosions() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 50;
    //Spawn left, right, bottom, top
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width / 2 + radius;
      y = Math.random() * canvas.height - 100;
    } else {
      x = Math.random() * canvas.width - 100;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height / 2 + radius;
    }

    explosions.push(createExplosion({ x, y, r: radius }));
  }, 500);
}
const init = () => {
  setup();
  createBg();
  createRandomStars();
  createPlanets();
  createRandomExplosions();
  Render.run(render);
  const mouse = Mouse.create(canvas);
  const options = {
    mouse: mouse,
  };
  const mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  startLoop();
};

function startLoop() {
  requestAnimationFrame(startLoop);
  Engine.update(engine);
  planets.planetOne.body.position.x += 1;
  planets.planetTwo.body.position.x -= 0.05;
  planets.planetThree.body.position.x -= 0.05;
  planets.planetThree.body.position.y -= 0.08;

  for (
    let explosionIndex = explosions.length - 1;
    explosionIndex >= 0;
    explosionIndex--
  ) {
    let explosion = explosions[explosionIndex];
    if (explosion.animationEnded) {
      explosions.splice(explosionIndex, 0);
    } else {
      explosion.update();
    }
  }
}

function createBg() {
  const spacing = 200;
  for (let x = 0; x < canvas.width + spacing; x += spacing) {
    for (let y = 0; y < canvas.height - 100 + spacing; y += spacing) {
      let bg = new Rectangle({
        x: x,
        y: y,
        w: 200,
        h: 200,
        isStatic: true,
        options: {
          render: {
            sprite: {
              texture: "/img/bg43.png",
            },
          },
        },
        disablePhysics: true,
      });
      backgroundElm.push(bg);
    }
  }
}
function createPlanets() {
  planets.planetOne = new Circle({
    x: -200,
    y: canvas.height / 2 + 100,
    r: 80,
    isStatic: true,
    options: {
      render: {
        sprite: {
          texture: "/img/planet.png",
          xScale: 3,
          yScale: 3,
        },
      },
    },
  });
  planets.planetTwo = new Circle({
    x: canvas.width / 2,
    y: canvas.height / 3,
    r: 150,
    isStatic: true,
    options: {
      render: {
        sprite: {
          texture: "/img/planet2.png",
          xScale: 1,
          yScale: 1,
        },
      },
    },
    disablePhysics: true,
  });
  planets.planetThree = new Circle({
    x: canvas.width - 150,
    y: canvas.height / 2,
    isStatic: true,
    r: 80,
    options: {
      render: {
        sprite: {
          texture: "/img/planet3.png",
          xScale: 3,
          yScale: 3,
        },
      },
    },
    disablePhysics: true,
  });
}
function createExplosion({ x, y, r = 80 }) {
  return new Circle({
    x: x,
    y: y,
    isStatic: true,
    r: r,
    options: {
      render: {
        fillStyle: "transparent",
      },
    },
    animationOptions: {
      imageSrc: "/img/explosion-6.png",
      framesMax: 8,
      offset: {
        x: 25,
        y: 25,
      },
      scale: Math.random() * 3,
    },
    disablePhysics: true,
  });
}
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

init();
