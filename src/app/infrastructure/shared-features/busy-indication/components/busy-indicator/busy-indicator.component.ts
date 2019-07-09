import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

const inactiveStyle = style({
  opacity: 0,
});

const timing = '500ms ease';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        inactiveStyle,
        animate(timing)
      ]),
      transition('* => void', [
        animate(timing, inactiveStyle)
      ])
    ])
  ]
})
export class BusyIndicatorComponent {
}
