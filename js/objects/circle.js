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
      this.framesHold = 5;
      this.offset = animationOptions.offset;
    }

    if (disablePhysics) {
      this.body.collisionFilter = {
        group: -1,
        category: 2,
        mask: 0,
      };
    }
    Matter.World.add(world, this.body);
    try {
      this.image = new Image();
      this.image.src = this.imageSrc;
    } catch (error) {
      console.log("no se pudo construir la imagen");
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
        this.framesCurrent = 0;
      }
    }
  }
  update() {
    this.drawImage();
    this.animateFrames();
    Matter.Engine.update(engine);
  }
}
