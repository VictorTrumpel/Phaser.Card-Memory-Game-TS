import { Game, Types } from 'phaser'
import { PreloadScene } from './scenes/PreloadScene'
import { GameScene } from './scenes/GameScene'
import gameSettings from './gameSettings'

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: gameSettings.screenWidth,
  height: gameSettings.screenHeight,
  backgroundColor: '#6e6666',
  scene: [
    PreloadScene,
    GameScene
  ],
}

new Game(config)