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
    })

    this.cursors = this.game.input.keyboard.createCursorKeys()
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
    }

    this.game.physics.arcade.collide(this.player, this.mushroom, (sprite1, sprite2) => {
    })
  }

  render () {
    if (__DEV__) {
      this.game.debug.bodyInfo(this.player, 16, 24)
    }
  }
}
