class Circle {
  animations = {};
  constructor({
    x,
    y,
    r,
    isStatic = false,
    disablePhysics = false,
    animationOptions,
    options = {},
  }) {
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.body.restitution = 1;
    this.r = r;
    this.body.isStatic = isStatic;
    if (animationOptions) {
      this.imageSrc = animationOptions.imageSrc;
      this.framesMax = animationOptions.framesMax;
      this.scale = animationOptions.scale || 1;
      this.framesCurrent = 0;
      this.framesElapsed = 0;
      this.framesHold = animationOptions.framesHold || 5;
      this.offset = animationOptions.offset || { x: 0, y: 0 };
    }

    if (disablePhysics) {
      this.body.collisionFilter = {
        group: -1,
        category: 2,
        mask: 0,
      };
    }
    Matter.World.add(world, this.body);
    if (animationOptions && animationOptions.imageSrc) {
      try {
        this.image = new Image();
        this.image.src = this.imageSrc;
        this.image.onload = () => {
          this.imageLoaded = true;
        };
      } catch (error) {
        console.log("no se pudo construir la imagen");
      }
    }
  }
  drawImage() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.body.position.x - this.offset.x,
      this.body.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }
  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.animationEnded = true;
        this.framesCurrent = 0;
      }
    }
  }
  update() {
    try {
      if (this.imageLoaded) {
        this.drawImage();
        this.animateFrames();
      }
      //Matter.Engine.update(engine); //INNECESARIO
    } catch (error) {
      console.warn("No hay animaciones definidas", error);
    }
  }
  destroy() {
    Matter.World.remove(world, this);
  }
  isOffScreen() {
    let position = this.body.position;
    if (
      position.y > canvas.height + 100 ||
      position.x > canvas.width + 100 ||
      position.x < -100
    ) {
      return true;
    } else {
      return false;
    }
  }
}
