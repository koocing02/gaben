import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.spritesheet('a-potato', 'assets/images/boywalking.png', 64, 64, 8)
    this.load.audio('explosion', 'assets/audio/explosion.mp3')
  }

  create () {
    this.state.start('Game')
  }
}
