import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Item } from "./item";
import { ItemComponent } from "./item/item.component";
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemComponent, CdkDropList, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  componentTitle = "Angular Todo List";
  filter: "all" | "active" | "done" = "all";
  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false }
  ];
  
  get isCheckAll() {
    return this.allItems.every(item => {
      return item.done
    })
  }

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }

  addItem(description: string) {
    if (!description) return;
    const isDuplicate = this.allItems.find(item => item.description === description)
    if(isDuplicate) {
      alert('There are already duplicate item')
    } else {
      this.allItems.unshift({
        description,
        done: false
      });
    }
  }

  remove(item: Item) {
    if (confirm('Make sure you want to delete it.')) {
      this.allItems.splice(this.allItems.indexOf(item), 1);
    }
  }

  checkedAll(event: any) {
    this.allItems.forEach(item => item.done = event.target.checked);
  }
  
  dropItem(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allItems, event.previousIndex, event.currentIndex);
  }
}
