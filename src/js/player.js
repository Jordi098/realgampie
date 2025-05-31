import { Actor, Engine, Keys, Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Bullet } from "./bullet.js"
import { Zombie } from "./zombie.js"
import { UIManager } from "./ui.js"
import { GameOverScreen } from "./gameover.js"


export class Player extends Actor {
    health
    score
    ammo
    #sprite
    uiManager

    constructor(x, y) {
        super({ width: 400, height: 900, collisionType: CollisionType.Active, anchor: Vector.Half })
        this.health = 10
        this.score = 0
        this.ammo = 10
        this.pos = new Vector(x, y)
        this.scale = new Vector(0.1, 0.1)

        this.#sprite = Resources.PlayerPistol.toSprite()
        this.graphics.use(this.#sprite)
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.handleCollision(event));

        this.uiManager = new UIManager(this);
        engine.add(this.uiManager);
    }

    handleCollision(event) {
        if (event.other.owner instanceof Zombie) {
            this.takeDamage(event.other.owner.damage);
        }
    }

    takeDamage(amount) {
        this.health -= amount;
        this.uiManager.updateHealth(this.health);
        if (this.health <= 0) {
            this.uiManager.updateScore(this.score);

            this.kill();
            const gameOver = new GameOverScreen(this.score);

            const game = this.scene.engine;
            game.addScene('gameover', gameOver);
            game.goToScene('gameover');

            game.input.keyboard.on('press', (evt) => {
                if (evt.key === Keys.R) {
                    game.goToScene('main');
                    game.resetGame();
                }
            });
        }
    }

    addScore(amount) {
        this.score += amount;
        this.uiManager.updateScore(this.score);
    }

    #Shoot() {
        if (this.ammo <= 0) {
            console.log("No ammo left!");
            return;
        }
        this.ammo--;
        this.uiManager.updateAmmo(this.ammo);

        const direction = this.sprite.flipHorizontal ? -1 : 1;
        this.scene.engine.mainScene.add(new Bullet(this.pos.x, this.pos.y, direction));
    }

    onPostUpdate(engine) {
        if (this.projectile > 2) {
            this.weapon = "Shotgun"
            this.sprite = Resources.PlayerShotgun.toSprite()
        } else {
            this.weapon = "Pistol"
            this.sprite = Resources.PlayerPistol.toSprite()
        }
        this.graphics.use(this.sprite)
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -100
            this.sprite.flipHorizontal = true
        }
        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 100
            this.sprite.flipHorizontal = false
        }
        if (engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -100
        }
        if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 100
        }
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.#Shoot()
        }

        this.vel = new Vector(xspeed, yspeed)
        const halfWidth = this.width * this.scale.x / 2
        const halfHeight = this.height * this.scale.y / 2

        const minX = 25 + halfWidth
        const maxX = 1501 - halfWidth
        const minY = 40 + halfHeight
        const maxY = 988 - halfHeight

        // grens
        this.pos.x = Math.max(minX, Math.min(this.pos.x, maxX))
        this.pos.y = Math.max(minY, Math.min(this.pos.y, maxY))
    }
}
