// game.js
import '../css/style.css'
import { Engine, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Bg } from './bg.js'
import { CameraManager } from './camera-manager.js'

export class Game extends Engine {
    constructor() {
        super({
            width: 800,
            height: 450,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(true)
    }

    startGame() {
        console.log("Game started!")

        const background = new Bg()
        background.graphics.use(Resources.BG.toSprite())
        this.add(background)

        const player = new Player(400, 225)
        this.add(player)
        this.cameraManager = new CameraManager(this, player)
        this.cameraManager.initialize()

        // Stel camera-bounds in zodat de camera niet buiten de BG kan
        const left = 0 + this.drawWidth / 2;
        const top = 0 + this.drawHeight / 2;
        const right = 3000 - this.drawWidth / 2;
        const bottom = 2000 - this.drawHeight / 2;
        this.camera.bounds.setTo(left, top, right, bottom);
    }
}

new Game()