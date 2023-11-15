import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponentModule } from '../item/item.module';
import { ItemsViewComponent } from './items-view.component';
import { RemoveConfirmDialogModule } from '../remove-confirm-dialog/remove-confirm-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ItemComponentModule,
    RemoveConfirmDialogModule,
  ],
  exports: [ItemsViewComponent],
  declarations: [ItemsViewComponent],
})
export class ItemsViewComponentModule {}
