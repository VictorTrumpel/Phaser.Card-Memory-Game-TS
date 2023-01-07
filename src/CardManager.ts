import { Scene, Utils } from 'phaser'
import { Card } from './prefabs/Card'
import { CardPosition } from './prefabs/Card'
import gameSettings from './gameSettings'

export class CardManager {
  private _scene: Scene

  private prevOpenedCard: Card | null = null

  public guessedPairsCount = 0

  constructor(scene: Scene) {
    this._scene = scene
  }

  async openCard(card: Card) {
    if (card.isOpened) 
      return
    
    await card.openCard()

    if (!this.prevOpenedCard) {
      this.prevOpenedCard = card
      return
    } 

    if (this.prevOpenedCard.id === card.id) {
      this.guessedPairsCount += 1
    } else {
      Promise.all([
        this.prevOpenedCard.closeCard(), 
        card.closeCard()
      ])
    }

    this.prevOpenedCard = null
  }

  createCards() {
    const cardsIds = gameSettings.cards
    const randomCardIds = Utils.Array.Shuffle([...cardsIds, ...cardsIds])
    const positions = this.getCardsPositions()

    randomCardIds.forEach((cardId, idx) => {
      const postion = positions[idx]
      new Card(this._scene, {
        ...postion,
        id: cardId
      })
    })
  }

  private getCardsPositions() {
    const { rows, cols, screenWidth, screenHeight } = gameSettings

    const cardMargin = 4 

    const cardTexture = this._scene.textures.get('card').getSourceImage()

    const cardWidth = cardTexture.width + cardMargin
    const cardHeight = cardTexture.height + cardMargin

    const offsetX = (screenWidth - cardWidth * cols) / 2 + cardTexture.width / 2
    const offsetY = (screenHeight - cardHeight * rows) / 2 + cardTexture.height / 2

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