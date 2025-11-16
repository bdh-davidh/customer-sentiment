import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Errors {
  data = signal<string | null>(null)
}
