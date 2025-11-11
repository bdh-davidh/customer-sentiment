import {ChangeDetectionStrategy, Component, input, signal,  } from '@angular/core';

/**
 * Collapsible content section using native HTML details/summary elements
 */
@Component({
  selector: 'ui-accordion',
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  heading = input.required<string>();
  openOnRender = input<boolean>(false);
  content = input<string>();
  groupName = signal<string>(''); // Enables exclusive accordion behavior
}
