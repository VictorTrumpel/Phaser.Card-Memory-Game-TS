import { Scene, Utils } from 'phaser'
import { Card, CardPosition } from '../prefabs/Card'
import gameSettings from '../gameSettings'

export class GameScene extends Scene {

  isFinished = false

  onCardClicked = (_: unknown, card: Card) => {
    
    card.openCard()
    console.log('this :>> ', this)
  }

  constructor() {
    super('GameScene')
  }

  create() {
    this.createBg()
    this.createCards()
    this.initEvents()
  }

  createBg() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0)
  }

  createCards() {
    const cardsIds = gameSettings.cards
    const randomCardIds = Utils.Array.Shuffle([...cardsIds, ...cardsIds])
    const positions = this.getCardsPositions()

    randomCardIds.forEach((cardId, idx) => {
      const postion = positions[idx]
      new Card(this, {
        ...postion,
        id: cardId
      })
    })
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onCardClicked)
  }

  getCardsPositions() {
    const { rows, cols, screenWidth, screenHeight } = gameSettings

    const cardMargin = 4 

    const cardTexture = this.textures.get('card').getSourceImage()

    const cardWidth = cardTexture.width + cardMargin
    const cardHeight = cardTexture.height + cardMargin

    const offsetX = (screenWidth - cardWidth * cols) / 2
    const offsetY = (screenHeight - cardHeight * rows) / 2

    const rowsIds = Array.from({ length: rows }, (_, i) => i)
    const colsIds = Array.from({ length: cols }, (_, i) => i)

    const positions: CardPosition[] = []

    rowsIds.forEach(rowIdx => {
      colsIds.forEach(colIdx => {
        const x = offsetX + cardWidth * colIdx
        const y = offsetY + cardHeight * rowIdx

        positions.push({ x, y })
      })
    })

    return positions
  }

}