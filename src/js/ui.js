import { Actor, Label, Color, Font, Vector } from "excalibur"
import { Player } from "./player.js"

export class UIManager extends Actor {
    scoreLabel
    healthLabel
    ammoLabel
    player
    constructor(player) {
        super();
        this.player = player;

        this.highScore = localStorage.getItem('highScore') || 0;

        this.scoreLabel = new Label({
            text: `Score: ${player.score}`,
            pos: new Vector(20, 20),
            font: new Font({ size: 24, color: Color.White })
        });

        this.highScoreLabel = new Label({
            text: `High Score: ${this.highScore}`,
            pos: new Vector(20, 50),
            font: new Font({ size: 24, color: Color.Yellow })
        });

        this.healthLabel = new Label({
            text: `Health: ${player.health}`,
            pos: new Vector(20, 80),
            font: new Font({ size: 24, color: Color.White })
        });

        this.ammoLabel = new Label({
            text: `Ammo: ${player.ammo}`,
            pos: new Vector(20, 110),
            font: new Font({ size: 24, color: Color.White })
        });
    }
    onInitialize(engine) {
        engine.add(this.scoreLabel);
        engine.add(this.highScoreLabel);
        engine.add(this.healthLabel);
        engine.add(this.ammoLabel);
    }
    updateScore(score) {
        this.scoreLabel.text = `Score: ${score}`;
        
        if (score > this.highScore) {
            this.highScore = score;
            localStorage.setItem('highScore', this.highScore);
            this.highScoreLabel.text = `High Score: ${this.highScore}`;
        }
    }
    updateHealth(health) {
        this.healthLabel.text = `Health: ${health}`;
    }

    updateAmmo(ammo) {
        this.ammoLabel.text = `Ammo: ${ammo}`;
    }
}