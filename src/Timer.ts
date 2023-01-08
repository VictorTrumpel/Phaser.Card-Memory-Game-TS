import { Scene, GameObjects } from 'phaser'

type TimerProps = {
  x: number
  y: number
  maxTime: number
}

export class Timer {
  private _scene: Scene
  private _text: GameObjects.Text
  private _position: { x: number, y: number }
  private _time: number

  onTimeIsOver: () => unknown | null

  constructor(scene: Scene, props: TimerProps) {
    const { x, y, maxTime } = props

    this._scene = scene
    this._position = { x, y }
    this._time = maxTime

    this.init()
  }

  start() {
    this._scene.time.paused = false
    
    this._scene.time.addEvent({
      delay: 1000,
      callback: this.tick,
      callbackScope: this,
      loop: true,
    })
  }

  stop() {
    this._scene.time.paused = true
  }

  private init() {
    this.createText()
  }

  private tick() {
    this._time -= 1
    this._text.text = `Time: ${this._time}`
    if (this._time === 0) {
      this.onTimeIsOver?.()
      this._scene.time.paused = true
    }
  }

  private createText() {
    this._text = this._scene.add.text(
      this._position.x, 
      this._position.y,
      `Time: ${this._time}`,
      {
        fontSize: '25px'
      }
    )
  }
}