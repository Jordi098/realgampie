import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Zombie } from "./zombie.js";
import { Player } from "./player.js";
import { UIManager } from "./ui.js";

export class Bullet extends Actor {
    constructor(x, y, direction) {
        super({
            width: 500,
            height: 250,
            collisionType: CollisionType.Active
        });

        this.sprite = Resources.Bullet.toSprite();
        if (direction === -1) {
            this.sprite.flipHorizontal = true;
        }

        this.graphics.use(this.sprite);
        this.pos = new Vector(x + (direction === 1 ? 40 : -40), y + 15);
        this.vel = new Vector(300 * direction, 0);
        this.scale = new Vector(0.07, 0.07);
        this.damage = 2;

        this.on("exitviewport", () => this.kill());
        this.on("collisionstart", (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other.owner instanceof Zombie) {
            event.other.owner.takeDamage(this.damage);

            if (this.scene.player) {
                this.scene.player.addScore(10);
            }

            this.kill();
        }
    }
}
