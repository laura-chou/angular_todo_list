import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Item } from "../item";

@Component({
  selector: '[app-item]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  editable = false;

  @Input() items: Item[] = [];
  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();

  saveItem(description: string) {
    if (!description) return;
    const isDuplicate = this.items.find(item => item.description === description)
    if(isDuplicate) {
      alert('There are already have duplicate items')
    } else {
      this.editable = false;
      this.item.description = description;
    }
  }

  onCheckChange(event: any) {
    this.item.done = event.target.checked
  }
}
