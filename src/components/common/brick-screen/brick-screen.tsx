import {Component, h, Host, Prop, State} from "@stencil/core";
import {ICell} from "@global/types";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {screenHelpers} from "@global/helpers/screen";

@Component({
  tag: 'brick-screen',
  styleUrl: 'brick-screen.scss'
})
export class BrickScreen {
  private interval: any;
  @Prop() activeCells: ICell[] = [];
  @Prop() highlightedCells: ICell[] = [];
  @Prop() height = SCREEN_HEIGHT;
  @Prop() width = SCREEN_WIDTH;
  @State() showBlinkingCells = true;
  @State() screenCells: ICell[][] = [];

  componentWillLoad() {
    this.screenCells = this.getEmptyScreenCells();
    this.interval = setInterval(() => this.showBlinkingCells = !this.showBlinkingCells, 500);
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }
  
  getEmptyScreenCells() {
    const screen: ICell[][] = [];
    for (let y = this.height - 1; y >= 0; y--) {
      const row = screenHelpers.getRow(y, this.width);
      screen.push(row);
    }
    return screen;
  }

  renderCell({x, y}: ICell) {
    let isActive = this.activeCells?.some(c => c?.x === x && c?.y === y) || false;
    const isBlinking = this.activeCells?.some(c => c?.x === x && c?.y === y && c?.blink) || false;
    const highlighted = this.highlightedCells?.some(c => c?.x === x && c?.y === y) || false;
    if (isActive && isBlinking) {
      isActive = this.showBlinkingCells;
    }

    return (
      <brick-cell
        active={isActive}
        highlighted={highlighted}
        key={`cell_${x}_${y}`}
      />
    );
  }

  render() {
    return (
      <Host>
        {this.screenCells.map((row, y) => (
          <div class="brick-screen-row" key={`row_${y}`}>
            {row.map(this.renderCell.bind(this))}
          </div>
        ))}
      </Host>
    );
  }
}