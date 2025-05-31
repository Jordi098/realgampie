import { BoundingBox, CollisionType, Vector } from "excalibur";


export class CameraManager{
    constructor(engine, targetActor, scene) {
        this.engine = engine;
        this.target = targetActor;
        this.scene = scene;
        this.zoomLevel = 1.0;
    }

    initialize() {
        this.scene.camera.strategy.lockToActor(this.target);
        this.scene.camera.zoom = this.zoomLevel;
        this.#setBounds();

    }

    setZoom(zoom) {
        this.zoomLevel = zoom;
        this.scene.camera.zoom = zoom;
    }

    #setBounds() {
        this.scene.camera.strategy.limitCameraBounds(
            new BoundingBox(0, 0, 1536, 1024)
        );
    }
}
