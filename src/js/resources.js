import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Zombie: new ImageSource('images/zombie.png'),
    PlayerPistol: new ImageSource('images/playerPistol.png'),
    Player: new ImageSource('images/player.png'),
    PlayerShotgun: new ImageSource('images/playerShotgun.png'),
    BG: new ImageSource('images/bg.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Medkit: new ImageSource('images/medkit.png'),
    Ammo: new ImageSource('images/ammo.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }