/**
 * Created by Carson on 4/11/2017.
 */
import Phaser from 'phaser'

export default class AnimePotato extends Phaser.Sprite {
  constructor ({game, x, y, asset}) {
    super(game, x, y, asset)
    this.centerX = x
    this.centerY = y
    this.anchor.setTo(0.5)
    this.circleBasis = 0
  }

  update () {
  }
}
