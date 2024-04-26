import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Item } from "./item";
import { ItemComponent } from "./item/item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  componentTitle = "Angular Todo List";
  filter: "all" | "active" | "done" = "all";
  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
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
  
    this.allItems.unshift({
      description,
      done: false
    });
  }

  remove(item: Item) {
    if (confirm('Make sure you want to delete？')) {
      this.allItems.splice(this.allItems.indexOf(item), 1);
    }
  }

  checkedAll(event: any) {
    this.allItems.forEach(item => item.done = event.target.checked);
  }

}
