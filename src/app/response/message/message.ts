import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [DatePipe],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class Message {
  message = input<any>();
  user = input<any>();
}
