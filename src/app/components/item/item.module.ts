import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item.component';

@NgModule({
  imports: [ CommonModule, IonicModule],
  declarations: [ItemComponent],
  exports: [ItemComponent]
})
export class ItemComponentModule {}
