import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ItemComponentModule } from '../../components/item/item.module';
import { ItemsViewComponentModule } from 'src/app/components/items-view/items-view.module';
import { ItemEditDialogModule } from 'src/app/components/item-edit-dialog/item-edit-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ItemComponentModule,
    ItemsViewComponentModule,
    HomePageRoutingModule,
    ItemEditDialogModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
