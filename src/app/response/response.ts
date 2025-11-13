import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AccordionComponent } from '../../shared/accordion/accordion.component';
import { Message } from "./message/message";


@Component({
  selector: 'app-response',
  imports: [DatePipe, AccordionComponent, Message],
  templateUrl: './response.html',
  styleUrl: './response.scss',
  host: {
    class: 'flow',
  },
})
export class Response {
  response = input.required<any>();
}
