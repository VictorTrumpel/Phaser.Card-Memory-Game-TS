import { GameObjects } from 'phaser'
import { Scene } from 'phaser'

export type CardPosition = {
  x: number
  y: number
}

type CardProps = CardPosition & { id: number }

export class Card extends GameObjects.Sprite {
  readonly id: number

  private _isOpened = false

  constructor(scene: Scene, props: CardProps) {
    const { x, y, id } = props

    super(scene, x, y, 'card')

    this.id = id

    this.init()
  }

  get isOpened() {
    return this._isOpened
  }

  init() {
    this.setOrigin(0, 0)

    this.scene.add.existing(this)

    this.setInteractive()
  }

  openCard() {
    this.setTexture('card' + this.id)
  }

}