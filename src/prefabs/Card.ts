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
    this.scene.add.existing(this)

    this.setInteractive()
  }

  flip(): Promise<void> {
    let animationResolver: (value: unknown) => void = () => null

    const show = () => {
      const texture = this.isOpened
        ? 'card' + this.id
        : 'card'

      this.setTexture(texture)
      this.scene.tweens.add({
        targets: this,
        scaleX: 1,
        ease: 'Linear',
        duration: 150,
        onComplete: animationResolver
      })
    }

    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: 'Linear',
      duration: 150,
      onComplete: show
    })

    return new Promise((resolve) => animationResolver = resolve)
  }

  async openCard() {
    this._isOpened = true
    await this.flip()
  }

  async closeCard() {
    this._isOpened = false
    await this.flip()
  }
}