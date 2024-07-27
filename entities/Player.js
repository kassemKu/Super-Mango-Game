export class Player {
  heightDelta = 0;
  isMoving = false;
  isRespawning = false;
  coyoteLapse = 0.1;
  coins = 0;
  constructor(
    posX,
    posY,
    speed,
    jumpForce,
    nblives,
    currentLevelScene,
    isInFinalLevel
  ) {
    this.isInFinalLevel = isInFinalLevel;
    this.currentLevelScene = currentLevelScene;
    this.initialX = posX;
    this.initialY = posY;
    this.makePlayer();
    this.setPlayerControls();
    this.speed = speed;
    this.jumpForce = jumpForce;
    this.lives = nblives;
    this.previousHeight = this.gameObj.pos.y;
  }

  makePlayer() {
    this.gameObj = add([
      sprite("player", { anim: "idle" }),
      area({ shape: new Rect(vec2(0, 3), 8, 8) }),
      anchor("center"),
      pos(this.initialX, this.initialY),
      scale(4),
      body(),
      "player",
    ]);
  }

  enablePassthrough() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution();
      }
      if (collision.target.is("passthrough") && isKeyDown("down")) {
        collision.preventResolution();
      }
    });
  }

  enableCoinPickUp() {
    this.gameObj.onCollide("coin", (coin) => {
      this.coins++;
      destroy(coin);
      play("coin");
    });
  }

  setPlayerControls() {
    onKeyDown("left", () => {
      if (this.gameObj.paused) return;
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run");
      this.gameObj.flipX = true;
      if (!this.isRespawning) this.gameObj.move(-this.speed, 0);
      this.isMoving = true;
    });

    onKeyDown("right", () => {
      if (this.gameObj.paused) return;
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run");
      this.gameObj.flipX = false;
      if (!this.isRespawning) this.gameObj.move(this.speed, 0);
      this.isMoving = true;
    });

    onKeyDown("space", () => {
      if (this.gameObj.isGrounded() && !this.isRespawning) {
        this.hasJumpedOnce = true;
        this.gameObj.jump(this.jumpForce);
        play("jump");
      }

      //coyote time
      if (
        !this.gameObj.isGrounded() &&
        time() - this.timeSinceLastGrounded < this.coyoteLapse &&
        !this.hasJumpedOnce
      ) {
        this.hasJumpedOnce = true;
        this.gameObj.jump(this.jumpForce);
        play("jump");
      }
    });

    onKeyRelease(() => {
      if (this.gameObj.paused) return;
      if (isKeyReleased("right") || isKeyReleased("left")) {
        this.gameObj.play("idle");
        this.isMoving = false;
      }
    });
  }

  respawnPlayer() {
    if (this.lives > 0) {
      this.gameObj.pos = vec2(this.initialX, this.initialY);
      this.lives--;
      this.isRespawning = true;
      setTimeout(() => (this.isRespawning = false), 1000);
      return;
    }

    go("gameover");
  }

  enableMobVunerability() {
    function hitAndRespawn(context) {
      play("hit", { speed: 1.5 });
      context.respawnPlayer();
    }
    this.gameObj.onCollide("spiders", () => hitAndRespawn(this));
  }

  update() {
    onUpdate(() => {
      if (this.gameObj.isGrounded()) {
        this.hasJumpedOnce = false;
        this.timeSinceLastGrounded = time();
      }

      this.heightDelta = this.previousHeight - this.gameObj.pos.y;
      this.previousHeight = this.gameObj.pos.y;

      if (!this.isMoving && this.gameObj.curAnim() !== "idle") {
        this.gameObj.play("idle");
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta > 0 &&
        this.gameObj.curAnim() !== "jump-up"
      ) {
        this.gameObj.play("jump-up");
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta < 0 &&
        this.gameObj.curAnim() !== "jump-down"
      ) {
        this.gameObj.play("jump-down");
      }

      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 });
        this.respawnPlayer();
      }
    });
  }

  updateLives(livesCountUI) {
    onUpdate(() => {
      livesCountUI.text = this.lives;
    });
  }

  updateCoinCount(coinCountUI) {
    onUpdate(() => {
      coinCountUI.text = ` ${this.coins} / ${coinCountUI.fullCoinCount}`;
      if (this.coins === coinCountUI.fullCoinCount) {
        go(this.isInFinalLevel ? "end" : this.currentLevelScene + 1);
      }
    });
  }
}
