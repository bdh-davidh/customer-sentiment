import { ChangeDetectionStrategy, Component, input, signal, computed } from '@angular/core';

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
  showHeading = input.required<string>();
  hideHeading = input.required<string>();
  openOnRender = input<boolean>(false);
  content = input<string>();
  groupName = signal<string>(''); // Enables exclusive accordion behavior
  isOpen = signal<boolean>(false);

  currentHeading = computed(() =>
    this.isOpen() ? this.hideHeading() : this.showHeading(),
  );

  onClick(): void {
    this.isOpen.set(!this.isOpen());
  }
}
