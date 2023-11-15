import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ItemEditDialog } from 'src/app/components/item-edit-dialog/item-edit-dialog.component';
import { DataService, Item } from 'src/app/services/data.service';
import { AppActions } from 'src/app/store/app.actions';
import { getSelectedItems } from 'src/app/store/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public items: Item[] = [];
  public selectedItems: Item[] = [];
  public selectedItemId: string = '';
  public freeVolumeWithContainers: number = 0;

  constructor(private service: DataService, private store: Store, private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.store.select(getSelectedItems).subscribe((items) => {
      this.selectedItems = items || [];
      this.selectedItemId = this.getLastSelectedItem()?.id;
      this.updateItems();
    });
  }

  private updateItems(): void {
    this.service.getItems(this.selectedItemId).then(items => {
      const containers = items.filter(item => item.isContainer).sort((a, b) => a.name < b.name ? -1 : 1);
      const things = items.filter(item => !item.isContainer).sort((a, b) => a.name < b.name ? -1 : 1);
      this.items = [...containers, ...things];
      this.updateVolumesWithContainers();
    });
  }

  private getLastSelectedItem(): Item {
    return this.selectedItems.slice(-1)[0];
  }

  updateVolumesWithContainers(): void {
    this.freeVolumeWithContainers = this.getLastSelectedItem()?.volume - this.items.reduce((accumulator, item: Item) => accumulator + item.volume, 0);
  }

  isAddDisabled(): boolean {
    return !!this.selectedItemId && this.freeVolumeWithContainers < 1;
  }

  ionViewDidEnter(): void {
    this.updateItems();
  }

  addHandler(isContainer: boolean): void {
    this.openEditModal({
      isContainer,
      freeVolume: this.selectedItemId ? this.freeVolumeWithContainers : -1,
    });
  }

  selectHandler(item: Item): void {
    this.store.dispatch(AppActions.addSelectedItem(item));
    this.updateItems();
  }

  removeHandler(item: Item): void {
    this.service.removeItem(item.id).then(() => {
      this.updateItems();
    });
  }

  editHandler(item: Item): void {
    this.openEditModal({
      isContainer: item.isContainer!,
      item,
      freeVolume: this.selectedItemId ? this.freeVolumeWithContainers : -1,
    });
  }
  
  backHandler(): void {
    this.store.dispatch(AppActions.removeLastSelectedItem({ count: 1}));
  }
  breadcrumbHandler(index: number): void {
    this.store.dispatch(AppActions.removeLastSelectedItem({ count: this.selectedItems.length - index - 1}));
  }

  async openEditModal(props: any) {
    const modal = await this.modalCtrl.create({
      component: ItemEditDialog,
      componentProps: props,
      showBackdrop: true,
      id: 'edit-modal',
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'update') {
      this.service.updateItem(data).then(() => {
        this.updateItems();
      });
    } else if (role === 'add') {
      this.service.addItem(this.selectedItemId, data).then(() => {
        this.updateItems();
      });
    }
  }
}
