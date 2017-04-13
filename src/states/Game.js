/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import AnimePotato from '../sprites/AnimePotato'

const playerScale = 1
let speed = 1.5

export default class extends Phaser.State {
  // do not know why I needed to add these manually for animation support...
  init () {
  }

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

    this.explosion = this.game.add.audio('explosion')

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.aPotato = new AnimePotato({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'a-potato'
      // scale : {
      //   x: playerScale,
      //   y: playerScale
      // }
    })

    this.game.add.existing(this.mushroom)
    this.game.add.existing(this.aPotato)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.enable([this.aPotato, this.mushroom])

    this.aPotato.animations.add('cycle')
    this.aPotato.scale = {
      x: playerScale,
      y: playerScale
    }
    this.aPotato.body.onCollide = new Phaser.Signal()
    this.aPotato.body.onCollide.add((sprite1, sprite2) => {
      // this.aPotato.animations.play('cycle', 10)
    })

    this.cursors = this.game.input.keyboard.createCursorKeys()
    // face1.body.velocity.setTo(200, 200);
    // face1.body.bounce.set(1);
    //
    // face2.body.velocity.setTo(-200, 200);
    // face2.body.bounce.set(1);
    //
    // face1.body.collideWorldBounds = true;
    // face2.body.collideWorldBounds = true;
  }

  update () {
    const {aPotato} = this

    const {up, down, left, right} = this.cursors
    let isWalking = false
    if (down.isDown) {
      aPotato.y += speed
      isWalking = true
    }
    if (up.isDown) {
      aPotato.y -= speed
      isWalking = true
    }
    if (left.isDown) {
      aPotato.x -= speed
      aPotato.scale.x = -playerScale
      isWalking = true
    }
    if (right.isDown) {
      aPotato.x += speed
      aPotato.scale.x = playerScale
      isWalking = true
    }
    if (isWalking) {
      this.aPotato.animations.play('cycle', 4)
    }

    if (!isWalking) {
      this.aPotato.animations.play('cycle', 0)
      this.aPotato.animations.stop()
    }
    this.game.physics.arcade.collide(this.aPotato, this.mushroom, (sprite1, sprite2) => {
      // console.log(sprite1, sprite2)
    })
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
