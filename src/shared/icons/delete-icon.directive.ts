import { Directive, ElementRef, OnInit, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: 'svg[deleteIcon]',
})
export class UiDeleteIconDirective implements OnInit {
  fill = input<string>('currentColor');
  size = input<string>('unset');

  private el = inject(ElementRef<SVGSVGElement>);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const svg = this.el.nativeElement;
    this.renderer.setAttribute(svg, 'title', 'Delete');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 20 20');
    this.renderer.setAttribute(svg, 'fill', this.fill());
    if (this.size && this.size() !== 'unset') {
      this.renderer.setStyle(svg, 'block-size', this.size());
    }
    const path = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(
      path,
      'd',
      'M5.6903 17V5.12841H4.75V3.96803H8.1194V3H11.8806V3.96803H15.25V5.12841H14.3097V17H5.6903ZM6.70896 15.8396H13.291V5.12841H6.70896V15.8396ZM8.43597 14.2329H9.45443V6.73509H8.43597V14.2329ZM10.5456 14.2329H11.564V6.73509H10.5456V14.2329Z',
    );
    this.renderer.appendChild(svg, path);
  }
}
