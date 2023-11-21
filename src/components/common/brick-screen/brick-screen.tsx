import {Component, h, Host, Prop, State} from "@stencil/core";
import {ICell} from "@global/types";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {cellHelpers} from "@global/helpers/cells";

@Component({
  tag: 'brick-screen',
  styleUrl: 'brick-screen.scss'
})
export class BrickScreen {
  private interval: any;
  @Prop() activeCells: ICell[] = [];
  @Prop() height = SCREEN_HEIGHT;
  @Prop() width = SCREEN_WIDTH;
  @State() showBlinkingCells = true;
  @State() screenCells: ICell[][] = cellHelpers.getEmptyScreenCells(this.width, this.height);

  componentWillLoad() {
    this.screenCells = cellHelpers.getEmptyScreenCells(this.width, this.height);
    this.interval = setInterval(() => this.showBlinkingCells = !this.showBlinkingCells, 500);
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }

  renderCell({x, y}: ICell) {
    let isActive = this.activeCells?.some(c => c?.x === x && c?.y === y) || false;
    const isBlinking = this.activeCells?.some(c => c?.x === x && c?.y === y && c?.blink) || false;

    if (isActive && isBlinking) {
      isActive = this.showBlinkingCells;
    }

    return (
      <brick-cell
        active={isActive}
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