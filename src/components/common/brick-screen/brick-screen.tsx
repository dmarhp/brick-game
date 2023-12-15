import {Component, Element, h, Host, Prop, State, Watch} from "@stencil/core";
import {ICell} from "@global/types";
import {CELL_BLINK_INTERVAL, SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {screenHelpers} from "@global/helpers/screen";
import {objectHelpers} from "@global/helpers/objects";

@Component({
  tag: 'brick-screen',
  styleUrl: 'brick-screen.scss'
})
export class BrickScreen {
  @Element() el: HTMLBrickScreenElement;
  
  private interval: any;
  
  @Prop() activeCells: ICell[] = [];
  @Prop() isHidden = false;
  @Prop() isStatic = false;
  @Prop() highlightedCells: ICell[] = [];
  @Prop() height = SCREEN_HEIGHT;
  @Prop() width = SCREEN_WIDTH;
  @Prop() transparent = false;
  @State() showBlinkingCells = true;
  @State() screenCells: ICell[][] = [];
  
  @Watch('isHidden')
  hiddenHandler() {
    if (this.isHidden || this.isStatic) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => this.showBlinkingCells = !this.showBlinkingCells, CELL_BLINK_INTERVAL);
    }
  }

  componentWillLoad() {
    this.screenCells = this.getEmptyScreenCells();
    this.hiddenHandler();
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
        transparent={this.transparent}
        key={`${this.el.id}_cell_${x}_${y}`}
      />
    );
  }

  render() {
    return (
      <Host isHidden={this.isHidden} transparent={this.transparent}>
        {this.screenCells.map((row, y) => (
          <div class="brick-screen-row" key={`${this.el.id}_row_${y}`}>
            {row.map(this.renderCell.bind(this))}
          </div>
        ))}
      </Host>
    );
  }
}
