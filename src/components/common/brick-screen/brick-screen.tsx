import {Component, h, Host, Prop, State} from "@stencil/core";
import {ICell} from "@global/types";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {screenHelpers} from "@global/helpers/screen";
import {objectHelpers} from "@global/helpers/objects";

@Component({
  tag: 'brick-screen',
  styleUrl: 'brick-screen.scss'
})
export class BrickScreen {
  private interval: any;
  private blinkInterval = 500;
  
  @Prop() activeCells: ICell[] = [];
  @Prop() highlightedCells: ICell[] = [];
  @Prop() height = SCREEN_HEIGHT;
  @Prop() width = SCREEN_WIDTH;
  @State() showBlinkingCells = true;
  @State() screenCells: ICell[][] = [];

  componentWillLoad() {
    this.screenCells = this.getEmptyScreenCells();
    this.interval = setInterval(() => this.showBlinkingCells = !this.showBlinkingCells, this.blinkInterval);
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

  renderCell(cell: ICell) {
    const {x, y} = cell;
    let isActive = objectHelpers.isObjectCell(this.activeCells, cell) || false;
    const isBlinking = objectHelpers.getCell(this.activeCells, x, y)?.blink || false;
    const highlighted = objectHelpers.isObjectCell(this.highlightedCells, cell);
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