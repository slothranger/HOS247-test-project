import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-remove-confirm-dialog',
  templateUrl: './remove-confirm-dialog.component.html',
  styleUrls: ['./remove-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RemoveConfirmDialog implements OnInit {
  @Input() name: string = '';
  @Input() type: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    this.modalCtrl.dismiss(null, 'confirm');
  }
}