import { Actor, Engine, Keys, Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"

export class Player extends Actor {
    health
    score
    weapon
    experience
    level
    projectile
    sprite 

    constructor(x, y, level, experience) {
        super({ width: 400, height: 900, collisionType: CollisionType.Active })
        this.health = 10
        this.score
        this.projectile = 1
        this.pos = new Vector(x, y)
        this.scale = new Vector(0.1, 0.1)
        this.yspeed = 10
        this.xspeed = 10
        this.experience = 0
        this.level = 0

        if (this.projectile > 2) {
            this.weapon = "Shotgun"
            this.sprite = Resources.PlayerShotgun.toSprite()
        } else {
            this.weapon = "Pistol"
            this.sprite = Resources.PlayerPistol.toSprite()
        }

        this.graphics.use(this.sprite)  
    }

    onInitialize(engine) {
        //this.on('collisionstart', (event) => this.shot(event))
        this.sprite.flipHorizontal = false  
    }

    onPostUpdate(engine) {
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
        if (engine.input.keyboard.wasPressed(Keys.Spacebar)) {
            // Shoot()
        }

        this.vel = new Vector(xspeed, yspeed)
        // Debug: log de positie van de speler
        console.log('Player pos:', this.pos)
    }
}
