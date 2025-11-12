import { Directive, ElementRef, OnInit, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: 'svg[warningIcon]'
})
export class UiWarningIconDirective implements OnInit {
  fill = input<string>('currentColor');
  size = input<string>('unset');

  private el = inject(ElementRef<SVGSVGElement>);
  private renderer = inject(Renderer2);

  ngOnInit() {
    const svg = this.el.nativeElement;
    this.renderer.setAttribute(svg, 'title', 'Warning');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 20 20');
    this.renderer.setAttribute(svg, 'fill', this.fill());
    if (this.size && this.size() !== 'unset') {
      this.renderer.setStyle(svg, 'block-size', this.size());
    }
    const path = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(
      path,
      'd',
      'M3 15.6262L10 4L17 15.6262H3ZM4.62731 14.7102H15.3727L10 5.76154L4.62731 14.7102ZM9.9963 13.7292C10.1365 13.7292 10.2553 13.6817 10.3527 13.5868C10.45 13.4919 10.4987 13.3744 10.4987 13.2342C10.4987 13.0939 10.4512 12.9752 10.3564 12.8778C10.2615 12.7804 10.1439 12.7318 10.0037 12.7318C9.86348 12.7318 9.74469 12.7792 9.64734 12.8741C9.54999 12.969 9.50131 13.0865 9.50131 13.2268C9.50131 13.367 9.54875 13.4858 9.64364 13.5831C9.73853 13.6805 9.85608 13.7292 9.9963 13.7292ZM9.542 11.8862H10.458V8.50408H9.542V11.8862Z'
    );
    this.renderer.appendChild(svg, path);
  }
}
