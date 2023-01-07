
type MenuRenderProps = { menuKind: 'start' } | { menuKind: 'end', isWin: boolean }

export class MenuDOM {

  private _elemenetDOM: HTMLElement

  onStartGame: () => unknown

  onRestartGame: () => unknown

  constructor() {

  }

  render({ menuKind }: MenuRenderProps) {
    const wrapper = document.createElement('div')

    wrapper.innerHTML = menuKind === 'start' 
      ? this.startTemplate
      : this.winTemplate

    this._elemenetDOM = wrapper.firstElementChild as HTMLElement

    const buttonDOM = this._elemenetDOM.querySelector('button') as HTMLButtonElement

    buttonDOM.onclick = () => {
      this._elemenetDOM.remove()

      menuKind === 'start' 
        ? this.onStartGame?.()
        : this.onRestartGame?.()
    }

    document.body.append(this._elemenetDOM)
  }

  startTemplate = /*html*/`
    <div class='menu'>
      ИГРА
      <button>НАЧАТЬ</button>
    </div>
  `

  winTemplate = /*html*/`
    <div class='menu'>
      ПОБЕДА!
      <button>Играть снова!</button>
    </div>
  `



}