/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import AnimePotato from '../sprites/AnimePotato'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.aPotato = new AnimePotato({
      game: this,
      x: this.world.centerX + 100,
      y: this.world.centerY + 20,
      asset: 'a-potato'
    })
    // this is a comment
    this.game.physics.enable(this.aPotato, Phaser.Physics.ARCADE)
    this.game.physics.enable(this.mushroom, Phaser.Physics.ARCADE)
    this.game.add.existing(this.mushroom)
    this.game.add.existing(this.aPotato)
  }

  update () {
    console.log('tick!')
    this.game.physics.arcade.collide(this.aPotato, this.mushroom)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
