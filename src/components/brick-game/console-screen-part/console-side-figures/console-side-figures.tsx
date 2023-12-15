import {Component, h, Host, Prop} from "@stencil/core";
import {IConsoleSideFigure} from "./types";
import {Direction, Figure} from "@global/types";
import {figureHelpers} from "@global/helpers/figures";

const figures: IConsoleSideFigure[] = [
  {figure: Figure.BlockT, direction: Direction.Right, height: 3},
  {figure: Figure.BlockZ, direction: Direction.Left, height: 3},
  {figure: Figure.BlockO, direction: Direction.Up, height: 2},
  {figure: Figure.BlockL, direction: Direction.Left, height: 3},
  {figure: Figure.BlockS, direction: Direction.Left, height: 3},
  {figure: Figure.BlockI, direction: Direction.Right, height: 4}
];

@Component({
  tag: 'console-side-figures',
  styleUrl: 'console-side-figures.scss'
})
export class ConsoleSideFigures {
  @Prop() side: 'LEFT' | 'RIGHT' = 'LEFT';

  renderFigure({figure, direction, height}: IConsoleSideFigure) {
    const cells = figureHelpers.get(figure, {x: 0, y: 0}, direction);

    return (
      <brick-screen
        activeCells={cells}
        height={height}
        width={2}
        isStatic={true}
        transparent={true}
      />
    );
  }
  
  render() {
    return (
      <Host side={this.side}>
        {figures.map(f => this.renderFigure(f))}
      </Host>
    );
  }
}
