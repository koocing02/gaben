/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import AnimePotato from '../sprites/AnimePotato'

const playerScale = 1
let speed = 2
const walkVelocity = 150

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

    this.player = new AnimePotato({
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
    this.game.add.existing(this.player)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.enable([this.player, this.mushroom])

    this.player.animations.add('cycle')
    this.player.scale = {
      x: playerScale,
      y: playerScale
    }
    this.player.body.onCollide = new Phaser.Signal()
    this.player.body.onCollide.add((sprite1, sprite2) => {
      // this.player.animations.play('cycle', 10)
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
    const {player} = this
    const {body, scale} = player
    const {velocity} = body
    const {up, down, left, right} = this.cursors
    const {x, y} = velocity
    const slideFriction = 5
    let isWalking = false

    if (up.isDown) {
      velocity.y = -walkVelocity
      isWalking = true
    }
    if (down.isDown) {
      velocity.y = walkVelocity
      isWalking = true
    }
    if (left.isDown) {
      velocity.x = -walkVelocity
      isWalking = true
      scale.x = -1
    }
    if (right.isDown) {
      velocity.x = walkVelocity
      isWalking = true
      scale.x = 1
    }
    if (down.isUp && up.isUp) {
      if (y > 0) {
        velocity.y -= slideFriction
        if (y < 0) velocity.y = 0
      }
      if (y < 0) {
        velocity.y += slideFriction
        if (y > 0) velocity.y = 0
      }
    }
    if (left.isUp && right.isUp) {
      if (x > 0) {
        velocity.x -= slideFriction
        if (x < 0) velocity.x = 0
      }
      if (x < 0) {
        velocity.x += slideFriction
        if (x > 0) velocity.x = 0
      }
    }
    if (isWalking) {
      this.player.animations.play('cycle', 8)
    } else {
      this.player.frame = 0
      this.player.animations.stop()
      // if (x > 0) {
      //   velocity.x -= slideFriction
      //   if (x < 0) velocity.x = 0
      // }
      // if (x < 0) {
      //   velocity.x += slideFriction
      //   if (x > 0) velocity.x = 0
      // }
      // if (y > 0) {
      //   velocity.y -= slideFriction
      //   if (y < 0) velocity.y = 0
      // }
      // if (y < 0) {
      //   velocity.y += slideFriction
      //   if (y > 0) velocity.y = 0
      // }
    }

    this.game.physics.arcade.collide(this.player, this.mushroom, (sprite1, sprite2) => {
      // console.log(sprite1, sprite2)
    })
  }

  render () {
    if (__DEV__) {
      this.game.debug.bodyInfo(this.player, 16, 24)
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
