import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  key = 'todo-list'

  setItem(value: Array<Item>): void {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  getItem(): Array<Item> {
    const store =  sessionStorage.getItem(this.key);
    return (store !== null) ? JSON.parse(store) : [
      { description: "eat", done: true },
      { description: "sleep", done: false },
      { description: "play", done: false }
    ];
  }
}