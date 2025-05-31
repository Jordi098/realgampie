import { Actor, Vector, randomInRange, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js"

export class PowerUp extends Actor {
    type

    constructor(type) {
        super({
            width: 500,
            height: 500,
            collisionType: CollisionType.Passive
        });

        this.type = type;
        this.pos = new Vector(
            randomInRange(100, 1400),
            randomInRange(100, 900)
        );
        this.scale = new Vector(0.1, 0.1);

        if (type === "health") {
            this.graphics.use(Resources.Medkit.toSprite());
        } else if (type === "ammo") {
            this.graphics.use(Resources.Ammo.toSprite());
        }
        this.on("collisionstart", (event) => this.collect(event));
    }
    collect(event) {
        if (event.other.owner instanceof Player) {
            if (this.type === "health") {
                event.other.owner = Math.min(10, event.other.health + 3);
            } else if (this.type === "ammo") {
                event.other.owner.ammo += 5;
            }
            this.kill();
        }
    }
}