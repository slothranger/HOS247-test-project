import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from '../../services/data.service';
import { RemoveConfirmDialog } from '../remove-confirm-dialog/remove-confirm-dialog.component';


@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsViewComponent {
  @Input() items: Item[] = [];
  @Output() select = new EventEmitter<Item>();
  @Output() remove = new EventEmitter<Item>();
  @Output() edit = new EventEmitter<Item>();

  constructor(private modalCtrl: ModalController) {}

  selectHandler(item: Item): void {
    this.select.emit(item);
  }

  removeHandler(item: Item): void {
    this.openModal(item);
  }

  editHandler(item: Item): void {
    this.edit.emit(item);
  }

  async openModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: RemoveConfirmDialog,
      componentProps: {
        name: item.name,
        type: item.isContainer ? 'container' : 'thing',
      },
      showBackdrop: true,
      id: 'confirm-modal',
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.remove.emit(item);
    }
  }
}