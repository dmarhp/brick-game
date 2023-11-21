import {Component, h, Host, Prop} from "@stencil/core";

import digit0 from './assets/digit-0.svg';
import digit1 from './assets/digit-1.svg';
import digit2 from './assets/digit-2.svg';
import digit3 from './assets/digit-3.svg';
import digit4 from './assets/digit-4.svg';
import digit5 from './assets/digit-5.svg';
import digit6 from './assets/digit-6.svg';
import digit7 from './assets/digit-7.svg';
import digit8 from './assets/digit-8.svg';
import digit9 from './assets/digit-9.svg';
import digitEmpty from './assets/digit-empty.svg';

@Component({
  tag: 'seven-segment-digit',
  styleUrl: 'seven-segment-digit.scss'
})
export class SevenSegmentDigit {
  @Prop() digit: string = '';

  getDigit() {
    switch (this.digit) {
      case '0':
        return digit0;
      case '1':
        return digit1;
      case '2':
        return digit2;
      case '3':
        return digit3;
      case '4':
        return digit4;
      case '5':
        return digit5;
      case '6':
        return digit6;
      case '7':
        return digit7;
      case '8':
        return digit8;
      case '9':
        return digit9;
      default :
        return digitEmpty;
    }
  }

  render() {
    return (
      <Host innerHTML={this.getDigit()}/>
    );
  }
}
