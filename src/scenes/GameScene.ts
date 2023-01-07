import { Scene } from 'phaser'
import { CardManager } from '../CardManager'
import { Card } from '../prefabs/Card'
export class GameScene extends Scene {

  private _cardManager: CardManager

  onAllCardsOpen = () => {
    this.scene.restart()
  }

  onCardClicked = (_: unknown, card: unknown) => {
    if (card instanceof Card)
      this._cardManager.openCard(card)
  }

  constructor() {
    super('GameScene')

    this._cardManager = new CardManager(this)
  }

  create() {
    this.createBg()

    this._cardManager.createCards()

    this.initEvents()
  }

  createBg() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0)
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onCardClicked)
    this._cardManager.onAllCardsOpen = this.onAllCardsOpen
  }
}