
type MenuRenderProps = { menuKind: 'start' | 'end',  isWin?: boolean}

export class MenuDOM {

  private _elemenetDOM: HTMLElement

  onStartGame: () => unknown

  onRestartGame: () => unknown

  render({ menuKind, isWin }: MenuRenderProps) {
    const wrapper = document.createElement('div')

    wrapper.innerHTML = menuKind === 'start' 
      ? this.startTemplate
      : this.restartTemplate(Boolean(isWin))

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
      <span>ИГРА</span>
      <button>НАЧАТЬ</button>
    </div>
  `

  restartTemplate = (isWin: boolean) => /*html*/`
    <div class='menu'>
      <span>${isWin ? 'ПОБЕДА!' : 'ПОРАЖЕНИЕ!'}</span>
      <button>Играть снова!</button>
    </div>
  `

}