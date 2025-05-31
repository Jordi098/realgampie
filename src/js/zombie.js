import { Actor, Vector, randomInRange, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js"
import { Bullet } from "./bullet.js"
import { Enemy } from "./enemy.js"

export class Zombie extends Enemy {
    type
    speed
    constructor(type = "slow"){
        const health = type === "slow" ? 2 : 1;
        const damage = type === "slow" ? 2 : 1;
        super(health, damage);
        
        this.scale = new Vector(0.1, 0.1);
        this.type = type
        this.speed = type === "slow" ? 50 : 100;
        this.graphics.use(Resources.Zombie.toSprite());
        this.#resetPosition();
    }

    #resetPosition() {
        this.pos = new Vector(
            randomInRange(1300, 1500),
            randomInRange(50, 950)
        );
    }

    onPostUpdate(engine) {
        const player = engine.currentScene.player;
        if (player) {
            const direction = player.pos.sub(this.pos).normalize();
            this.vel = direction.scale(this.speed);
        }
    }

    onInitialize() {
        this.on('collisionstart', (event) => this.handleCollision(event));
    }

    handleCollision(event) {
        if (event.other.owner instanceof Bullet) {
            console.log("Zombie geraakt door kogel!");
            event.other.owner.kill();
            this.takeDamage(event.other.owner.damage);
    
            if (this.scene && this.scene.player) {
                this.scene.player.addScore(10);
            }
        }
        
        if (event.other.owner instanceof Player) {
            event.other.owner.takeDamage(this.damage);
            this.kill();
        }
    }
}