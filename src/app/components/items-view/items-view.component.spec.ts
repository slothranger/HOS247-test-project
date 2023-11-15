import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ItemsViewComponent } from './items-view.component';

describe('ViewItemPage', () => {
  let component: ItemsViewComponent;
  let fixture: ComponentFixture<ItemsViewComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ItemsViewComponent],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
