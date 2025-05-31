import { Actor, Vector, CollisionType } from "excalibur";

export class Enemy extends Actor {
    constructor(health, damage) {
        super({ 
            collisionType: CollisionType.Active,
            width: 400,
            height: 900,
            anchor: Vector.Half
        });
        this.health = health;
        this.damage = damage;
    }
    
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.kill();
        }
    }
}