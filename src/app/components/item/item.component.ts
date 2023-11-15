import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../services/data.service';
import { getFreeVolume } from 'src/app/utils/common.utils';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit{
  @Input() item: Item | undefined;
  @Output() select = new EventEmitter<Item>();
  @Output() remove = new EventEmitter<Item>();
  @Output() edit = new EventEmitter<Item>();

  freeVolume: number = 0;

  ngOnInit() {
    this.freeVolume = this.getFreeVolume();
  }

  clickHandler(item: Item): void {
    if (this.item?.isContainer) {
      this.select.emit(item);
    }
  }

  removeHandler(item: Item): void {
    this.remove.emit(item);
  }

  editHandler(item: Item): void {
    this.edit.emit(item);
  }

   getFreeVolume(): number {
    return this.item?.isContainer ? getFreeVolume(this.item?.volume, this.item.items!) : 0;
  }
}

