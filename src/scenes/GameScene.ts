import { Scene } from 'phaser'
import { CardManager } from '../CardManager'
import { Card } from '../prefabs/Card'
import { MenuDOM } from '../MenuDOM'
export class GameScene extends Scene {

  private _cardManager: CardManager

  private _menuDOM: MenuDOM

  onAllCardsOpen = () => {
    this._menuDOM.render({ menuKind: 'end', isWin: true })
  }

  onCardClicked = (_: unknown, card: unknown) => {
    if (card instanceof Card)
      this._cardManager.openCard(card)
  }

  onStartGame = () => this._cardManager.createCards()

  onRestartGame = () => this.scene.restart({ isRestart: true })

  constructor() {
    super('GameScene')

    this._cardManager = new CardManager(this)

    this._menuDOM = new MenuDOM()
  }

  create(data?: { isRestart?: boolean }) {
    this.createBg()

    data?.isRestart 
      ? this.onStartGame()
      : this._menuDOM.render({ menuKind: 'start' })
  
    this.initEvents()
  }

  createBg() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0)
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onCardClicked)
    this._cardManager.onAllCardsOpen = this.onAllCardsOpen
    this._menuDOM.onStartGame = this.onStartGame
    this._menuDOM.onRestartGame = this.onRestartGame
  }
}