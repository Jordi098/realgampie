import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from "./resources.js"

export class Zombie extends Actor {
    health
    damage

   constructor(health, damage) {
    const sprite = Resources.Zombie.toSprite()
    super({ width: sprite.width, height: sprite.height })
    this.health = health
    this.damage = damage
    this.graphics.use(sprite)
    this.pos = new Vector(randomInRange(0, 500), randomInRange(0, 300))
    this.events.on("exitviewport", (e) => this.zombieLeft(e))
}

    zombieLeft(e) {
        e.target.pos = new Vector(1300, randomInRange(0, 400))
    }

    takeDamage(amount) {
        this.health -= amount
        if (this.health <= 0) {
            this.kill()
        }
    }

    onPreKill() {
       
        if (this.onDeathCallback) {
            this.onDeathCallback(this)
        }
    }
}
