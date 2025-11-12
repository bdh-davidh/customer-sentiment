

import { Directive, ElementRef, OnInit, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: 'svg[searchIcon]',
})
export class UiSearchIconDirective implements OnInit {
  fill = input<string>('currentColor');
  size = input<string>('unset');

  private el = inject(ElementRef<SVGSVGElement>);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const svg = this.el.nativeElement;
    this.renderer.setAttribute(svg, 'title', 'Search');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 20 20');
    this.renderer.setAttribute(svg, 'fill', this.fill());
    if (this.size && this.size() !== 'unset') {
      this.renderer.setStyle(svg, 'block-size', this.size());
    }
    const path = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(
      path,
      'd',
      'M15.745 16.5002L10.9035 11.6585C10.4971 11.967 10.0514 12.206 9.56652 12.3753C9.08162 12.5447 8.58121 12.6293 8.06528 12.6293C6.79742 12.6293 5.71957 12.1856 4.83174 11.298C3.94391 10.4104 3.5 9.33308 3.5 8.06589C3.5 6.79884 3.94378 5.72106 4.83134 4.83256C5.7189 3.94419 6.79627 3.5 8.06345 3.5C9.3305 3.5 10.4083 3.94391 11.2968 4.83174C12.1852 5.71957 12.6293 6.79742 12.6293 8.06528C12.6293 8.59679 12.5421 9.10499 12.3676 9.58989C12.193 10.0749 11.9566 10.5128 11.6585 10.9035L16.5 15.745L15.745 16.5002ZM8.06467 11.5728C9.04436 11.5728 9.87393 11.233 10.5534 10.5534C11.233 9.87393 11.5728 9.04436 11.5728 8.06467C11.5728 7.08499 11.233 6.25541 10.5534 5.57596C9.87393 4.89637 9.04436 4.55657 8.06467 4.55657C7.08498 4.55657 6.25541 4.89637 5.57596 5.57596C4.89637 6.25541 4.55657 7.08499 4.55657 8.06467C4.55657 9.04436 4.89637 9.87393 5.57596 10.5534C6.25541 11.233 7.08498 11.5728 8.06467 11.5728Z',
    );
    this.renderer.appendChild(svg, path);
  }
}
