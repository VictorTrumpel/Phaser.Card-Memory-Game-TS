import { Scene } from 'phaser'
import { CardManager } from '../CardManager'
import { Card } from '../Card'
import { MenuDOM } from '../MenuDOM'
import { Timer } from '../Timer'
import gameSettings from '../gameSettings'
export class GameScene extends Scene {

  private _cardManager: CardManager

  private _menuDOM: MenuDOM

  private _timer: Timer

  onAllCardsOpen = () => {
    this._menuDOM.render({ menuKind: 'end', isWin: true })
    this._timer.stop()
  }

  onTimeIsOver = () => {
    this._menuDOM.render({ menuKind: 'end', isWin: false })
  }

  onRestartGame = () => this.scene.restart({ isRestart: true })

  onCardClicked = (_: unknown, card: unknown) => {
    if (card instanceof Card)
      this._cardManager.openCard(card)
  }

  onStartGame = async () => {
    await this._cardManager.createCards()
    this._timer.start()
    this.input.on('gameobjectdown', this.onCardClicked)
  }

  constructor() {
    super('GameScene')
  }

  create(data?: { isRestart?: boolean }) {
    this._cardManager = new CardManager(this)

    this._menuDOM = new MenuDOM()

    this._timer = new Timer(this, {
      maxTime: 30,
      x: gameSettings.screenWidth / 2 - 55, 
      y: 10 
    })

    data?.isRestart 
      ? this.onStartGame()
      : this._menuDOM.render({ menuKind: 'start' })
  
    this.initEvents()
  }

  initEvents() {
    
    this._cardManager.onAllCardsOpen = this.onAllCardsOpen
    this._menuDOM.onStartGame = this.onStartGame
    this._menuDOM.onRestartGame = this.onRestartGame
    this._timer.onTimeIsOver = this.onTimeIsOver
  }
}