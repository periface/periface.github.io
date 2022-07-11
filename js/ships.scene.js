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
  Body,
} = Matter;
let engine;
let render;
let world;
let shipOne;
let shipTwo;
let stars = [];
let boxes = [];
let backgroundElm = [];
let explosions = [];
let ships = [];
let langs = ["angular.png", "css.png", "html.png", "js.png"];
let shipFiles = ["ship.png"];
let shipFileEnemies = ["ship-enemy.png"];
let planets = {
  planetOne: undefined,
  planetTwo: undefined,
  planetThree: undefined,
  planetFour: undefined,
};

const init = () => {
  setup();
  createBg();
  createRandomExplosions();
  createPlanets();
  createMainShips();

  createShips(shipOne, 5, true);
  createShips(shipTwo, 5, false);

  Render.run(render);
  startLoop();
};

function startLoop() {
  //console.log("Stars", stars);
  requestAnimationFrame(startLoop);
  Engine.update(engine);
  handleStarsUpdate();
  handleExplosionsUpdate();
  handleShipsUpdate();
  planets.planetOne.update();
  planets.planetTwo.update();
  planets.planetThree.update();
}
function handleExplosionsUpdate() {
  for (
    let explosionIndex = explosions.length - 1;
    explosionIndex >= 0;
    explosionIndex--
  ) {
    let explosion = explosions[explosionIndex];
    if (explosion.animationEnded) {
      explosion.destroy();
      explosions.splice(explosionIndex, 1);
    } else {
      explosion.update();
    }
  }
}
function handleStarsUpdate() {
  for (let starsIndex = stars.length - 1; starsIndex >= 0; starsIndex--) {
    let star = stars[starsIndex];

    if (star.isOffScreen()) {
      star.destroy();
      stars.splice(starsIndex, 1);
    }
  }
}
function getAngle(objectOne, objectTwo) {
  const angle = Math.atan2(
    objectOne.position.y - objectTwo.position.y,
    objectOne.position.x - objectTwo.position.x
  );
  //Velocity
  const velocity = {
    x: Math.cos(angle) * 5, //x adjacent axis
    y: Math.sin(angle) * 5, //y adjacent axis
  };
  return velocity;
}
function deploySmallShips() {
  for (let shipsIndex = ships.length - 1; shipsIndex >= 0; shipsIndex--) {
    let shipDeployed = false;
    let ship = ships[shipsIndex];
    if (ship.isOffScreen()) {
      ship.destroy();
      ships.splice(shipsIndex, 1);
    } else {
      if (!shipDeployed) {
        Body.applyForce(
          ship.body,
          {
            x: ship.body.position.x,
            y: ship.body.position.y,
          },
          { x: 0, y: -0.1 }
        );
      }
      if (ship.isLeft) {
        if (ship.body.position.y < canvas.height / 2 + 250) {
          shipDeployed = true;
          var angle = getAngle(shipTwo.body, ship.body);
          ship.body.position.y = ship.body.position.y;
          if (shipDeployed) {
            Matter.Body.setVelocity(ship.body, angle);
          }
        }
      } else {
        if (ship.body.position.y < canvas.height / 2 + 250) {
          shipDeployed = true;
          var angle = getAngle(shipOne.body, ship.body);
          ship.body.position.y = ship.body.position.y;
          if (shipDeployed) {
            Matter.Body.setVelocity(ship.body, angle);
          }
        }
      }
    }
  }
}

