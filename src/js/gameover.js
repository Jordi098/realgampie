import { Scene, Label, Color, Font, Vector, Keys } from "excalibur"
import { Player } from "./player.js"
import { Game } from "./game.js"

export class GameOverScreen extends Scene {
    constructor(score) {
        super();
        this.score = score;
    }

    onInitialize(engine) {
        // Zorg dat de scene de volledige viewport bedekt
        this.camera.clearAllStrategies();

        // Game Over tekst
        const gameOverLabel = new Label({
            text: 'GAME OVER',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 50),
            font: new Font({ size: 48, color: Color.White }),
            anchor: Vector.Half
        });

        // Score weergave
        const scoreLabel = new Label({
            text: `Score: ${this.score}`,
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 20),
            font: new Font({ size: 36, color: Color.White }),
            anchor: Vector.Half
        });

        // Restart instructie
        const restartLabel = new Label({
            text: 'Press R to restart',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 80),
            font: new Font({ size: 24, color: Color.White }),
            anchor: Vector.Half
        });

        this.add(gameOverLabel);
        this.add(scoreLabel);
        this.add(restartLabel);

        // Restart functionaliteit
        this.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.R) {
                engine.goToScene('main');
                engine.currentScene.resetGame();
            }
        });
    }
}