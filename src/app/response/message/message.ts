import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from '../../models';

@Component({
  selector: 'app-message',
  imports: [DatePipe],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class MessageComponent {
  message = input<Message>();
  user = input<string>();
}
