import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/services/data.service';

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.scss'],
})
export class ItemEditDialog implements OnInit {
  @Input() freeVolume: number = 0;
  @Input() item: Item | null = null;
  @Input() isContainer = false;

  public validations = {
    name: [
      { type: 'required', message: '(required)' },
    ],
    volume: [
      { type: 'required', message: '(required)' },
      { type: 'min', message: '' },
      { type: 'max', message: '(volume is to much)' },
    ]
  }

  public form: FormGroup = this.formBuilder.group({});
  
  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
    if (!!this.item && this.freeVolume !== -1) {
      this.freeVolume = this.freeVolume + this.item.volume;
    }

    const minValue = this.isContainer ? this.item?.items?.reduce((accumulator, item: Item) => accumulator + item.volume, 0) || 1 : 1;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      volume: ['', [Validators.required, Validators.min(minValue)]],
    });
    this.validations.volume[1].message = `(min value is ${minValue})`;

    if (this.freeVolume !== -1) {
      this.form.get('volume')?.addValidators([Validators.max(this.freeVolume)]);
    }

    this.form.get('name')?.setValue(this.item?.name || '');
    this.form.get('volume')?.setValue(this.item?.volume || '');
  }

  onSubmit(): void {
    const name = this.form.get('name');
    const volume = this.form.get('volume');
    name?.markAsTouched();
    volume?.markAsTouched();
    if (this.form.valid) {
        this.modalCtrl.dismiss({
          name: name?.getRawValue(),
          volume: volume?.getRawValue(),
          id: this.item ? this.item.id : '',
          isContainer: this.isContainer || false,
        },
        this.item?.id ? 'update' : 'add');
    }
  }

  onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
