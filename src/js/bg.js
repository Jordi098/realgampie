import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Bg extends Actor {
    constructor() {
        super({
            pos: new Vector(0, 0),
            anchor: new Vector(0, 0),
            width: 3000,
            height: 2000
        })
        const sprite = Resources.BG.toSprite()
        this.graphics.use(sprite)
        this.scale = new Vector(1, 1)
    }
}