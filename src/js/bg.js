import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Bg extends Actor {
    #sprite
    constructor() {
        super({
            pos: new Vector(0, 0),
            anchor: new Vector(0, 0),
            width: 1536,
            height: 1024
        })
        this.#sprite = Resources.BG.toSprite()
        this.graphics.use(this.#sprite);
        this.scale = new Vector(1, 1)
    }
}