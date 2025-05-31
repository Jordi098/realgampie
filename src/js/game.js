import '../css/style.css'
import { Engine, DisplayMode, randomInRange, Vector, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Bg } from './bg.js'
import { Zombie } from './zombie.js'
import { PowerUp } from './power-up.js'
import { CameraManager } from './camera-manager.js'
import { UIManager } from './ui.js'

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
        this.mainScene = new Scene();
        this.add('main', this.mainScene)

        this.zombieSpawnTimer = 0
        this.zombieSpawnInterval = 120
        this.powerUpSpawnTimer = 0
        this.powerUpSpawnInterval = 600
    }

    resetGame() {
        this.zombieSpawnTimer = 0;
        this.zombieSpawnInterval = 120;
        this.powerUpSpawnTimer = 0;
        this.powerUpSpawnInterval = 600;
        this.mainScene.clear();
        this.startGame();
    }

    startGame() {
        this.goToScene('main');

        const background = new Bg();
        this.mainScene.add(background);

        this.player = new Player(400, 225);
        this.mainScene.add(this.player);
        this.mainScene.player = this.player;

        this.cameraManager = new CameraManager(this, this.player, this.mainScene);
        this.cameraManager.initialize();
    }
    onPostUpdate(engine, delta) {
        super.onPostUpdate(engine, delta)

        this.zombieSpawnTimer++
        if (this.zombieSpawnTimer >= this.zombieSpawnInterval) {
            this.zombieSpawnTimer = 0
            this.#spawnZombie()

            if (this.zombieSpawnInterval > 30) {
                this.zombieSpawnInterval -= 1
            }
        }

        this.powerUpSpawnTimer++
        if (this.powerUpSpawnTimer >= this.powerUpSpawnInterval) {
            this.powerUpSpawnTimer = 0
            this.#spawnPowerUp()
        }
    }

    #spawnZombie() {
        const zombieType = Math.random() > 0.7 ? "fast" : "slow";
        const zombie = new Zombie(zombieType);

        const spawnSide = Math.floor(Math.random() * 4);
        let spawnX, spawnY;

        switch (spawnSide) {
            case 0:
                spawnX = -50;
                spawnY = randomInRange(50, 950);
                break;
            case 1:
                spawnX = 1550;
                spawnY = randomInRange(50, 950);
                break;
            case 2:
                spawnX = randomInRange(50, 1450);
                spawnY = -50;
                break;
            case 3:
                spawnX = randomInRange(50, 1450);
                spawnY = 1050;
                break;
        }

        zombie.pos = new Vector(spawnX, spawnY);
        this.mainScene.add(zombie);
    }

    #spawnPowerUp() {
        const type = Math.random() > 0.5 ? "health" : "ammo"
        const powerUp = new PowerUp(type)
        this.mainScene.add(powerUp)
    }
}

new Game()