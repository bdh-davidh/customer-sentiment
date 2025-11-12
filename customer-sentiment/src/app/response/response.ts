import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AccordionComponent } from '../../accordion/accordion.component';
import { SanitizeHtmlPipe } from '../../shared/pipes/sanitize-html.pipe';
import { UserData, Message } from '../../types';

@Component({
  selector: 'app-response',
  imports: [DatePipe, AccordionComponent, SanitizeHtmlPipe],
  templateUrl: './response.html',
  styleUrl: './response.scss',
  host: {
    'class': 'flow'
  }
})
export class Response {
  userData = input.required<UserData>();
  
  trackByMessageId(index: number, message: Message): number {
    return message.message_id;
  }
}
