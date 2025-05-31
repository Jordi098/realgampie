import { Actor, Vector, randomInRange, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js"
import { Bullet } from "./bullet.js"
import { Enemy } from "./enemy.js"

export class Zombie extends Enemy {
    constructor(type = "slow"){
        const health = type === "slow" ? 2 : 1;
        const damage = type === "slow" ? 2 : 1;
        super(health, damage);
        
        this.scale = new Vector(0.1, 0.1);
        this.type = type;
        this.speed = type === "slow" ? 50 : 100;
        this.graphics.use(Resources.Zombie.toSprite());
        this.resetPosition();
    }

    resetPosition() {
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
        // Direct checken op Bullet type
        if (event.other instanceof Bullet) {
            console.log("Zombie geraakt door kogel!");
            event.other.kill();
            this.takeDamage(event.other.damage);
            
            // Geef score aan player als die bestaat
            if (this.scene && this.scene.player) {
                this.scene.player.addScore(10);
            }
        }
        
        // Direct checken op Player type
        if (event.other instanceof Player) {
            event.other.takeDamage(this.damage);
            this.kill();
        }
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(`Zombie health: ${this.health}`);

        if (this.health <= 0) {
            this.kill();
            console.log("Zombie died!");
        }
    }
}