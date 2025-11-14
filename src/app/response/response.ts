import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AccordionComponent } from '../../shared/accordion/accordion.component';
import { MessageComponent } from './message/message';
import { Response } from '../models';



@Component({
  selector: 'app-response',
  imports: [DatePipe, AccordionComponent, MessageComponent],
  templateUrl: './response.html',
  styleUrl: './response.scss',
  host: {
    class: 'flow',
  },
})
export class ResponseComponent {
  response = input.required<Response>();
}
