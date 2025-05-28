import { Camera, Vector } from "excalibur"
import { Player } from "./player.js"

export class CameraManager extends Camera{
    constructor(engine, targetActor) {
        this.engine = engine
        this.target = targetActor
        this.zoomLevel = 1.0

    }

    initialize() {
        // Camera volgt de speler volgens Excalibur documentatie
        this.engine.camera.strategy.lockToActor(this.target)
        this.engine.camera.zoom = this.zoomLevel;

    }

    setZoom(zoom) {
        this.zoomLevel = zoom
        this.engine.camera.zoom = zoom
    }
}