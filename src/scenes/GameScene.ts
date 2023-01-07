import { Scene, Utils } from 'phaser'
import { CardManager } from '../CardManager'
import { Card, CardPosition } from '../prefabs/Card'
import gameSettings from '../gameSettings'

export class GameScene extends Scene {

  private _isFinished = false
  private _cardManager: CardManager

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
  }
}