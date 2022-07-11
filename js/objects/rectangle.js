class Rectangle {
  constructor({
    x,
    y,
    w,
    h,
    isStatic = false,
    disablePhysics = false,
    bodyRestitution = 0.5,
    autoAdd = true,
    animationOptions,
    options = {},
  }) {
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    if (autoAdd) {
      Matter.World.add(world, this.body);
    }
    this.body.restitution = bodyRestitution;
    this.w = w;
    this.h = h;

    if (animationOptions) {
      this.imageSrc = animationOptions.imageSrc;
      this.framesMax = animationOptions.framesMax;
      this.scale = animationOptions.scale || 1;
      this.framesCurrent = 0;
      this.framesElapsed = 0;
      this.framesHold = animationOptions.framesHold || 5;
      this.offset = animationOptions.offset || { x: 0, y: 0 };
    }
    if (isStatic) {
      Matter.Body.setStatic(this.body, true);
    }
    if (disablePhysics) {
      this.body.collisionFilter = {
        group: -1,
        category: 2,
        mask: 0,
      };
    }
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
  destroy() {
    Matter.World.remove(world, this);
  }
  isOffScreen() {
    let position = this.body.position;
    if (position.y > canvas.height + 100) {
      return true;
    } else {
      return false;
    }
  }
}
