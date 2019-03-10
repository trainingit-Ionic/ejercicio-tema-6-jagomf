import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { ModalController } from '@ionic/angular';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private modalController: ModalController,
    private call: CallNumber,
    private userService: UserService
  ) {}

  users: User[];

  ngOnInit() {
    this.userService.get().subscribe(users => {
      this.users = users;
    });
  }

  makeCall(user: User) {
    this.call.isCallSupported().then(() => {
      this.call.callNumber(user.phone, true);
    });
  }

  async userClick(user: User) {
    const modal = await this.modalController.create({
      component: UserModalComponent,
      componentProps: { user }
    });
    modal.present();
  }
}
