import { Scene, Label, Color, Font, Vector, Keys } from "excalibur"
import { Player } from "./player.js"
import { Game } from "./game.js"

export class GameOverScreen extends Scene {
    score
    constructor(score) {
        super();
        this.score = score;
    }

    onInitialize(engine) {
        this.camera.clearAllStrategies();

        const gameOverLabel = new Label({
            text: 'GAME OVER',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 50),
            font: new Font({ size: 48, color: Color.White }),
            anchor: Vector.Half
        });
        const scoreLabel = new Label({
            text: `Score: ${this.score}`,
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 20),
            font: new Font({ size: 36, color: Color.White }),
            anchor: Vector.Half
        });
        const restartLabel = new Label({
            text: 'Press R to restart',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 80),
            font: new Font({ size: 24, color: Color.White }),
            anchor: Vector.Half
        });

        this.add(gameOverLabel);
        this.add(scoreLabel);
        this.add(restartLabel);

        this.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.R) {
                engine.goToScene('main');
                engine.currentScene.resetGame();
            }
        });
    }
}