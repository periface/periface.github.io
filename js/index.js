
/**
 * MATTER.JS PARA LA "CAJA FISICA"
 * VANILLA CANVAS CON POO PARA SPRITES Y OBJETOS <3
 * 
 * 
 * O TAMBIÉN SE PUDE IMPLEMENTAR VELOCITY.X VELOCITY.Y 
 * PARA NO USAR LIBS 
 * 
 * 
 * 
 * 
 * 
 */

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
  Events,
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
let isMobile = false; // AHAHAHAHAHAH
let images = [ ///gegegegegegege
  {
    img: "../img/red-bull.png",
    scale: {
      xScale: 0.04,
      yScale: 0.04,
    },
    scaleMobile: {
      xScale: 0.04,
      yScale: 0.04,
    },
  },
  {
    img: "../img/book2.png",
    scale: {
      xScale: 0.1,
      yScale: 0.1,
    },
    scaleMobile: {
      xScale: 0.09,
      yScale: 0.09,
    },
  },
  {
    img: "../img/coffe.png",
    scale: {
      xScale: 0.05,
      yScale: 0.05,
    },
    scaleMobile: {
      xScale: 0.04,
      yScale: 0.04,
    },
  },
];

/**
 *   "../img/js.png",
  "../img/html.png",
  "../img/css.png",
 */

let pc;
let compositeInitialPosition = {};
let widths;
function init() {
  setup();
  checkMobile();
  let tableSize = getMobileSizes("table");
  table = new Rectangle({
    x: tableSize.x,
    y: tableSize.y,
    w: tableSize.w,
    h: tableSize.h,
    isStatic: true,
    bodyRestitution: 0,
    options: {
      render: {
        sprite: {
          texture: "../img/table2.png",
          xScale: tableSize.xScale,
          yScale: tableSize.yScale,
        },
      },
    },
  });
  showObjects();
  Render.run(render);
  startLoop();
}
function showObjects() {
  let pcSize = getMobileSizes("pc");
  pc = new Rectangle({
    x: isMobile ? table.body.position.x + 60 : table.body.position.x,
    y: canvas.height - 150,
    w: pcSize.w,
    h: pcSize.h,
    isStatic: false,
    bodyRestitution: 0,
    options: {
      render: {
        sprite: {
          texture: "../img/pc.png",
          xScale: pcSize.xScale,
          yScale: pcSize.yScale,
        },
      },
    },
  });
  compositeInitialPosition = {
    x: pc.body.position.x,
    y: pc.body.position.y - pc.h,
  };

  let composite = Composites.stack(
    compositeInitialPosition.x - 150,
    compositeInitialPosition.y,
    2,
    2,
    15,
    15,
    function (x, y) {
      var image = images[Math.floor(Math.random() * images.length)];
      var itemSize = getMobileSizes("item");
      return new Rectangle({
        x: x,
        y: y,
        w: itemSize.w,
        h: itemSize.h,
        options: {
          render: {
            sprite: {
              texture: image.img,
              xScale: isMobile ? image.scaleMobile.xScale : image.scale.xScale,
              yScale: isMobile ? image.scaleMobile.yScale : image.scale.yScale,
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
    w: isMobile ? 150 : 300,
    h: isMobile ? 130 : 200,
    bodyRestitution: 0.5,
    options: {
      render: {
        fillStyle: "transparent",
      },
    },
    animationOptions: {
      imageSrc: "/img/dog-run.png",
      framesMax: 8,
      scale: isMobile ? 3 : 4,
      framesHold: 5,
      offset: {
        x: 130,
        y: 50,
      },
    },
    isStatic: false,
  });
}
let force = false;
function startLoop() {
  requestAnimationFrame(startLoop);
  Engine.update(engine);
  husky.update();
  husky.body.friction = 0;
  husky.body.mass = isMobile ? 35 : 30;
  if (
    husky.body.position.x > canvas.width / 2 - (isMobile ? 160 : 100) &&
    !force
  ) {
    Body.applyForce(
      husky.body,
      { x: husky.body.position.x, y: husky.body.position.y },
      { x: 0, y: isMobile ? -1.3 : -1.5 }
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
      width: Math.min(document.documentElement.clientWidth, document.documentElement.clientWidth),
      height: Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight),
      wireframes: false,
      render: {
        sprite: {},
      }, // <-- important
    },
  });
  world = engine.world;

  widths = {
    pc: {
      mobile: {
        w: 100,
        h: 70,
        xScale: 0.3,
        yScale: 0.3,
      },
      desktop: {
        w: 150,
        h: 130,
        xScale: 0.5,
        yScale: 0.5,
      },
    },
    table: {
      mobile: {
        x: canvas.width - 100,
        y: canvas.height - 50,
        w: 200,
        h: 150,
        xScale: 0.5,
        yScale: 0.7,
      },
      desktop: {
        x: canvas.width - 300,
        y: canvas.height - 100,
        w: 400,
        h: 175,
        xScale: 0.8,
        yScale: 0.9,
      },
    },
    item: {
      mobile: {
        w: 50,
        h: 35,
      },
      desktop: {
        w: 50,
        h: 50,
      },
    },
  };
}

init();
function checkMobile() {
  if (window.matchMedia("(max-width: 667px)").matches) {
    isMobile = true;
  } else {
    isMobile = false;
  }
}
function getMobileSizes(key) {
  return isMobile ? widths[key].mobile : widths[key].desktop;
}
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  checkMobile();
});