function handleShipsUpdate() {
  if (shipOne.body.position.x >= canvas.width / 2 - 800) {
    shipOne.body.position.x = canvas.width / 2 - 800;
    shipOne.body.position.y = shipOne.originalPosition.y;
  } else {
    shipOne.body.position.x += 0.8;
    shipOne.body.position.y = shipOne.originalPosition.y;
  }
  if (shipTwo.body.position.x <= canvas.width / 2 + 800) {
    shipTwo.body.position.x = canvas.width / 2 + 800;
    shipTwo.body.position.y = shipTwo.originalPosition.y;
  } else {
    shipTwo.body.position.x -= 0.8;
    shipTwo.body.position.y = shipTwo.originalPosition.y;
  }

  if (
    shipOne.body.position.x >= canvas.width / 2 - 800 &&
    shipTwo.body.position.x <= canvas.width / 2 + 800
  ) {
  }
  deploySmallShips();
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
//50
function createPlanets() {
  planets.planetOne = new Circle({
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 250,
    isStatic: true,
    disablePhysics: true,
    options: {
      render: {
        fillStyle: "transparent",
      },
    },
    animationOptions: {
      imageSrc: "/img/planets/planet-about.png",
      framesMax: 50,
      scale: 5,
      offset: {
        x: 250,
        y: 250,
      },
    },
  });
  planets.planetTwo = new Circle({
    x: canvas.width / 3,
    y: canvas.height / 2 - 100,
    r: 250,
    isStatic: true,
    disablePhysics: true,
    options: {
      render: {
        fillStyle: "transparent",
      },
    },
    animationOptions: {
      imageSrc: "/img/planets/planet-proyects.png",
      framesMax: 50,
      scale: 3,
      offset: {
        x: 250,
        y: 250,
      },
    },
  });

  planets.planetThree = new Circle({
    x: canvas.width - canvas.width / 3 + 200,
    y: canvas.height / 2 - 100,
    r: 250,
    isStatic: true,
    disablePhysics: true,
    options: {
      render: {
        fillStyle: "transparent",
      },
    },
    animationOptions: {
      imageSrc: "/img/planets/planet-games.png",
      framesMax: 50,
      scale: 3,
      framesHold: 10,
      offset: {
        x: 250,
        y: 250,
      },
    },
  });
  planets.planetFour = new Circle({
    x: canvas.width / 2,
    y: canvas.height / 3,
    r: 150,
    isStatic: true,
    disablePhysics: true,
    options: {
      render: {
        sprite: {
          texture: "/img/planet2.png",
          xScale: 2,
          yScale: 2,
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
function canAdd(arr, max) {
  return arr.length <= max;
}
function createRandomStars() {
  const radius = Math.random() * (30 - 4) + 50;
  setInterval(() => {
    if (canAdd(stars, 30)) {
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
      stars.push(
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
function createShips(ship, max = 10, isLeft = true) {
  setInterval(() => {
    if (ships.length <= 20) {
      let x = ship.body.position.x;
      let y = ship.body.position.y;
      //Velocity langs[Math.floor(Math.random() * langs.length)]
      let shipImg = `/img/small-ships/${
        isLeft
          ? shipFiles[Math.floor(Math.random() * shipFiles.length)]
          : shipFileEnemies[Math.floor(Math.random() * shipFileEnemies.length)]
      }`;
      ships.push(
        new Ship({
          x,
          y,
          w: 100,
          h: 100,
          disablePhysics: true,
          originalPosition: {
            x,
            y,
          },
          isLeft: isLeft,
          options: {
            render: {
              sprite: {
                texture: shipImg,
                xScale: 0.05,
                yScale: 0.05,
              },
            },
          },
        })
      );
    }
  }, 100);
}
function createMainShips() {
  shipOne = new Ship({
    x: -200,
    y: canvas.height - 400,
    w: 100,
    h: 100,
    disablePhysics: true,
    isStatic: true,
    originalPosition: {
      x: -200,
      y: canvas.height - 400,
    },
    isLeft: true,
    options: {
      render: {
        sprite: {
          texture: "../img/big-ships/big1.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    },
  });
  shipTwo = new Ship({
    x: canvas.width + 200,
    y: canvas.height - 400,
    w: 100,
    h: 100,
    originalPosition: {
      x: canvas.width + 200,
      y: canvas.height - 400,
    },
    isLeft: true,
    isStatic: true,
    disablePhysics: true,
    options: {
      render: {
        sprite: {
          texture: "../img/big-ships/big2.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    },
  });
}

function createRandomExplosions() {
  setInterval(() => {
    if (canAdd(explosions, 50)) {
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
    }
  }, 300);
}
init();
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
