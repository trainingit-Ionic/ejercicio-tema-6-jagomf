import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../model/user';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  @Input() readonly user: User;
  canCall = false;

  constructor(private modalConroller: ModalController, private call: CallNumber) { }

  dismiss() {
    this.modalConroller.dismiss();
  }

  async ngOnInit() {
    this.canCall = await this.call.isCallSupported();
  }

  makeCall() {
    this.call.callNumber(this.user.phone, true);
  }

}
