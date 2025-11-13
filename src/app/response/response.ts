import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AccordionComponent } from '../../accordion/accordion.component'

@Component({
  selector: 'app-response',
  imports: [DatePipe, AccordionComponent],
  templateUrl: './response.html',
  styleUrl: './response.scss',
  host: {
    'class': 'flow'
  }
})
export class Response {
  userData = input<any>();
}
