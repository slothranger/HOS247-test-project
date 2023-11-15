import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RemoveConfirmDialog } from './remove-confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [RemoveConfirmDialog],
  declarations: [RemoveConfirmDialog],
})
export class RemoveConfirmDialogModule {}
