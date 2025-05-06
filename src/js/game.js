import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, randomInRange } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 800,
            height: 450,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const bg = new Actor()
        bg.graphics.use(Resources.BG.toSprite())
        this.add(bg)
        for (let i = 0; i < 30; i++) {
            const fish = new Actor()
            fish.graphics.use(Resources.Fish.toSprite())
            fish.pos = new Vector(randomInRange(0, 500), randomInRange(0, 300))
            fish.vel = new Vector(randomInRange(-200, 0), randomInRange(0, 20))
            fish.events.on("exitviewport", (e) => this.fishLeft(e))
            this.add(fish)
        }
    }

    fishLeft(e) {
        e.target.pos = new Vector(1350, 300)
    }
}

new Game()
