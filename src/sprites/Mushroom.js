import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.centerX = x
    this.centerY = y
    this.anchor.setTo(0.5)
    this.circleBasis = 0
  }

  update () {
    this.circleBasis += 0.065
    const scaleFactor = 4
    this.x = (scaleFactor * Math.cos(this.circleBasis)) + this.centerX
    this.y = (scaleFactor * Math.sin(this.circleBasis)) + this.centerY
    this.angle += 10
  }
}
